import React, { useState } from "react";

export default function ItemCard({ image, title, qty, tag, expires, onClick }) {
    const [imageError, setImageError] = useState(false);

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

    // Check if image is a valid URL or base64 string
    const hasValidImage = image && !imageError && (
        image.startsWith('http') ||
        image.startsWith('https') ||
        image.startsWith('data:image') ||
        image.startsWith('/')
    );

    // Get initials or first letter for placeholder
    const getPlaceholderText = () => {
        if (!title) return '?';
        const words = title.trim().split(' ');
        if (words.length >= 2) {
            return (words[0][0] + words[1][0]).toUpperCase();
        }
        return title[0].toUpperCase();
    };

    // Get a consistent background color based on the title
    const getPlaceholderColor = () => {
        if (!title) return 'bg-brand-100';
        const colors = [
            'bg-brand-100',
            'bg-green-100',
            'bg-blue-100',
            'bg-orange-100',
            'bg-purple-100',
            'bg-pink-100',
            'bg-yellow-100',
            'bg-teal-100'
        ];
        const index = title.charCodeAt(0) % colors.length;
        return colors[index];
    };

    const getPlaceholderTextColor = () => {
        if (!title) return 'text-brand-600';
        const colors = [
            'text-brand-600',
            'text-green-600',
            'text-blue-600',
            'text-orange-600',
            'text-purple-600',
            'text-pink-600',
            'text-yellow-600',
            'text-teal-600'
        ];
        const index = title.charCodeAt(0) % colors.length;
        return colors[index];
    };

    return (
        <div
            className="bg-surface-bg rounded-wasteless p-4 flex items-center gap-4 shadow-wasteless cursor-pointer hover:shadow-wasteless-lg transition-all duration-200 hover:-translate-y-0.5"
            onClick={onClick}
        >
            <div className="w-16 h-16 rounded-wasteless-sm overflow-hidden bg-surface-accent flex-shrink-0">
                {hasValidImage ? (
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className={`w-full h-full flex items-center justify-center ${getPlaceholderColor()}`}>
                        <span className={`font-poppins font-semibold text-lg ${getPlaceholderTextColor()}`}>
                            {getPlaceholderText()}
                        </span>
                    </div>
                )}
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2">
                    <h3 className="font-poppins font-medium text-mobile-h3 text-slate-500 flex-1 truncate">{title}</h3>
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
