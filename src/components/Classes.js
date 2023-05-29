import styles from '@/styles/Classes.module.css';
import Image from 'next/image';
import DarkSearch from '../../public/darksearchsquare.png'
import FloatingMenu from './floatingMenu';
import AddClass from './addClass';
import { useEffect, useState } from 'react';
import MenuButton from './menuButton';
import { supabase } from '../../supabase';
import { useAuth } from '@/hooks/useAuth';
import ClassBox from './classbox';
import BtnNextPrevious from './btnNextPrevious';
import { DeleteClass } from './deleteClass';

export default function ComponentMyClasses () {

    const [openModal, setOpenModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [userClasses, setUserClasses] = useState([]);

    const { user } = useAuth();

    useEffect(() => {
        const fetchUserClasses = async () => {
            try {
                const { data, error } = await supabase
                    .from('user_classes_view_all')
                    .select('*')
                    .eq('user_id', user.id);

                    if(error){
                        console.log(error);
                    } else {
                        const currentClasses = data;
                        setUserClasses(currentClasses);
                        console.log(data);
                    }
            } catch (error) {
                console.log('Erro ao carregar matérias');
            }
        }

        fetchUserClasses();
    },[user, openModal, openDeleteModal]);

    const handleAddClass = () => {
        setOpenModal(true);
    };

    const handleDeleteClass = () => {
        setOpenDeleteModal(true);
    };

    const [currentPage, setCurrentPage] = useState(0);
    const classesPerPage = 4;
    const startIndex = currentPage * classesPerPage;
    const selectedClasses = userClasses.slice(startIndex, startIndex + classesPerPage);
    const handlePrevPage = () => {
        setCurrentPage(old => Math.max(old - 1, 0));
    };
    const handleNextPage = () => {
        setCurrentPage(old => Math.min(old + 1, Math.ceil(userClasses.length/classesPerPage) - 1));
    };

    return (
        <main className={styles.myClassesContainer}>
            {openDeleteModal && <DeleteClass userClasses={userClasses} setOpenDeleteModal={setOpenDeleteModal}/>}
            {openModal && <AddClass setOpenModal={setOpenModal}/>}
            <section className={styles.myClassesHeader}>
                
                
                <FloatingMenu
                options={[
                    { text: 'Cadastrar matéria' , callback: handleAddClass },
                    { text: 'Excluir matéria' , callback: handleDeleteClass },
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
                {!userClasses.length ? <>
                    <span className={styles.noClass}>Você ainda não possui matérias cadastradas, clique no menu acima e adicione suas matérias</span>
                </>
                :
                <>
                {selectedClasses.map((myClass) => {
                   return (
                        <ClassBox key={myClass.degree_class_id} classname={myClass.class_name}/>
                   )
                })}
                </>
                }
            </section>
        </main>
    )
}
