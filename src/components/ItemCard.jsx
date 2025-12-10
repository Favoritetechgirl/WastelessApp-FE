import React from "react";

export default function ItemCard({ image, title, qty, tag, expires, onClick }) {
    // Determine tag colors based on expiration status
    const getTagStyles = (tagText) => {
        if (!tagText) return "text-utility-text bg-surface-accent";

        const lowerTag = tagText.toLowerCase();
        if (lowerTag.includes('safe') || lowerTag.includes('fresh')) {
            return "text-brand-600 bg-brand-50";
        }
        if (lowerTag.includes('expiring') || lowerTag.includes('soon')) {
            return "text-alert-700 bg-alert-50";
        }
        if (lowerTag.includes('expired') || lowerTag.includes('wasted')) {
            return "text-danger-600 bg-danger-50";
        }
        return "text-utility-text bg-surface-accent";
    };

    const getExpiresColor = (expiresText) => {
        if (!expiresText) return "text-utility-text";

        const lowerExpires = expiresText.toLowerCase();
        if (lowerExpires.includes('today') || lowerExpires.includes('tomorrow')) {
            return "text-danger-500";
        }
        if (lowerExpires.includes('days') && parseInt(expiresText) <= 3) {
            return "text-alert-600";
        }
        return "text-utility-text";
    };

    return (
        <div
            className="bg-surface-bg rounded-wasteless p-4 flex items-center gap-4 shadow-wasteless cursor-pointer hover:shadow-wasteless-lg transition-all duration-200 hover:-translate-y-0.5"
            onClick={onClick}
        >
            <div className="w-16 h-16 rounded-wasteless-sm overflow-hidden bg-surface-accent">
                <img src={image} alt={title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
                <div className="flex justify-between items-start gap-2">
                    <h3 className="font-poppins font-medium text-mobile-h3 text-slate-500 flex-1">{title}</h3>
                    {tag && (
                        <span className={`text-mobile-caption-light font-inter px-2 py-1 rounded-full whitespace-nowrap ${getTagStyles(tag)}`}>
                            {tag}
                        </span>
                    )}
                </div>
                <p className="text-mobile-body-sm font-inter text-utility-text mt-1">
                    Quantity: <span className="font-medium text-slate-500">{qty}</span>
                </p>
                {expires && (
                    <p className={`text-mobile-caption font-inter mt-1 ${getExpiresColor(expires)}`}>
                        {expires}
                    </p>
                )}
            </div>
        </div>
    );
}
