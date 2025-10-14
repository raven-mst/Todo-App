import { useSignIn } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

const inputList = [
    {
        id: "code",
        name: "code",
        type: "text",
        label: "OTP Code",
        autoComplete: "one-time-code",
        placeholder: "Enter the code sent to your email",
    },
    {
        id: "password",
        name: "password",
        type: "password",
        label: "New Password",
        placeholder: "Enter your new password",
    },
];
const initialValues = {
    code: "",
    password: "",
};
const validationSchema = Yup.object({
    code: Yup.string()
        .required("Verification code is required")
        .min(4, "Code must be at least 4 characters")
        .max(10, "Code must be less than 10 characters"),
    password: Yup.string()
        .required("New password is required")
        .min(8, "Password must be at least 8 characters")
        .max(64, "Password must be less than 64 characters"),
});

export default function useResetPasswordConfig() {

    const { signIn } = useSignIn();
    const navigate = useNavigate();

    const handleSubmit = async (values, actions) => {
        const { setSubmitting, setErrors } = actions;
        const { code, password } = values;

        try {
            const verify = await signIn.attemptFirstFactor({
                strategy: "reset_password_email_code",
                code,
                password
            });

            if (verify.status === "complete") {
                // Navigate to Home Page
                navigate('/')
            }

            console.log("Unexpected result:", verify);
        } catch (error) {
            console.error("Reset password error:", error);

            const formikErrors = {};
            if (error.errors) {
                error.errors.forEach((err) => {
                    const field = err.meta?.paramName || "code";
                    formikErrors[field] = err.message;
                });
            } else {
                formikErrors.code = "Something went wrong. Please try again later.";
            }
            setErrors(formikErrors);
        } finally {
            setSubmitting(false);
        }
    };

    return {
        handleSubmit,
        inputList,
        initialValues,
        validationSchema,
        submitBtn: "Reset Password",
        header: () => (
            <div className="header mb-5 text-center">
                <h2 className="font-medium text-2xl mb-3">Reset Password</h2>
                <p className="text-[#0d0714]/50">
                    Enter the verification code sent to your email and choose a new password.{" "}
                    <Link
                        to="/auth/login"
                        className="text-[#9e78cf] font-medium transition"
                    >
                        Back to Login
                    </Link>
                </p>
            </div>
        ),
    };
}