import React from "react";

const ModalContext = React.createContext();

export const ModalContextProvider = ({ children }) => {

    const [activeModals, setActiveModals] = React.useState([]);
    const [todo, setTodo] = React.useState({});

    const openModal = React.useCallback(({ modal, todo }) => {
        setActiveModals(prev => [...prev, modal]);
        setTodo(todo);
    }, []);
    const closeModal = React.useCallback((modal) => {
        setActiveModals(prev => prev.filter(m => m !== modal));
    }, []);

    return (
        <ModalContext.Provider
            value={{
                activeModals,
                todo,
                openModal,
                closeModal
            }}
        >
            {children}
        </ModalContext.Provider>
    )
};

// eslint-disable-next-line react-refresh/only-export-components
export const useModalContext = () => React.useContext(ModalContext);