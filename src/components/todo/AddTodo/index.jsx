import React from "react";
import { IoMdAdd } from "react-icons/io";
import { ADD_TODO } from "@utils/api";
import { useAuthContext } from "@contexts/AuthContext";
import { useTodosContext } from "@contexts/TodosContext";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";

function AddTodo() {

    const { authData } = useAuthContext();
    const { actions: { addTodo } } = useTodosContext();
    const inputRef = React.useRef(null);
    const textareaRef = React.useRef(null);
    const [todoTitle, setTodoTitle] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [todoDescription, setTodoDescription] = React.useState(null);

    // Handle Submit:
    const handleSubmit = React.useCallback(async (e) => {
        e.preventDefault();

        if (isLoading) return;

        setIsLoading(true);
        await ADD_TODO({ newTodo: { title: todoTitle, description: todoDescription, author: authData?.user?.id }, jwt: authData?.jwt })
            .then(data => {
                // Update UI
                if (data.error) {
                    // Show Error Message:
                    toast.error(data.error.message, {
                        position: "bottom-left",
                        theme: "dark"
                    });
                } else {
                    addTodo(data.data);
                    toast.success("Your todo added successfully", {
                        position: "bottom-left",
                        theme: "dark"
                    });
                    inputRef.current ? inputRef.current.value = '' : null;
                    textareaRef.current ? textareaRef.current.value = '' : null;
                }
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [isLoading, todoTitle, todoDescription, authData?.user?.id, authData?.jwt, addTodo]);

    return (
        <form onSubmit={handleSubmit} className="add-todo mb-5">
            <div className="w-full flex gap-3">
                <input
                    required
                    name="todo"
                    ref={inputRef}
                    autoComplete="off"
                    aria-label="Add Todo"
                    disabled={isLoading || !authData}
                    placeholder="Add a new todo"
                    onChange={e => setTodoTitle(e.target.value.trim())}
                    className="w-full rounded-md p-2.5 border border-[#7d3bd3] placeholder:text-[#777777] disabled:opacity-80"
                />
                <button
                    title="Add Todo"
                    aria-label="Add Todo"
                    disabled={isLoading || !authData}
                    className="w-10 bg-[#7d3bd3] flex items-center justify-center rounded-md shrink-0 disabled:opacity-80 disabled:!cursor-default"
                >
                    {
                        isLoading ? (
                            <FaSpinner className="animate-spin" size={22} />
                        ) : (
                            <IoMdAdd size={22} />
                        )
                    }
                    <span className="sr-only"></span>
                </button>
            </div>
            <textarea
                id="description"
                name="description"
                ref={textareaRef}
                disabled={isLoading || !authData}
                placeholder="Description"
                onChange={e => setTodoDescription(e.target.value.trim())}
                className="w-full rounded-md p-2.5 mt-3 border border-[#7d3bd3] placeholder:text-[#777777] h-[100px] md:h-[180px] resize-none disabled:opacity-80"
            ></textarea>
        </form>
    )
}

export default AddTodo;