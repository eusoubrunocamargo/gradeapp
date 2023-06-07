import styles from '@/styles/TaskContainer.module.css'
import Image from 'next/image'
import DottedMenu from '../../../public/dottedmenu.png'
import Calendar from '../../../public/calendar_icon.svg'
import { useState } from 'react';
import Trash from '../../../public/trashcan.svg'
import Done from '../../../public/done.svg'
import { useUserTasks } from '@/hooks/useUserTasks';
import { convertDate } from './TaskManager';
import FinishedIcon from '../../../public/success_alert.png';

// import FloatingMenu from '../floatingMenu'

export function formatDate(dueDate) {
    const parts = dueDate.split('-').map(part => Number(part));
    const date = new Date(parts[0], parts[1] - 1, parts[2]);  // JavaScript month is 0-based

    const day = String(date.getDate()).padStart(2, '0'); // add leading zeros if necessary
    const month = String(date.getMonth() + 1).padStart(2, '0'); // add leading zeros if necessary
    return `${day}/${month}`;
};

export default function TaskContainer( {
    description, 
    tag, 
    dueDate, 
    createdAt, 
    deadline, 
    id,
    openTaskMenu,
    setOpenTaskMenu,
    finishedAt,
}){

    const { handleDeleteTask, handleFinishTask } = useUserTasks();

    const formattedDate = formatDate(dueDate);

    //control menu each task
    const handleShowMenu = () => {
        if(openTaskMenu === id){
            setOpenTaskMenu(null);
        } else {
            setOpenTaskMenu(id);
        }
    };

    //delete task
    const deleteTask = (id) => {
        handleDeleteTask(id);
        setOpenTaskMenu(null);
    }

    //mark task as finished
    const finishTask = (id) => {
        const date = new Date();
        const formattedDate = convertDate(date);
        console.log(formattedDate);
        handleFinishTask(id, formattedDate);
        setOpenTaskMenu(null);
    }
    
    return (
        <section className={styles.taskMainContainer}>
            {finishedAt !== null ? <menu className={styles.taskMenu}><Image src={FinishedIcon} width={20} alt='done'/></menu> :
            <menu onClick={handleShowMenu} className={`${deadline <= 3 ? styles.redAlert : deadline > 3 && deadline <= 5 ? styles.yellowAlert : ''} ${styles.taskMenu}`}>
                <Image src={DottedMenu} loading='lazy' width={30} height={30} alt='menu'/>
            </menu>}
            <section className={styles.taskContentContainer}>
                {openTaskMenu === id ?
                <div className={styles.taskMenuOpen}>
                    <button onClick={() => finishTask(id)}><Image src={Done} width={20} alt='done'/>Marcar como concluído</button>
                    <button onClick={() => deleteTask(id)}><Image src={Trash} width={20} alt='trash'/> Excluir</button>
                </div> : 
                <>
                <span>{description}</span>
                <div className={styles.containerDueDate}>
                    <Image className={styles.calendarGrid} src={Calendar} loading='lazy' width={15} height={15} alt='calendar'/>
                    <div>{formattedDate}</div>
                </div>
                <div className={styles.containerTag}>
                    <span>#{tag}</span>
                </div>
                </>}
            </section>
        </section>
    )
}