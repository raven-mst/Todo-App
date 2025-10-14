import { useUser } from "@clerk/clerk-react";
import { FaSpinner } from "react-icons/fa";

function ScreenLoading() {
    const { isLoaded } = useUser();
    return (
        <div className={`bg-inherit text-inherit w-full h-screen flex items-center justify-center transition absolute left-0 top-0 z-50 ease-in-out duration-500 ${isLoaded ? "-translate-y-full opacity-0" : ""}`}>
            <div className="container flex items-center justify-center gap-2">
                <FaSpinner size={22} className="animate-spin" />
                {"Loading..."}
            </div>
        </div>
    )
}

export default ScreenLoading;