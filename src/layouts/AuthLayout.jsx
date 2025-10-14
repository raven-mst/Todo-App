import { Outlet } from "react-router-dom";

function AuthLayout() {
    return (
        <div className="auth-layout h-full flex items-center">
            <Outlet />
        </div>
    )
}

export default AuthLayout;