import { useAuthContext } from "@contexts/AuthContext";
import { api } from "@utils/api";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

const inputsList = [
    {
        id: "username",
        type: "username",
        name: "username",
        autoComplete: 'on',
        label: "Username",
        placeholder: "Enter your username - ex: mustafa sayed"
    },
    {
        id: "email",
        type: "email",
        name: "email",
        label: "Email",
        autoComplete: 'on',
        placeholder: "Email address"
    },
    {
        id: "password",
        type: "password",
        name: "password",
        label: "Password",
        placeholder: "Password"
    }
];
const initialValues = {
    username: "",
    email: "",
    password: ""
};
const validationSchema = Yup.object({
    username: Yup.string().required("Username is Required").min(3),
    email: Yup.string().email().required("Email is Required"),
    password: Yup.string().required("Password is Required").min(6)
});

function useSignupConfig() {

    const { setAuthData } = useAuthContext();
    const navigate = useNavigate();

    const handleSubmit = async ({ values, actions }) => {

        const { username, email, password } = values;
        const { setSubmitting } = actions;

        try {
            const res = await fetch(`${api}/auth/local/register`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                })
            });
            const data = await res.json();

            if (data.error) {
                // Show Error Message:
                toast.error(data.error.message, {
                    position: "bottom-left",
                    theme: "dark",
                    toastId: "toastSignupErrorId"
                })
            } else {
                // 
                setAuthData(data);
                localStorage.setItem('auth', JSON.stringify(data));
                navigate('/');
            }
        } catch (err) {
            console.log(err);
        } finally {
            setSubmitting(false);
        }
    };

    return {
        handleSubmit,
        inputsList,
        initialValues,
        validationSchema,
        submitBtnText: "Create Account",
        header: () => {
            return (
                <div className="header mb-5 md:mb-10">
                    <h2 className="font-semibold text-xl sm:text-2xl md:text-3xl mb-2">Create Account</h2>
                    <p className="text-white/80 mb-2">Login to your account</p>
                    <p>
                        Already have account?
                        {" "}
                        <Link
                            to={'/auth/login'}
                            onClick={() => toast.dismiss("toastSignupErrorId")}
                            className="text-[#7d3bd3] transition sm:hover:text-[#7d3bd3]/80"
                        >Login</Link>
                    </p>
                </div>
            )
        },
    }
}

export default useSignupConfig