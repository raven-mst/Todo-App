import AuthFormik from "@components/auth/AuthFormik";

function LoginPage() {
    return (
        <div className="login-page">
            <div className="container">
                <AuthFormik method="login" />
            </div>
        </div>
    )
}

export default LoginPage;