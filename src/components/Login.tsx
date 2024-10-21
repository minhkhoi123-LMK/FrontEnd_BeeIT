// src/components/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login: React.FC = () => {
    const navigate = useNavigate(); // Sử dụng useNavigate
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Logic xác thực đăng nhập (API)
        // Giả sử có một hàm xác thực đăng nhập ở đây
        const isValid = true; // Thay thế bằng logic thực tế

        if (isValid) {
            navigate('/home'); // Điều hướng đến trang chính sau khi đăng nhập thành công
        } else {
            setErrorMessage('Đăng nhập không thành công, vui lòng kiểm tra lại tài khoản và mật khẩu.');
        }
    };

    const handleRegisterClick = () => {
        navigate('/register'); // Điều hướng đến trang đăng ký
    };

    const handleForgotPasswordClick = () => {
        navigate('/forgot-password'); // Điều hướng đến trang quên mật khẩu
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    alt="Your Company"
                    src="/images/logo-icon.png"
                    className="mx-auto h-20 w-auto"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Đăng nhập vào tài khoản của bạn
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Tài khoản
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="Nhập tài khoản của bạn"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Mật khẩu
                            </label>
                            <div className="text-sm">
                                <button
                                    type="button"
                                    onClick={handleForgotPasswordClick}
                                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                                >
                                    Quên mật khẩu?
                                </button>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="Nhập mật khẩu của bạn"
                            />
                        </div>
                    </div>

                    {errorMessage && (
                        <p className="text-red-500 text-sm text-center">{errorMessage}</p>
                    )}

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Đăng nhập
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Chưa có tài khoản?{' '}
                    <button onClick={handleRegisterClick} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Đăng kí ngay
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;
