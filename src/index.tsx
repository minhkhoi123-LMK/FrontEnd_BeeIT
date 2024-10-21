import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'; // Nhập Navigate từ react-router-dom
import './index.css';
import Header from './components/Header';
import Menu from './components/Menu';
import Home from './components/Home';
import Login from './components/Login';
import Details from './components/Details';
import Register from './components/Register';
import Conversations from './components/Conversations';
import Conversations1 from './components/Conversations1';
import Calendar from './components/Calendar';
import TimesLive from './components/TimesLive';
import Planning from './components/Planning';
import TaskPage from './components/TaskPage';
import ForgotPassword from './components/ForgotPassword';

// Component để điều kiện hiển thị Menu
const Layout: React.FC = () => {
    const location = useLocation(); // Lấy thông tin vị trí hiện tại
    const [isMenuVisible, setIsMenuVisible] = useState(true); // Quản lý trạng thái hiển thị của menu

    // Hàm toggle để ẩn/hiện menu
    const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisible);
    };

    // Định nghĩa các đường dẫn mà Menu không nên hiển thị
    const noMenuPaths = ['/login', '/register', '/forgot-password'];

    return (
        <div className="flex">
            {/* Hiển thị Menu có điều kiện dựa trên đường dẫn hiện tại */}
            {!noMenuPaths.includes(location.pathname) && (
                <Menu isMenuVisible={isMenuVisible} toggleMenu={toggleMenu} />
            )}
            {/* Phần nội dung chính */}
            <div
                className={`flex-grow transition-all duration-300 ${isMenuVisible ? 'ml-64' : 'ml-0'}`}
            >
                <Header />
                <div className="flex flex-col h-screen pt-20 p-4">
                    <Routes>
                        <Route path="/" element={<Navigate to="/home" />} /> {/* Chuyển hướng từ / đến /home */}
                        <Route path="/home" element={<Home />} /> {/* Trang mặc định */}
                        <Route path="/details" element={<Details />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/conversations" element={<Conversations />} />
                        <Route path="/conversations1" element={<Conversations1 />} />
                        <Route path="/calendar" element={<Calendar />} />
                        <Route path="/timeslive" element={<TimesLive />} />
                        <Route path="/taskpage" element={<TaskPage />} />
                        <Route path="/planning" element={<Planning />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

// Component chính của ứng dụng
const App: React.FC = () => {
    return (
        <Routes>
            <Route path="*" element={<Layout />} /> {/* Bọc Layout bằng Routes */}
        </Routes>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// Bọc component App bằng BrowserRouter
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
