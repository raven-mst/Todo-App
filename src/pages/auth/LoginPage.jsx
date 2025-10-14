import AuthFormikWithClerk from "../../components/auth/AuthFormikWithClerk";

function LoginPage() {
    return (
        <div className="login-page flex items-center h-screen">
            <div className="container">
                <AuthFormikWithClerk method="login" />
            </div>
        </div>
    )
}

export default LoginPage;