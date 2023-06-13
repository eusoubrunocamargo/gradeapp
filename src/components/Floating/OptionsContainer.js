import styles from '@/styles/Floating.module.css'
import React from 'react';

export default function OptionsContainer({ children, options, isOpen, onOpen }) {
    
    return (
        <>
            {/* <div onClick={onOpen}>{React.cloneElement(children, { isVisible: isOpen })}</div> */}
            <div onClick={onOpen}>{React.cloneElement(children)}</div>
            {isOpen && 
                <section className={styles.optionsContainer}>
                    {options.map((option,index) => (
                        <button key={index} onClick={() => option.callback()}>
                            {option.text}
                        </button>
                    ))}
                </section>
            }
        </>
    )
}
