import styles from '@/styles/Floating.module.css'
import Image from 'next/image'
import Logo from '../../../public/logo.svg'
import Card from '../../../public/cards.png'
import Mind from '../../../public/mind.png'
import Live from '../../../public/reading.png'
import Contact from '../../../public/speech-bubble.png'
import FloatingMenu from '../floatingMenu'

export default function Floating() {
    
    return (

        <section className={styles.mainContainer}>

                <button className={styles.btnFloatingModal}>
                    <Image src={Card} width={25} height={25} alt='card'/>
                    <span>Flash</span>
                    <span>Card</span>
                </button>

            <button className={styles.btnFloatingModal}>
                <Image src={Mind} width={25} height={25} alt='card'/>
                <span>Modo</span>
                <span>Foco</span>
            </button>

            <button className={styles.btnFloatingModal}>
                <Image src={Live} width={25} height={25} alt='card'/>
                <span>Live</span>
                <span>Session</span>
            </button>

            <button className={styles.btnFloatingModal}>
                <Image src={Contact} width={25} height={25} alt='card'/>
                <span>Enviar</span>
                <span>Sugestão</span>
            </button>


        </section>

    )
}