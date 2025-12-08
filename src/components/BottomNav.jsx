import { NavLink } from "react-router-dom";
import { Home, BookOpen, BarChart2, Heart, Settings } from "lucide-react";

export default function BottomNav() {
    return (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t flex justify-around py-2 z-50">

            <NavItem to="/inventory" icon={<Home size={20} />} label="Inventory" />
            <NavItem to="/recipes" icon={<BookOpen size={20} />} label="Recipe" />
            <NavItem to="/impact" icon={<BarChart2 size={20} />} label="Impact" />
            <NavItem to="/donations" icon={<Heart size={20} />} label="Donation" />
            <NavItem to="/settings" icon={<Settings size={20} />} label="Settings" />

        </div>
    );
}

function NavItem({ to, icon, label }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex flex-col items-center text-xs ${isActive ? "text-green-600" : "text-gray-400"
                }`
            }
        >
            {icon}
            <span>{label}</span>
        </NavLink>
    );
}
