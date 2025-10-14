import * as Yup from "yup";
import { useSignUp } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const inputList = [
    {
        id: "code",
        name: "code",
        type: "text",
        label: "OTP Code",
        autoComplete: "off",
        placeholder: "Enter your OTP Code",
    },
];
const initialValues = {
    code: "",
};
const validationSchema = Yup.object({
    code: Yup.string()
        .required("Verification code is required")
        .length(6, "Code must be 6 digits"),
});

export default function useVerifyEmailConfig() {

    const { signUp, setActive } = useSignUp();
    const navigate = useNavigate();

    const handleSubmit = async (values, actions) => {
        const { setSubmitting } = actions;
        const { code } = values;

        try {
            const result = await signUp.attemptEmailAddressVerification({
                code,
            });

            if (result.status === "complete") {
                await setActive({ session: result.createdSessionId });
                // Navigate to Home Page
                navigate('/');
            } else {
                console.log("Unexpected result:", result);
            }
        } catch (submitError) {
            console.error(submitError);
            if (submitError.errors) {
                const formikErrors = {};
                submitError.errors.forEach((error) => {
                    formikErrors.code = error.message;
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
        submitBtn: "Verify Now",
        header: () => (
            <div className="header mb-5 text-center">
                <h2 className="font-medium text-2xl mb-3">Verify Your Email</h2>
                <p>Enter the 6-digit code sent to your email to verify your account.</p>
            </div>
        ),
    };
}