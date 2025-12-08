import React from "react";

const Button = ({ text, onClick, className }) => {
    return (
        <button
            onClick={onClick}
            className={`w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition ${className}`}
        >
            {text}
        </button>
    );
};

export default Button;
