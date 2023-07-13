import styles from '@/styles/Floating.module.css'
import Image from 'next/image'
import Logo from '../../../public/logo.svg'
import Card from '../../../public/cards.png'
import Mind from '../../../public/mind.png'
import Live from '../../../public/reading.png'
import Contact from '../../../public/speech-bubble.png'
import { useState } from 'react'
import OptionsContainer from './OptionsContainer'
import AddCard from '../FlashCards/AddCard'
import Focus from '../Focus/Focus'

export default function Floating( { 
    openFocus, 
    setOpenFocus, 
    openStudyCard, 
    setOpenStudyCard,
    openSuggestions,
    setOpenSuggestions,
    openPomodoro,
    setOpenPomodoro,
    }) {

    const [openOption, setOpenOption] = useState(null);
    const [openCreateCard, setOpenCreateCard] = useState(false);
    // const [openFocus, setOpenFocus] = useState(false);

    const handleOpenOption = (option) => {
        if (openOption === option) {
            setOpenOption(null);
        } else {
            setOpenOption(option);
        }
    };

    const handleOpenCreateCard = () => {
        setOpenCreateCard(!openCreateCard);
        setOpenOption(null);
    };

    const handleOpenFocus = () => {
        setOpenFocus(!openFocus);
        setOpenOption(null);
    };

    const handleOpenStudyCard = () => {
        setOpenStudyCard(!openStudyCard);
        setOpenOption(null);
    };

    const handleOpenSuggestions = () => {
        setOpenSuggestions(!openSuggestions);
        setOpenOption(null);
    };

    const handleOpenPomodoro = () => {
        setOpenPomodoro(!openPomodoro);
        setOpenOption(null);
    };
        
    
    return (

        <>

        {openCreateCard && <AddCard onClose={handleOpenCreateCard}/>}
        {/* {openFocus && <Focus onClose={handleOpenFocus}/>} */}

        <section className={styles.mainContainer}>

            
            <OptionsContainer options={[
                {text: 'Criar flashcard', callback: handleOpenCreateCard},
                {text: 'Modo de estudo', callback: handleOpenStudyCard},
            ]} isOpen={openOption === 'card'} onOpen={() => handleOpenOption('card')}>
                <button className={`${styles.btnFloatingModal} ${openOption === 'card' ? styles.isActive : ''}`}>
                    <Image src={Card} width={25} height={25} alt='card'/>
                    <span>Flash</span>
                    <span>Card</span>
                </button>
            </OptionsContainer>

            <OptionsContainer options={[
                {text: 'Método Pomorodo', callback: handleOpenPomodoro},
                {text: 'Tempo Livre', callback: handleOpenFocus},
            ]} isOpen={openOption === 'focus'} onOpen={() => handleOpenOption('focus')}>
                <button className={`${styles.btnFloatingModal} ${openOption === 'focus' ? styles.isActive : ''}`}>
                    <Image src={Mind} width={25} height={25} alt='card'/>
                    <span>Modo</span>
                    <span>Foco</span>
                </button>
            </OptionsContainer>

            <OptionsContainer options={[
                {text: 'Sala de estudo', callback: () => console.log('Flash Card')},
                {text: 'Ver ranking', callback: () => console.log('Flash Card')},
            ]} isOpen={openOption === 'live'} onOpen={() => handleOpenOption('live')}>
                <button className={`${styles.btnFloatingModal} ${openOption === 'live' ? styles.isActive : ''}`}>
                    <Image src={Live} width={25} height={25} alt='card'/>
                    <span>Live</span>
                    <span>Session</span>
                </button>
            </OptionsContainer>

            <OptionsContainer options={[
                {text: 'Enviar sugestão', callback: handleOpenSuggestions},
                // {text: 'Reportar bug', callback: () => console.log('Flash Card')},
            ]} isOpen={openOption === 'suggestion'} onOpen={() => handleOpenOption('suggestion')}>
                <button className={`${styles.btnFloatingModal} ${openOption === 'suggestion' ? styles.isActive : ''}`}>
                    <Image src={Contact} width={25} height={25} alt='card'/>
                    <span>Enviar</span>
                    <span>Sugestão</span>
                </button>
            </OptionsContainer>

        </section>

        </>

    )
}