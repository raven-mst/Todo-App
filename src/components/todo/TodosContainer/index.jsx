import Todo from "./components/Todo";

function TodosContainer({ title = "", todos = [] }) {
    return (
        <div className="todos-container">
            <h3 className="mb-3 font-medium">{title}</h3>
            {/* Todos List */}
            <div className="todos-list space-y-2 max-h-[30vh] overflow-y-auto">
                {
                    todos.map(todo => (<Todo
                        key={todo.id}
                        todo={todo}
                    />))
                }
            </div>
        </div>
    )
}

export default TodosContainer;