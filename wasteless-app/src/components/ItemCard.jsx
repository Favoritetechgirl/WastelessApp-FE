import React from "react";

export default function ItemCard({ image, title, qty, tag, expires }) {
    return (
        <div className="bg-white rounded-xl p-3 flex items-center gap-3 shadow-sm">
            <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-100">
                <img src={image || "/assets/placeholder.png"} alt={title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
                <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-sm">{title}</h3>
                    <span className="text-[11px] text-orange-400 bg-orange-50 px-2 py-1 rounded-full">{tag}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Quantity: <span className="text-sm font-medium">{qty}</span></p>
                <p className="text-xs text-red-400 mt-1">{expires}</p>
            </div>
        </div>
    );
}
