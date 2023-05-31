import { useRouter } from "next/router"
import { supabase } from "../../supabase";
import styles from '@/styles/Dash.module.css';
import Image from "next/image";
import Logo from '../../public/logo.svg';
import ComponentProfile from "@/components/Profile";
import ComponentMyClasses from "@/components/Classes";
import ComponentMyWeek from "@/components/MyWeek";
import { _useEffect, useState } from "react";
import { AlertModal } from "@/components/alertModal";
import { useUserData } from "@/hooks/useUserData";
import { useAuth } from "@/hooks/useAuth";

export default function Dashboard(){

    const router = useRouter();

    useAuth();

    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    const handleSignOut = async () => {
        const {error} = await supabase.auth.signOut();
        if(error){
            console.error(error);
        }else{
            router.push('/');
        }
    };   

    const { loading } = useUserData();

    if(loading){
        return <div></div>
    }

    return (
        <main className={`${isDarkMode? styles.darkMode : styles.lightMode} ${styles.mainContainer}`}>
            <AlertModal/>
            <header>
                <nav>
                    <Image src={Logo} width={400} height={100} alt="logo" priority/>
                    <div className={styles.btnNavBar}>
                        <button onClick={handleDarkMode}>{isDarkMode?'Dark':'Light'}</button> 
                        <button onClick={handleSignOut}>Sair</button>
                    </div>
                </nav>
            </header>

            <section className={styles.containerComponents}>
                <section className={styles.leftSide}>
                    <ComponentProfile/>
                    <ComponentMyClasses/>
                </section>
                <section className={styles.rightSide}>
                    <ComponentMyWeek isDarkMode={isDarkMode}/>
                </section>
            </section>  
        </main>
    )
}

