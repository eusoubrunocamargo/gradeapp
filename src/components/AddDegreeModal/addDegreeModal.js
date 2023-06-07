import styles from '@/styles/AddDegreeModal.module.css';
import { useState } from 'react';
import { useUserData } from '@/hooks/useUserData';
import { useAlert } from '@/hooks/useAlert';

export default function AddDegreeModal ({ setOpenModal }) {

    const { handleUpdateUserDegree } = useUserData();
    const { showAlert } = useAlert();
    const [selectedDegree, setSelectedDegree] = useState('');

    const onSubmit = () => {
        if(selectedDegree === ''){
            showAlert('Selecione um curso', 'fail');
            return;
        }
        handleUpdateUserDegree(selectedDegree);
        setOpenModal(false);
    };
            
    return  (   
        <>
            <section className={styles.background}>
                <div className={styles.modalContainer}>
                    <h3>Olá! Para começar a utilizar nosso app, adicione o seu curso:</h3>
                    <select id='degree_select' value={selectedDegree} onChange={(e) => setSelectedDegree(e.target.value)}>
                        <option value = ''>Selecione o seu curso</option>
                        <option value='1'>Engenharia Automotiva</option>
                        <option value='2'>Engenharia Aeroespacial</option>
                        <option value='3'>Engenharia Eletrônica</option>
                        <option value='4'>Engenharia de Energia</option>
                        <option value='5'>Engenharia de Software</option>
                    </select>
                    <button onClick={onSubmit}>Salvar!</button>
                </div>
            </section>
        </>
    )};