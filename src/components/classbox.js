import styles from '@/styles/Classbox.module.css';
import ClassContent from './ClassContent/ClassContent';
import { useState } from 'react';

export default function ClassBox ({ data }) {

    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => {
        setOpenModal(true);
    };

    // console.log(data);



    return (
        <>
        {openModal && <ClassContent data={data} setOpenModal={setOpenModal}/>} 
         <section onClick={handleOpenModal} className={styles.boxContainer}>
            <p>{data.name}</p>
        </section>
        
        </>

       

    )
}