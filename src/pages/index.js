import Image from 'next/image'
import styles from '@/styles/Login.module.css'
import { useRouter } from 'next/router'
import { supabase } from '../../supabase';
import logoSVG from '../../public/logo.svg'
import loginIllustration from '../../public/login_illustration.png'
import EmailInput from '@/components/emailInput';
import PassInput from '@/components/passInput';
import { useState } from 'react';
import { AlertModal } from '@/components/alertModal';
import { useAlert } from '@/hooks/useAlert';

export default function Login() {

  const router = useRouter();
  const { showAlert } = useAlert();

  const [newCheckForm, setNewCheckForm] = useState({
    email: {
        value: '',
        valid: false,
    },
    password: {
        value: '',
        valid: false,
    }
  });

  async function handleLogin(e){
    e.preventDefault();

    if(!newCheckForm.email.value || !newCheckForm.password.value){
      showAlert('Todos os campos são obrigatórios!', 'fail');
    }

    const isFormValid = Object.values(newCheckForm).every(({ valid }) => valid === true);
    const { email , password } = newCheckForm;

    if(isFormValid){
      try{
        const{ error }=await supabase.auth.signInWithPassword({
          email: email.value,
          password: password.value,
        });

        if(error){
          console.error(error.message);
          throw error; 
        } else {
          router.push('/dashboard');
        }
      } catch (error){
        if(error.message === 'Invalid login credentials'){
          showAlert('Senha inválida!', 'fail');
        }
      }
    }
  }
  return (
    <>
      
      <main className={styles.mainContainer}>

        <AlertModal/>

        <section className={styles.leftContainer}>

          <div className={styles.logoTexto}>
              <Image src={logoSVG} width={404} height={140} priority alt='logo'/>
          </div>

          <div className={styles.containerLeftImage}>
              <Image src={loginIllustration} alt='illustration' fill sizes='(min-width: 1025px) 33vw' style={{
                  objectFit:'contain'
              }} priority/>
          </div>

        </section>

        <section className={styles.rightContainer}>

          <form className={styles.formLogin} onSubmit={handleLogin}>

            <div className={styles.textbox}>
              <span>E aí,<br/>blz?</span>
            </div>
            <EmailInput type={'login'} newCheckForm={newCheckForm} setNewCheckForm={setNewCheckForm}/>
            <PassInput newCheckForm={newCheckForm} setNewCheckForm={setNewCheckForm}/>
            <button className={styles.btnSubmitLogin} type='submit'>Entrar</button>

            <div className={styles.goSignUp}>
              <div>
                <span>Ainda não é usuário? </span>
                <button type='button' style={{color:'#9747FF'}} onClick={() => router.push('/signup')}> Cadastre-se</button>
              </div>
              <div>
                <button type='button'>Esqueci a senha</button>
              </div>
            </div>

            <button className={styles.btnGoogle}>
              <Image src='/google_icon.png' priority width={20} height={20} alt='google'/>
              <span>Entre com o Google</span>
            </button>

          </form>

        </section>

      </main>
    </>
  )
}