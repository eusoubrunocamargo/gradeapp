import styles from '@/styles/StudyCard.module.css'
import Image from 'next/image'
import BtnNextPrevious from '../btnNextPrevious'
import DarkSearch from '../../../public/darksearchsquare.png'
// import Close from '../../../public/close.png'
import Close from '../../../public/close_neutral.svg'
import Flip from '../../../public/flip.png'
import { useUserFlashcards } from '@/hooks/useUserFlashcards'
import StudyFrontCard from './StudyFrontCard'
import StudyBackCard from './StudyBackCard'
import { useState } from 'react'

export default function StudyCard({ setOpenStudyCard, openStudyCard }) {

    const { userFlashcards, loading, deleteFlashcard } = useUserFlashcards();
    console.log(userFlashcards);
    const [isFlipped, setIsFlipped] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);



    const handleNavigation = (direction) => {
        if (direction === 'left' && currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        } else if (direction === 'right' && currentIndex < userFlashcards.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    }


    const handleCloseStudyCard = () => {
        setOpenStudyCard(!openStudyCard);
    };

    const handleDeleteFlashcard = (flashcardId) => {
        deleteFlashcard(flashcardId);
        setOpenStudyCard(!openStudyCard);
    };

    if(loading) return <span className={styles.loader}></span>


    return (
        <section className={styles.backContainer}>
            <section className={styles.modalContainer}>
                    <section className={styles.greetingBox}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem'}}>
                            <button onClick={handleCloseStudyCard} className={styles.btnClose}><Image src={Close} width={30} height={30} alt='close'/></button>
                            <h3>FLASHCARDS</h3>
                        </div>
                        <div className={styles.containerBtns}>
                            <div className={styles.searchWrapper}>
                                <select name='searchbox' id='searchbox'>
                                    <option>Filtrar por matéria</option>
                                    <optgroup label='Em andamento'>

                                    </optgroup>
                                    <optgroup label='Finalizadas'>

                                    </optgroup>
                                </select>
                                <label htmlFor='searchbox'><Image src={DarkSearch} width={20} height={20} alt='search'/></label>
                            </div>
                            {/* <div className={styles.searchWrapper}>
                                <select name='searchbox' id='searchbox'>
                                    <option>Filtrar por tópico</option>
                                    <optgroup label='Em andamento'>

                                    </optgroup>
                                    <optgroup label='Finalizadas'>

                                    </optgroup>
                                </select>
                                <label htmlFor='searchbox'><Image src={DarkSearch} width={20} height={20} alt='search'/></label>
                            </div> */}
                            <div className={styles.countCards}>
                                {userFlashcards.length === 0 ? <span>0 de 0</span> : <>
                                {`${currentIndex + 1} de ${userFlashcards.length}`}</>}
                            </div>
                            <BtnNextPrevious onClick={() => handleNavigation('left')} direction={'left'}/>
                            <BtnNextPrevious onClick={() => handleNavigation('right')} direction={'right'}/>
                        </div>
                    </section>
                    <section className={styles.cardContainer}>
                        {userFlashcards.length === 0 ?
                        <h3 className={styles.noCards}>Você ainda não possui nenhum flashcard!</h3> : <>
                        <div className={`${styles.card} ${isFlipped ? styles.isFlipped : ''}`}>
                            <div className={styles.content}>
                                {loading ? <span className={styles.loader}></span> : <>
                                <div className={styles.front}>
                                    <StudyFrontCard
                                        cardClass={userFlashcards[currentIndex].class_name}
                                        cardTitle={userFlashcards[currentIndex].title}
                                        cardFrontText={userFlashcards[currentIndex].front_text}
                                    />
                                </div>
                                <div className={styles.back}>
                                   <StudyBackCard
                                        cardBackText={userFlashcards[currentIndex].back_text}
                                        cardBackImage={userFlashcards[currentIndex].back_image}
                                   />
                                </div></>}
                            </div>
                        </div>
                        <div className={styles.containerCardBtn}>
                            <button className={styles.btnStudied}>Marcar como estudado!</button>
                            <button onClick={() => handleDeleteFlashcard(userFlashcards[currentIndex].id)} className={styles.btnDelete}>Excluir card</button>
                            <button onClick={() => setIsFlipped(!isFlipped)} className={styles.btnFlipCard}><Image src={Flip} width={30} height={30} alt='flip'/></button>
                        </div></>}
                    </section>
            </section>
        </section>
    )
}
