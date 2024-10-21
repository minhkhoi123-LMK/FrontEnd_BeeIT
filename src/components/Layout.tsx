import React from 'react';
import { useLocation } from 'react-router-dom'; // Nhập useLocation từ react-router-dom
import Header from './Header';
import Menu from './Menu';
import { useState } from 'react';

const Layout: React.FC = () => {
    const location = useLocation(); // Lấy thông tin vị trí hiện tại
    const [isMenuVisible, setIsMenuVisible] = useState(true); // Trạng thái hiển thị của menu

    // Định nghĩa các đường dẫn mà Menu không nên hiển thị
    const noMenuPaths = ['/login', '/register', '/forgot-password'];

    // Hàm cập nhật trạng thái hiển thị menu
    const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisible);
    };

    return (
        <div className="flex">
            {/* Hiển thị Menu có điều kiện dựa trên đường dẫn hiện tại */}
            {!noMenuPaths.includes(location.pathname) && (
                <Menu isMenuVisible={isMenuVisible} toggleMenu={toggleMenu} />
            )}
            {/* Phần nội dung chính */}
            <div
                className={`flex-grow transition-all duration-300 ${
                    isMenuVisible ? 'ml-64' : 'ml-0'
                }`} // Thay đổi độ rộng của nội dung khi menu ẩn/hiện
            >
                <Header />
                <div className="flex flex-col h-screen pt-20 p-4">
                    {/* Nội dung chính */}
                    {/* Các Routes ở đây */}
                </div>
            </div>
        </div>
    );
};

export default Layout;
