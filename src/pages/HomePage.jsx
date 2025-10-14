import React from "react";
import TodosContainer from "@components/todo_temp/TodosContainer";
import { useTodosContext } from "@contexts/TodosContext";
import AddTodo from "@components/todo_temp/AddTodo";

function HomePage() {

    const {
        data: {
            completedTodos,
            uncompletedTodos
        }
    } = useTodosContext();

    return (
        <div className="home-page h-screen flex flex-col">
            <nav className="py-3 bg-[#1d1825] shadow-lg">
                <div className="container flex items-center justify-between">
                    Navbar
                </div>
            </nav>
            <main className="h-full flex items-center md:py-10">
                <div className="container">
                    <div className="todo-app-container bg-[#1d1825] shadow-lg p-5 rounded-3xl md:max-w-[750px] md:mx-auto">
                        {/* Add Todo */}
                        <AddTodo />

                        {/* Not Complete Todos */}
                        <div className="not-complete-todos mb-5">
                            {
                                uncompletedTodos.length === 0 ? (
                                    <p className="text-center text-[#777777]">No todos added yet</p>
                                ) : (
                                    <TodosContainer
                                        title={`Tasks to do - ${uncompletedTodos.length}`}
                                        todos={uncompletedTodos}
                                    />
                                )
                            }
                        </div>

                        {/* Complete Todos */}
                        {
                            completedTodos.length > 0 &&
                            <div className="complete-todos">
                                {
                                    completedTodos.filter(t => t.complete).length === 0 ? (
                                        <>No todos completed yet</>
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
        </div>
    )
}

export default HomePage;