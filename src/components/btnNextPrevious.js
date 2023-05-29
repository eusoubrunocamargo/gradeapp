import styles from '@/styles/BtnNext.module.css';
import Image from 'next/image';
import LeftBlackArrow from '../../public/left-arrow-1e1e1e.png';
import RightBlackArrow from '../../public/right-arrow-1e1e1e.png';

export default function BtnNextPrevious ({ direction, onClick }) {
    return (
        <button onClick={onClick} className={styles.btnNext}>
            {direction === 'left' ?
                <Image src={LeftBlackArrow} width={20} height={20} alt='left-arrow'/>:
                <Image src={RightBlackArrow} width={20} height={20} alt='right-arrow'/>}
        </button>
    )
}