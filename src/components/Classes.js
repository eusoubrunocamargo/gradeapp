import styles from '@/styles/Classes.module.css';
import Image from 'next/image';
import DarkSearch from '../../public/darksearchsquare.png'
import FloatingMenu from './floatingMenu';
import AddClass from './addClass';
import { useEffect, useState } from 'react';
import MenuButton from './menuButton';
import ClassBox from './classbox';
import BtnNextPrevious from './btnNextPrevious';
import { DeleteClass } from './deleteClass';
import { FinishClass } from './finishClass';
import { useUserData } from '@/hooks/useUserData';

export default function ComponentMyClasses () {

    const [openModal, setOpenModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openFinishModal, setOpenFinishModal] = useState(false);
    const [userClasses, setUserClasses] = useState([]);

    const { updatedUserClasses: classes } = useUserData();

    // useEffect(() => {
    //     const uniqueClasses = Array.from(new Set(classes.map(item => item.class_name))).map(class_name => {
    //         return {
    //           name: class_name,
    //           id: classes.find(item => item.class_name === class_name).degree_class_id,
    //         };
    //       });
    //     setUserClasses(uniqueClasses);
    // },[classes]);

    useEffect(() => {
        const uniqueClasses = Array.from(new Set(classes.map(item => item.class_name))).map(class_name => {
            return {
                name: class_name,
                id: classes.find(item => item.class_name === class_name).degree_class_id,
                grade: classes.find(item => item.class_name === class_name).grade,
            };
        });
        setUserClasses(uniqueClasses);
    }, [classes]);
    

    const [correnterentPage, setcorrenterentPage] = useState(0);
    const classesPerPage = 4;
    const startIndex = correnterentPage * classesPerPage;
    const selectedClasses = userClasses.slice(startIndex, startIndex + classesPerPage);
    const handlePrevPage = () => {
        setcorrenterentPage(old => Math.max(old - 1, 0));
    };
    const handleNextPage = () => {
        setcorrenterentPage(old => Math.min(old + 1, Math.ceil(userClasses.length/classesPerPage) - 1));
    };

    return (
        <main className={styles.myClassesContainer}>
            {openFinishModal && <FinishClass userClasses={userClasses} setOpenFinishModal={setOpenFinishModal}/>}
            {openDeleteModal && <DeleteClass userClasses={userClasses} setOpenDeleteModal={setOpenDeleteModal}/>}
            {openModal && <AddClass setOpenModal={setOpenModal}/>}
            <section className={styles.myClassesHeader}>
                
                <FloatingMenu
                options={[
                    { text: 'Cadastrar matéria' , callback: () => setOpenModal(true) },
                    { text: 'Concluir matéria' , callback: () => setOpenFinishModal(true) },
                    { text: 'Excluir matéria' , callback: () => setOpenDeleteModal(true) },
                ]}>
                    <MenuButton/>
                </FloatingMenu>

                <section className={styles.greetingBox}>
                    <h3>MATÉRIAS</h3>
                    <div className={styles.searchWrapper}>
                        <select name='searchbox' id='searchbox'>
                            <option></option>
                            <optgroup label='Em andamento'>

                            </optgroup>
                            <optgroup label='Finalizadas'>

                            </optgroup>
                        </select>
                        <label htmlFor='searchbox'><Image src={DarkSearch} width={20} height={20} alt='search'/></label>
                    </div>
                    <BtnNextPrevious onClick={handlePrevPage} direction={'left'}/>
                    <BtnNextPrevious onClick={handleNextPage} direction={'right'}/>
                </section>
               
                
            </section>
            <section className={styles.classesBox}>
                {!userClasses.length ? 
                <>
                    <span className={styles.noClass}>Você ainda não possui matérias cadastradas, clique no menu acima e adicione suas matérias</span>
                </>
                :
                <>
                {selectedClasses.map((myClass) => {
                   return (
                        <ClassBox key={myClass.id} data={myClass}/>
                   )
                })}
                </>
                }
            </section>
        </main>
    )
}
