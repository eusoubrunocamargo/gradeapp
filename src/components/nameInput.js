// import styles from '@/styles/SignUp.module.css'
import styles from '@/styles/FormInput.module.css'
import { useState } from 'react';


function NameInput({ newCheckForm , setNewCheckForm }){

    // const [name, setName] = useState(newCheckForm.name.value);
    const [errorMessage, setErrorMessage] = useState('');
    const [hasError, setHasError] = useState(false);

    function handleBlur(){
        const name = newCheckForm.name.value.trim();
        if(name.length < 3 && name.length !== 0){
            setErrorMessage('O nome deve ter no mínimo 3 caracteres');
            setHasError(true);
            setNewCheckForm({
                ...newCheckForm,
                name: {
                    value: name,
                    valid: false,
                }
            });
        } else {
            setHasError(false);
            setNewCheckForm({
                ...newCheckForm,
                name: {
                    value: name,
                    valid: true,
                }
            });
        }
    };

    function handleChange(event){
        const newNameValue = event.target.value;
        setNewCheckForm(prev => ({
            ...prev,
            name: {
                value: newNameValue,
                valid: prev.name.valid,
            }
        }))
    };

    return (
        <div className={styles.inputWrapper}>
            <input
                type='text'
                id='name'
                name='name'
                placeholder=' '
                className={`${hasError&&styles.invalidInput}`}
                onBlur={handleBlur}
                onChange={handleChange}
                required
            />
            <label htmlFor="name">Nome</label>
            {hasError && <span className={styles.errorMessage}>{errorMessage}</span>}
        </div>
    )
}

export default NameInput;