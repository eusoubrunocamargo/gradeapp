import styles from '@/styles/Focus.module.css'
import { useState, useEffect } from 'react';
import { useAlert } from '@/hooks/useAlert';
import { useUserStudyTime } from '@/hooks/useUserStudyTime';

export default function Timer({ selectedOption }) {

    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [openSaveSession, setOpenSaveSession] = useState(false);
    const { showAlert } = useAlert();
    const { saveSession } = useUserStudyTime();
    // console.log(selectedOption);

    const handleStart = () => {
        if(selectedOption === null) {
            showAlert('Selecione uma matéria para iniciar o cronômetro', 'fail');
            return;
        }
        setIsActive(true);
    }

    const handlePause = () => {
        setIsActive(false);
    }

    const handleReset = () => {
        if(seconds === 0) return;
        setIsActive(false);
        setOpenSaveSession(true);
    }

    const handleSaveSession = () => {
        saveSession(seconds, selectedOption);
        setSeconds(0);
        setOpenSaveSession(false);
    }

    const handleDontSaveSession = () => {
        setSeconds(0);
        setOpenSaveSession(false);
    }

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);

    }, [isActive, seconds]);

    return (

        <div className={styles.timer}>
            {openSaveSession && 
            <div className={styles.saveSession}>
                <span>Deseja salvar a sessão?</span>
                <div>
                    <button onClick={handleSaveSession}>Sim</button>
                    <button onClick={handleDontSaveSession}>Não</button>
                </div>
            </div>}
            <div className={styles.formatNumbers}>
                <div>{('0' + Math.floor((seconds / 3600))).slice(-2)}</div>
                <div>:</div>
                <div>{('0' + Math.floor((seconds / 60) % 60)).slice(-2)}</div>
                <div>:</div>
                <div>{('0' + (seconds % 60)).slice(-2)}</div>
            </div>
            <div className={styles.timerButtons}>
                <button onClick={handleStart} className={styles.BtnIniciar}>Iniciar</button>
                <button onClick={handlePause} className={styles.BtnPausar}>Pausar</button>
                <button onClick={handleReset} className={styles.BtnEncerrar}>Encerrar</button>
            </div>
        </div>
    )
}