import { FaCheck } from "react-icons/fa";

function CustomCheckbox({ className = "", label = "", ...props }) {
    return (
        <label className="custom-checkbox cursor-pointer flex items-center gap-2">
            <input id={props.id || "customCheckboxInput"} type="checkbox" className="hidden peer" {...props} />
            {/* Checkbox */}
            <div className={`checkbox text-sm w-6 h-6 flex items-center justify-center border border-[#9e78cf] text-[#9e78cf] rounded-md opacity-80 peer-checked:opacity-100 peer-checked:[&>svg]:scale-100 transition ${className}`}>
                <FaCheck className="scale-0 transition" />
            </div>
            {/* Label */}
            {
                label &&
                <label htmlFor={props.id || "customCheckboxInput"} className="font-medium">{label}</label>
            }
        </label>
    );
}

export default CustomCheckbox;