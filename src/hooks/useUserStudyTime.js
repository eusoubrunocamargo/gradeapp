import { supabase } from "../../supabase";
import { useAuth } from "./useAuth";
import { useAlert } from "./useAlert";
// import { useEffect } from "react";
import { useCallback, useEffect, useState } from "react";


export const useUserStudyTime = () => {

    const { user } = useAuth();
    const { showAlert } = useAlert();
    const [studyTime, setStudyTime] = useState(0);
    

    const saveSession = async (seconds, userClassId) => {
        const { data, error } = await supabase
            .from('user_studytime')
            .insert([
                { user_id: user.id, degree_class_id: userClassId, elapsed_seconds: seconds }
            ]);

        if (error) {
            console.log(error);
            return;
        }

        showAlert('Sessão salva com sucesso', 'success');
        getStudyTime();
    };

    const getStudyTime = useCallback(async () => {
        const { data, error } = await supabase
            .from('user_studytime')
            .select('elapsed_seconds')
            .eq('user_id', user.id)

        if (error) {
            console.log(error);
            return;
        }

        const totalSeconds = data.reduce((acc, curr) => {
            return acc + curr.elapsed_seconds;
        }, 0);

        // console.log(totalSeconds);
        setStudyTime(totalSeconds);
    }, [user]);

    useEffect(() => {
        if (!user) return;
        getStudyTime();
    }, [user, getStudyTime]);

    return {
        saveSession,
        getStudyTime,
        studyTime,
        }
    }