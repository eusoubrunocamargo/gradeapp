import Image from 'next/image'
import styles from '@/styles/SignUp.module.css'
import { useRouter } from 'next/router'
import studentImage from '../../public/figure_student.png'
import emailSentImage from '../../public/paper-plane.png'
import logoSVG from '../../public/logo.svg'
import { useState } from 'react'
import { supabase } from '../../supabase'
import NameInput from '@/components/nameInput'
import EmailInput from '@/components/emailInput'
import PassInput from '@/components/passInput'

export default function SignUp() {

    const router = useRouter();

    const [showConfirmEmail, setShowConfirmEmail] = useState(false);

    const [newCheckForm, setNewCheckForm] = useState({
        name: {
            value: '',
            valid: false,
        },
        email: {
            value: '',
            valid: false,
        },
        password: {
            value: '',
            valid: false,
        }
    });

    async function handleSubmit(e){
        e.preventDefault();
        console.table(JSON.stringify(newCheckForm));
        
        const isFormValid = Object.values(newCheckForm).every(({ valid }) => valid === true);
        console.log(isFormValid);
        const { email , password , name } = newCheckForm;
        console.log(email.value, password.value, name.value);
        
        if(isFormValid){
            const { data , error } = await supabase.auth.signUp({
                email: email.value,
                password: password.value,
                options: {
                    data: {
                        name: name.value,
                    }
                }
            });

            if(error){
                console.log("Erro ao cadastrar: ,", error.message);
            }else{
                console.log("Cadastrado", data);
                setShowConfirmEmail(true);
            }
        }
    }

  return (
    <>
    
      <main className={styles.mainContainer}>

        <section className={styles.leftContainer}>

            <div className={styles.logoTexto}>
                <Image src={logoSVG} width={404} height={140} priority alt='logo'/>
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
                    <span>Bora criar<br/>sua conta!</span>
                </div>

                <NameInput newCheckForm={newCheckForm} setNewCheckForm={setNewCheckForm}/>
                <EmailInput type={'signup'} newCheckForm={newCheckForm} setNewCheckForm={setNewCheckForm}/>
                <PassInput newCheckForm={newCheckForm} setNewCheckForm={setNewCheckForm}/>
                
                <button className={styles.btnSubmitLogin} type='submit'>Cadastrar</button>
                
                <span>Já possui uma conta? Faça <button type='button' style={{color:'#9747FF'}} onClick={() => router.push('/')}>login!</button></span>
                <span style={{fontWeight:'lighter'}}>Ao se registrar, você concorda com nossos Termos de Uso e Políticas de Privacidade</span>
            </form>}

        </section>

      </main>
    </>
  )
}