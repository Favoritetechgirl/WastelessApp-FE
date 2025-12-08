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
        <div className="min-h-screen w-full flex flex-col bg-white">

            {/* TOP SECTION */}
            <div className="bg-green-900 text-white px-6 pt-12 pb-10 rounded-b-3xl">
                <button onClick={() => navigate('/')} className="text-white text-2xl mb-6">←</button>

                <h1 className="text-3xl font-semibold">
                    Welcome Back, <br /> Climate Hero!
                </h1>

                <p className="text-white/80 text-sm mt-2">
                    Let's peek at what's in the fridge before it gets lonely.
                </p>
            </div>

            {/* FORM CARD */}
            <form className="px-6 mt-6" onSubmit={handleSubmit}>

                {/* Email */}
                <label className="text-sm font-medium">Email</label>
                <div className="flex items-center bg-white border rounded-full mt-1 mb-3 px-4 py-3">
                    <MdEmail className="text-gray-500 text-xl" />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g., hero@email.com"
                        className="flex-1 ml-3 outline-none text-sm"
                    />
                </div>

                {/* Password */}
                <label className="text-sm font-medium">Password</label>
                <div className="flex items-center bg-white border rounded-full mt-1 px-4 py-3 relative">
                    <MdLock className="text-gray-500 text-xl" />
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                        className="flex-1 ml-3 outline-none text-sm"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-xs text-gray-500 absolute right-4 top-3 cursor-pointer"
                    >
                        {showPassword ? "🙈" : "👁"}
                    </button>
                </div>

                <div className="w-full flex justify-end mt-1 mb-4">
                    <Link to="/forgotpassword" className="text-xs text-gray-600">
                        Forgot password?
                    </Link>
                </div>

                {/* Log In Button */}
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-green-600 text-white rounded-full py-3 font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Logging in..." : "Log in"}
                </button>

                <p className="text-center text-xs mt-3">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-green-700 font-medium">
                        Sign up
                    </Link>
                </p>

                {/* Divider */}
                <div className="flex items-center my-4">
                    <span className="flex-1 h-px bg-gray-300"></span>
                    <span className="px-3 text-xs text-gray-500">Or login using</span>
                    <span className="flex-1 h-px bg-gray-300"></span>
                </div>

                {/* Icons */}
                <div className="flex justify-center gap-6 mb-8">
                    <FaGoogle className="text-red-500 text-xl" />
                    <FaApple className="text-black text-xl" />
                    <FaFacebook className="text-blue-600 text-xl" />
                </div>
            </form>
        </div>
    );
};

export default Login;
