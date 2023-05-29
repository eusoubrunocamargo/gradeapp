import styles from '@/styles/MyWeek.module.css'
import MenuButton from './menuButton';

export default function ComponentMyWeek({ isDarkMode }){

    const DaysName = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
    const today = new Date();
    today.setHours(0,0,0,0);

    const days = Array.from({ length: 7 }, (_,i) => {
        const date = new Date();
        date.setDate(date.getDate() + i);
        date.setHours(0, 0, 0, 0);
        return {
            dayOfMonth: date.getDate(),
            dayOfWeek: DaysName[date.getDay()],
            isToday: date.getTime() === today.getTime(),
        };
    });

    // console.log(days);



    return (
        <section className={styles.componentContainer}>
            <section className={styles.weekDayContainer}>
                {days.map(( day, i) => (
                    <div key={i} className={`${isDarkMode ? styles.darkMode : styles.lightMode} ${styles.eachDay} ${day.isToday ? styles.today : ''}`}>
                        <h2>{day.dayOfMonth}</h2>
                        <span>{day.dayOfWeek}</span>
                    </div>
                ))}
            </section>
            <div className={styles.menuNav}>
                <MenuButton/>
            </div>
            <section className={styles.mainContainer}>
                <span>Calendário</span>
            </section>
        </section>
        
    )
}