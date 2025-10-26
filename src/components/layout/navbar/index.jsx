import { Link } from "react-router-dom";
import AuthLinks from "./components/AuthLinks";

function Navbar() {
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
                <AuthLinks />
            </div>
        </nav>
    )
}

export default Navbar;