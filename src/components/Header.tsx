import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate để điều hướng
import { Search, Bell, Settings, ChevronDown } from 'lucide-react';

const Header = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

    const handleLoginClick = () => {
        navigate('/login'); // Điều hướng đến trang /login
    };

    const handleHomeClick = () => {
        navigate("/home"); // Điều hướng về trang chủ
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('accountid');
        navigate('/login'); // Điều hướng đến trang login
    };

    return (
        <header className="bg-white border-b border-gray-200">
            <div className="px-6 py-4 flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-gray-800">Projects</h1>

                <div className="flex items-center space-x-6">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    </div>

                    <div className="flex items-center space-x-4">
                        <button className="relative">
                            <Bell className="h-6 w-6 text-gray-500" />
                            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                                2
                            </span>
                        </button>
                        <Settings className="h-6 w-6 text-gray-500" />

                        {/* Profile Dropdown */}
                        <div className="relative">
                            <div
                                className="flex items-center space-x-2 cursor-pointer"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt="Profile"
                                    className="h-8 w-8 rounded-full"
                                />
                                <span className="text-sm font-medium text-gray-700">Nowak</span>
                                <ChevronDown className="h-4 w-4 text-gray-500" />
                            </div>

                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                    <button
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        onClick={() => navigate('/profile')}
                                    >
                                        Profile
                                    </button>
                                    <button
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        onClick={() => navigate('/settings')}
                                    >
                                        Settings
                                    </button>
                                    <button
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        onClick={logout}
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
