import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'; // Nhập Navigate từ react-router-dom
import './index.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Login from './components/Login';
import Details from './components/Details';
import Register from './components/Register';
import Conversations from './components/Conversations';
import Conversations1 from './components/Conversations1';
import Calendar from './components/Calendar';
import DailyView from './components/DailyView';
import TimesLive from './components/TimesLive';
import Planning from './components/Planning';
import TaskPage from './components/TaskPage';
import Project from './components/Project';
import ProjectList from './components/ProjectList';
import Works from './components/Works';
import CreateProjects from './components/CreateProjects';
import CreateTasks from './components/CreateTasks';
import ForgotPassword from './components/ForgotPassword';
import ProjectPage from './components/ProjectPage';
import Dashboard from './components/Dashboard';

// Component để điều kiện hiển thị Menu
const Layout: React.FC = () => {
    const location = useLocation(); // Lấy thông tin vị trí hiện tại

    // Định nghĩa các đường dẫn mà Sidebar và Header không nên hiển thị
    const noMenuPaths = ['/login', '/register', '/forgot-password'];

    // Kiểm tra nếu đường dẫn hiện tại nằm trong danh sách `noMenuPaths`
    const isNoMenuPath = noMenuPaths.includes(location.pathname);

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Ẩn Sidebar và Header nếu là đường dẫn trong `noMenuPaths` */}
            {!isNoMenuPath && <Sidebar />}
            <div className="flex-1 flex flex-col overflow-hidden">
                {!isNoMenuPath && <Header />}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gradient-to-br from-purple-900 via-blue-800 to-orange-700">
                    <Routes>
                        <Route path="/" element={<Navigate to="/home" />} /> {/*Chuyển hướng đến home */}
                        <Route path="/home" element={<Home />} /> {/*Trang mặc định */}
                        <Route path="/Dashboard" element={<Dashboard />} />
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
                        <Route path="/project" element={<Project />} />
                        <Route path="/createProjects" element={<CreateProjects />} />
                        <Route path="/createTasks" element={<CreateTasks />} />
                        <Route path="/works" element={<Works />} />
                        <Route path="/dailyView/:date" element={<DailyView />} />
                        <Route path="/projectPage" element={<ProjectPage />} />
                        <Route path="/ProjectList" element={<ProjectList />} />
                    </Routes>
                </main>
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
