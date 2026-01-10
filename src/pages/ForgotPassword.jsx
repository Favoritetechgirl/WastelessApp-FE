import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { toast } from "react-toastify";
import authService from "../services/authService";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            toast.error("Please enter your email address");
            return;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address");
            return;
        }

        setLoading(true);
        try {
            await authService.forgotPassword(email);
            toast.success("Password reset link sent! Check your email.");
            navigate("/checkemail", { state: { email } });
        } catch (error) {
            // Don't reveal if email exists or not for security
            toast.error(error?.message || "Failed to send reset link. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-surface-bg flex flex-col">

            {/* HEADER */}
            <div className="bg-gradient-to-br from-brand-700 to-brand-800 text-white px-6 pt-12 pb-10 rounded-b-wasteless-xl shadow-wasteless-lg">
                <button onClick={() => navigate(-1)} className="text-white text-2xl mb-6 hover:scale-110 transition-transform">←</button>

                <h1 className="text-mobile-h1 md:text-desktop-h1 font-poppins font-medium leading-snug">
                    Password Forgotten, <br /> Not Wasted!
                </h1>

                <p className="text-white/90 text-mobile-body-sm md:text-desktop-body-sm font-inter mt-2 w-64">
                    Just pop in your email address below, and we'll send you a rescue link
                    to get you back on track.
                </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="px-6 mt-8">

                {/* Email */}
                <label className="text-mobile-body-sm md:text-desktop-body-sm font-inter font-medium text-slate-500">Email</label>
                <div className="flex items-center bg-surface-bg border border-utility-border rounded-wasteless mt-1 px-4 py-3 mb-5 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-100 transition-all">
                    <MdEmail className="text-utility-text text-xl" />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g., hero@email.com"
                        className="flex-1 ml-3 outline-none text-mobile-body md:text-desktop-body font-inter placeholder:text-utility-text bg-transparent"
                        disabled={loading}
                    />
                </div>

                {/* Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 rounded-wasteless font-poppins font-medium text-mobile-button md:text-desktop-button transition-all duration-200 ${
                        loading
                            ? 'bg-utility-border text-utility-text cursor-not-allowed'
                            : 'bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white shadow-wasteless hover:shadow-wasteless-md'
                    }`}
                >
                    {loading ? "Sending..." : "Send Rescue Link"}
                </button>

                <p className="text-center text-mobile-caption md:text-desktop-caption font-inter mt-4 text-utility-text">
                    <Link to="/login" className="text-brand-500 hover:text-brand-600 font-medium transition-colors">Back to login</Link>
                </p>
            </form>
        </div>
    );
};

export default ForgotPassword;
