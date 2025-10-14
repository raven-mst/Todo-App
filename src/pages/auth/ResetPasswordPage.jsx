import AuthFormikWithClerk from "../../components/auth/AuthFormikWithClerk";

function ResetPasswordPage() {
    return (
        <div className="reset-password-page w-full py-10">
            <div className="container">
                <AuthFormikWithClerk method="resetPassword" />
            </div>
        </div>
    )
}

export default ResetPasswordPage;