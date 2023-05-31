import styles from '@/styles/EventContainer.module.css';

export default function EventContainer ({ time, myclass, local}){


    return (
        <div className={styles.eventContainer}>
            <span>{time}</span>
            <span>{myclass}</span>
            <span>{local}</span>
        </div>
    )
}