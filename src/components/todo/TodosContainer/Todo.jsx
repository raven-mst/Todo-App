import { useTodosContext } from "@contexts/TodosContext";
import React from "react";
import { MdCheck, MdDeleteOutline } from "react-icons/md";

function Todo({ todo = { title: "", date: "", complete: false } }) {

    const {
        actions: {
            deleteTodo,
            updateTodo
        }
    } = useTodosContext();

    const handleDelete = React.useCallback(() => {
        deleteTodo(todo.date)
    }, [deleteTodo, todo.date]);
    const handleUpdate = React.useCallback(() => {
        updateTodo(todo.date, { complete: !todo.complete })
    }, [todo.complete, todo.date, updateTodo]);

    return (
        <div className="todo-card bg-[#15101c] text-[#9e78cf] p-3 rounded-lg flex items-center gap-5 sm:gap-7 md:gap-10">
            {/* Todo Title */}
            <p className={`w-full line-clamp-1 ${todo.complete ? "text-[#78cfb0] line-through" : ""}`} title={todo.title}>{todo.title}</p>
            {/* Actions */}
            <div className="todo-actions shrink-0 flex items-center gap-1">
                {/* Complete */}
                <button
                    onClick={handleUpdate}
                    aria-label="Complete Todo"
                    title={todo.complete ? "Mark this todo as uncompleted" : "Mark this todo as Completed"}
                    className="w-9 h-9 flex items-center justify-center rounded-full transition sm:hover:bg-[#1d1825]"
                >
                    <MdCheck size={20} />
                </button>
                {/* Delete */}
                <button
                    onClick={handleDelete}
                    aria-label="Delete Todo"
                    title="Delete this todo"
                    className="w-9 h-9 flex items-center justify-center rounded-full transition sm:hover:bg-[#1d1825]"
                >
                    <MdDeleteOutline size={20} />
                </button>
            </div>
        </div>
    )
}

export default Todo;