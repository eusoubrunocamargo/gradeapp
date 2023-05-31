import { useState, useEffect, useCallback } from "react";
import { supabase } from "../../supabase";
import { useAuth } from "./useAuth";


export function useUserClasses(){

    const { user } = useAuth();
    const [userClasses, setUserClasses] = useState([]);

        // console.log('entrou no useeffect do hook');

        const fetchUserClasses = useCallback(async () => {

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
                setUserClasses(updatedData);
            }

        } catch (error) {
            console.log('Erro ao carregar matérias', error);
        }
        },[user]);

        useEffect(() => {
            if(user){
                fetchUserClasses();
            }
        }, [user, fetchUserClasses])

    return {userClasses,fetchUserClasses};
}