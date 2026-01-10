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

            // Register the user but don't auto-login
            await authService.registerOnly(userData);

            toast.success("Registration successful! Please login to continue.");

            // Redirect to login page - user must login manually
            navigate("/login", { replace: true });
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
        <div className="min-h-screen w-full flex flex-col bg-surface-bg">

            {/* HEADER - Using proper brand gradient */}
            <div className="bg-gradient-to-br from-brand-700 to-brand-800 text-white px-6 pt-12 pb-10 rounded-b-wasteless-xl shadow-wasteless-lg">
                <button onClick={() => navigate('/')} className="text-white text-2xl mb-6 hover:scale-110 transition-transform">←</button>

                <h1 className="text-mobile-h1 md:text-desktop-h1 font-poppins font-medium">
                    Be a Climate Hero, <br /> from Your Kitchen.
                </h1>

                <p className="text-white/90 text-mobile-body-sm md:text-desktop-body-sm font-inter mt-2">
                    We'll be the annoying friend who reminds you… in a nice way!
                </p>
            </div>

            {/* FORM */}
            <form className="px-6 mt-6" onSubmit={handleSubmit}>

                {/* Email */}
                <label className="text-mobile-body-sm md:text-desktop-body-sm font-inter font-medium text-slate-500">Email</label>
                <div className="flex items-center bg-surface-bg border border-utility-border rounded-wasteless mt-1 mb-3 px-4 py-3 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-100 transition-all">
                    <MdEmail className="text-utility-text text-xl" />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g., hero@email.com"
                        className="flex-1 ml-3 outline-none text-mobile-body md:text-desktop-body font-inter placeholder:text-utility-text bg-transparent"
                    />
                </div>

                {/* First Name */}
                <label className="text-mobile-body-sm md:text-desktop-body-sm font-inter font-medium text-slate-500">First Name</label>
                <div className="flex items-center bg-surface-bg border border-utility-border rounded-wasteless mt-1 mb-3 px-4 py-3 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-100 transition-all">
                    <FaUser className="text-utility-text text-xl" />
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="e.g., Nkechi, John, etc."
                        className="flex-1 ml-3 outline-none text-mobile-body md:text-desktop-body font-inter placeholder:text-utility-text bg-transparent"
                    />
                </div>

                {/* Last Name */}
                <label className="text-mobile-body-sm md:text-desktop-body-sm font-inter font-medium text-slate-500">Last Name</label>
                <div className="flex items-center bg-surface-bg border border-utility-border rounded-wasteless mt-1 mb-3 px-4 py-3 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-100 transition-all">
                    <FaUser className="text-utility-text text-xl" />
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="e.g., Nkechi, John, etc."
                        className="flex-1 ml-3 outline-none text-mobile-body md:text-desktop-body font-inter placeholder:text-utility-text bg-transparent"
                    />
                </div>

                {/* Password */}
                <label className="text-mobile-body-sm md:text-desktop-body-sm font-inter font-medium text-slate-500">Password</label>
                <div className="flex items-center bg-surface-bg border border-utility-border rounded-wasteless mt-1 px-4 py-3 relative focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-100 transition-all">
                    <MdLock className="text-utility-text text-xl" />
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                        className="flex-1 ml-3 outline-none text-mobile-body md:text-desktop-body font-inter placeholder:text-utility-text bg-transparent"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-mobile-caption md:text-desktop-caption absolute right-4 top-4 cursor-pointer hover:scale-110 transition-transform"
                    >
                        {showPassword ? "🙈" : "👁"}
                    </button>
                </div>

                {/* Re-enter Password */}
                <label className="text-mobile-body-sm md:text-desktop-body-sm font-inter font-medium text-slate-500 block mt-3">Re-enter Password</label>
                <div className="flex items-center bg-surface-bg border border-utility-border rounded-wasteless mt-1 px-4 py-3 relative focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-100 transition-all">
                    <MdLock className="text-utility-text text-xl" />
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Re-Enter password"
                        className="flex-1 ml-3 outline-none text-mobile-body md:text-desktop-body font-inter placeholder:text-utility-text bg-transparent"
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="text-mobile-caption md:text-desktop-caption absolute right-4 top-4 cursor-pointer hover:scale-110 transition-transform"
                    >
                        {showConfirmPassword ? "🙈" : "👁"}
                    </button>
                </div>

                {/* Password Requirements */}
                <div className="mt-4 space-y-1">
                    <p className={`text-mobile-caption md:text-desktop-caption font-inter flex items-center ${passwordValidation.hasNumber ? 'text-brand-500' : 'text-utility-text'}`}>
                        {passwordValidation.hasNumber ? '✓' : '○'} At least one number
                    </p>
                    <p className={`text-mobile-caption md:text-desktop-caption font-inter flex items-center ${passwordValidation.hasMinLength ? 'text-brand-500' : 'text-utility-text'}`}>
                        {passwordValidation.hasMinLength ? '✓' : '○'} At least eight characters
                    </p>
                    <p className={`text-mobile-caption md:text-desktop-caption font-inter flex items-center ${passwordValidation.hasUppercase ? 'text-brand-500' : 'text-utility-text'}`}>
                        {passwordValidation.hasUppercase ? '✓' : '○'} At least one uppercase letter
                    </p>
                    <p className={`text-mobile-caption md:text-desktop-caption font-inter flex items-center ${passwordValidation.hasSpecialChar ? 'text-brand-500' : 'text-utility-text'}`}>
                        {passwordValidation.hasSpecialChar ? '✓' : '○'} At least one special character
                    </p>
                    <p className={`text-mobile-caption md:text-desktop-caption font-inter flex items-center ${passwordValidation.passwordsMatch ? 'text-brand-500' : 'text-utility-text'}`}>
                        {passwordValidation.passwordsMatch ? '✓' : '○'} Passwords match
                    </p>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading || !Object.values(passwordValidation).every(v => v)}
                    className={`w-full py-4 rounded-wasteless mt-6 text-mobile-button md:text-desktop-button font-poppins font-medium transition-all duration-200 ${
                        loading || !Object.values(passwordValidation).every(v => v)
                            ? 'bg-utility-border text-utility-text cursor-not-allowed'
                            : 'bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white shadow-wasteless hover:shadow-wasteless-md'
                    }`}
                >
                    {loading ? "Creating account..." : "Create account"}
                </button>

                {/* Footer */}
                <p className="text-center mt-6 text-mobile-body-sm md:text-desktop-body-sm font-inter text-utility-text">
                    Already have an account?{" "}
                    <Link to="/login" className="text-brand-500 hover:text-brand-600 font-medium transition-colors">
                        Log in
                    </Link>
                </p>

                {/* Social Login Divider */}
                <div className="flex items-center mt-6 mb-4">
                    <div className="flex-1 h-px bg-utility-border"></div>
                    <span className="px-4 text-mobile-caption md:text-desktop-caption font-inter text-utility-text">Or signup using</span>
                    <div className="flex-1 h-px bg-utility-border"></div>
                </div>

                {/* Social Login Buttons */}
                <div className="flex justify-center gap-4">
                    <button
                        type="button"
                        className="w-12 h-12 rounded-full border border-utility-border flex items-center justify-center opacity-50 cursor-not-allowed"
                        onClick={() => toast.info("Google signup coming soon!")}
                        title="Coming soon"
                    >
                        <FaGoogle className="text-danger-500 text-xl" />
                    </button>
                    <button
                        type="button"
                        className="w-12 h-12 rounded-full border border-utility-border flex items-center justify-center opacity-50 cursor-not-allowed"
                        onClick={() => toast.info("Apple signup coming soon!")}
                        title="Coming soon"
                    >
                        <FaApple className="text-slate-500 text-2xl" />
                    </button>
                    <button
                        type="button"
                        className="w-12 h-12 rounded-full border border-utility-border flex items-center justify-center opacity-50 cursor-not-allowed"
                        onClick={() => toast.info("Facebook signup coming soon!")}
                        title="Coming soon"
                    >
                        <FaFacebook className="text-impact-500 text-xl" />
                    </button>
                </div>
                <p className="text-center text-mobile-caption font-inter text-utility-text mt-3 mb-4">Social signup coming soon</p>
            </form>
        </div>
    );
};

export default Signup;
