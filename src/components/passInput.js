import styles from '@/styles/FormInput.module.css'
import Image from 'next/image'
import { useState } from 'react';
import hidepassDark from '../../public/revealdark.png'
import showpassDark from '../../public/hidedark.png'

function PassInput({ newCheckForm , setNewCheckForm }){

    const [passVisible, setPassVisible] = useState(false);
    function togglePassVisibility(){
        setPassVisible(!passVisible);
    };
    const [showPassModal, setShowPassModal] = useState(false);


    const [errorMessage, setErrorMessage] = useState('');
    const [hasError, setHasError] = useState(false);

    const passRequirements = [
            {id: 'uppercase', regex: /[A-Z]/, valid: false},
            {id: 'lowercase', regex: /[a-z]/, valid: false},
            {id: 'number', regex: /[0-9]/, valid: false},
            {id: 'specialChar', regex: /[!@#$%^&*]/, valid: false},
            {id: 'minLengthPass', test: (value) => value.length >=6, valid: false},
    ];

    function handleFocus(event){
        event.target.value = '';
        setHasError(false);
        setShowPassModal(true);
    }
   
    function handleChange(event){

        const newPassValue = event.target.value;

        console.log(newPassValue);
        
        passRequirements.forEach((requirement) => {
            const element = document.getElementById(requirement.id);
            const isValid = requirement.regex
            ? requirement.regex.test(newPassValue)
            : requirement.test(newPassValue);
            requirement.valid = isValid;
            if(element)element.classList.toggle(`${styles.greenPass}`, isValid);
        });

        // console.log(passRequirements);

        const allReqMet = passRequirements.every((req) => req.valid);

        setHasError(!allReqMet);
        setErrorMessage(allReqMet?'':'Esta senha não é válida');
      
        setNewCheckForm(prev => ({
            ...prev,
            password: {
                value: newPassValue,
                valid: allReqMet,
            }
        }))
    };

    function handleBlur(){
        setShowPassModal(false);
    };

    return (
        <div className={styles.inputWrapper}>
            <input
                type={passVisible?'text':'password'}
                id='password'
                name='password'
                placeholder=' '
                className={`${hasError&&styles.invalidInput}`}
                // onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                // required
            />
            <label htmlFor='password'>Senha</label>
            {hasError && <span style={{margin:'1rem 5rem'}} className={styles.errorMessage}>{errorMessage}</span>}
            {showPassModal &&
                    <aside className={styles.passModal}>
                        <span>Sua senha deve conter:</span>
                        <span id='uppercase'>Maiúscula</span>
                        <span id='lowercase'>Minúscula</span>
                        <span id='number'>Número</span>
                        <span id='specialChar'>Caracter[!@#$%^&*]</span>
                        <span id='minLengthPass'>Mínimo 6 caracteres</span>
                    </aside>}
            <Image 
                onClick={togglePassVisibility} 
                src={passVisible?hidepassDark:showpassDark} 
                width={20} 
                height={20} 
                priority 
                alt='hidepass' 
                style={{
                        position:'absolute',
                        top:0,
                        right:0,
                        margin:'2rem',
                        cursor:'pointer',
                    }}/>
        </div>
    )
}

export default PassInput;