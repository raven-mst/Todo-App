import React from "react";
import { useTodosContext } from "@contexts/TodosContext";
import { IoMdAdd } from "react-icons/io";

function AddTodo() {

    const {
        actions: {
            addTodo
        }
    } = useTodosContext();

    const inputRef = React.useRef(null);
    const [todoTitle, setTodoTitle] = React.useState(null);

    const handleSubmit = React.useCallback((e) => {
        e.preventDefault();
        const newTodo = {
            title: todoTitle,
            date: Date.now(),
            complete: false
        }
        addTodo(newTodo);
        if (inputRef.current) inputRef.current.value = "";
    }, [addTodo, todoTitle]);
    const handleChange = React.useCallback((e) => {
        setTodoTitle(e.target.value.trim())
    }, []);

    return (
        <form onSubmit={handleSubmit} className="add-todo mb-5 flex gap-3">
            <input
                required
                name="todo"
                ref={inputRef}
                autoComplete="off"
                aria-label="Add Todo"
                onChange={handleChange}
                placeholder="Add a new todo"
                className="w-full rounded-xl p-2.5 border border-[#7d3bd3] placeholder:text-[#777777]"
            />
            <button
                title="Add Todo"
                aria-label="Add Todo"
                className="w-10 bg-[#7d3bd3] flex items-center justify-center rounded-lg shrink-0"
            >
                <IoMdAdd size={22} />
                <span className="sr-only"></span>
            </button>
        </form>
    )
}

export default AddTodo;