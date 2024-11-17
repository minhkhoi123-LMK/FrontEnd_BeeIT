import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaUser, FaChevronDown, FaBars, FaBell, FaToggleOn, FaToggleOff } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'; // Import useNavigate để điều hướng

const Header = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("Home");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [filterUnread, setFilterUnread] = useState(false);

    const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
        switch (tab) {
            case "Trang chủ":
                navigate("/home");
                break;
            case "Hội thoại":
                navigate("/conversations");
                break;
            case "Lịch":
                navigate("/calendar");
                break;
            case "Công việc":
                navigate("/taskpage");
                break;
            default:
                navigate("/");
        }
    };

    const handleLoginClick = () => {
        navigate('/login');// Điều hướng đến trang /login
    };

    const handleHomeClick = () => {
        navigate("/home"); // Điều hướng về trang chủ
    };
    const logout = () => {
        navigate('/home');// Điều hướng đến trang chủ
    };

    // Tạo ref để theo dõi div của thông báo và dropdown, khai báo kiểu HTMLDivElement | null
    const notificationRef = useRef<HTMLDivElement | null>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

// Cập nhật kiểu Notification để bao gồm imageUrl
    type Notification = {
        id: number;
        text: string;
        read: boolean;
        imageUrl: string; // Thêm thuộc tính imageUrl
    };

// Danh sách thông báo với các hình ảnh khác nhau
    const notifications: Notification[] = [
        {
            id: 1,
            text: "Bạn vừa có một thông báo mới",
            read: false,
            imageUrl: "https://cdn.vjshop.vn/tin-tuc/cach-chup-anh-phong-canh/cach-chup-anh-phong-canh-dep-15.jpg",
        },
        {
            id: 2,
            text: "Thông báo 2",
            read: true,
            imageUrl: "https://st.quantrimang.com/photos/image/2017/11/07/anh-dep-viet-nam-1.jpg",
        },
        {
            id: 3,
            text: "Thông báo 3",
            read: false,
            imageUrl: "https://via.placeholder.com/40?text=3",
        },
        {
            id: 4,
            text: "Thông báo 4",
            read: true,
            imageUrl: "https://via.placeholder.com/40?text=4",
        },
    ];

    // Lọc thông báo dựa trên trạng thái "chưa đọc"
    const filteredNotifications = filterUnread
        ? notifications.filter((notification) => !notification.read)
        : notifications;

    const tabs = ["Các dự án","Gần đây","Công việc", "Lịch", "+Tạo tác vụ nhanh"];

    // Hook để đóng dropdown hoặc thông báo khi click ra ngoài
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                notificationRef.current &&
                !notificationRef.current.contains(event.target as Node) && // Sử dụng 'as Node'
                isNotificationOpen
            ) {
                setIsNotificationOpen(false);
            }
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) && // Sử dụng 'as Node'
                isDropdownOpen
            ) {
                setIsDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        // Cleanup khi component bị unmount
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isNotificationOpen, isDropdownOpen]);

    return (
        <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
            <div className="container mx-auto px-4 py-3 flex items-center">
                {/* Logo và Nav */}
                <div className="flex items-center space-x-6" style={{marginLeft: "60px"}}>
                    <img
                        src="/images/logo-no-background.png"
                        alt="Logo"
                        className="h-10 w-auto mr-4"
                        onClick={handleHomeClick} // Thêm sự kiện onClick vào logo
                        style={{cursor: "pointer"}} // Thêm style để hiển thị con trỏ khi hover vào logo
                    />
                    {/* Tabs: Hiển thị khi màn hình >= 768px */}
                    <nav className="hidden md:block">
                        <ul className="flex space-x-4 mb-0 pl-0">
                            {tabs.map((tab) => (
                                <li key={tab}>
                                <button
                                        className={`px-3 py-2 rounded-md text-sm font-medium ${
                                            activeTab === tab
                                                ? "bg-blue-500 text-white"
                                                : "text-gray-700 hover:bg-gray-100"
                                        }`}
                                        onClick={() => handleTabClick(tab)}
                                    >
                                        {tab}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                {/* Ô tìm kiếm và avatar */}
                <div className="ml-auto flex items-center space-x-4">
                    {/* Tìm kiếm: Hiển thị khi màn hình >= 768px */}
                    <div className="hidden md:flex items-center space-x-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Tìm kiếm..."
                                className="w-64 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                        </div>
                    </div>

                    {/* Icon chuông thông báo */}
                    <div className="relative flex items-center" ref={notificationRef}>
                        <button
                            className="text-gray-700 hover:text-blue-500 focus:outline-none"
                            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                        >
                            <FaBell size={24} />
                            {/* Số thông báo chưa đọc */}
                            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                                {notifications.filter((notification) => !notification.read).length}
                            </span>
                        </button>

                        {/* Tabindex hiển thị thông báo */}
                        {isNotificationOpen && (
                            <div className="absolute right-0 top-full translate-y-2 w-80 bg-white rounded-md shadow-lg py-1 z-50">
                                {/* Header */}
                                <div className="flex justify-between items-center px-4 py-2 border-b">
                                    <h2 className="font-semibold text-gray-700">Thông báo</h2>
                                    <p>Chỉ hiển thị chưa đọc</p>
                                    <button
                                        className="text-gray-600 hover:text-blue-500"
                                        onClick={() => setFilterUnread(!filterUnread)}
                                    >
                                        {/* Icon on/off filter */}
                                        {filterUnread ? (
                                            <FaToggleOn size={24} className="text-blue-500" />
                                        ) : (
                                            <FaToggleOff size={24} className="text-gray-400" />
                                        )}
                                    </button>
                                </div>

                                {/* Body - danh sách thông báo */}
                                <div className="max-h-64 overflow-y-auto">
                                    {filteredNotifications.length > 0 ? (
                                        filteredNotifications.map((notification) => (
                                            <div
                                                key={notification.id}
                                                className={`flex items-center px-3 py-2 mb-2 border-gray-200 rounded-lg bg-white ${
                                                    notification.read
                                                        ? "text-gray-500"
                                                        : "text-black font-semibold"
                                                }`}
                                            >
                                                {/* Hình nhỏ bên trái */}
                                                <img
                                                    src={notification.imageUrl}
                                                    alt="Notification Icon"
                                                    className="w-8 h-8 rounded-full mr-3"
                                                />
                                                {/* Nội dung tóm tắt thông báo */}
                                                <div className="flex-1">
                                                    {notification.text}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="px-4 py-3 text-center text-gray-500">
                                            Không có thông báo
                                        </p>
                                    )}

                                </div>
                            </div>
                        )}
                    </div>

                    {/* Avatar: Hiển thị ở mọi kích thước màn hình */}
                    <div className="relative" ref={dropdownRef} style={{ marginRight: "60px" }}>
                        <button
                            className="flex items-center space-x-1 text-gray-700 hover:text-blue-500"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            <FaUser size={24} />
                            <FaChevronDown className="text-xs" />
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                                <p
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                    onClick={handleLoginClick}>  Đăng nhập
                                </p>
                                <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Quản lý tài khoản</p>
                                <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Cài đặt</p>
                                <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                   onClick={logout}> Đăng xuất
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Icon menu cho mobile */}
                    <button
                        className="md:hidden text-gray-700 hover:text-blue-500 focus:outline-none"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                    <FaBars size={24} />
                    </button>
                </div>
            </div>

            {/* Menu thả xuống cho mobile: Hiển thị khi màn hình < 768px */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white shadow-md">
                    <ul className="flex flex-col space-y-2 py-4 px-4">
                        {tabs.map((tab) => (
                            <li key={tab}>
                                <button
                                    className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </header>
    );
};
export default Header;
