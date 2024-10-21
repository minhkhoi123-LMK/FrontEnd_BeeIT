// src/components/ForgotPassword.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ForgotPassword: React.FC = () => {
    const navigate = useNavigate(); // Sử dụng useNavigate
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Gọi API gửi email để đặt lại mật khẩu
        try {
            // Thay thế bằng logic API thực tế
            if (!email) {
                throw new Error('Vui lòng nhập email của bạn.');
            }
            // Giả lập việc gửi email thành công
            setMessage('Một email đã được gửi đến địa chỉ của bạn để đặt lại mật khẩu.');
            setErrorMessage('');
        } catch (error: any) {
            setErrorMessage(error.message);
            setMessage('');
        }
    };

    const handleBackToLoginClick = () => {
        navigate('/login'); // Điều hướng về trang đăng nhập
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
                    Quên mật khẩu?
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Nhập email của bạn
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
                                placeholder="example@example.com"
                            />
                        </div>
                    </div>

                    {errorMessage && (
                        <p className="text-red-500 text-sm text-center">{errorMessage}</p>
                    )}

                    {message && (
                        <p className="text-green-500 text-sm text-center">{message}</p>
                    )}

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Gửi email đặt lại mật khẩu
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Quay lại trang đăng nhập?{' '}
                    <button onClick={handleBackToLoginClick} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Đăng nhập
                    </button>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;

/*const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        const response = await fetch('/api/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            throw new Error('Đã xảy ra lỗi khi gửi yêu cầu.');
        }

        setMessage('Một email đã được gửi đến địa chỉ của bạn để đặt lại mật khẩu.');
        setErrorMessage('');
    } catch (error: any) {
        setErrorMessage(error.message);
        setMessage('');
    }
};*/
