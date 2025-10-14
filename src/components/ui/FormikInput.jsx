import { ErrorMessage } from "formik";

function FormikInput({ label = "", ...props }) {
    return (
        <div className="formik-props">
            {
                label &&
                <label htmlFor={props.id} className="mb-2 font-medium block w-fit">{label}</label>
            }
            <input
                {...props}
                className="w-full p-3 rounded-md bg-white border border-gray-200 text-[#0d0714] placeholder:text-[#0d0714]/50"
            />
            {/* Error Message */}
            <ErrorMessage className="mt-2 text-red-500 font-medium" component={'div'} name={props.name} />
        </div>
    )
}

export default FormikInput;