import styles from '@/styles/FormInput.module.css'
import { useState } from 'react';
import { supabase } from '../../supabase';

function EmailInput({ newCheckForm , setNewCheckForm, type }){

    const [errorMessage, setErrorMessage] = useState('');
    const [hasError, setHasError] = useState(false);
    // const [existEmail, setExistEmail] = useState(null);

    async function checkEmailExists(email){
        const { data , error } = await supabase.from('profiles').select().eq('email', email);
        if(error){
            console.log('Erro checando email: ', error.message);
            return false;
        }
        return data.length > 0;
    }

    async function handleBlur(){

        const email = newCheckForm.email.value;
        console.log(email);

        //check if email has valid format according to regex
        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        if(!email){
            setHasError(false);
            setErrorMessage('');
            setNewCheckForm({
                ...newCheckForm,
                email: {
                    value: email,
                    valid: false,
                },
            });
        } else if (!emailRegex.test(email)){
            setErrorMessage('Este e-mail não é válido');
            setHasError(true);
            setNewCheckForm({
                ...newCheckForm,
                email: {
                    value: email,
                    valid: false,
                }
            });
        } else if (type === 'signup') {
            const emailExists = await checkEmailExists(email);
            console.log(emailExists);
            if(emailExists){
                setErrorMessage('Este e-mail já está em uso');
                setHasError(true);
                setNewCheckForm({
                    ...newCheckForm,
                    email: {
                        value: email,
                        valid: false,
                    }});
                }
            } else {
                setHasError(false);
                setNewCheckForm(prev => ({
                    ...prev,
                    email: {
                        value: email,
                        valid: true,
                    }}));
            }
    };
    

    function handleChange(event){
        const newEmailValue = event.target.value;
        setNewCheckForm(prev => ({
            ...prev,
            email: {
                value: newEmailValue,
                valid: prev.email.valid,
            }
        }))
    };

    return (
        <div className={styles.inputWrapper}>
            <input
                type='email'
                id='email'
                name='email'
                placeholder=' '
                className={`${hasError&&styles.invalidInput}`}
                onBlur={handleBlur}
                onChange={handleChange}
                // required
            />
            <label htmlFor='email'>Email</label>
            {hasError && <span className={styles.errorMessage}>{errorMessage}</span>}
        </div>
    )
}

export default EmailInput;