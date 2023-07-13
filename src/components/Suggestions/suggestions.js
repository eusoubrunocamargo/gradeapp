import style from '../../styles/Suggestions.module.css'
import Image from 'next/image'
import Close from '../../../public/close_neutral.svg'

export default function Suggestions({ openSuggestions, setOpenSuggestions}) {

    return (
        <div className={style.suggestionsFullContainer}>
            <div className={style.suggestionsModal}>
                <button onClick={() => setOpenSuggestions(!openSuggestions)}>
                    <Image src={Close} width={25} height={25} alt='close'/>
                </button>
                <h1>Sugestões</h1>
                <input type="text" placeholder="Digite sua sugestão aqui"/>
                <button>Enviar</button>
            </div>
        </div>
    )
}