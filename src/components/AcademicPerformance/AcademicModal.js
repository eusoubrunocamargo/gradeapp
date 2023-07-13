import styles from '@/styles/AcademicModal.module.css';
import Image from "next/image";
import BtnNextPrevious from '../btnNextPrevious';
import DarkSearch from '../../../public/darksearch.png';
import { useEffect, useState, useRef } from 'react';
// import Close from '../../../public/close.png';
import Close from '../../../public/close_neutral.svg';
import { useUserData } from '@/hooks/useUserData';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '../../../supabase';

export default function AcademicModal({ handleAcademicModal }) {

    const { updatedUserUniqueClasses } = useUserData();
    const finishedClasses = updatedUserUniqueClasses.filter(item => item.grade !== null);


    const [currentPage, setCurrentPage] = useState(0);
    const classesPerPage = 4;
    const startIndex = currentPage * classesPerPage;
    const selectedClasses = finishedClasses.slice(startIndex, startIndex + classesPerPage);
    const handlePrevPage = () => {
        setCurrentPage(old => Math.max(old - 1, 0));
    };
    const handleNextPage = () => {
        setCurrentPage(old => Math.min(old + 1, Math.ceil(finishedClasses.length/classesPerPage) - 1));
    };

    //graph config

    return (
        <>
        <section className={styles.containerBack}>
            <section className={styles.containerModal}>
                <button className={styles.btnClose} onClick={handleAcademicModal}><Image src={Close} width={20} height={20} alt='close'/></button>
                <section className={styles.containerGrid}>
                    
                    <h3>Desempenho Acadêmico</h3>

                    <section className={styles.greetingBox}>
                        <h3>MATÉRIAS</h3>
                        <div className={styles.containerBtn}>
                            <div className={styles.searchWrapper}>
                                <select name='searchbox' id='searchbox'>
                                    <option></option>
                                    <optgroup label='Em andamento'>

                                    </optgroup>
                                    <optgroup label='Finalizadas'>

                                    </optgroup>
                                </select>
                                <label htmlFor='searchbox'><Image src={DarkSearch} width={20} height={20} alt='search'/></label>
                            </div>
                            <BtnNextPrevious onClick={handlePrevPage} direction={'left'}/>
                            <BtnNextPrevious onClick={handleNextPage} direction={'right'}/>
                        </div>
                    </section>

                    <section className={styles.containerClasses}>
                        {selectedClasses.map((item, index) => (
                            <div key={index} className={styles.classBox}>
                                <span>{item.class_name}</span>
                                <p>{item.grade}</p>
                            </div>
                        ))}
                    </section>

                    <section className={styles.containerGraph}>
                        <div className={styles.graphBox}>
                            <h3 className={styles.classTitle}>Cálculo 1</h3>
                            <div className={styles.labels}>
                                <span>SS</span>
                                <span>MS</span>
                                <span>MM</span>
                            </div>
                            <div className={styles.graphBars}>
                                <span>20%</span>
                                <span>35%</span>
                                <span>45%</span>
                                <hr></hr>
                                <hr className={styles.myGrade}></hr>
                                <span className={styles.textAverage}>Média: 1.75</span>
                                <span className={styles.myTextGrade}>Sua nota</span>
                            </div>
                        </div>
                    </section>


                </section>
            </section>
        </section>
        </>
    )

}