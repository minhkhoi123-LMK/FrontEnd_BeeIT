import React from 'react';
import { LayoutGrid, Calendar, MessageSquare, Mail, CheckSquare, Users, FolderOpen, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();

    const navItems = [
        { icon: Calendar, text: 'Calendar', to: '/calendar' },
        { icon: MessageSquare, text: 'Chat', to: '/chat' },
        { icon: Mail, text: 'Email', to: '/email' },
        { icon: CheckSquare, text: 'Tasks', to: '/TaskPage' },
        { icon: FolderOpen, text: 'Projects', to: '/ProjectList' },
        { icon: Users, text: 'Contacts', to: '/contacts' },
    ];

    return (
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
            <div className="p-6">
                <div className="flex items-center space-x-2 bg-cover">
                    <img
                        alt="Your Company"
                        src="/images/logo-no-background.png"
                        className="mx-auto h-10 w-auto"
                    />
                </div>
            </div>

            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                    <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt="Profile"
                        className="h-12 w-12 rounded-full"
                    />
                    <div>
                        <h3 className="text-sm font-medium text-gray-900">Nowak Helme</h3>
                        <p className="text-xs text-gray-500">Admin Head</p>
                    </div>
                </div>
            </div>

            <nav className="flex-1 p-4">
                <div className="space-y-1">
                    <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Navigation
                    </h3>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="flex items-center px-3 py-2 text-sm font-medium text-blue-600 rounded-lg bg-blue-50"
                    >
                        <LayoutGrid className="h-5 w-5 mr-3" />
                        Dashboard
                    </button>
                </div>

                <div className="mt-8 space-y-1">
                    <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Apps
                    </h3>
                    {navItems.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => navigate(item.to)}
                            className="flex items-center px-5 py-4 text-sm text-gray-600 rounded-lg transition-all duration-200 ease-in-out hover:bg-gray-200 hover:shadow-md hover:scale-105"
                        >
                            <item.icon className="h-5 w-5 mr-3 text-gray-400" />
                            {item.text}
                        </button>
                    ))}
                </div>
            </nav>

            <div className="p-4 border-t border-gray-200">
                <div className="flex items-center space-x-3">
                    <Settings className="h-5 w-5 text-gray-400" />
                    <LogOut className="h-5 w-5 text-gray-400" />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
