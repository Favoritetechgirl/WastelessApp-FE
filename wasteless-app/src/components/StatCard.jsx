import React from "react";

export default function StatCard({ number, label, className = "" }) {
    return (
        <div className={`bg-gray-50 p-4 rounded-xl text-center ${className}`}>
            <p className="text-xl font-bold">{number}</p>
            <p className="text-xs text-gray-500 mt-1">{label}</p>
        </div>
    );
}
