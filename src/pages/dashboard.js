import { useRouter } from "next/router"
import { supabase } from "../../supabase";
import { useAuth } from "@/hooks/useAuth";
import styles from '@/styles/Dash.module.css';
import Image from "next/image";
import Logo from '../../public/logo.svg';
import ComponentProfile from "@/components/Profile";
import ComponentMyClasses from "@/components/Classes";

export default function Dashboard(){

    const router = useRouter();

    useAuth();

    const handleSignOut = async () => {
        const {error} = await supabase.auth.signOut();
        if(error){
            console.error(error);
        }else{
            router.push('/');
        }
    };
         
    return (
        <main className={styles.mainContainer}>
            <header>
                <nav>
                    <Image src={Logo} priority width={400} height={100} alt="logo"/>
                    <button onClick={handleSignOut}>Sair</button>
                </nav>
            </header>

            <section className={styles.containerComponents}>

                <section className={styles.leftSide}>

                    <ComponentProfile/>
                    <ComponentMyClasses/>

                </section>

                <section className={styles.rightSide}>
                    Lado direito
                </section>
            </section>  
        </main>
    )
}