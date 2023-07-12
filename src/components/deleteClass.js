import styles from '@/styles/DeleteClass.module.css';
import Close from '../../public/close.png';
import Image from 'next/image';
import Select from 'react-select';
import { useState } from 'react';
import { useUserData } from '@/hooks/useUserData';

export function DeleteClass({ setOpenDeleteModal, userClasses }) {

    const { handleDeleteClass } = useUserData();

    const handleCloseModal = () => {
        setOpenDeleteModal(false);
    };

    const [selectedOption, setSelectedOption] = useState(null);


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
            // color: '#7D00E4',
            color: 'var(--main-color)',
            textAlign: 'center',
        }),
        placeholder: (provided) => ({
            ...provided,
            // color: '#7D00E4',
            color: 'var(--main-color)',
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

    const onDeleteClass = () => {
        handleDeleteClass(selectedOption);
    }

    return (
        <section className={styles.modalBackground}>
            <section className={styles.containerDeleteClass}>
                <button onClick={handleCloseModal} className={styles.btnClose}><Image src={Close} width={30} height={30} alt='close'/></button>
                <h3>Selecione qual matéria você deseja excluir</h3>
                <span>Cuidado! Ao excluir uma matéria você perderá todos os eventos relacionados, como trabalhos, provas e menção final. Esta ação é irreversível.</span>
                <Select noOptionsMessage={() => 'Nenhuma matéria cadastrada'} placeholder='Selecione uma matéria' styles={customStyles} defaultValue={selectedOption} onChange={(option) => setSelectedOption(option.value)} options={mappedOptions}/>
                <button onClick={onDeleteClass} className={styles.btnDeleteClassSchedule}>DELETAR</button>
            </section>
        </section>
    )
}