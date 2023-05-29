import styles from '@/styles/MenuButton.module.css';

export default function MenuButton ({ isVisible }) {
    return (
        <>
            <button className={`${isVisible && styles.activeColor} ${styles.menuButton}`}>
                <span className={styles.menuStripe}></span>
                <span className={styles.menuStripe}></span>
                <span className={styles.menuStripe}></span>
            </button>
        </>
           
    )
}