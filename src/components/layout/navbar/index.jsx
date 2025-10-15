import { UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

function Navbar() {

    const { user } = useUser();

    return (
        <nav className="py-3 bg-[#1d1825] shadow-lg">
            <div className="container flex items-center justify-between">
                {/* App Logo */}
                <Link
                    to={'/'}
                    className="font-semibold text-xl sm:text-2xl"
                >
                    Todo App
                </Link>
                {
                    user ? (
                        <UserButton />
                    ) : (
                        <div className="auth-links flex items-center gap-3">
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
                        </div>
                    )
                }
            </div>
        </nav>
    )
}

export default Navbar;