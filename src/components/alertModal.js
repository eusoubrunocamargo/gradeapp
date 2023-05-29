import styles from '@/styles/AlertModal.module.css';
import Image from 'next/image';
import ErrorIcon from '../../public/error_alert.png'
import SuccessIcon from '../../public/success_alert.png'
import { useEffect } from 'react';

export function AlertModal ({ alertText, isVisible, onClose, alertType }) {

    useEffect(() => {
        if(isVisible){
            const timer = setTimeout(() => {
                onClose();
            }, 5000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [isVisible, onClose]);

    if(!isVisible){
        return null;
    }

    

    return (
        <>
            <section className={styles.containerAlertModal}>
                {alertType === 'fail' ? <Image src={ErrorIcon} width={30} height={30} alt='error'/>:
                <Image src={SuccessIcon} width={30} height={30} alt='success'/>}
                <div className={styles.containerTextLoader}>
                    <span>{alertText}</span>
                    <span className={`${alertType === 'fail' ? styles.loaderFail : styles.loaderSuccess}`}></span>
                </div>
            </section>        
        </>
    )
}
