import styles from '@/styles/FrontCard.module.css';
import Select from 'react-select';
import { useState, useEffect } from 'react';
import { useUserData } from '@/hooks/useUserData';
import { useUserFlashcards } from '@/hooks/useUserFlashcards';

export default function FrontCard({ flashcards, updateFlashcards}) {

    const { updatedUserClasses: classes } = useUserData();
    const [userClasses, setUserClasses] = useState([]);
    // const { updateFlashcards } = useUserFlashcards();

    useEffect(() => {
        const uniqueClasses = Array.from(new Set(classes.map(item => item.class_name))).map(class_name => {
            return {
              name: class_name,
              id: classes.find(item => item.class_name === class_name).degree_class_id
            };
          });
        setUserClasses(uniqueClasses);
    },[classes]);

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


    return (
        <section className={styles.frontCardContainer}>
            <Select 
                    noOptionsMessage={() => 'Nenhuma matéria cadastrada'} 
                    placeholder='Selecione uma tag' 
                    styles={customStyles} 
                    defaultValue={selectedOption} 
                    // onChange={(option) => setSelectedOption(option.value)} 
                    onChange={(option) => updateFlashcards('user_class_id', option.value)} 
                    options={mappedOptions}
            />
            <input
                onChange={(e) => updateFlashcards('title', e.target.value)} 
                maxLength={30} 
                className={styles.titleInput} 
                type='text' 
                placeholder='Assunto do flashcard'/>
            <textarea 
                onChange={(e) => updateFlashcards('front_text', e.target.value)}
                maxLength={260} 
                className={styles.descriptionInput} 
                placeholder='Descrição do flashcard'/>
            {/* <button className={styles.btnTurnCard}>Virar</button> */}
        </section>
    )
}