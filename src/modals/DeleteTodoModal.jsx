import { useAuthContext } from "@contexts/AuthContext";
import { useModalContext } from "@contexts/ModalContext";
import { useTodosContext } from "@contexts/TodosContext";
import { DELETE_TODO } from "@utils/api";
import React from "react";
import { FaHeart, FaSpinner } from "react-icons/fa";
import { IoMdHeart } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";

function DeleteTodoModal() {

    const { activeModals, closeModal, todo } = useModalContext();
    const { authData } = useAuthContext();
    const { actions: { deleteTodo } } = useTodosContext();
    const isOpen = (activeModals || []).includes('DELETE');
    const [isLoading, setIsLoading] = React.useState(false);

    const handleCloseModal = React.useCallback(() => {
        if (isLoading) return;
        closeModal('DELETE')
    }, [closeModal, isLoading]);

    const handleDelete = React.useCallback(async () => {
        setIsLoading(true);
        await DELETE_TODO({ documentId: todo.documentId, jwt: authData?.jwt })
            .then((data) => {
                // Delete Form UI
                if (data.error) {
                    // Show Error Message:
                    toast.error(data.error.message, {
                        position: "bottom-left",
                        theme: "dark"
                    });
                } else {
                    deleteTodo(todo.documentId);
                    handleCloseModal();
                    toast.success("Your todo delete successfully", {
                        position: "bottom-left",
                        theme: "dark"
                    });
                }
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [deleteTodo, handleCloseModal, authData?.jwt, todo.documentId]);

    return (
        <div
            onClick={handleCloseModal}
            className={`delete-todo-modal ${isOpen ? "" : "pointer-events-none opacity-0"} transition absolute z-40 left-0 top-0 w-full h-full bg-black/50 backdrop-blur-sm flex items-center`}
        >
            <div className="container">
                <div
                    onClick={e => e.stopPropagation()}
                    className="w-full md:max-w-[750px] md:mx-auto bg-[#1d1825] p-5 rounded-md"
                >
                    <div className="todo-info mb-5">
                        <h3 className="font-semibold sm:text-xl text-center">{todo.title}</h3>
                        <p className="text-center mt-1 text-xs sm:text-sm text-white/50 line-clamp-4">{todo.description}</p>
                    </div>
                    <div className="actions flex items-center justify-center gap-3">
                        <button
                            title="Cancel"
                            aria-label="Cancel"
                            disabled={isLoading}
                            onClick={handleCloseModal}
                            className="flex items-center gap-2 rounded-md py-2 px-4 bg-[#7d3bd3]"
                        >
                            <IoMdHeart size={22} />
                            <span>Cancel</span>
                        </button>
                        <button
                            title="Delete"
                            aria-label="Delete"
                            disabled={isLoading}
                            onClick={handleDelete}
                            className="flex items-center gap-2 rounded-md py-2 px-4 bg-red-800"
                        >
                            {
                                isLoading ? (
                                    <FaSpinner size={22} className="animate-spin" />
                                ) : (
                                    <MdDeleteOutline size={22} />
                                )
                            }
                            <span>Delete</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteTodoModal;