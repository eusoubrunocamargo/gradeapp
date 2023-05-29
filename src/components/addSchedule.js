import styles from '@/styles/AddSchedule.module.css';
import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabase';
import { useDegree } from '@/hooks/useDegree';
import Select from 'react-select';
import { useAuth } from '@/hooks/useAuth';
import { AlertModal } from './alertModal';


export default function AddClassSchedule () {

    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const { degreeId } = useDegree();
    console.log(degreeId);
    const [classOptions, setClassOptions] = useState([]);
    const days = ['seg','ter','qua','qui','sex','sab'];

    useEffect(() => {
        const fetchClasses = async () => {
            
            const { data , error } = await supabase
                .from('degree_classes')
                .select('id, degree_id , class_id , classes(class_name)')
                .eq('degree_id', degreeId);

                if(error){
                    return console.log(error);
                };

                const mappedOptions = data.map((item) => {
                    return {
                        value: item.id,
                        label: item.classes.class_name,
                    }
                });

                setClassOptions(mappedOptions);

        }
        fetchClasses();
    },[]);

    const [selectedDays, setSelectedDays] = useState({
        seg: { selected: false, startTime: '' },
        ter: { selected: false, startTime: '' },
        qua: { selected: false, startTime: '' },
        qui: { selected: false, startTime: '' },
        sex: { selected: false, startTime: '' },
        sab: { selected: false, startTime: '' },

    });

    const handleButtonSelectedDay = (day) => {
        setSelectedDays(prev => ({
            ...prev,
            [day]: { selected: !prev[day].selected, startTime: prev[day].startTime },
        }));
        console.log(selectedDays.seg);
    }

    const handleTimeChange = (day, event) => {
        setSelectedDays(prev => ({
            ...prev,
            [day]: { selected: prev[day].selected, startTime: event.target.value },
        }))
    }

    const [selectedOption, setSelectedOption] = useState(null);

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            backgroundColor: state.isHover ? 'red' : '#F8F9FA',
            width: '36rem',
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
        
    };

    const [locale, setLocale] = useState(null);

    const handleLocaleChange = (event) => {
        const newLocale = event.target.value;
        // setCheckForm(prev => ({ ...prev, locale: newLocale}));
        setLocale(newLocale);
    }

    const buildCheckForm = () => {
        const selectedClass = selectedOption ? selectedOption : '';
        const selectedLocale = locale ? locale : '';
        const selectedSchedule = days
            .filter(day => selectedDays[day].selected)
            .map(day => ({ day , time: selectedDays[day].startTime }));
        return {
            class: selectedClass,
            locale: selectedLocale,
            schedule: selectedSchedule,
        };
    }

    const handleSubmitForm = async () => {
        //check if form is completed
        const checkForm = buildCheckForm();
        console.log(checkForm.class, checkForm.locale, checkForm.schedule);
        if(!checkForm.class || !checkForm.locale || checkForm.schedule.length === 0){
            return setError(true);
        }

        setLoading(true);

        const { data, error } = await supabase
            .from('user_classes')
            .insert({
                user_id: user.id,
                degree_class_id: checkForm.class,
            })
            .select();

          if(error){
            setAlertType('fail');
            setIsAlertVisible(true);
            setAlertText('Erro ao cadastrar matéria!');
            return console.log(error);
          }

          const userClassID = data[0].id;

          for(const schedule of checkForm.schedule){

            const { day, time} = schedule;

            const { data: scheduleData, error: scheduleError } = await supabase
                .from('class_schedule')
                .insert({
                    user_class_id: userClassID,
                    day_of_week: day,
                    start_time: `${time}:00`,
                    locale: checkForm.locale
                })
                .select();

                if(scheduleError){
                    setAlertType('fail');
                    setIsAlertVisible(true);
                    setAlertText('Erro ao cadastrar matéria!')
                    return console.log(scheduleError);
                }

                setAlertType('success');
                setIsAlertVisible(true);
                setAlertText('Matéria cadastrada!');
                setLoading(false);

                console.log(scheduleData);
          }
    }

    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const closeAlert = () => {
        setIsAlertVisible(false);
    };
    const [alertType, setAlertType] = useState('success');
    const [alertText, setAlertText] = useState('');

    return (
        <>
        <section className={styles.scheduleContainer}>
            <Select placeholder='Selecione uma matéria' styles={customStyles} defaultValue={selectedOption} onChange={(option) => setSelectedOption(option.value)} options={classOptions}/>
            <input onChange={(event) => handleLocaleChange(event)} className={styles.inputLocale} maxLength={5} type='text' placeholder='Onde? Ex: S11'/>
            <div className={styles.weekDays}>

                {days.map((day,index) => (
                    <React.Fragment key={index}>
                        <button key={index} className={`${selectedDays[day].selected && styles.clickedDay}`} 
                        onClick={() => handleButtonSelectedDay(day)}>{day.toUpperCase()}</button>
                        {selectedDays[day].selected && 
                        <div className={`${styles.containerDayTime} ${styles[day]}`}>
                            <input defaultValue='00:00'
                            onChange={(event) => handleTimeChange(day, event)} type='time'/>
                        </div>}
                    </React.Fragment>
                ))}

            </div>
            {error && <span className={styles.alert}>Todos os campos são obrigatórios!</span>}
            {loading ? <span className={styles.loader}></span> : 
            <button onClick={handleSubmitForm} className={styles.btnAddClassSchedule}>Cadastrar</button>}
            <AlertModal 
                alertText={alertText} 
                isVisible={isAlertVisible} 
                onClose={closeAlert} 
                alertType={alertType}/>

        </section>
        </>
    )
}
