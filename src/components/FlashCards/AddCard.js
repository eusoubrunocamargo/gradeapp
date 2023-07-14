import styles from '@/styles/AddCard.module.css'
import Close from '../../../public/close.png'
// import Close from '../../../public/close_neutral.svg'
import Image from 'next/image'
import FrontCard from './FrontCard'
import BackCard from './BackCard'
import { useState } from 'react'
import { useUserFlashcards } from '@/hooks/useUserFlashcards'

export default function AddCard({ onClose }) {

    const [isFlipped, setIsFlipped] = useState(false);
    const { flashcards, updateFlashcards, submitFlashcards, loading } = useUserFlashcards();   
    return (
        <section className={styles.backContainer}>
            <div className={styles.modalContainer}>
                <button onClick={onClose} className={styles.btnClose}>
                    <Image src={Close} width={25} height={25} alt='close'/>
                </button>
                {loading ? <span className={styles.loader}></span> : <>
                <h1>Criar FlashCard</h1>
                <div className={`${styles.card} ${isFlipped ? styles.isFlipped : ''}`}>
                    <div className={styles.content}>
                        <div className={styles.front}>
                            <FrontCard 
                                flashcards={flashcards}
                                updateFlashcards={updateFlashcards}
                            />
                        </div>
                        <div className={styles.back}>
                            <BackCard
                                flashcards={flashcards}
                                updateFlashcards={updateFlashcards}
                                submitFlashcards={submitFlashcards}
                            />
                        </div>
                    </div>
                </div>
                <button className={styles.btnFlipCard} onClick={() => setIsFlipped(!isFlipped)}>Flip Card</button>
                </>}
            </div>
        </section>
    )
}