import styles from '@/styles/Floating.module.css'
import Image from 'next/image'
import Logo from '../../../public/logo.svg'
export default function Floating() {




    return (

        <section className={styles.mainContainer}>

            <Image src={Logo} width={194} height={67} alt='logo'/>


        </section>

    )
}