import styles from '@/styles/Classes.module.css';
import Image from 'next/image';
import LightMenu from '../../public/lightmenu.png';
import LightSearch from '../../public/searchlight.png'
// import { supabase } from "../../supabase";
import ClassBox from './classbox';
import FloatingMenu from './floatingMenu';
import AddClass from './addClass';

export default function ComponentMyClasses () {

    const handleAddClass = () => {
        console.log('Cadastrar');
    };

    const handleDeleteClass = () => {
        console.log('Deletar');
    };

    return (
        <main className={styles.myClassesContainer}>
            <AddClass/>
            <section className={styles.myClassesHeader}>
                <FloatingMenu
                options={[
                    { text: 'Cadastrar matéria' , callback: handleAddClass },
                    { text: 'Excluir matéria' , callback: handleDeleteClass },
                ]}>
                    <Image src={LightMenu} priority width={30} height={30} alt='menu-icon'/>
                </FloatingMenu>
                <h3>MATÉRIAS</h3>
                <div className={styles.searchWrapper}>
                    <select name='searchbox' id='searchbox'>
                        <option>Selecione...</option>
                        <optgroup label='Em andamento'>

                        </optgroup>
                        <optgroup label='Finalizadas'>

                        </optgroup>
                    </select>
                    <label htmlFor='searchbox'><Image src={LightSearch} width={20} height={20} alt='search'/></label>
                </div>
            </section>
            <section className={styles.classesBox}>
                <span>Você ainda não possui matérias cadastradas</span>
                <ClassBox classname={'ALGORITMOS'}/>




            </section>
        </main>
    )
}
