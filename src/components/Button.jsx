import React from "react";

const Button = ({
    text,
    onClick,
    className = "",
    variant = "primary",
    disabled = false,
    type = "button",
    fullWidth = true
}) => {
    const baseStyles = "font-poppins font-medium rounded-wasteless transition-all duration-200 px-6 py-3 text-mobile-button md:text-desktop-button disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white shadow-sm hover:shadow-md",
        secondary: "bg-surface-accent hover:bg-utility-border text-slate-500 hover:text-slate-600",
        danger: "bg-danger-500 hover:bg-danger-600 active:bg-danger-700 text-white shadow-sm hover:shadow-md",
        outline: "border-2 border-brand-500 text-brand-500 hover:bg-brand-50 active:bg-brand-100",
        ghost: "text-brand-500 hover:bg-brand-50 active:bg-brand-100",
    };

    const widthClass = fullWidth ? "w-full" : "";

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
        >
            {text}
        </button>
    );
};

export default Button;
