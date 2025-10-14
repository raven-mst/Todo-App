import { Link } from "react-router-dom";

/**
 * @param {Object} props
 * @param {string} [props.to]
 * @param {"button" | "submit" | "reset"} [props.type]
 * @param {"primary"} [props.variant]
 * @param {string} [props.className]
 * @param {React.ReactNode} [props.children]
 */

function Button({ to = "", type = "button", variant = "primary", className = "", children, ...props }) {

    const variants = {
        primary: "bg-green-600 text-white sm:hover:bg-green-700",
    };

    const finalClassName = `${variants[variant]} ${className} py-3 px-4 rounded-md font-medium transition`;

    if (to) {
        return (
            <Link
                to={to}
                {...props}
                className={`${finalClassName}`}
            >
                {children}
            </Link>
        )
    };

    return (
        <button
            {...props}
            type={type}
            className={`${finalClassName}`}
        >
            {children}
        </button>
    )
}

export default Button;