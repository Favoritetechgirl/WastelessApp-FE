import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { MdLock } from "react-icons/md";
import { toast } from "react-toastify";
import authService from "../services/authService";

const ChangePassword = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [loading, setLoading] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validatePassword = (password) => {
        const hasNumber = /\d/.test(password);
        const hasUpperCase = /[A-Z]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const isLongEnough = password.length >= 8;

        return {
            hasNumber,
            hasUpperCase,
            hasSpecialChar,
            isLongEnough,
            isValid: hasNumber && hasUpperCase && hasSpecialChar && isLongEnough
        };
    };

    const validation = validatePassword(formData.newPassword);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.currentPassword) {
            toast.error("Please enter your current password");
            return;
        }

        if (!validation.isValid) {
            toast.error("Please meet all password requirements");
            return;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            toast.error("New passwords do not match");
            return;
        }

        setLoading(true);
        try {
            await authService.changePassword({
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword
            });
            toast.success("Password changed successfully!");
            navigate("/settings");
        } catch (error) {
            toast.error(error?.message || "Failed to change password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-white flex flex-col">
            {/* HEADER */}
            <div className="bg-green-900 text-white px-6 pt-12 pb-10 rounded-b-3xl">
                <button onClick={() => navigate(-1)} className="text-white text-2xl mb-6">
                    <ArrowLeft />
                </button>

                <h1 className="text-3xl font-semibold">Change Password</h1>

                <p className="text-white/80 text-sm mt-2 w-64">
                    Keep your account secure by updating your password regularly.
                </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="px-6 mt-8">
                {/* Current Password */}
                <label className="text-sm font-medium">Current Password</label>
                <div className="flex items-center border rounded-full mt-1 px-4 py-3 relative">
                    <MdLock className="text-gray-500 text-xl" />
                    <input
                        type={showCurrentPassword ? "text" : "password"}
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        placeholder="Enter current password"
                        className="flex-1 ml-3 outline-none text-sm"
                    />
                    <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="text-xs"
                    >
                        {showCurrentPassword ? "🙈" : "👁"}
                    </button>
                </div>

                {/* New Password */}
                <label className="text-sm font-medium mt-4 block">New Password</label>
                <div className="flex items-center border rounded-full mt-1 px-4 py-3 relative">
                    <MdLock className="text-gray-500 text-xl" />
                    <input
                        type={showNewPassword ? "text" : "password"}
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        placeholder="Enter new password"
                        className="flex-1 ml-3 outline-none text-sm"
                    />
                    <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="text-xs"
                    >
                        {showNewPassword ? "🙈" : "👁"}
                    </button>
                </div>

                {/* Confirm New Password */}
                <label className="text-sm font-medium mt-4 block">Confirm New Password</label>
                <div className="flex items-center border rounded-full mt-1 px-4 py-3 relative">
                    <MdLock className="text-gray-500 text-xl" />
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Re-enter new password"
                        className="flex-1 ml-3 outline-none text-sm"
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="text-xs"
                    >
                        {showConfirmPassword ? "🙈" : "👁"}
                    </button>
                </div>

                {/* Password Requirements */}
                {formData.newPassword && (
                    <ul className="text-xs mt-4 space-y-1">
                        <li className={validation.hasNumber ? "text-green-600" : "text-gray-400"}>
                            {validation.hasNumber ? "✔" : "○"} At least one number
                        </li>
                        <li className={validation.isLongEnough ? "text-green-600" : "text-gray-400"}>
                            {validation.isLongEnough ? "✔" : "○"} At least eight characters
                        </li>
                        <li className={validation.hasUpperCase ? "text-green-600" : "text-gray-400"}>
                            {validation.hasUpperCase ? "✔" : "○"} At least one uppercase letter
                        </li>
                        <li className={validation.hasSpecialChar ? "text-green-600" : "text-gray-400"}>
                            {validation.hasSpecialChar ? "✔" : "○"} At least one special character
                        </li>
                    </ul>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-600 text-white py-3 rounded-full font-semibold mt-6 disabled:opacity-50"
                >
                    {loading ? "Changing Password..." : "Change Password"}
                </button>
            </form>
        </div>
    );
};

export default ChangePassword;
