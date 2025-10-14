import { ReactElement } from "react";

export interface ButtonProps {
    variant: "primary" | "secondary";
    text: string;
    startIcon?: ReactElement;
    onClick?: () => void;
    fullWidth?: boolean;
    loading?: boolean;
}

const variantClasses = {
    "primary": "bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-200",
    "secondary": "bg-purple-200 hover:bg-purple-300 text-purple-600 transition-colors duration-200"
};

const defaultStyles = "px-4 py-2 rounded-md font-medium flex items-center justify-center";

export function Button({ variant, text, startIcon, onClick, fullWidth, loading }: ButtonProps) {
    return (
        <button 
            onClick={onClick} 
            className={`${variantClasses[variant]} ${defaultStyles} ${fullWidth ? "w-full" : ""} ${loading ? "opacity-50 cursor-not-allowed" : "hover:scale-105"} transform transition-all duration-200`}
            disabled={loading}
        >
            {startIcon && (
                <div className="pr-2">
                    {startIcon}
                </div>
            )}
            {text}
        </button>
    );
}