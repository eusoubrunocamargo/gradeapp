import styles from '@/styles/OccurrenceContainer.module.css'
import { useState } from 'react'
import { formatDate } from '../Reminders/TaskContainer'
import Image from 'next/image';
import Trash from '../../../public/trashcan.svg'
import { useUserOccurrences } from '@/hooks/useUserOccurrences';

export default function OccurrenceContainer({ occurrence }){

    const { handleDeleteOccurrence } = useUserOccurrences();
    
    const [showDelete, setShowDelete] = useState(false);

    const handleShowDelete = () => {
        setShowDelete(!showDelete);
    };

    const onDelete = () => {
        handleDeleteOccurrence(occurrence.occurrence_type, occurrence.id);
        handleShowDelete();
    };

    // console.log(occurrence);

    return (
        <>
            <div onClick={handleShowDelete} key={occurrence.id} className={styles.occurrenceContainer}>
                {showDelete ? 
                <>
                    <div className={styles.btnContainer}>
                        <button onClick={onDelete}>Excluir<Image src={Trash} width={15} height={15} alt='trash'/></button>
                        <button onClick={handleShowDelete}>Voltar</button>
                    </div>
                </>
                :
                <>
                    <span>Data: {formatDate(occurrence.date)}</span>
                    <span>Conteúdo: {occurrence.description}</span>
                </>}
            </div>
        </>
    )
}