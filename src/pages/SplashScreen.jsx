import React from "react";
import { useNavigate } from "react-router-dom";

// TODO: Add flowerpot icon
// import flowerpot from "../assets/icons/flowerpot.png"
const flowerpot = null; // Using emoji placeholder until assets are added

const SplashScreen = () => {
    const navigate = useNavigate();
    return (
        <div className="h-screen w-full flex flex-col items-center justify-between bg-gradient-to-b from-green-900 to-green-400 px-6 py-12">
            {/* Logo */}
            <div className="flex flex-col items-center mt-12">
                <div className="w-40 h-40 rounded-full bg-green/10 backdrop-blur-md border-4 border-green flex items-center justify-center">
                    {flowerpot ? (
                        <img
                            src={flowerpot}
                            alt="Flower Pot"
                            className="w-40 h-40 object-contain"
                        />
                    ) : (
                        <span className="text-6xl">🌱</span>
                    )}
                </div>
            </div>

            {/* Text */}
            <div className="text-center mt-8">
                <h1 className="text-4xl font-semibold text-white">
                    Waste<span className="text-green-900">Less</span>
                </h1>
                <p className="text-white/90 text-sm mt-2">
                    Eat Smart, Waste Less, Live More
                </p>
            </div>

            {/* Buttons */}
            <div className="w-full flex flex-col gap-4 mb-10">
                <button
                    onClick={() => navigate('/signup')}
                    className="w-full bg-white text-green-700 font-medium py-3 rounded-full shadow"
                >
                    Create account
                </button>

                <button
                    onClick={() => navigate('/login')}
                    className="w-full bg-green-700 text-white font-medium py-3 rounded-full shadow"
                >
                    Sign in
                </button>
            </div>
        </div>
    );
};

export default SplashScreen;
