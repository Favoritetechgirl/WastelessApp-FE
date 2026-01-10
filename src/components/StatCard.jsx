import React from "react";

export default function StatCard({ number, label, className = "", variant = "default" }) {
    const variantStyles = {
        default: "bg-surface-accent",
        impact: "bg-impact-50 border border-impact-200",
        success: "bg-brand-50 border border-brand-200",
        warning: "bg-alert-50 border border-alert-200",
    };

    return (
        <div className={`${variantStyles[variant]} p-4 rounded-wasteless text-center ${className}`}>
            <p className="text-mobile-metric md:text-desktop-metric font-poppins text-slate-500">{number}</p>
            <p className="text-mobile-caption md:text-desktop-caption font-inter text-utility-text mt-1">{label}</p>
        </div>
    );
}
