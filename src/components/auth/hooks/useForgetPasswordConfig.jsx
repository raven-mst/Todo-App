import { useSignIn } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

const inputList = [
    {
        id: "email",
        name: "email",
        type: "email",
        label: "Email",
        autoComplete: "on",
        placeholder: "Enter your Email Address"
    }
];
const initialValues = {
    email: ""
};
const validationSchema = Yup.object({
    email: Yup.string("Email must be a string").email("Email must be a valid Email address").required("Email is Required")
});

export default function useForgetPasswordConfig() {

    const { signIn } = useSignIn();
    const navigate = useNavigate();

    const handleSubmit = async (values, actions) => {

        const { setSubmitting } = actions;
        const { email } = values;

        try {
            const result = await signIn.create({
                strategy: "reset_password_email_code",
                identifier: email
            });

            if (result.status === "needs_first_factor") {
                // Navigate to Reset Password Page
                navigate('/auth/reset-password')
            }

            console.log("Unexpected result:", result);
        } catch (submitError) {
            if (submitError.errors) {
                const formikErrors = {};
                submitError.errors.forEach(error => {
                    if (error.meta.paramName === "identifier" || error.code === "session_exists") {
                        formikErrors.email = error.message;
                    } else {
                        formikErrors[error.meta.paramName] = error.message
                    }
                });
                actions.setErrors(formikErrors);
            }
        } finally {
            setSubmitting(false);
        }
    };

    return {
        handleSubmit,
        inputList,
        initialValues,
        validationSchema,
        submitBtn: "Send Code",
        header: () => (<div className="header mb-5 text-center">
            <h2 className="font-medium text-2xl mb-3">Forget Password</h2>
            <p>
                Enter OPT Code sended to your Email address or
                {" "}
                <Link to={'/auth/login'} className="text-[#9e78cf] font-medium transition">Back to Login</Link>
            </p>
        </div>)
    }
};