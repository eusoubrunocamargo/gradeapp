import styles from '@/styles/Focus.module.css'
import { Player } from '@lottiefiles/react-lottie-player'
import Alien from '../../components/Animations/alienreading.json'
import Image from 'next/image'
import Close from '../../../public/error_alert.png'
import { useUserData } from '@/hooks/useUserData'
import Select from 'react-select';
import { useState, useEffect } from 'react';
import Timer from '../Timer/Timer'

export default function Focus({ openFocus, setOpenFocus}) {

    const { updatedUserClasses: classes } = useUserData();
    const [userClasses, setUserClasses] = useState([]);

    useEffect(() => {
        let uniqueClasses = Array.from(new Set(classes.map(item => item.class_name))).map(class_name => {
            return {
                name: class_name,
                id: classes.find(item => item.class_name === class_name).degree_class_id,
            };
        });

        setUserClasses(uniqueClasses);
    }, [classes]);

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
            color: '#b50909',
            textAlign: 'center',
        }),
        placeholder: (provided) => ({
            ...provided,
            color: '#b50909',
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

    return (
        <div className={styles.fullContainer}>
            <Player autoplay loop src={Alien} style={{ height: '10rem', width: '10rem' }}></Player>
            <button className={styles.btnClose} onClick={() => setOpenFocus(!openFocus)}>
                <Image src={Close} width={30} height={30} alt='close'/>
            </button>
            <section className={styles.focusContainer}>
                <Select noOptionsMessage={() => 'Nenhuma matéria cadastrada'} placeholder='O que você vai estudar?' styles={customStyles} defaultValue={selectedOption} onChange={(option) => setSelectedOption(option.value)} options={mappedOptions}/>
                <Timer selectedOption={selectedOption}/>
            </section>
        </div>
    )
}