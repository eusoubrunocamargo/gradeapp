import styles from '@/styles/ClassContent.module.css';
import { useState, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import Close from '../../../public/close.png';
import Image from 'next/image';
import MenuButton from '../menuButton';
import FloatingMenu from '../floatingMenu';
import SmallClose from '../../../public/small_close.png';
import SmallNext from '../../../public/small_next.png';
import SmallPrev from '../../../public/small_prev.png';
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import pt_BR from 'date-fns/locale/pt-BR';
registerLocale('br', pt_BR);
import { convertDate } from '../Reminders/TaskManager';
import { formatDate } from '../Reminders/TaskContainer';
import { supabase } from '../../../supabase';

export default function ClassContent({ setOpenModal,data }){

    const [addModal, setAddModal] = useState(false);
    const [page, setPage] = useState(0);

    //handle close modal
    const handleCloseModal = () => {
        setAddModal(false);
        setType('');
        setPage(0);
        setSelectedDate(new Date());
    };
    
    //date picker
    const CustomDateInput = forwardRef(({ value, onClick },ref) => (
        <button className={styles.CustomDateInput} onClick={onClick} ref={ref}>{value}</button>
    ));
    CustomDateInput.displayName = 'CustomDateInput';
    const currentDate = new Date();

    //type of occurrence
    const [type, setType] = useState('');
    const handleType = (e) => {
        setType(e.target.value);
    };

    //date
    const [selectedDate, setSelectedDate] = useState(new Date());

    //description
    const [description, setDescription] = useState('');
    const handleDescription = (e) => {  
        setDescription(e.target.value);
    };

    //handle add occurrence
    // const handleAddOccurrence = () => {
    //     const date = convertDate(selectedDate);
        


        

    return (
        <section className={styles.darkBackground}>
            <section className={styles.classContentContainer}>
                {!addModal && <button onClick={() => setOpenModal(false)} className={styles.btnClose}><Image src={Close} width={30} height={30} alt='close'/></button>}
                <section className={styles.classContentGrid}>
                    <div className={styles.classContentHeader}>
                        {addModal ? 
                        <section className={styles.addModal}>

                            {/* page 0 - type of occurrence */}
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

                            {/* //page 1 - date */}
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

                            {/* //page 2 - description */}
                            {page === 2 && <>
                            <Image src={SmallClose} width={20} height={20} alt='close' onClick={handleCloseModal}/>
                            <textarea minLength={1} maxLength={200} className={styles.containerTextArea} onChange={(e) => handleDescription(e)}/>
                                <div className={styles.containerBtnPrevNext}>
                                    <Image src={SmallPrev} width={20} height={20} alt='next' onClick={() => setPage(1)}/>
                                    <Image src={SmallNext} width={20} height={20} alt='next' onClick={() => setPage(3)}/>
                                </div>
                            </>}

                            {/* //page 3 - resume */}
                            {page === 3 && <>
                            <Image src={SmallClose} width={20} height={20} alt='close' onClick={handleCloseModal}/>
                            <div className={styles.containerBtn}>
                                <h3>Resumo</h3>
                                <button className={styles.btnSaveOccurence}>Salvar</button>
                            </div>
                            <div className={styles.resumeContainer}>
                                <span>Tipo: {type}</span>
                                <span>Data: { formatDate(convertDate(selectedDate))}</span>
                                <span>Descrição: "{description}"</span>
                            </div>
                            </>}
                            
                        </section>
                        :
                        <>
                        <FloatingMenu options={[
                            { text: 'Cadastrar' , callback: () => setAddModal(true)},
                        ]}>
                            <MenuButton/>
                        </FloatingMenu>
                        <h3>{data.name}</h3>
                        </>}
                    </div>
                    <button className={styles.btnOptions}>Provas</button>
                    <button className={styles.btnOptions}>Trabalhos</button>
                    <button className={styles.btnOptions} >Eventos</button>
                    <button className={styles.btnOptions}>Contatos</button>
                    <div className={styles.contentContainer}>
                        
                    </div>

                </section>

            </section>
        </section>
    )
}