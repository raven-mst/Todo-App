import React from "react";
import TodoActions from "./TodoActions";

function Todo({ todo = { title: "", is_completed: false, is_featured: false } }) {

    const { title, description, is_completed } = todo;

    return (
        <div className="todo-card bg-[#15101c] p-3 rounded-lg">
            {/* Header */}
            <div className="todo-header flex items-center gap-5 sm:gap-7 md:gap-10">
                {/* Todo Title */}
                <p className={`w-full line-clamp-1 font-semibold ${is_completed ? "text-[#78cfb0] line-through" : ""}`} title={title}>{title}</p>
                {/* Actions */}
                <TodoActions todo={todo} />
            </div>
            {/* Description */}
            {
                description &&
                <p className="mt-2 line-clamp-2 text-white/60">{description}</p>
            }
        </div>
    )
}

export default Todo;