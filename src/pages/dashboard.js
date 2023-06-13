import styles from '@/styles/Dash.module.css';
import Image from "next/image";
import Logo from '../../public/logo.svg';
import ComponentProfile from "@/components/Profile";
import ComponentMyClasses from "@/components/Classes";
import ComponentMyWeek from "@/components/MyWeek";
import ComponentReminders from "@/components/Reminders/Reminders";
import Floating from '@/components/Floating/Floating';
import { useEffect, useState } from "react";
import { AlertModal } from "@/components/alertModal";
import { useUserData } from "@/hooks/useUserData";
import { useAuth } from "@/hooks/useAuth";
import AddDegreeModal from '@/components/AddDegreeModal/addDegreeModal';
import Focus from '@/components/Focus/Focus';
import StudyCard from '@/components/FlashCards/StudyCard';

export default function Dashboard(){

    const { handleSignOut } = useAuth();
    const { updatedUserData, loading } = useUserData();
    const [openModal, setOpenModal] = useState(false);
    const [openStudyCard, setOpenStudyCard] = useState(false);
   
    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleDarkMode = () => {
        const newIsDarkMode = !isDarkMode;
        setIsDarkMode(newIsDarkMode);
        if (typeof window !== 'undefined') {
            localStorage.setItem('darkMode', newIsDarkMode ? 'true' : 'false');
        }
    };
    
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const darkMode = localStorage.getItem('darkMode');
            setIsDarkMode(darkMode === 'true');
        }
    }, []);

    const [openFocus, setOpenFocus] = useState(false);

    useEffect(() => {
        if (updatedUserData && updatedUserData.length > 0 && updatedUserData[0].degree_id === null) {
          setOpenModal(true);
        }
    }, [updatedUserData]);

    if(loading){
        return <div>...</div>
    }

    return (
        <main className={`${isDarkMode? styles.darkMode : styles.lightMode} ${styles.mainContainer}`}>
            {openModal && <AddDegreeModal setOpenModal={setOpenModal}/>}
            {openFocus && <Focus openFocus={openFocus} setOpenFocus={setOpenFocus}/>}
            {openStudyCard && <StudyCard openStudyCard={openStudyCard} setOpenStudyCard={setOpenStudyCard}/>}
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

            <section className={styles.containerFloating}>
                <Floating 
                    openFocus={openFocus} 
                    setOpenFocus={setOpenFocus}
                    openStudyCard={openStudyCard}
                    setOpenStudyCard={setOpenStudyCard}
                    />
            </section>

            
            
        </main>
    )
}

