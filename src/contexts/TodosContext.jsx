import React from "react";
import { useAuthContext } from "./AuthContext";
import { GET_USER_TODOS } from "@utils/api";

const TodosContext = React.createContext();

export const TodosContextProvider = ({ children }) => {

    const { authData } = useAuthContext();
    const [isLoading, setIsLoading] = React.useState(true);
    const [todos, setTodos] = React.useState([]);
    const [completedTodos, setCompletedTodos] = React.useState([]);
    const [uncompletedTodos, setUnCompletedTodos] = React.useState([]);
    const { jwt, user } = authData ? authData : {};

    React.useEffect(() => { // Get User Todos (API):
        if (!authData) return;

        setIsLoading(true);
        GET_USER_TODOS({ userId: user?.id, jwt }).then(data => {
            setTodos(data.data);
        }).finally(() => {
            setIsLoading(false);
        });
    }, [authData, user?.id, jwt]);
    React.useEffect(() => { // Extract Todos Data (LOGIC):
        if (todos.length === 0) {
            setCompletedTodos([]);
            setUnCompletedTodos([]);
        } else {
            setCompletedTodos(todos.filter(t => t.is_completed));
            setUnCompletedTodos(todos.filter(t => !t.is_completed));
        }
    }, [todos]);

    // Update Todo:
    const addTodo = React.useCallback((newTodo) => {
        setTodos(prev => [newTodo, ...prev]);
    }, []);
    // Update Todo:
    const updateTodo = React.useCallback(({ documentId, updatedData }) => {
        setTodos(prev => prev.map(t => t.documentId === documentId ? { ...t, ...updatedData } : t));
    }, []);
    // Delete Todo
    const deleteTodo = React.useCallback((documentId) => {
        setTodos(prev => prev.filter(t => t.documentId !== documentId));
    }, []);
    // Clear Todo
    const clearTodos = React.useCallback(() => {
        setTodos([]);
    }, []);

    return (
        <TodosContext.Provider
            value={{
                isLoading,
                todos,
                completedTodos,
                uncompletedTodos,
                actions: {
                    addTodo,
                    updateTodo,
                    deleteTodo,
                    clearTodos
                }
            }}
        >
            {children}
        </TodosContext.Provider>
    )
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTodosContext = () => React.useContext(TodosContext);