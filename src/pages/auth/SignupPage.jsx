import AuthFormik from "@components/auth/AuthFormik";

function SignupPage() {
    return (
        <div className="signup-page">
            <div className="container">
                <AuthFormik method="signup" />
            </div>
        </div>
    )
}

export default SignupPage;