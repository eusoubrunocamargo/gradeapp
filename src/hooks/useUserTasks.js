import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { useAuth } from "./useAuth";
import { useAlert } from "./useAlert";
import { useUserData } from "./useUserData";


const UserTasksContext = createContext();
function getRemainingDays(dueDate) {
    // Create date objects from the due date and the current date
    const dueDateObject = new Date(dueDate);
    const currentDate = new Date();

    // Calculate the difference in time (in milliseconds)
    const differenceInTime = dueDateObject.getTime() - currentDate.getTime();

    // Convert the time difference into days and round it down
    // One day is equal to 1000 * 60 * 60 * 24 milliseconds
    const differenceInDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24));

    // Return the difference in days
    return differenceInDays;
}

export const useUserTasks = () => useContext(UserTasksContext);

export const UserTasksProvider = ({ children }) => {
    
    const  {user}   = useAuth();
    // const { updatedUserClasses: classes } = useUserData();
    const [updatedUserTasks, setUpdatedUserTasks] = useState([]);
    const { showAlert } = useAlert();
    const [loading, setLoading] = useState(true);

    const fetchUserTasks = useCallback(async () => {
        if(!user)return;
        const { data, error } = await supabase
            .from('view_user_tasks')
            .select('*')
            .eq('user_id', user.id)

            if(error){
                console.error(error);
            } else {
                const taskCondition = data.map((task) => {
                    const diff = getRemainingDays(task.due_date);
                    return {...task, condition: diff};
                })
                console.log(taskCondition);
                setUpdatedUserTasks(taskCondition);
            }
    },[user]);

    const handleAddTask = async (description, tag, dueDate) => {
        console.log(description);
        console.log(tag);
        console.log(dueDate);
        console.log(user);
        if(!user)return;
        const { data , error } = await supabase
            .from('tasks')
            .insert({
                user_id: user.id,
                description: description,
                tag: tag,
                due_date: dueDate,
            })
            .select();

            if(error){
                console.log(error);
            } else {
                console.log(data[0]);
                showAlert('Tarefa adicionada!', 'success');
                fetchUserTasks();
            }
    };

    const handleDeleteTask = async (taskId) => {
        const { error } = await supabase
            .from('tasks')
            .delete()
            .eq('user_id', user.id)
            .eq('id', taskId)

            if(error){
                showAlert('Erro ao deletar tarefa!', 'fail');
            } else {
                showAlert('Tarefa deletada com sucesso!', 'success');
                fetchUserTasks();
            }
    };

    const handleFinishTask = async (taskId, finishedDate) => {
        const { error } = await supabase
            .from('tasks')
            .update({ finished_at: finishedDate })
            .eq('user_id', user.id)
            .eq('id', taskId)

            if(error){
                showAlert('Erro ao concluir tarefa!', 'fail');
            } else {
                showAlert('Tarefa concluída com sucesso!', 'success');
                fetchUserTasks();
            }
    };

    // const handleFinishTask = async (userId, taskId) => {
    //     console.log('concluir tarefa');
    // };

    useEffect(() => {
        fetchUserTasks();
    }, [user, fetchUserTasks]);

    return (
        <UserTasksContext.Provider value={{ 
            loading,
            updatedUserTasks, 
            handleAddTask,
            handleDeleteTask,
            handleFinishTask,
            // handleUpdateTask,
            }}>
            {children}
        </UserTasksContext.Provider>
    )
        
}