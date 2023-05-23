import styles from '@/styles/Classbox.module.css';

export default function ClassBox ({classname}) {



    return (

        <section className={styles.boxContainer}>
            <h2>{classname}</h2>
        </section>

    )
}