import { ErrorMessage, Formik } from "formik";
import { FaArrowRight, FaSpinner } from "react-icons/fa";
// Configs:
import useLoginConfig from "./hooks/useLoginConfig";
import useSignupConfig from "./hooks/useSignupConfig";

function AuthFormik({ method = 'login' }) {

    const configs = {
        login: useLoginConfig(),
        signup: useSignupConfig()
    };

    const config = configs[method];
    const {
        handleSubmit,
        inputsList,
        initialValues,
        validationSchema
    } = config;

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
                handleSubmit({ values, actions });
            }}
        >
            {({
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
            }) => (
                <form onSubmit={handleSubmit} className="md:max-w-[750px] md:mx-auto">

                    {/* Header */}
                    {config.header && config.header()}

                    {/* Inputs */}
                    <div className="inputs-wrapper space-y-3 mb-5">
                        {
                            inputsList.map(({ label, ...input }, index) => (<div className="input-group" key={index}>
                                <label
                                    htmlFor={input.id}
                                >
                                    {label}
                                </label>
                                <input
                                    {...input}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    className="w-full mt-2 p-3 border border-[#7d3bd3] rounded-md"
                                />
                                <ErrorMessage name={input.name} component={"div"} className="mt-2 text-red-500" />
                            </div>))
                        }
                    </div>

                    {/* Actions */}
                    {config.actions && config.actions()}

                    {/* Submit */}
                    <div className="submit">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-[#7d3bd3] py-2 px-4 rounded-md w-full font-semibold flex items-center justify-center gap-2"
                        >
                            <span>{config.submitBtnText || "Submit"}</span>
                            {
                                isSubmitting ? (
                                    <FaSpinner size={22} className="animate-spin" />
                                ) : (
                                    <FaArrowRight />
                                )
                            }
                        </button>
                    </div>

                    {/* Footer  */}
                    {config.footer && config.footer()}

                </form>
            )}
        </Formik>
    )
}

export default AuthFormik;