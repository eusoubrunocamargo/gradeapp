import styles from '@/styles/StudyCard.module.css'

export default function StudyFrontCard({ cardClass, cardTitle, cardFrontText }) {


    return (
        <div className={styles.studyFrontCard}>
            <div className={styles.cardClass}>
                <h3>{cardClass}</h3>
            </div>
            <div className={styles.cardTitle}>
                <h3>{cardTitle}</h3>
            </div>
            <div className={styles.cardFrontText}>
                <p>{cardFrontText}</p>
            </div>
        </div>
    )
}
