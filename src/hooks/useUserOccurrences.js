import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { useAuth } from "./useAuth";
import { useAlert } from "./useAlert";
import { convertDate } from "../components/Reminders/TaskManager";

const UserOccurrencesContext = createContext();

export const useUserOccurrences = () => useContext(UserOccurrencesContext);

export const UserOccurrencesProvider = ({ children }) => {
    
    const  { user }   = useAuth();
    const { showAlert } = useAlert();
    const [loading, setLoading] = useState(true);
    const [updatedUserOccurrences, setUpdatedUserOccurrences] = useState([]);

    const fetchUserOccurrences = useCallback(async () => {
        if(!user)return;
        const { data, error } = await supabase
            .from('view_user_occurrences_all')
            .select('*')
            .eq('user_id', user.id)
            .order('date', { ascending: true })

            if(error){
                console.error(error);
                showAlert('Erro ao carregar ocorrências!', 'fail');
            } else {
                setUpdatedUserOccurrences(data);
            }
    },[user, showAlert]);

    const handleAddOccurrence = async (class_id, type, date, description) => {
        let newType = '';
        if(type === 'Prova'){
            newType = 'exams';
        } else if(type === 'Trabalho'){
            newType = 'courseworks';
        } else if(type === 'Evento'){
            newType = 'events';
        }
        const formatDate = convertDate(date);

        const { error } = await supabase
            .from(`classes_${newType}`)
            .insert({
                user_id: user.id,
                degree_class_id: class_id,
                description: description,
                date: formatDate,
            })
            .single()

        if(error) {
            console.log(error);
            showAlert('Erro ao adicionar ocorrência!', 'fail');
            return;
        }
        showAlert('Concluído!', 'success');
        fetchUserOccurrences();
        
    };

    const handleDeleteOccurrence = async (type, occurrenceId) => {
        const { error } = await supabase
            .from(`classes_${type}s`)
            .delete()
            .eq('id', occurrenceId)
            .eq('user_id', user.id)

        if(error){
            console.error(error);
            showAlert('Erro ao deletar ocorrência!', 'fail');
        } else {
            showAlert('Ocorrência deletada com sucesso!', 'success');
            fetchUserOccurrences();
        }
    };

    useEffect(() => {
        fetchUserOccurrences();
    }, [user, fetchUserOccurrences]);

    return (
        <UserOccurrencesContext.Provider value={{ 
            loading,
            updatedUserOccurrences,
            handleAddOccurrence,
            handleDeleteOccurrence,
            }}>
            {children}
        </UserOccurrencesContext.Provider>
    )
        
}