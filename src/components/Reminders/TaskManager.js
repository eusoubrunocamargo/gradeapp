import styles from '@/styles/TaskManager.module.css'
import Close from '../../../public/close.png'
import Image from 'next/image';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { forwardRef, useState, useEffect } from 'react';
import Select from 'react-select';
import { useUserData } from '@/hooks/useUserData';
import { useUserTasks } from '@/hooks/useUserTasks';
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import pt_BR from 'date-fns/locale/pt-BR';
registerLocale('br', pt_BR);
import { useAlert } from '@/hooks/useAlert';

export const convertDate = (dateString) => {
    const date = new Date(dateString);
    const timeZoneOffset = date.getTimezoneOffset() * 60 * 1000;  // getTimezoneOffset() returns minutes, convert it to milliseconds
    const localISOTime = (new Date(date - timeZoneOffset)).toISOString().slice(0, -1);
    return localISOTime.split('T')[0];
};


export default function TaskManager({ setOpenTaskManager }){

    const { updatedUserClasses: classes, updatedUserData } = useUserData();
    const [userClasses, setUserClasses] = useState([]);
    const { handleAddTask } = useUserTasks();
    const { showAlert } = useAlert();

    useEffect(() => {
        const uniqueClasses = Array.from(new Set(classes.map(item => item.class_name))).map(class_name => {
            return {
              name: class_name,
              id: classes.find(item => item.class_name === class_name).degree_class_id
            };
          });
        setUserClasses(uniqueClasses);
    },[classes]);

    const handleCloseModal = () => {
        setOpenTaskManager(false);
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

    const currentDate = new Date();

    const convertDate = (dateString) => {
        const date = new Date(dateString);
        const timeZoneOffset = date.getTimezoneOffset() * 60 * 1000;  // getTimezoneOffset() returns minutes, convert it to milliseconds
        const localISOTime = (new Date(date - timeZoneOffset)).toISOString().slice(0, -1);
        return localISOTime.split('T')[0];
    };
   
    const [selectedDate, setSelectedDate] = useState(new Date());
    const CustomDateInput = forwardRef(({ value, onClick },ref) => (
        <button className={styles.CustomDateInput} onClick={onClick} ref={ref}>{value}</button>
    ));

    CustomDateInput.displayName = 'CustomDateInput';

    const [taskText, setTaskText] = useState('');

    const handleSubmitTask = () => {
        console.log(selectedDate);
        const formattedDate = `'${convertDate(selectedDate)}'`;
        if(!taskText || !formattedDate || !selectedOption){
            showAlert('Preencha todos os campos', 'fail');
            return;
        }
        handleAddTask(taskText, selectedOption, formattedDate);
    };



    return (
        <section className={styles.modalBackground}>

            <section className={styles.containerTaskManager}>
                <button 
                    onClick={handleCloseModal} 
                    className={styles.btnClose}>
                        <Image src={Close} width={30} height={30} alt='close'/>
                </button>
                <h3>Vamos lá, descreva sua tarefa:</h3>
                <textarea 
                    onChange={(e) => setTaskText(e.target.value)}
                    style={{ height: '8rem', resize: 'none', width: '100%'}} 
                    className={styles.descriptionInput} 
                    maxLength={100}/>
                <Select 
                    noOptionsMessage={() => 'Nenhuma matéria cadastrada'} 
                    placeholder='Selecione uma tag' 
                    styles={customStyles} 
                    defaultValue={selectedOption} 
                    onChange={(option) => setSelectedOption(option.value)} 
                    options={mappedOptions}/>
                <DatePicker 
                    minDate={currentDate}
                    dateFormat='dd/MM/yyyy'
                    locale='br'
                    withPortal
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)} 
                    customInput={<CustomDateInput/>}/>
                <button onClick={handleSubmitTask} className={styles.btnSalvar}>SALVAR</button>
            </section>

        </section>
    )
}