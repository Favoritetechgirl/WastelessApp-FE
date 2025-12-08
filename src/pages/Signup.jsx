import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdEmail, MdLock } from "react-icons/md";
import { FaGoogle, FaApple, FaFacebook, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import authService from "../services/authService";


const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

    // Password validation
    const passwordValidation = {
        hasNumber: /\d/.test(formData.password),
        hasMinLength: formData.password.length >= 8,
        hasUppercase: /[A-Z]/.test(formData.password),
        hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password),
        passwordsMatch: formData.password && formData.confirmPassword && formData.password === formData.confirmPassword
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!formData.email || !formData.firstName || !formData.lastName || !formData.password || !formData.confirmPassword) {
            toast.error("Please fill in all fields");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (!Object.values(passwordValidation).every(v => v)) {
            toast.error("Password does not meet all requirements");
            return;
        }

        try {
            setLoading(true);
            const userData = {
                email: formData.email,
                fullName: `${formData.firstName} ${formData.lastName}`,
                password: formData.password
            };

            await authService.register(userData);

            toast.success("Registration successful! Let's set up your account.");

            // User is now logged in (authService stores the token)
            // Navigate directly to onboarding for new users
            navigate("/onboarding", { replace: true });
        } catch (error) {
            // Better error messaging
            const errorMessage = error?.message || error?.error || "Failed to create account";

            if (errorMessage.toLowerCase().includes('already exists') ||
                errorMessage.toLowerCase().includes('duplicate') ||
                errorMessage.toLowerCase().includes('already registered') ||
                errorMessage.toLowerCase().includes('email')) {
                toast.error("Email already exists. Please login instead.");
            } else {
                toast.error(errorMessage);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex flex-col bg-white">

            {/* HEADER */}
            <div className="bg-green-900 text-white px-6 pt-12 pb-10 rounded-b-3xl">
                <button onClick={() => navigate('/')} className="text-white text-2xl mb-6">←</button>

                <h1 className="text-3xl font-semibold leading-snug">
                    Be a Climate Hero, <br /> from Your Kitchen.
                </h1>

                <p className="text-white/80 text-sm mt-2 w-64">
                    We’ll be the annoying friend who reminds you… in a nice way!
                </p>
            </div>

            {/* FORM */}
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

                {/* First Name */}
                <label className="text-sm font-medium">First Name</label>
                <div className="flex items-center border rounded-full mt-1 mb-3 px-4 py-3">
                    <FaUser className="text-gray-500 text-xl" />
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="e.g., Nkechi, John, etc."
                        className="flex-1 ml-3 outline-none text-sm"
                    />
                </div>

                {/* Last Name */}
                <label className="text-sm font-medium">Last Name</label>
                <div className="flex items-center border rounded-full mt-1 mb-3 px-4 py-3">
                    <FaUser className="text-gray-500 text-xl" />
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="e.g., Nkechi, John, etc."
                        className="flex-1 ml-3 outline-none text-sm"
                    />
                </div>

                {/* Password */}
                <label className="text-sm font-medium">Password</label>
                <div className="flex items-center border rounded-full mt-1 px-4 py-3 relative">
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
                        className="text-xs absolute right-4 top-3 cursor-pointer"
                    >
                        {showPassword ? "🙈" : "👁"}
                    </button>
                </div>

                {/* Re-enter Password */}
                <label className="text-sm font-medium mt-3">Re-enter Password</label>
                <div className="flex items-center border rounded-full mt-1 px-4 py-3 relative">
                    <MdLock className="text-gray-500 text-xl" />
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Re-Enter password"
                        className="flex-1 ml-3 outline-none text-sm"
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="text-xs absolute right-4 top-3 cursor-pointer"
                    >
                        {showConfirmPassword ? "🙈" : "👁"}
                    </button>
                </div>

                {/* Password Rules */}
                <ul className="text-xs mt-3 space-y-1">
                    <li className={passwordValidation.hasNumber ? "text-green-600" : "text-gray-400"}>
                        {passwordValidation.hasNumber ? "✔" : "○"} At least one number
                    </li>
                    <li className={passwordValidation.hasMinLength ? "text-green-600" : "text-gray-400"}>
                        {passwordValidation.hasMinLength ? "✔" : "○"} At least eight characters
                    </li>
                    <li className={passwordValidation.hasUppercase ? "text-green-600" : "text-gray-400"}>
                        {passwordValidation.hasUppercase ? "✔" : "○"} At least one uppercase letter
                    </li>
                    <li className={passwordValidation.hasSpecialChar ? "text-green-600" : "text-gray-400"}>
                        {passwordValidation.hasSpecialChar ? "✔" : "○"} At least one special character
                    </li>
                    <li className={passwordValidation.passwordsMatch ? "text-green-600" : "text-gray-400"}>
                        {passwordValidation.passwordsMatch ? "✔" : "○"} Passwords match
                    </li>
                </ul>

                {/* Create Account */}
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-green-600 text-white rounded-full py-3 font-semibold mt-5 hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Creating account..." : "Create account"}
                </button>

                <p className="text-center text-xs mt-3">
                    Already have an account?{" "}
                    <Link to="/login" className="text-green-700 font-medium">
                        Log in
                    </Link>
                </p>

                {/* Divider */}
                <div className="flex items-center my-4">
                    <span className="flex-1 h-px bg-gray-300"></span>
                    <span className="px-3 text-xs text-gray-500">Or signup using</span>
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

export default Signup;
