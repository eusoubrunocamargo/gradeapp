import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../supabase";

export const useAuth = () => {
    
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(()=>{
        const checkAuth = async () => {
            const {data: { session } , error } = await supabase.auth.getSession();
            
            if(error){
                console.log(error);
            }
            if(!session){
                router.push('/');
            } else {
                const { user } = session;
                setUser(user);
                console.log(user);
            }
        };
        checkAuth();

        supabase.auth.onAuthStateChange((event, session) => {
            // console.log(event, session);
            if(event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED'){
                setUser(session.user);
            } else if (event === 'SIGNED_OUT'){
                setUser(null);
            }
        })
    }, []);

    return { user };
};