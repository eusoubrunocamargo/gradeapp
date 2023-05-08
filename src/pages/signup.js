import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/SignUp.module.css'
import { useRouter } from 'next/router'
import studentImage from '../../public/figure_student.png'
import emailSentImage from '../../public/paper-plane.png'
import hidepassDark from '../../public/revealdark.png'
import showpassDark from '../../public/hidedark.png'
import { useState } from 'react'
// import { supabase } from '../../supabase'

export default function SignUp() {

    const router = useRouter();

    const [passVisible, setPassVisible] = useState(false);

    const [checkForm, setCheckForm] = useState({
        name: false,
        email: false,
        password: false,
    })

    function togglePassVisibility(){
        setPassVisible(!passVisible);
    };

    const [showPassModal, setShowPassModal] = useState(false);

    function validateInput(e){

        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        const errorMessage = document.getElementById(`${e.target.name}-error`);
        

        if(e.target.name === 'name'){

            if(e.type === 'focus'){
                const emptyNameMessage = document.getElementById('no-name');
                emptyNameMessage.style.display = 'none';
            }
            if(e.target.value.length < 3 && e.target.value.length !== 0){
                e.target.classList.add(`${styles.invalidInput}`);
                e.target.classList.remove(`${styles.validInput}`);
                errorMessage.style.display = 'block';
                setCheckForm((prev) => ({...prev, name: false}));
            }else if(e.target.value.length >= 3){
                e.target.classList.remove(`${styles.invalidInput}`);
                e.target.classList.add(`${styles.validInput}`);
                errorMessage.style.display = 'none';
                setCheckForm((prev) => ({...prev, name: true}));
                console.log(JSON.stringify(checkForm));
            }else{
                e.target.classList.remove(`${styles.validInput}`);
                e.target.classList.remove(`${styles.invalidInput}`);
                errorMessage.style.display = 'none';
                setCheckForm((prev) => ({...prev, name: false}));
            }
        }

        if(e.target.name === 'email'){
            if(e.type === 'focus'){
                const emptyEmailMessage = document.getElementById('no-email');
                emptyEmailMessage.style.display = 'none';
            }
            if(!emailRegex.test(e.target.value) && e.target.value.length !== 0){
                e.target.classList.add(`${styles.invalidInput}`);
                e.target.classList.remove(`${styles.validInput}`);
                errorMessage.style.display = 'block';
                setCheckForm((prev) => ({...prev, email: false}));
            }else if(emailRegex.test(e.target.value) && e.target.value.length !== 0){
                e.target.classList.remove(`${styles.invalidInput}`);
                e.target.classList.add(`${styles.validInput}`);
                errorMessage.style.display = 'none';
                setCheckForm((prev) => ({...prev, email: true}));
            }else{
                e.target.classList.remove(`${styles.validInput}`);
                e.target.classList.remove(`${styles.invalidInput}`);
                errorMessage.style.display = 'none';
                setCheckForm((prev) => ({...prev, email: false}));
            }
        }

        if(e.target.name === 'password'){

            const password = e.target.value;

            if(e.type === 'focus'){
                const emptyPassMessage = document.getElementById('no-password');
                emptyPassMessage.style.display = 'none';
                e.target.value = '';
                if(e.target.classList.contains(`${styles.invalidInput}`) ||
                e.target.classList.contains(`${styles.validInput}`))
                {
                e.target.classList.remove(`${styles.invalidInput}`);
                e.target.classList.remove(`${styles.validInput}`);
                }
                errorMessage.style.display = 'none';
                setCheckForm((prev) => ({...prev, password: false}));
            };

            const passRequirements = [
                {id: 'uppercase', regex: /[A-Z]/},
                {id: 'lowercase', regex: /[a-z]/},
                {id: 'number', regex: /[0-9]/},
                {id: 'specialChar', regex: /[!@#$%^&*]/},
                {id: 'minLengthPass', test: (value) => value.length >=6},
            ];

            let numberOfTests = 5;

            if(e.target.value.length){
            passRequirements.forEach((requirement) => {
                const element = document.getElementById(requirement.id);
                const isValid = requirement.regex
                ? requirement.regex.test(password)
                : requirement.test(password);
                element.classList.toggle(`${styles.greenPass}`, isValid);
                if(isValid){numberOfTests-=1};
            })}

            if(e.type === 'blur'){
                if(numberOfTests && e.target.value.length !== 0){
                    e.target.classList.add(`${styles.invalidInput}`);
                    errorMessage.style.display = 'block';
                }else if(!numberOfTests && e.target.value.length !== 0){
                    e.target.classList.add(`${styles.validInput}`);
                    setCheckForm((prev) => ({...prev, password: true}));
                }else{
                    e.target.classList.remove(`${styles.validInput}`);
                    e.target.classList.remove(`${styles.invalidInput}`);
                }
            };
        }   
    };

    async function handleSubmit(e){
        e.preventDefault();
        console.log(JSON.stringify(checkForm));
        const nameInput = document.getElementById('name');
        const emptyNameMessage = document.getElementById('no-name');
        const emailInput = document.getElementById('email');
        const emptyEmailMessage = document.getElementById('no-email');
        const passInput = document.getElementById('password');
        const emptyPassMessage = document.getElementById('no-password');
        if(!nameInput.value.length){emptyNameMessage.style.display = 'block'};
        if(!emailInput.value.length){emptyEmailMessage.style.display = 'block'};
        if(!passInput.value.length){emptyPassMessage.style.display = 'block'};
        const isFormValid = Object.values(checkForm).every(value=>value===true);
        console.log(isFormValid);
    }

    const [showConfirmEmail, setShowConfirmEmail] = useState(false);

  return (
    <>
      <Head>
        <title>Grade+</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.mainContainer}>

        <section className={styles.leftContainer}>

            <div className={styles.logoTexto}>
                <h1>GRADE+</h1>
            </div>

            <div className={styles.containerLeftImage}>
                <Image src={studentImage} alt='illustration' fill sizes='(min-width: 1025px) 33vw' style={{
                    objectFit:'contain'
                }} priority/>
            </div>

        </section>

        <section className={styles.rightContainer}>
            
            {showConfirmEmail?
            
            <section className={styles.containerEmailSent}>
                <Image src={emailSentImage} width={200} height={200} alt='email'/>
                <span>Uhuu! Confirme o link que enviamos para o seu email e seja bem-vindo!</span>
            </section> : 
            
            <form 
                noValidate 
                className={styles.formLogin}
                onSubmit={(e)=>handleSubmit(e)}>
                
                <div className={styles.textbox}>
                <h1>OK,</h1>
                <p>Vamos criar sua conta!</p>
                </div>

                <div className={styles.inputWrapper}>
                    <input 
                    onFocus={(e)=>validateInput(e)}
                    onBlur={(e) => validateInput(e)} 
                    placeholder=' ' 
                    className={`${styles.inputStyle} ${styles.wideInput}`} 
                    type='text' 
                    id='name' 
                    name='name' 
                    required/>
                    <label>Nome</label>
                    <span id='name-error' className={styles.errorMessage}>O nome deve ter no mínimo 3 caracteres</span>
                    <span id='no-name' className={styles.emptyMessage}>Este campo é obrigatório!</span>
                </div>

                <div className={styles.inputWrapper}>
                    <input 
                    onFocus={(e)=>validateInput(e)}
                    onBlur={(e) => validateInput(e)} 
                    placeholder=' ' 
                    className={`${styles.inputStyle} ${styles.wideInput}`} 
                    type='email' 
                    id='email' 
                    name='email' 
                    required/>
                    <label>Email</label>
                    <span id='email-error' className={styles.errorMessage}>Este e-mail não é válido</span>
                    <span id='no-email' className={styles.emptyMessage}>Este campo é obrigatório!</span>
                </div>

                <div className={styles.inputWrapper}>
                    <input 
                    placeholder=' ' 
                    className={`${styles.inputStyle} ${styles.wideInput}`} 
                    type={passVisible?'text':'password'} 
                    id='password' 
                    name='password' 
                    onChange={(e)=>validateInput(e)}
                    onFocus={(e)=>{setShowPassModal(true);validateInput(e)}}
                    onBlur={(e)=>{setShowPassModal(false);validateInput(e)}}
                    required/>
                    <label>Senha</label>
                    <span style={{margin:'1rem 5rem'}} id='password-error' className={styles.errorMessage}>Essa senha não é válida</span>
                    <span style={{margin:'1rem 5rem'}} id='no-password' className={styles.emptyMessage}>Este campo é obrigatório!</span>
                    {showPassModal &&
                    <aside className={styles.passModal}>
                        <span>Sua senha deve conter:</span>
                        <span id='uppercase'>Maiúscula</span>
                        <span id='lowercase'>Minúscula</span>
                        <span id='number'>Número</span>
                        <span id='specialChar'>Caracter[!@#$%^&*]</span>
                        <span id='minLengthPass'>Mínimo 6 caracteres</span>
                    </aside>}
                    <Image onClick={togglePassVisibility} src={passVisible?hidepassDark:showpassDark} width={20} height={20} priority alt='hide' style={{
                        position:'absolute',
                        top:0,
                        right:0,
                        margin:'2rem',
                        cursor:'pointer',
                    }}/>
                </div>
                
                <button className={styles.btnSubmitLogin} type='submit'>Cadastrar</button>

            </form>}

            {!showConfirmEmail&&<>
            <span>Já possui uma conta? Faça <button style={{color:'#9747FF'}} onClick={() => router.push('/')}>login!</button></span>
            <span style={{fontWeight:'lighter'}}>Ao se registrar, você concorda com nossos Termos de Uso e Políticas de Privacidade</span>
            </>}
        </section>

      </main>
    </>
  )
}