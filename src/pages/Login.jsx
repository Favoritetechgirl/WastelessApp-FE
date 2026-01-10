import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdEmail, MdLock } from "react-icons/md";
import { FaGoogle, FaApple, FaFacebook } from "react-icons/fa";
import { toast } from "react-toastify";
import authService from "../services/authService";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    // Redirect if already logged in
    useEffect(() => {
        if (authService.isAuthenticated()) {
            const user = authService.getStoredUser();
            if (user?.onboardingCompleted) {
                navigate("/inventory", { replace: true });
            } else {
                navigate("/onboarding", { replace: true });
            }
        }
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            toast.error("Please fill in all fields");
            return;
        }

        try {
            setLoading(true);
            const response = await authService.login(formData);
            toast.success("Login successful!");

            // Check onboarding status from backend response
            if (response.onboardingCompleted) {
                navigate("/inventory", { replace: true });
            } else {
                navigate("/onboarding", { replace: true });
            }
        } catch (error) {
            toast.error(error.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex flex-col bg-surface-bg">

            {/* TOP SECTION */}
            <div className="bg-gradient-to-br from-brand-700 to-brand-800 text-white px-6 pt-12 pb-10 rounded-b-3xl shadow-wasteless-lg">
                <button onClick={() => navigate('/')} className="text-white text-2xl mb-6 hover:scale-110 transition-transform">←</button>

                <h1 className="text-mobile-h1 md:text-desktop-h1 font-poppins font-medium">
                    Welcome Back, <br /> Climate Hero!
                </h1>

                <p className="text-white/90 text-mobile-body-sm font-inter mt-2">
                    Let's peek at what's in the fridge before it gets lonely.
                </p>
            </div>

            {/* FORM CARD */}
            <form className="px-6 mt-6" onSubmit={handleSubmit}>

                {/* Email */}
                <label className="text-mobile-body-sm font-inter font-medium text-slate-500">Email</label>
                <div className="flex items-center bg-surface-bg border border-utility-border rounded-wasteless mt-1 mb-3 px-4 py-3 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-100 transition-all">
                    <MdEmail className="text-utility-text text-xl" />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g., hero@email.com"
                        className="flex-1 ml-3 outline-none text-mobile-body font-inter placeholder:text-utility-text bg-transparent"
                    />
                </div>

                {/* Password */}
                <label className="text-mobile-body-sm font-inter font-medium text-slate-500">Password</label>
                <div className="flex items-center bg-surface-bg border border-utility-border rounded-wasteless mt-1 px-4 py-3 relative focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-100 transition-all">
                    <MdLock className="text-utility-text text-xl" />
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                        className="flex-1 ml-3 outline-none text-mobile-body font-inter placeholder:text-utility-text bg-transparent"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-xs text-utility-text absolute right-4 top-3 cursor-pointer hover:text-brand-500 transition-colors"
                    >
                        {showPassword ? "🙈" : "👁"}
                    </button>
                </div>

                <div className="w-full flex justify-end mt-1 mb-4">
                    <Link to="/forgotpassword" className="text-mobile-caption font-inter text-brand-500 hover:text-brand-600 transition-colors">
                        Forgot password?
                    </Link>
                </div>

                {/* Log In Button */}
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-brand-500 text-white rounded-wasteless py-3 font-poppins font-medium text-mobile-button hover:bg-brand-600 active:bg-brand-700 transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Logging in..." : "Log in"}
                </button>

                <p className="text-center text-mobile-caption font-inter mt-3 text-slate-500">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-brand-500 hover:text-brand-600 font-medium transition-colors">
                        Sign up
                    </Link>
                </p>

                {/* Divider */}
                <div className="flex items-center my-4">
                    <span className="flex-1 h-px bg-utility-border"></span>
                    <span className="px-3 text-mobile-caption font-inter text-utility-text">Or login using</span>
                    <span className="flex-1 h-px bg-utility-border"></span>
                </div>

                {/* Social Login Icons */}
                <div className="flex justify-center gap-6 mb-8">
                    <button
                        type="button"
                        className="hover:scale-110 transition-transform opacity-50 cursor-not-allowed"
                        onClick={() => toast.info("Google login coming soon!")}
                        title="Coming soon"
                    >
                        <FaGoogle className="text-danger-500 text-xl" />
                    </button>
                    <button
                        type="button"
                        className="hover:scale-110 transition-transform opacity-50 cursor-not-allowed"
                        onClick={() => toast.info("Apple login coming soon!")}
                        title="Coming soon"
                    >
                        <FaApple className="text-slate-500 text-xl" />
                    </button>
                    <button
                        type="button"
                        className="hover:scale-110 transition-transform opacity-50 cursor-not-allowed"
                        onClick={() => toast.info("Facebook login coming soon!")}
                        title="Coming soon"
                    >
                        <FaFacebook className="text-impact-500 text-xl" />
                    </button>
                </div>
                <p className="text-center text-mobile-caption font-inter text-utility-text mb-4">Social login coming soon</p>
            </form>
        </div>
    );
};

export default Login;
