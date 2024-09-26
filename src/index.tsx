import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route  } from 'react-router-dom'; // Import BrowserRouter for routing
import './index.css';
import Header from './components/Header';
import Menu from './components/Menu';
import Login from './components/Login';
import Details from './components/Details';
import Register from './components/Register';
// App component chính
const App: React.FC = () => {
    return (
        <div className="">
            <Header/>
            <Menu/>
            <div className="flex flex-col h-screen">
                <Routes>
                    <Route path="/" element={<Details />} /> {/* Trang mặc định */}
                    <Route path="/login" element={<Login />} /> {/* Trang đăng nhập */}
                    <Route path="/register" element={<Register />}/>
                </Routes>
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// Wrap the App component with BrowserRouter
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
