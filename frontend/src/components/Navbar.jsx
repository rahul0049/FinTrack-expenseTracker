import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const Navbar = () => {
    const { user, logout } = useAuthStore();
    const location = useLocation();
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between sticky top-0 z-50">
            {/* Logo */}
            <Link to="/dashboard" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-200">
                    M
                </div>
                <span className="text-xl font-bold text-gray-900 tracking-tight">My-Finance</span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-2 bg-gray-50 px-2 py-2 rounded-full border border-gray-100">
                <Link to="/dashboard" className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${isActive('/dashboard') ? 'bg-gray-900 text-white shadow-md' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200'}`}>
                    Dashboard
                </Link>
                <Link to="/transactions" className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${isActive('/transactions') ? 'bg-gray-900 text-white shadow-md' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200'}`}>
                    Transactions
                </Link>
                <Link to="/accounts" className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${isActive('/accounts') ? 'bg-gray-900 text-white shadow-md' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200'}`}>
                    Accounts
                </Link>
                <Link to="/settings" className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${isActive('/settings') ? 'bg-gray-900 text-white shadow-md' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200'}`}>
                    Settings
                </Link>
            </div>

            {/* Right User Section */}
            <div className="flex items-center gap-6">

                {/* User Profile Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-3 focus:outline-none"
                    >
                        <div className="w-10 h-10 rounded-full bg-linear-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold shadow-md border-2 border-white">
                            {user?.firstname?.charAt(0).toUpperCase() || "U"}
                        </div>
                        <div className="hidden sm:block text-left">
                            <p className="text-sm font-semibold text-gray-900 leading-none">
                                {user?.firstname || "User"}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">{user?.email || "user@example.com"}</p>
                        </div>
                        <svg className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-1 border border-gray-100 z-50">
                            <Link
                                to="/settings"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                onClick={() => setIsDropdownOpen(false)}
                            >
                                Settings
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
