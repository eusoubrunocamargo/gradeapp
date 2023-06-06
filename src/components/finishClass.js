import styles from '@/styles/DeleteClass.module.css';
import Close from '../../public/close.png';
import Image from 'next/image';
import Select from 'react-select';
import { useState } from 'react';
import { useUserData } from '@/hooks/useUserData';

export function FinishClass({ setOpenFinishModal, userClasses }) {

    const { handleFinishClass } = useUserData();

    const handleCloseModal = () => {
        setOpenFinishModal(false);
    };

    const [selectedOption, setSelectedOption] = useState(null);
    const [grade, setGrade] = useState('');

    const handleGrade = (e) => {
        setGrade(e.target.value);
    }

    const mappedOptions = userClasses.map((item) => {
        return {
            value: item.id,
            label: item.name,
        }
    });

    const customStyles = {
        control: (provided) => ({
            ...provided,
            borderRadius: '1rem',
            boxShadow: '2px 2px 0px #1e1e1e',
            cursor: 'pointer',
            border: '1px solid #1e1e1e',
        }),
        singleValue: (provided) => ({
            ...provided,
            color: '#7D00E4',
            textAlign: 'center',
        }),
        placeholder: (provided) => ({
            ...provided,
            color: '#7D00E4',
            opacity: 0.5,
            textAlign: 'center',
        }),
        valueContainer: (provided) => ({
            ...provided,
            color: 'white',
        }),
        container: (provided) => ({
            ...provided,
            width: '100%',
        }),
        
    };

    const onFinishClass = () => {
        handleFinishClass(selectedOption, grade);
        handleCloseModal();
    }

    return (
        <section className={styles.modalBackground}>
            <section className={styles.containerDeleteClass}>
                <button onClick={handleCloseModal} className={styles.btnClose}><Image src={Close} width={30} height={30} alt='close'/></button>
                <h3>Selecione qual matéria você deseja concluir</h3>
                <span>Caso tenha reprovado, exclua a matéria!</span>
                <Select noOptionsMessage={() => 'Nenhuma matéria cadastrada'} placeholder='Selecione uma matéria' styles={customStyles} defaultValue={selectedOption} onChange={(option) => setSelectedOption(option.value)} options={mappedOptions}/>
                <select onChange={(e) => handleGrade(e)} className={styles.select}>  
                    <option>Qual sua menção final?</option>
                    <option value="SS">SS</option>
                    <option value="MS">MS</option>
                    <option value="MM">MM</option>
                </select>
                <button onClick={onFinishClass} className={styles.btnDeleteClassSchedule}>CONCLUIR</button>
            </section>
        </section>
    )
}