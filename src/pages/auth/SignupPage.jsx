import AuthFormikWithClerk from '../../components/auth/AuthFormikWithClerk';

function SignupPage() {
    return (
        <div className="signup-page flex items-center h-screen">
            <div className="container">
                <AuthFormikWithClerk method="signup" />
            </div>
        </div>
    )
}

export default SignupPage;