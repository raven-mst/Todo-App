import AuthFormikWithClerk from "../../components/auth/AuthFormikWithClerk";

function ResetPasswordPage() {
    return (
        <div className="reset-password-page flex items-center h-screen">
            <div className="container">
                <AuthFormikWithClerk method="resetPassword" />
            </div>
        </div>
    )
}

export default ResetPasswordPage;