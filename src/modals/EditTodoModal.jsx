import { useModalContext } from "@contexts/ModalContext";
import React from "react";

function EditTodoModal() {

    const { activeModals, closeModal } = useModalContext();
    const isOpen = (activeModals || []).includes('EDIT');
    const [isLoading, setIsLoading] = React.useState(false);

    const handleCloseModal = React.useCallback(() => {
        if (isLoading) return;
        closeModal('EDIT')
    }, [closeModal, isLoading]);

    return (
        <div
            onClick={handleCloseModal}
            className={`edit-todo-modal ${isOpen ? "" : "pointer-events-none opacity-0"} transition absolute z-40 left-0 top-0 w-full h-full bg-black/50 backdrop-blur-sm flex items-center`}
        >
            <div className="container">
                <div
                    onClick={e => e.stopPropagation()}
                    className="w-full md:max-w-[750px] md:mx-auto"
                >
                    Edit Todo Modal
                </div>
            </div>
        </div>
    )
}

export default EditTodoModal;