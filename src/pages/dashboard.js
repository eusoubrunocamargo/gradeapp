import styles from '@/styles/Dash.module.css';
import Image from "next/image";
import Logo from '../../public/logo.svg';
import ComponentProfile from "@/components/Profile";
import ComponentMyClasses from "@/components/Classes";
import ComponentMyWeek from "@/components/MyWeek";
import ComponentReminders from "@/components/Reminders/Reminders";
import { useState } from "react";
import { AlertModal } from "@/components/alertModal";
import { useUserData } from "@/hooks/useUserData";
import { useAuth } from "@/hooks/useAuth";

export default function Dashboard(){

    const { handleSignOut } = useAuth();
    
    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
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
                    <ComponentReminders/>
                </section>
            </section>  
        </main>
    )
}

