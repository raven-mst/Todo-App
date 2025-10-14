import AuthFormikWithClerk from '../../components/auth/AuthFormikWithClerk';

function SignupPage() {
    return (
        <div className="signup-page w-full py-10">
            <div className="container">
                <AuthFormikWithClerk method="signup" />
            </div>
        </div>
    )
}

export default SignupPage;