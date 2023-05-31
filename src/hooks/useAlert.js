import { createContext, useContext, useState } from "react";

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {

    const [alert, setAlert] = useState({
        isVisible: false,
        text: '',
        type: '',
    });

    const showAlert = (text, type) => {
        setAlert({
            isVisible: true,
            text,
            type,
        })
    };

    return (
        <AlertContext.Provider value={{ alert, showAlert, setAlert }}>
            {children}
        </AlertContext.Provider>
    )
}