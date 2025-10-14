import React from "react";

const TodosContext = React.createContext();

export const TodosContextProvider = ({ children }) => {

    const [todos, setTodos] = React.useState(JSON.parse(localStorage.getItem("todos")) || []);
    const [completedTodos, setCompletedTodos] = React.useState([]);
    const [uncompletedTodos, setUnCompletedTodos] = React.useState([]);

    React.useEffect(() => { // Save to local storage:
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);
    React.useEffect(() => { // Get completed todos:
        setCompletedTodos(todos.filter(t => t.complete));
    }, [todos]);
    React.useEffect(() => { // Get uncompleted todos:
        setUnCompletedTodos(todos.filter(t => !t.complete));
    }, [todos]);

    // ## Handlers:
    const addTodo = React.useCallback((newTodo) => {
        setTodos(prev => [newTodo, ...prev])
    }, []);
    const deleteTodo = React.useCallback((todoDate) => {
        setTodos(prev => prev.filter(t => t.date !== todoDate))
    }, []);
    const updateTodo = React.useCallback((todoDate, updatedFields) => {
        setTodos(prev => {
            return prev.map(t => t.date === todoDate ? t = { ...t, ...updatedFields } : t)
        })
    }, []);

    return (
        <TodosContext.Provider
            value={{
                data: {
                    todos,
                    completedTodos,
                    uncompletedTodos
                },
                actions: {
                    addTodo,
                    deleteTodo,
                    updateTodo
                }
            }}
        >
            {children}
        </TodosContext.Provider>
    )
};

export const useTodosContext = () => React.useContext(TodosContext);