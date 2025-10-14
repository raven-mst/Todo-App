import AuthFormikWithClerk from "../../components/auth/AuthFormikWithClerk";

function LoginPage() {
    return (
        <div className="login-page w-full py-10">
            <div className="container">
                <AuthFormikWithClerk method="login" />
            </div>
        </div>
    )
}

export default LoginPage;