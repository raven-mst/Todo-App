import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import CustomCheckbox from "../../ui/CustomCheckbox";
import { useSignUp } from "@clerk/clerk-react";

const inputList = [
    {
        id: "firstName",
        name: "firstName",
        type: "text",
        label: "First Name",
        autoComplete: "on",
        placeholder: "Enter your First Name"
    },
    {
        type: "text",
        id: "lastName",
        name: "lastName",
        label: "Last Name",
        autoComplete: "on",
        placeholder: "Enter your Last Name"
    },
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
    },
    {
        id: "confirmPassword",
        name: "confirmPassword",
        type: "password",
        label: "Confirm Password",
        placeholder: "Confirm Password"
    }
];
const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    conditions: true
};
const validationSchema = Yup.object({
    firstName: Yup.string()
        .required("First Name is Required")
        .min(4).max(64),
    lastName: Yup.string().
        required("Last Name is Required")
        .min(4).max(64),
    email: Yup.string("Email must be a string")
        .email("Email must be a valid Email address")
        .required("Email is Required"),
    password: Yup.string()
        .required("Password is Required")
        .min(8).max(64),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], "Confirm Password must be match Password")
        .required("Confirm Password is Required"),
    conditions: Yup.bool()
        .oneOf([true]).required("Must be accepts Conditions")
});

export default function useSignupConfig() {

    const navigate = useNavigate();
    const { signUp, setActive } = useSignUp();

    const handleSubmit = async (values, actions) => {

        const { setSubmitting } = actions;
        const { firstName, lastName, email, password } = values;

        try {
            const result = await signUp.create({
                firstName,
                lastName,
                emailAddress: email,
                password
            });

            if (result.status === 'missing_requirements') {
                await signUp.prepareEmailAddressVerification({ strategy: "email_code", });
                // Navigate to Verify Email Page:
                navigate('/auth/verify-email');
            } else if (result.status === "complete") {
                await setActive({ session: result.createdSessionId })
                // Navigate to Home Page
                setTimeout(() => {
                    navigate('/');
                }, 0)
            } else {
                console.log("Unexpected Error Result");
            }

        } catch (submitError) {
            if (submitError.errors) {
                console.log(submitError.errors);
                const formikErrors = {};
                submitError.errors.forEach(error => {
                    if (error.meta.paramName === "email_address" || error.code === "session_exists") {
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
        submitBtn: "Signup",
        header: () => (<div className="header mb-5">
            <h2 className="font-medium text-2xl mb-3">Create account</h2>
            <p>
                Already have account?
                {" "}
                <Link to={'/auth/login'} className="text-green-600 font-medium transition sm:hover:text-green-700">Login</Link>
            </p>
        </div>),
        actions: (actions) => (<div className="actions flex items-center justify-between mb-5">
            {/* Conditions */}
            <div className="conditions flex items-center gap-2">
                <CustomCheckbox
                    defaultChecked={initialValues.conditions}
                    className={`${actions.errors.conditions && "border-red-500"}`}
                    onChange={e => actions.setFieldValue("conditions", e.target.checked)}
                />
                <p className="font-medium">Accept Conditions and Privacy Terms</p>
            </div>
        </div>)
    }
};