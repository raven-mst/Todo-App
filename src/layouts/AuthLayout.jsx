import { Outlet } from "react-router-dom";

function AuthLayout() {
    return (
        <div className="auth-layout h-full flex items-center">
            <div className="page-wrapper w-full py-10">
                <Outlet />
            </div>
        </div>
    )
}

export default AuthLayout;