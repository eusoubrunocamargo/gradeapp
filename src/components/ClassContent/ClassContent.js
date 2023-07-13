import styles from '@/styles/ClassContent.module.css';
import { useState, forwardRef } from 'react';
// import Close from '../../../public/close.png';
import Close from '../../../public/close_neutral.svg';
import Image from 'next/image';
import MenuButton from '../menuButton';
import FloatingMenu from '../floatingMenu';
import { useUserOccurrences } from '@/hooks/useUserOccurrences';
import OccurrenceContainer from './OccurrenceContainer';
import AddOccurrenceModal from './AddOccurrenceMocal';

export default function ClassContent({ setOpenModal, data }){

    const { id: classId } = data;
    const { updatedUserOccurrences } = useUserOccurrences();

    //handle close modal
    const [addModal, setAddModal] = useState(false);

    //control active button
    const [activeButton, setActiveButton] = useState({
        provas: true,
        trabalhos: false,
        eventos: false,
        colegas: false,
    });

    const handleActiveButton = (e) => {
        const newActiveButtonState = Object.keys(activeButton).reduce((state, key) => {
            state[key] = key === e.target.id;
            return state;
        }, {});
        setActiveButton(newActiveButtonState);
    }

    const renderOccurrences = (type, typeName) => {
        if (!activeButton[type]) return null;
        return updatedUserOccurrences.map((occurrence) => {
            if (occurrence.occurrence_type === typeName && occurrence.degree_class_id === classId) {
                return (
                    <OccurrenceContainer key={occurrence.id} occurrence={occurrence}/>
                );
            }
        });
    };

    const getOccurrencesCount = (type, typeName) => {
        // if (!activeButton[type]) return 0;
        return updatedUserOccurrences.filter((occurrence) =>
            occurrence.occurrence_type === typeName && occurrence.degree_class_id === classId
        ).length;
    };
    
    

    return (
        <section className={styles.darkBackground}>
            <section className={styles.classContentContainer}>
                {!addModal && <button onClick={() => setOpenModal(false)} className={styles.btnClose}><Image src={Close} width={30} height={30} alt='close'/></button>}
                <section className={styles.classContentGrid}>
                    <div className={styles.classContentHeader}>
                        {addModal ? 
                        <AddOccurrenceModal setAddModal={setAddModal} classId={classId}/>
                        :
                        <>
                        <FloatingMenu options={[
                            { text: 'Cadastrar' , callback: () => setAddModal(true)},
                        ]}>
                            <MenuButton/>
                        </FloatingMenu>
                        <h3>{data.name}</h3>
                        </>}
                    </div>
                    <button id='provas' onClick={(e) => handleActiveButton(e)} className={`${styles.btnOptions} ${activeButton.provas && styles.activeBtn}`}>Provas{getOccurrencesCount('provas','exam') > 0 && <div className={styles.numberOccurrences}>{getOccurrencesCount('provas','exam')}</div>}</button>
                    <button id='trabalhos' onClick={(e) => handleActiveButton(e)} className={`${styles.btnOptions} ${activeButton.trabalhos && styles.activeBtn}`}>Trabalhos{getOccurrencesCount('trabalhos','coursework') > 0 && <div className={styles.numberOccurrences}>{getOccurrencesCount('trabalhos','coursework')}</div>}</button>
                    <button id='eventos' onClick={(e) => handleActiveButton(e)} className={`${styles.btnOptions} ${activeButton.eventos && styles.activeBtn}`}>Eventos{getOccurrencesCount('eventos','event') > 0 && <div className={styles.numberOccurrences}>{getOccurrencesCount('eventos','event')}</div>}</button>
                    <button id='colegas' onClick={(e) => handleActiveButton(e)} className={`${styles.btnOptions} ${activeButton.colegas && styles.activeBtn}`}>Colegas</button>
                    <div className={styles.contentContainer}>
                        {renderOccurrences('provas', 'exam')}
                        {renderOccurrences('trabalhos', 'coursework')}
                        {renderOccurrences('eventos', 'event')}
                    </div>
                </section>
            </section>
        </section>
    )
}