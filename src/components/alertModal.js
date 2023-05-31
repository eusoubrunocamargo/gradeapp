import styles from '@/styles/AlertModal.module.css';
import Image from 'next/image';
import ErrorIcon from '../../public/error_alert.png'
import SuccessIcon from '../../public/success_alert.png'
import { useEffect } from 'react';
import { useAlert } from '@/hooks/useAlert';

export function AlertModal () {

    const { alert, setAlert } = useAlert();

    useEffect(() => {
        if(alert.isVisible){
            const timer = setTimeout(() => {
                // onClose();
                setAlert(prev => !prev.isVisible)
            }, 5000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [alert.isVisible, setAlert]);

    if(!alert.isVisible){
        return null;
    }

    

    return (
        <>
            <section className={styles.containerAlertModal}>
                {alert.type === 'fail' ? <Image src={ErrorIcon} width={30} height={30} alt='error'/>:
                <Image src={SuccessIcon} width={30} height={30} alt='success'/>}
                <div className={styles.containerTextLoader}>
                    <span>{alert.text}</span>
                    <span className={`${alert.type === 'fail' ? styles.loaderFail : styles.loaderSuccess}`}></span>
                </div>
            </section>        
        </>
    )
}
