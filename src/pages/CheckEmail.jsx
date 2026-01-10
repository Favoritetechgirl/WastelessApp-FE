import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const CheckEmail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || "your email";

    return (
        <div className="min-h-screen w-full bg-surface-bg flex flex-col items-center justify-center px-6">

            <div className="text-center mb-8">
                <div className="text-6xl mb-4">📧</div>
                <h1 className="text-mobile-h1 md:text-desktop-h1 font-poppins font-medium text-slate-500">Check Your Email</h1>
            </div>

            <p className="text-utility-text text-mobile-body md:text-desktop-body font-inter text-center max-w-xs mb-2">
                We've sent a password reset link to:
            </p>
            <p className="text-brand-600 font-medium text-mobile-body md:text-desktop-body font-inter text-center mb-6">
                {email}
            </p>
            <p className="text-utility-text text-mobile-body-sm md:text-desktop-body-sm font-inter text-center max-w-xs mb-8">
                Click the link in the email to reset your password. If you don't see it, check your spam folder.
            </p>

            <button
                onClick={() => navigate('/login')}
                className="w-full max-w-xs bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white py-3 rounded-wasteless font-poppins font-medium transition-all shadow-wasteless hover:shadow-wasteless-md"
            >
                Back to Login
            </button>

            <p className="text-mobile-caption md:text-desktop-caption font-inter text-utility-text mt-4">
                Didn't receive the email?{" "}
                <button
                    onClick={() => navigate('/forgotpassword')}
                    className="text-brand-500 hover:text-brand-600 font-medium transition-colors"
                >
                    Try again
                </button>
            </p>
        </div>
    );
};

export default CheckEmail;
