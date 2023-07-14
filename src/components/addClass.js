import styles from '@/styles/AddClass.module.css';
// import { useState } from 'react';
import Image from 'next/image';
// import NextLight from '../../public/nextlight.png';
import Close from '../../public/close.png';
import NeutralClose from '../../public/close_neutral.svg';
// import Check from '../../public/checkpurple.png';
// import { supabase } from '../../supabase';
// import { useAuth } from '@/hooks/useAuth';
import AddClassSchedule from './addSchedule';
import { useUserData } from '@/hooks/useUserData';
// import { useDegree } from '@/hooks/useDegree';

export default function AddClass ({ setOpenModal }) {

    // const { user } = useAuth();
    // const { updatedUserData } = useUserData();
    // // const { degreeId } = useDegree();
    // const degreeId = updatedUserData[0].degree_id;
    // console.log('entrou no addclass');
    // const [showAddClass, setShowAddClass] = useState(false);
    // const [loading, setLoading] = useState(false);
    // const [updatedDegree, setUpdatedDegree] = useState(false);
    // const [selectedDegree, setSelectedDegree] = useState('');
    // const [alert, setAlert] = useState(false);

    // const updateProfileDegree = async (userId, degreeId) => {
        
    //     const { error } = await supabase
    //     .from('profiles')
    //     .update({degree_id: degreeId})
    //     .eq('id', userId);

    //     if(error){
    //         console.error(error);
    //         setLoading(false);
    //         return false;
    //     }

    //     return true;
    // }

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    // const handlePages = () => {
    //     if(!updatedDegree){
    //         setAlert(true);
    //         return;
    //     }
    //     setShowAddClass(true);
    // };

    // const handleSaveDegree = () => {
    //     if(selectedDegree === ''){
    //         setAlert(true);
    //         return;
    //     }
    //     setAlert(false);
    //     setLoading(true);
        
    //     if(updateProfileDegree(user.id, Number(selectedDegree))){
    //         setTimeout(() => {
    //             setLoading(false);
    //             setUpdatedDegree(true);
    //         }, 1000);
    //     }
    // };



    return (
        <div className={styles.modalBackground}>
            <section className={styles.containerAddClass}>
            <button onClick={handleCloseModal} className={styles.btnClose}><Image src={NeutralClose} width={30} height={30} alt='close'/></button>
                {/* {!degreeId && !showAddClass ? 
                <>
                <h3>Parece que você ainda não adicionou o seu curso ... </h3>
                <select id='degree_select' value={selectedDegree} onChange={(e) => setSelectedDegree(e.target.value)}>
                    <option value = ''>Selecione o seu curso</option>
                    <option value='1'>Engenharia Automotiva</option>
                    <option value='2'>Engenharia Aeroespacial</option>
                    <option value='3'>Engenharia Eletrônica</option>
                    <option value='4'>Engenharia de Energia</option>
                    <option value='5'>Engenharia de Software</option>
                </select>
                {updatedDegree ? 
                <Image src={Check} width={30} height={30} alt='check'/> :
                <button onClick={handleSaveDegree} className={styles.btnSaveDegree}>
                    {loading ? <span className={styles.loader}></span> : 'Salvar'}
                </button>}
                {alert && <span className={styles.alert}>Por favor, selecione um curso!</span>}
                <button onClick={handlePages} className={styles.btnNext}>Próximo
                    <Image src={NextLight} width={30} height={30} alt='next'/>
                </button> */}
                {/* </> : */}
                {/* <> */}
                <section className={styles.containerAddClassSchedule}>
                    <h3>Vamos lá, cadastre suas matérias!</h3>
                    <AddClassSchedule/>
                </section>
                {/* </> */}
                {/* } */}

            </section>
        </div>
    )
}
