import AuthFormikWithClerk from "../../components/auth/AuthFormikWithClerk";

function VerifyEmailPage() {
    return (
        <div className="verify-email-page w-full py-10">
            <div className="container">
                <AuthFormikWithClerk method="verifyEmail" />
            </div>
        </div>
    )
}

export default VerifyEmailPage;