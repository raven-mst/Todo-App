import AuthFormikWithClerk from "../../components/auth/AuthFormikWithClerk";

function ForgetPasswordPage() {
    return (
        <div className="forget-password-page flex items-center h-screen">
            <div className="container">
                <AuthFormikWithClerk method="forgetPassword" />
            </div>
        </div>
    )
}

export default ForgetPasswordPage;