import { Formik } from "formik";
import useLoginConfig from "./hooks/useLoginConfig";
import useSignupConfig from "./hooks/useSignupConfig";
import useForgetPasswordConfig from './hooks/useForgetPasswordConfig';
import useResetPasswordConfig from './hooks/useResetPasswordConfig';
import useVerifyEmail from './hooks/useVerifyEmailConfig';
import FormikInput from "../ui/FormikInput";
import { FaArrowRight, FaSpinner } from "react-icons/fa";

/**
 * @param {Object} props
 * @param {"login" | "signup" | "forgetPassword" | "resetPassword" | "verifyEmail"} [props.method]
 */

function AuthFormikWithClerk({ method = "login" }) {

    const loginConfig = useLoginConfig();
    const signupConfig = useSignupConfig();
    const forgetPasswordConfig = useForgetPasswordConfig();
    const resetPasswordConfig = useResetPasswordConfig();
    const verifyEmailConfig = useVerifyEmail();

    const configMap = {
        login: loginConfig,
        signup: signupConfig,
        forgetPassword: forgetPasswordConfig,
        resetPassword: resetPasswordConfig,
        verifyEmail: verifyEmailConfig,
    };

    const config = configMap[method];

    return (
        <Formik
            initialValues={config.initialValues}
            validationSchema={config.validationSchema}
            onSubmit={(values, actions) => config.handleSubmit(values, actions)}
        >
            {(actions) => (
                <form onSubmit={actions.handleSubmit} className="md:max-w-[750px] md:mx-auto">
                    {/* Header */}
                    {
                        config.header &&
                        config.header(actions)
                    }

                    {/* Inputs Wrapper */}
                    <div className="inputs-wrapper space-y-3 mb-5">
                        {
                            (config.inputList || []).map(({ ...props }, index) => (<FormikInput
                                key={index}
                                {...{
                                    ...props,
                                    onChange: actions.handleChange,
                                    onBlur: actions.handleBlur
                                }}
                            />))
                        }
                    </div>

                    {/* Actions */}
                    {
                        config.actions &&
                        config.actions(actions)
                    }

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={actions.isSubmitting}
                        className='py-3 px-4 rounded-md font-medium transition bg-[#7d3bd3] text-white sm:hover:bg-[#9e78cf]/80 w-full flex items-center justify-center gap-2'
                    >
                        <span>{config.submitBtn}</span>
                        {
                            actions.isSubmitting ? (
                                <FaSpinner className="animate-spin" />
                            ) : (
                                <FaArrowRight />
                            )
                        }
                    </button>

                    {/* Footer */}
                    {
                        config.footer &&
                        config.footer(actions)
                    }
                </form>
            )}
        </Formik>
    )
}

export default AuthFormikWithClerk;