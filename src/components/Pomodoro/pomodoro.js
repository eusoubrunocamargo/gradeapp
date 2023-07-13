import styles from '../../styles/Pomodoro.module.css'
import Image from 'next/image'
import BigClose from '../../../public/error_alert.png'
import Alien from '../../components/Animations/alienreading.json'
import { Player } from '@lottiefiles/react-lottie-player'
import Tomato from '../../../public/tomato.svg'
import { useState, useEffect } from 'react'
import { useUserData } from '@/hooks/useUserData'
import Select from 'react-select';


export default function Pomodoro({
    openPomodoro,
    setOpenPomodoro,
}) {

    const [hideTimer, setHideTimer] = useState(false);
    const handleHideTimer = () => {
        setHideTimer(!hideTimer);
    };

    const { updatedUserClasses: classes } = useUserData();
    const [userClasses, setUserClasses] = useState([]);

    useEffect(() => {
        let uniqueClasses = Array.from(new Set(classes.map(item => item.class_name))).map(class_name => {
            return {
                name: class_name,
                id: classes.find(item => item.class_name === class_name).degree_class_id,
            };
        });

        setUserClasses(uniqueClasses);
    }, [classes]);

    const [selectedOption, setSelectedOption] = useState(null);


    const mappedOptions = userClasses.map((item) => {
        return {
            value: item.id,
            label: item.name,
        }
    });

    const customStyles = {
        control: (provided) => ({
            ...provided,
            borderRadius: '1rem',
            boxShadow: '2px 2px 0px #1e1e1e',
            cursor: 'pointer',
            border: '1px solid #1e1e1e',
        }),
        singleValue: (provided) => ({
            ...provided,
            // color: '#7D00E4',
            color: 'var(--main-color)',
            textAlign: 'center',
        }),
        placeholder: (provided) => ({
            ...provided,
            // color: '#7D00E4',
            color: 'var(--main-color)',
            opacity: 0.5,
            textAlign: 'center',
        }),
        valueContainer: (provided) => ({
            ...provided,
            color: 'white',
        }),
        container: (provided) => ({
            ...provided,
            width: '100%',
        }),
        
    };

    return (
        <div className={styles.pomodoroFullContainer}>
            <button onClick={() => setOpenPomodoro(!openPomodoro)} className={styles.closeButton}>
                <Image src={BigClose} width={30} height={30} alt="Close" />
            </button>
            <div className={styles.pomodoroContainer}>
                <Player autoplay loop src={Alien} style={{ height: '10rem', width: '10rem' }}></Player>
                <h1>Pomodoro Timer</h1>
                <Select noOptionsMessage={() => 'Nenhuma matéria cadastrada'} placeholder='O que você vai estudar?' styles={customStyles} defaultValue={selectedOption} onChange={(option) => setSelectedOption(option.value)} options={mappedOptions}/>
                <div className={styles.pomodoroHeader}>
                    <button className={styles.pomodoroButton}>Pomodoro</button>
                    <button className={styles.pomodoroButton}>Intervalo</button>
                </div>
                <div className={styles.pomodoroTimer}>
                    {hideTimer ? 
                        <Image src={Tomato} width={80} height={80} alt='tomato'/> 
                        : <h1>25:00</h1>}
                </div>
                <button className={styles.hideTimer} onClick={handleHideTimer}>
                    {!hideTimer ? 'Ocultar timer' : 'Mostrar timer'}
                </button>
                <div className={styles.pomodoroController}>
                    <button className={styles.pomodoroButton}>Start</button>
                    <button className={styles.pomodoroButton}>Stop</button>
                    <button className={styles.pomodoroButton}>Reset</button>
                </div>
            </div>
        </div>
    )
}