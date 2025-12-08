import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import authService from "../services/authService";

export default function EditProfile() {
    const navigate = useNavigate();
    const [, setUser] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [profilePictureBase64, setProfilePictureBase64] = useState(null);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
    });

    useEffect(() => {
        const userData = authService.getStoredUser();
        if (userData) {
            setUser(userData);
            setFormData({
                fullName: userData.fullName || '',
                email: userData.email || '',
                phone: userData.phone || '',
            });
            // Set existing profile picture if available
            if (userData.profilePicture) {
                setAvatarPreview(userData.profilePicture);
            }
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                toast.error("Image size should be less than 5MB");
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result);
                setProfilePictureBase64(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Prepare update data
            const updateData = {
                fullName: formData.fullName,
                phone: formData.phone,
            };

            // Only include profilePicture if it was changed
            if (profilePictureBase64) {
                updateData.profilePicture = profilePictureBase64;
            }

            // Call backend API to update profile
            const response = await authService.updateProfile(updateData);

            setUser(response);
            toast.success("Profile updated successfully!");
            setTimeout(() => navigate('/settings'), 1000);
        } catch (error) {
            console.error('Profile update error:', error);
            toast.error(error?.message || "Failed to update profile");
        }
    };

    return (
        <div className="min-h-screen bg-white pb-8">
            {/* Header */}
            <header className="px-5 pt-6 pb-4 flex items-center gap-3">
                <button onClick={() => navigate(-1)} className="text-2xl">←</button>
                <h1 className="text-xl font-semibold">Edit Profile</h1>
            </header>

            <div className="px-5 mt-6">
                {/* Avatar Section */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-3 overflow-hidden">
                        {avatarPreview ? (
                            <img src={avatarPreview} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-green-100 flex items-center justify-center text-3xl text-green-600 font-semibold">
                                {formData.fullName ? formData.fullName.charAt(0).toUpperCase() : 'U'}
                            </div>
                        )}
                    </div>
                    <input
                        type="file"
                        id="photo-upload"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="hidden"
                    />
                    <label htmlFor="photo-upload" className="text-green-600 text-sm font-medium cursor-pointer hover:text-green-700">
                        Change Photo
                    </label>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm text-gray-600 mb-2">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                            placeholder="Enter your full name"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-2">Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                            placeholder="Enter your phone number"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-3 rounded-lg font-medium mt-8 hover:bg-green-700 transition-colors"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
}
