import styles from '@/styles/Reminders.module.css'
import MenuButton from '../menuButton'
import TaskContainer from './TaskContainer'
import FloatingMenu from '../floatingMenu'
import { useState } from 'react'
import TaskManager from './TaskManager'
import { useUserTasks } from '@/hooks/useUserTasks'
import BtnNextPrevious from '../btnNextPrevious'
import FilterIcon from '../../../public/filter.svg'
import Image from 'next/image'


export default function ComponentReminders(){

    const [openTaskManager, setOpenTaskManager] = useState(false);
    const { updatedUserTasks } = useUserTasks();
    const [filter, setFilter] = useState('');

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const [currentPage, setcurrentPage] = useState(0);
    const tasksPerPage = 4;
    const startIndex = currentPage * tasksPerPage;
    
    // const orderedTasks = updatedUserTasks.slice(startIndex, startIndex + tasksPerPage);
    let orderedTasks = [...updatedUserTasks];

    //sort
    if(filter === 'Mais recentes'){
        orderedTasks.sort((a,b) => new Date(b.task_id) - new Date(a.task_id));
    } else if(filter === 'Prioritários'){
        orderedTasks.sort((a,b) => a.condition - b.condition);
    } else if(filter === 'Em andamento'){
        orderedTasks = orderedTasks.filter(task => task.finished_at === null);
    } else if(filter === 'Concluídos'){
        orderedTasks = orderedTasks.filter((task) => task.finished_at !== null);
    }

    //slice
    orderedTasks = orderedTasks.slice(startIndex, startIndex + tasksPerPage);

    //control page
    const handlePrevPage = () => {
        setcurrentPage(old => Math.max(old - 1, 0));
    };
    const handleNextPage = () => {
        setcurrentPage(old => Math.min(old + 1, Math.ceil(updatedUserTasks.length/tasksPerPage) - 1));
    };

    //open menu inside each task container
    const [openTaskMenu, setOpenTaskMenu] = useState(null);

    return (
        <section className={styles.componentContainer}>
            {openTaskManager && <TaskManager setOpenTaskManager={setOpenTaskManager}/>}
            <section className={styles.navContainer}>
                <FloatingMenu
                    options={[
                        { text: 'Criar tarefa' , callback: () => setOpenTaskManager(true) },
                        // { text: 'Ver todas as tarefas' , callback: () => setOpenModal(true) },
                    ]}>
                        <MenuButton/>
                </FloatingMenu>
                <div className={styles.menuBox}>
                    <h3>LEMBRETES</h3>
                    <div className={styles.containerControls}>
                        <div className={styles.searchWrapper}>
                            <select name='filterBox' id='filterBox' onChange={handleFilterChange}>
                                <option>Filtrar...</option>
                                <option>Mais recentes</option>
                                <option>Prioritários</option>
                                <option>Em andamento</option>
                                <option>Concluídos</option>
                            </select>
                            <label htmlFor='filterBox'><Image src={FilterIcon} width={20} height={20} alt='search'/></label>
                        </div>
                        <BtnNextPrevious onClick={handlePrevPage} direction={'left'}/>
                        <BtnNextPrevious onClick={handleNextPage} direction={'right'}/>
                    </div>
                </div>
            </section>
            <section className={styles.mainContainer}>
                {orderedTasks.map((task, index) => (
                    <TaskContainer 
                        openTaskMenu={openTaskMenu}
                        setOpenTaskMenu={setOpenTaskMenu}
                        key={index} 
                        deadline={task.condition}
                        createdAt={task.created_at} 
                        description={task.description} 
                        tag={task.class_name} 
                        dueDate={task.due_date}
                        id={task.task_id}
                        finishedAt={task.finished_at}
                        />
                ))}
            </section>
        </section>
    )
}