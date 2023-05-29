import styles from '@/styles/DeleteClass.module.css';
import Close from '../../public/close.png';
import Image from 'next/image';
import Select from 'react-select';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '../../supabase';
import { AlertModal } from './alertModal';

export function DeleteClass({ setOpenDeleteModal, userClasses }) {

    const { user } = useAuth();

    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const closeAlert = () => {
        setIsAlertVisible(false);
    };
    const [alertType, setAlertType] = useState('');
    const [alertText, setAlertText] = useState('');

    const handleCloseModal = () => {
        setOpenDeleteModal(false);
    };

    const [selectedOption, setSelectedOption] = useState(null);


    const mappedOptions = userClasses.map((item) => {
        return {
            value: item.degree_class_id,
            label: item.class_name,
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

    const handleDeleteClass = async () => {
        console.log(selectedOption);
        if(!selectedOption){
            setIsAlertVisible(true);
            setAlertText('Selecione uma matéria!');
            setAlertType('fail');
            return;
        }

        const { error } = await supabase
            .from('user_classes')
            .delete()
            .eq('user_id', user.id)
            .eq('degree_class_id', selectedOption)

        if(error){
            setIsAlertVisible(true);
            setAlertText('Erro ao deletar matéria');
            setAlertType('fail');
        } else {
            setIsAlertVisible(true);
            setAlertText('Matéria deletada com sucesso!');
            setAlertType('success');
        }
    }

    return (
        <section className={styles.modalBackground}>
            <section className={styles.containerDeleteClass}>
                <AlertModal 
                    alertText={alertText} 
                    isVisible={isAlertVisible} 
                    onClose={closeAlert} 
                    alertType={alertType}/>
                <button onClick={handleCloseModal} className={styles.btnClose}><Image src={Close} width={30} height={30} alt='close'/></button>
                <h3>Selecione qual matéria você deseja excluir</h3>
                <span>Cuidado! Ao excluir uma matéria você perderá todos os eventos relacionados, como trabalhos, provas e menção final. Esta ação é irreversível.</span>
                <Select noOptionsMessage={() => 'Nenhuma matéria cadastrada'} placeholder='Selecione uma matéria' styles={customStyles} defaultValue={selectedOption} onChange={(option) => setSelectedOption(option.value)} options={mappedOptions}/>
                <button onClick={handleDeleteClass} className={styles.btnDeleteClassSchedule}>DELETAR</button>
            </section>
        </section>
    )
}