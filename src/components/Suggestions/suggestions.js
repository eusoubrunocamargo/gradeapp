import style from '../../styles/Suggestions.module.css'
import Image from 'next/image'
import Close from '../../../public/close_neutral.svg'
import { useState } from 'react'
import { useAlert } from '@/hooks/useAlert'
import { supabase } from '../../../supabase'
import { useUserData } from '@/hooks/useUserData'


export default function Suggestions({ openSuggestions, setOpenSuggestions}) {

    const [suggestions, setSuggestions] = useState('');
    const { handleSuggestion } = useUserData();

    const handleSendSuggestions = () => {
        if(suggestions === ''){
            showAlert('Digite sua sugestão', 'fail');
            return;
        }

        handleSuggestion(suggestions);
        setOpenSuggestions(!openSuggestions);
    }



    return (
        <div className={style.suggestionsFullContainer}>
            <div className={style.suggestionsModal}>
                <button onClick={() => setOpenSuggestions(!openSuggestions)}>
                    <Image src={Close} width={25} height={25} alt='close'/>
                </button>
                <h1>Sugestões</h1>
                <input onChange={(e) => setSuggestions(e.target.value)} type="text" placeholder="Digite sua sugestão aqui"/>
                <button onClick={handleSendSuggestions}>Enviar</button>
            </div>
        </div>
    )
}