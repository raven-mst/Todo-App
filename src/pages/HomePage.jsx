import AddTodo from "@components/todo/AddTodo";
import TodosContainer from "@components/todo/TodosContainer";
import { useAuthContext } from "@contexts/AuthContext";
import { useTodosContext } from "@contexts/TodosContext";
import DeleteTodoModal from "@modals/DeleteTodoModal";
import EditTodoModal from "@modals/EditTodoModal";
import { Link } from "react-router-dom";

function HomePage() {

    const { authData, userData } = useAuthContext();
    const { todos, completedTodos, uncompletedTodos } = useTodosContext();
    const isActiveTodos = todos.length > 0;

    return (
        <div className="home-page h-full flex flex-col relative">
            <main className="h-full flex items-center md:py-10">
                <div className="container">
                    {/* Welcome User */}
                    {
                        authData &&
                        <div className="user-welcome mb-5 md:max-w-[750px] md:mx-auto">
                            <h3 className="text-2xl">Welcome, {userData?.username}</h3>
                        </div>
                    }
                    {/* Todo App Container */}
                    <div className="todo-app-container bg-[#1d1825] shadow-lg p-5 rounded-3xl md:max-w-[750px] md:mx-auto">
                        {/* Add Todo */}
                        <AddTodo />

                        {/* Not Complete Todos */}
                        {
                            authData ? (
                                <div className="not-complete-todos mb-5">
                                    {
                                        uncompletedTodos.length === 0 ? (
                                            <p className="text-center text-[#a5a5a5]">No {isActiveTodos ? "new" : ""} todos added yet</p>
                                        ) : (
                                            <TodosContainer
                                                title={`Tasks todo - ${uncompletedTodos.length}`}
                                                todos={uncompletedTodos}
                                            />
                                        )
                                    }
                                </div>
                            ) : (
                                <p className="text-center [&>span]:opacity-60">
                                    <span>Please {" "}</span>
                                    <Link to={'/auth/login'} className="opacity-100 underline transition sm:hover:text-[#6a34b0]">login</Link>
                                    <span>{" "}or{" "}</span>
                                    <Link to={'/auth/signup'} className="opacity-100 underline transition sm:hover:text-[#6a34b0]">signup</Link>
                                    <span>{" "}to using app.</span>
                                </p>
                            )
                        }

                        {/* Complete Todos */}
                        {
                            isActiveTodos &&
                            <div className="complete-todos">
                                {
                                    completedTodos.length === 0 ? (
                                        <p className="text-center text-[#a5a5a5]">No todos completed yet</p>
                                    ) : (
                                        <TodosContainer
                                            title={`Done - ${completedTodos.length}`}
                                            todos={completedTodos}
                                        />
                                    )
                                }
                            </div>
                        }
                    </div>
                </div>
            </main>

            {/* Modals */}
            <DeleteTodoModal />
            <EditTodoModal />
        </div>
    )
}

export default HomePage;