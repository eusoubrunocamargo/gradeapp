import styles from '@/styles/AddOccurrenceModal.module.css';
import SmallClose from '../../../public/small_close.png';
import SmallNext from '../../../public/small_next.png';
import SmallPrev from '../../../public/small_prev.png';
import { useState, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import pt_BR from 'date-fns/locale/pt-BR';
registerLocale('br', pt_BR);
import Image from 'next/image';
import { formatDate } from '../Reminders/TaskContainer';
import { convertDate } from '../Reminders/TaskManager';
import { useUserOccurrences } from '@/hooks/useUserOccurrences';

export default function AddOccurrenceModal({ setAddModal, classId }){

    const { handleAddOccurrence } = useUserOccurrences();


    //close modal
    const handleCloseModal = () => {
        setAddModal(false);
        setType('');
        setPage(0);
        setSelectedDate(new Date());
    };

    //control pages
    const [page, setPage] = useState(0);
    
    //date picker config
    const CustomDateInput = forwardRef(({ value, onClick },ref) => (
        <button className={styles.CustomDateInput} onClick={onClick} ref={ref}>{value}</button>
    ));
    CustomDateInput.displayName = 'CustomDateInput';
    const currentDate = new Date();

    //set type of occurrence
    const [type, setType] = useState('');
    const handleType = (e) => {
        setType(e.target.value);
    };

    //set date
    const [selectedDate, setSelectedDate] = useState(new Date());

    //set description
    const [description, setDescription] = useState('');
    const handleDescription = (e) => {  
        setDescription(e.target.value);
    };

    //submit occurrence
    const handleSubmit = () => {
        handleAddOccurrence(classId, type, selectedDate, description);
        handleCloseModal();
    }


    return (

    <>    
        <section className={styles.addModal}>

            {page === 0 && <>
                <Image src={SmallClose} width={20} height={20} alt='close' onClick={handleCloseModal}/>
                <select className={styles.selectInput} onChange={(e) => handleType(e)}>
                    <option>Selecione uma opção</option>
                    <option value="Prova">Prova</option>
                    <option value="Trabalho">Trabalho</option>
                    <option value="Evento">Evento</option>
                </select>
                <div>
                    <Image src={SmallNext} width={20} height={20} alt='next' onClick={() => setPage(1)}/>
                </div>
                </>}

            {page === 1 && <>
            <Image src={SmallClose} width={20} height={20} alt='close' onClick={handleCloseModal}/>
            <DatePicker 
                minDate={currentDate}
                dateFormat='dd/MM/yyyy'
                locale='br'
                withPortal
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)} 
                customInput={<CustomDateInput/>}/>
                <div className={styles.containerBtnPrevNext}>
                    <Image src={SmallPrev} width={20} height={20} alt='next' onClick={() => setPage(0)}/>
                    <Image src={SmallNext} width={20} height={20} alt='next' onClick={() => setPage(2)}/>
                </div>
            </>}

            {page === 2 && <>
            <Image src={SmallClose} width={20} height={20} alt='close' onClick={handleCloseModal}/>
            <textarea minLength={1} maxLength={100} className={styles.containerTextArea} onChange={(e) => handleDescription(e)}/>
                <div className={styles.containerBtnPrevNext}>
                    <Image src={SmallPrev} width={20} height={20} alt='next' onClick={() => setPage(1)}/>
                    <Image src={SmallNext} width={20} height={20} alt='next' onClick={() => setPage(3)}/>
                </div>
            </>}

            {page === 3 && <>
            <Image src={SmallClose} width={20} height={20} alt='close' onClick={handleCloseModal}/>
            <div className={styles.containerBtn}>
                <h3>Resumo</h3>
                <button onClick={handleSubmit} className={styles.btnSaveOccurence}>Salvar</button>
            </div>
            <div className={styles.resumeContainer}>
                <span>Tipo: {type}</span>
                <span>Data: { formatDate(convertDate(selectedDate))}</span>
                <span>Descrição: {description}</span>
            </div>
            </>}

        </section>  
    </>
    )
}