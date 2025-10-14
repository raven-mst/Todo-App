import AuthFormikWithClerk from "../../components/auth/AuthFormikWithClerk";

function ForgetPasswordPage() {
    return (
        <div className="forget-password-page w-full py-10">
            <div className="container">
                <AuthFormikWithClerk method="forgetPassword" />
            </div>
        </div>
    )
}

export default ForgetPasswordPage;