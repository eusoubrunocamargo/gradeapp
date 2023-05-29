import styles from '@/styles/Classbox.module.css';

export default function ClassBox ({ classname }) {



    return (

        <section className={styles.boxContainer}>
            <p>{classname}</p>
        </section>

    )
}