import React from "react";
import { useAuthContext } from "@contexts/AuthContext";
import { useModalContext } from "@contexts/ModalContext";
import { useTodosContext } from "@contexts/TodosContext";
import { UPDATE_TODO } from "@utils/api";
import { MdCheck, MdDeleteOutline, MdStar, MdStarOutline } from "react-icons/md";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";

function TodoActions({ todo = { title: "", is_completed: false, is_featured: false } }) {

    const { openModal } = useModalContext();
    const { authData: { jwt } } = useAuthContext();
    const { actions: { updateTodo } } = useTodosContext();
    const { documentId, is_completed, is_featured } = todo;
    const [isLoading, setIsLoading] = React.useState(false);

    // Update Todo
    const handleUpdate = React.useCallback(async (updatedData) => {
        setIsLoading(true);
        await UPDATE_TODO({ documentId, updatedTodo: updatedData, jwt })
            .then((data) => {
                // Update UI
                if (data.error) {
                    // Show Error Message:
                    toast.error(data.error.message, {
                        position: "bottom-left",
                        theme: "dark"
                    });
                } else {
                    updateTodo({ documentId, updatedData });
                    toast.success("Your todo updated successfully", {
                        position: "bottom-left",
                        theme: "dark"
                    });
                }
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [documentId, jwt, updateTodo]);

    const handleEdit = React.useCallback(() => {
        openModal({ modal: "EDIT", todo })
    }, [openModal, todo]);

    const actionsClassName = `w-9 h-9 flex items-center justify-center rounded-full transition sm:hover:bg-[#1d1825] disabled:!cursor-not-allowed`;

    return (
        <div className="todo-actions shrink-0 flex items-center gap-1">
            {/* Completed */}
            <button
                disabled={isLoading}
                aria-label="Completed Todo"
                onClick={() => handleUpdate({ is_completed: !is_completed })}
                title={is_completed ? "Mark as uncompleted todo" : "Mark as completed todo"}
                className={`${actionsClassName} ${is_completed ? "text-[#78cfb0]" : "sm:hover:text-[#78cfb0]"}`}
            >
                <MdCheck size={20} />
            </button>
            {/* Featured */}
            <button
                disabled={isLoading}
                aria-label="Featured Todo"
                onClick={() => handleUpdate({ is_featured: !is_featured })}
                title={is_featured ? "Mark as not featured todo" : "Mark as featured todo"}
                className={`${actionsClassName} sm:hover:text-yellow-500`}
            >
                {
                    is_featured ? (
                        <MdStar size={20} className="text-yellow-500" />
                    ) : (
                        <MdStarOutline size={20} />
                    )
                }
            </button>
            {/* Edit */}
            <button
                disabled={isLoading}
                aria-label="Edit Todo"
                onClick={handleEdit}
                title="Edit This Todo"
                className={`${actionsClassName} sm:hover:text-green-500`}
            >
                <FaEdit />
            </button>
            {/* Delete */}
            <button
                disabled={isLoading}
                aria-label="Delete Todo"
                title="Delete this todo"
                onClick={() => openModal({ modal: "DELETE", todo })}
                className={`${actionsClassName} sm:hover:text-red-500`}
            >
                <MdDeleteOutline size={20} />
            </button>
        </div>
    )
}

export default TodoActions;