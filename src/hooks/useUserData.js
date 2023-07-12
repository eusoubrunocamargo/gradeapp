import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { useAuth } from "./useAuth";
import { useAlert } from "./useAlert";

const UserDataContext = createContext();

export const useUserData = () => useContext(UserDataContext);

export const UserDataProvider = ({ children }) => {

    // console.log('UserDataProvider');
    
    const {user , loadingAuth }  = useAuth();
    const [updatedUserClasses, setUpdatedUserClasses] = useState([]);
    const [updatedUserData, setUpdatedUserData] = useState([]);
    const [updatedUserUniqueClasses, setUpdatedUserUniqueClasses] = useState([]);
    const { showAlert } = useAlert();
    const [loading, setLoading] = useState(true);

    const fetchUserData = useCallback(async () => {
        // console.log('fetchUserData');
        if(!user) {
            return;
        }

        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('name, avatar_url, degree_id, degrees: degree_id(degree_name)')
                .eq('id', user.id)

                if(error){
                    console.log(error);
                } else {
                    setUpdatedUserData(data);
                }
        } catch (error) {
            console.log('Erro ao carregar dados do usuáruo', error);
        } finally {
            setLoading(false);
        }

    },[user]);

    const handleUpdateUserDegree = async (degreeId) => {
        
        const { error } = await supabase
        .from('profiles')
        .update({degree_id: degreeId})
        .eq('id', user.id);

        if(error){
            console.error(error);
            showAlert('Erro ao atualizar curso', 'fail');
            return false;
        }

        showAlert('Curso atualizado com sucesso!', 'success');
        fetchUserData();
       
    };

    const fetchUserClasses = useCallback(async () => {

        if(!user)return;

        try {
            const { data , error } = await supabase
                .from('user_classes_view_all_full_schedule')
                .select('*')
                .order('start_time', { ascending: true })
                .eq('user_id', user.id);

            if(error) {
                console.log(error);
            } else {
                const updatedData = data;
                setUpdatedUserClasses(updatedData);
            }

        } catch (error) {
            console.log('Erro ao carregar dados do usuário', error);
        }
    },[user]);

    const handleDeleteClass = async (selectedOption, _setAlertText, _setAlertType, _setIsAlertVisible) => {
        if(!selectedOption) return showAlert('Selecione uma matéria!', 'fail');
        
        const { error } = await supabase
            .from('user_classes')
            .delete()
            .eq('user_id', user.id)
            .eq('degree_class_id', selectedOption)

            if(error){
                showAlert('Erro ao deletar matéria!', 'fail');
            } else {
                showAlert('Matéria deletada com sucesso!', 'success');
                fetchUserClasses();
            }
        
    };

    const handleAddClass = async (checkForm) => {

        //First, add class
        const { data, error } = await supabase
            .from('user_classes')
            .insert({
                user_id: user.id,
                degree_class_id: checkForm.class,
            })
            .select();

            if(error){
                showAlert('Erro ao cadastrar matéria!', 'fail');
            }

            //Now, add schedule
            const userClassID = data[0].id;

            for(const schedule of checkForm.schedule){

                const { day, time} = schedule;
    
                const { error } = await supabase
                    .from('class_schedule')
                    .insert({
                        user_class_id: userClassID,
                        day_of_week: day,
                        start_time: `${time}:00`,
                        locale: checkForm.locale
                    })
                    .select();
    
                    if(error){
                        showAlert('Erro ao cadastrar matéria!', 'fail');
                        return console.log(scheduleError);
                    }
    
                    showAlert('Matéria cadastrada!', 'success');
                    fetchUserClasses();
            }
    };

    const handleFinishClass = async (classId, grade) => {
        const { error } = await supabase
            .from('user_classes')
            .update({grade: grade, end_date: new Date()})
            .eq('degree_class_id', classId)
            .eq('user_id', user.id)

            if(error){
                showAlert('Erro ao finalizar matéria!', 'fail');
            } else {
                showAlert('Matéria finalizada!', 'success');
                fetchUserClasses();
            }
    };

    const fetchUserUniqueClasses = useCallback(async () => {
        if(!user)return;
        const { data, error } = await supabase
            .from('user_classes_view_grade')
            .select('*')
            .eq('user_id', user.id);

            if (error) {    
                console.log(error);
                showAlert('Erro ao carregar matérias!', 'fail');
            } else {
                setUpdatedUserUniqueClasses(data);
            }
    },[user, showAlert]);

    useEffect(() => {
        // console.log('useEffect UserDataProvider');
        if(!loadingAuth){
        fetchUserClasses();
        fetchUserData();
        fetchUserUniqueClasses();
        }
    }, [user, loadingAuth, fetchUserClasses, fetchUserData, fetchUserUniqueClasses]);

    return (
        <UserDataContext.Provider value={{ 
            loading,
            updatedUserClasses, 
            updatedUserData, 
            updatedUserUniqueClasses,
            handleUpdateUserDegree,
            handleDeleteClass, 
            handleAddClass,
            handleFinishClass,
            fetchUserData,
            }}>
            {children}
        </UserDataContext.Provider>
    )
        
}