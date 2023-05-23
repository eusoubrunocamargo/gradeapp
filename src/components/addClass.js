import styles from '@/styles/AddClass.module.css';
import { useState } from 'react';

export default function AddClass () {

    const [page, setPage] = useState(0);

    const handlePages = () => {
        setPage(prev => prev + 1);
    };



    return (
        <div className={styles.modalBackground}>
            <section className={styles.containerAddClass}>
                {!page && <>
                <h3>Parece que você ainda não adicionou o seu curso ... </h3>
                <label htmlFor='degree_select'>Selecione o seu curso:</label>
                <select id='degree_select'>
                    <option value='Engenharia Automotiva'>Engenharia Automotiva</option>
                    <option value='Engenharia Aeroespacial'>Engenharia Aeroespacial</option>
                    <option value='Engenharia Eletrônica'>Engenharia Eletrônica</option>
                    <option value='Engenharia de Energia'>Engenharia de Energia</option>
                    <option value='Engenharia de Software'>Engenharia de Software</option>
                </select></>}
                <button onClick={handlePages} className={styles.btnNext}>Próximo</button>
            </section>
        </div>
    )
}
