import { useAuthContext } from "@contexts/AuthContext";
import { api } from "@utils/api";
import { Link, useNavigate } from "react-router-dom";
import { Slide, toast } from "react-toastify";
import * as Yup from "yup";

const inputsList = [
    {
        id: "identifier",
        type: "identifier",
        name: "identifier",
        autoComplete: 'on',
        label: "Email Address",
        placeholder: "Enter your email address"
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
    identifier: "",
    password: ""
};
const validationSchema = Yup.object({
    identifier: Yup.string().email().required("Email is Required"),
    password: Yup.string().required("Password is Required").min(6)
});

function useLoginConfig() {

    const { setAuthData } = useAuthContext();
    const navigate = useNavigate();

    const handleSubmit = async ({ values, actions }) => {

        const { identifier, password } = values;
        const { setSubmitting } = actions;

        try {
            const res = await fetch(`${api}/auth/local`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    identifier,
                    password
                })
            });
            const data = await res.json();

            if (data.error) {
                // Show Error Message:
                toast.error(data.error.message, {
                    position: "bottom-left",
                    theme: "dark",
                    toastId: "toastLoginErrorId",
                    transition: Slide
                })
            } else {
                // 
                setAuthData(data);
                localStorage.setItem('auth', JSON.stringify(data));
                navigate('/');
                toast.success(`Welcome back, ${data.user.username}`, {
                    position: "bottom-left",
                    theme: "dark",
                    toastId: "toastLoginErrorId",
                    transition: Slide
                })
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
        submitBtnText: "Login",
        header: () => {
            return (
                <div className="header mb-5 md:mb-10">
                    <h2 className="font-semibold text-xl sm:text-2xl md:text-3xl mb-2">Welcome Back</h2>
                    <p className="text-white/80 mb-2">Login to your account</p>
                    <p>
                        Don't have account?
                        {" "}
                        <Link
                            to={'/auth/signup'}
                            onClick={() => toast.dismiss("toastLoginErrorId")}
                            className="text-[#7d3bd3] transition sm:hover:text-[#7d3bd3]/80"
                        >Signup</Link>
                    </p>
                </div>
            )
        }
    }
}

export default useLoginConfig