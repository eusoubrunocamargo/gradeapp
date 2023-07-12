import styles from '@/styles/MyWeek.module.css'
import MenuButton from './menuButton';
import EventContainer from './eventContainer';
import { useUserData } from '@/hooks/useUserData';

export default function ComponentMyWeek({ isDarkMode }){

    const { updatedUserClasses: classes} = useUserData();

    const DaysName = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
    const today = new Date();
    today.setHours(0,0,0,0);

    //current day (sunday = 0, ...)
    const currentDayOfWeek = today.getDay();

    //get last sunday
    const lastSunday = new Date(today);
    lastSunday.setDate(today.getDate() - currentDayOfWeek);
    lastSunday.setHours(0,0,0,0);

    //array of days of current week
    const days = Array.from({ length: 7 }, (_,i) => {
        const date = new Date(lastSunday);
        date.setDate(lastSunday.getDate() + i);
        return {
            dayOfMonth: date.getDate(),
            dayOfWeek: DaysName[date.getDay()],
            isToday: date.getTime() === today.getTime(),
        };
    });

    const currentDayName = DaysName[currentDayOfWeek].toLowerCase();
    const todayEvents = classes.filter(event => event.day_of_week === currentDayName && event.grade === null);
    // console.log(classes);
    

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
                <section className={styles.eventsContainer}>
                    {todayEvents.length === 0 && <span className={styles.noEvent}>Nenhum evento hoje!</span>}
                    {todayEvents.map((e) => (
                        <EventContainer key={e.degree_class_id} time={e.start_time.slice(0,5)} myclass={e.class_name} local={e.locale}/>
                    ))}
                </section>
            </section>
        </section>
        
    )
}