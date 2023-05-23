import { useState } from "react";
import styles from '@/styles/FloatingMenu.module.css';


const FloatingMenu = ({ options, children }) => {

    const [isVisible, setIsVisible] = useState(false);

    const handleButtonClick = (callback) => {
        setIsVisible(false);
        callback();
    };

    return (
        <div className={styles.floatingMenu}>
            <div onClick={() => setIsVisible(!isVisible)}>{children}</div>
            {isVisible && (
                <div className={styles.menuContent}>
                    
                    {options.map((option,index) => (
                        option.type === 'file' ?
                        <label key={index} htmlFor={option.text} className={styles.fileUploadStyle}>
                        {option.text}
                        <input id={option.text} style={{display:'none'}} key={index} type="file" accept="image/*" onChange={(e) => { option.callback(e); setIsVisible(false) }}/>
                        </label>
                        : 
                        <button key={index} 
                        onClick={() => handleButtonClick(option.callback)}>
                            {option.text}
                        </button>
                    ))}

                    <button onClick={() => setIsVisible(false)}>Fechar</button>
                </div>
            )}
        </div>
    );
};

export default FloatingMenu;
