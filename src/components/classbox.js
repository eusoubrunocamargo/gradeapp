import styles from '@/styles/Classbox.module.css';
import ClassContent from './ClassContent/ClassContent';
import { useState } from 'react';

export default function ClassBox ({ data }) {

    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => {
        setOpenModal(true);
        // console.log(data);
        // setOpenModalFromSelect(true);
    };

    // console.log(data);

    return (
        <>
        {openModal && <ClassContent data={data} setOpenModal={setOpenModal} /*setOpenModalFromSelect={setOpenModalFromSelect}*//>} 
         <section onClick={handleOpenModal} className={`${styles.boxContainer} ${data.grade !== null && styles.finishedClass}`}>
            <p>{data.name}</p>
            {data.grade !== null && <p>{data.grade}</p>}
        </section>
        
        </>

       

    )
}