import { useSignIn } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import CustomCheckbox from "../../ui/CustomCheckbox";

const inputList = [
    {
        id: "email",
        name: "email",
        type: "email",
        label: "Email",
        autoComplete: "on",
        placeholder: "Enter your Email Address"
    },
    {
        id: "password",
        name: "password",
        type: "password",
        label: "Password",
        placeholder: "Enter your Password"
    }
];
const initialValues = {
    email: "",
    password: "",
    rememberMe: false
};
const validationSchema = Yup.object({
    email: Yup.string("Email must be a string").email("Email must be a valid Email address").required("Email is Required"),
    password: Yup.string().required("Password is Required").min(8).max(64),
    rememberMe: Yup.bool().oneOf([true, false])
});

export default function useLoginConfig() {

    const { signIn, setActive } = useSignIn();
    const navigate = useNavigate();

    const handleSubmit = async (values, actions) => {

        const { setSubmitting } = actions;
        const { email, password } = values;

        try {
            const result = await signIn.create({
                identifier: email,
                password,
            });

            if (result.status === "complete") {
                await setActive({ session: result.createdSessionId });
                // Navigate to Home Page
                navigate('/');
            } else {
                console.log("Login requires additional steps:", result);
            }

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
        submitBtn: "Login",
        header: () => (<div className="header mb-5">
            <h2 className="font-medium text-2xl mb-3">Login to your account</h2>
            <p>
                Don't have account?
                {" "}
                <Link to={'/auth/signup'} className="text-green-600 font-medium transition sm:hover:text-green-700">Create Account</Link>
            </p>
        </div>),
        actions: (actions) => (<div className="actions flex items-center justify-between mb-5">
            {/* Conditions */}
            <div className="conditions flex items-center gap-2">
                <CustomCheckbox
                    label="Remember Me"
                    defaultChecked={initialValues.rememberMe}
                    className={`${actions.errors.rememberMe && "border-red-500"}`}
                    onChange={e => actions.setFieldValue("rememberMe", e.target.checked)}
                />
            </div>
            <Link to={'/auth/forget-password'} className="font-medium text-green-600 sm:hover:text-green-700 transition">Forget Password</Link>
        </div>)
    }
}