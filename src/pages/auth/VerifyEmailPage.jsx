import AuthFormikWithClerk from "../../components/auth/AuthFormikWithClerk";

function VerifyEmailPage() {
    return (
        <div className="verify-email-page flex items-center h-screen">
            <div className="container">
                <AuthFormikWithClerk method="verifyEmail" />
            </div>
        </div>
    )
}

export default VerifyEmailPage;