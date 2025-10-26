import React from "react";
import { useAuthContext } from "@contexts/AuthContext";
import { FaUser } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useTodosContext } from "@contexts/TodosContext";

function AuthLinks() {

    const navigate = useNavigate();
    const { userData, setUserData, setAuthData } = useAuthContext();
    const { actions: { clearTodos } } = useTodosContext();
    const [openList, setOpenList] = React.useState(false);
    const ref = React.useRef(null);

    const handleCLose = React.useCallback(() => {
        setOpenList(false);
    }, []);

    React.useEffect(() => {
        const handleClickOutSide = (event) => {
            if (ref.current && ref.current.contains(event.target)) return;
            handleCLose();
        };
        document.addEventListener('click', handleClickOutSide);
        return () => document.removeEventListener('click', handleClickOutSide);
    }, [handleCLose]);

    const handleLogout = React.useCallback(() => {
        localStorage.removeItem('auth');
        localStorage.removeItem('user-data');
        setAuthData(undefined);
        setUserData(undefined);
        handleCLose();
        clearTodos();
        navigate('/')
    }, [setAuthData, setUserData, handleCLose, clearTodos, navigate]);

    return (
        <div className="auth-links flex items-center gap-3">
            {
                userData ? (
                    <div className="user-avatar w-[50px] h-[50px] relative" ref={ref}>
                        {/* User Button */}
                        <button
                            aria-label="User Avatar"
                            onClick={() => setOpenList(prev => !prev)}
                            className="w-full h-full flex items-center justify-center"
                        >
                            {
                                userData.avatar ? (
                                    <img
                                        src={userData.avatar}
                                        alt="User Avatar"
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="bg-[#0d0714] w-full h-full rounded-full flex items-center justify-center">
                                        <FaUser size={22} />
                                    </div>
                                )
                            }
                        </button>
                        {/* User List */}
                        <div className={`user-list ${openList ? "" : "pointer-events-none opacity-0 -translate-y-2"} transition duration-300 ease-in-out bg-white/25 shadow-md absolute z-50 right-0 top-full mt-2 p-2 rounded-md min-w-[200px] space-y-1`}>
                            <Link
                                to={'/profile'}
                                onClick={handleCLose}
                                className={`flex items-center gap-2 font-medium py-3 px-4 bg-[#0d0714] sm:hover:bg-[#0d0714]/80 transition rounded-sm`}
                            >
                                <FaUser size={22} />
                                <span>Profile</span>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className={`w-full flex items-center gap-2 font-medium py-3 px-4 bg-[#0d0714] sm:hover:bg-[#0d0714]/80 transition rounded-sm text-red-500`}
                            >
                                <IoMdLogOut size={22} />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <Link
                            to={'/auth/login'}
                            className="font-medium transition bg-[#7d3bd3] py-2 px-4 sm:px-6 block rounded-sm"
                        >
                            Login
                        </Link>
                        <Link
                            to={'/auth/signup'}
                            className="font-medium max-sm:hidden transition bg-white text-[#7d3bd3] py-2 px-4 sm:px-6 block rounded-sm sm:hover:bg-[#9e78cf] sm:hover:text-white"
                        >
                            Sign Up
                        </Link>
                    </>
                )
            }
        </div>
    )
}

export default AuthLinks;