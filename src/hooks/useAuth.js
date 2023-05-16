import { useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../supabase";

export const useAuth = () => {
    const router = useRouter();
    useEffect(()=>{
        const checkAuth = async () => {
            const {data: { session } , error } = await supabase.auth.getSession();
            
            if(error){
                console.log(error);
            }
            if(!session){
                router.push('/');
            }
        };
        checkAuth();

        supabase.auth.onAuthStateChange((event, session) => {
            console.log(event, session);
        })
    }, [router]);
};