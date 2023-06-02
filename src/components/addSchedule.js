import styles from '@/styles/AddSchedule.module.css';
import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabase';
import Select from 'react-select';
import { useUserData } from '@/hooks/useUserData';


export default function AddClassSchedule () {

    const { handleAddClass, updatedUserData } = useUserData();
    // const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    // const { updatedUserData } = useUserData();
    const degreeId = updatedUserData[0].degree_id;
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
    },[degreeId]);

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

        handleAddClass(checkForm);

    }

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
            <button onClick={handleSubmitForm} className={styles.btnAddClassSchedule}>Cadastrar</button>
        </section>
        </>
    )
}
