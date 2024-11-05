import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/vi';

// Thiết lập ngôn ngữ tiếng Việt cho dayjs
dayjs.locale('vi');

const tasks = [
    { id: 1, date: '2024-11-10', startTime: '09:00', endTime: '10:00', title: 'Họp nhóm' },
    { id: 2, date: '2024-11-10', startTime: '11:00', endTime: '12:00', title: 'Phỏng vấn' },
    { id: 3, date: '2024-11-11', startTime: '08:00', endTime: '09:00', title: 'Kiểm tra hệ thống' },
    { id: 4, date: '2024-11-11', startTime: '13:00', endTime: '14:00', title: 'Gặp gỡ khách hàng' },
    { id: 5, date: '2024-11-12', startTime: '15:00', endTime: '16:00', title: 'Lập kế hoạch dự án' },
    { id: 6, date: '2024-11-13', startTime: '10:00', endTime: '11:00', title: 'Xem xét báo cáo' },
    { id: 7, date: '2024-11-14', startTime: '09:00', endTime: '10:30', title: 'Đào tạo nhân viên' },
    { id: 8, date: '2024-11-15', startTime: '14:00', endTime: '15:00', title: 'Triển khai hệ thống' },
    { id: 9, date: '2024-11-15', startTime: '16:00', endTime: '17:00', title: 'Phân tích dữ liệu' },
    { id: 10, date: '2024-11-15', startTime: '16:00', endTime: '17:00', title: 'Chay a' },
    { id: 11, date: '2024-11-15', startTime: '16:00', endTime: '17:00', title: 'Xe b' },
    { id: 11, date: '2024-11-15', startTime: '16:00', endTime: '17:00', title: 'May c' },
];

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());
    const today = dayjs();
    const navigate = useNavigate();

    const startOfMonth = currentDate.startOf('month');
    const endOfMonth = currentDate.endOf('month');
    const startOfWeek = startOfMonth.startOf('week').add(1, 'day'); // Bắt đầu từ thứ Hai
    const endOfWeek = endOfMonth.endOf('week').add(1, 'day');

    const previousMonth = () => setCurrentDate(currentDate.subtract(1, 'month'));
    const nextMonth = () => setCurrentDate(currentDate.add(1, 'month'));

    const daysOfWeek = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];

    const days = [];
    let currentDay = startOfWeek;
    while (currentDay.isBefore(endOfWeek)) {
        days.push(currentDay);
        currentDay = currentDay.add(1, 'day');
    }

    const handleDayClick = (day: Dayjs) => {
        navigate(`/dailyView/${day.format('YYYY-MM-DD')}`);
    };

    return (
        <div className="max-w-9xl mx-auto mt-10 p-4 bg-cover bg-center">
            <div className="flex justify-between items-center mb-4">
                <button onClick={previousMonth} className="text-gray-700 hover:text-blue-500 focus:outline-none">
                    <FaChevronLeft />
                </button>
                <h2 className="text-2xl font-semibold text-white">
                    {currentDate.format('D [tháng] M, YYYY')}
                </h2>
                <button onClick={nextMonth} className="text-gray-700 hover:text-blue-500 focus:outline-none">
                    <FaChevronRight />
                </button>
            </div>

            <div className="grid grid-cols-7 gap-x-2 gap-y-4 text-center font-semibold text-white">
                {daysOfWeek.map((day) => (
                    <div key={day} className="text-lg">{day}</div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-x-2 gap-y-4 mt-4">
                {days.map((day) => {
                    const dayTasks = tasks.filter(task => task.date === day.format('YYYY-MM-DD'));
                    const firstTask = dayTasks[0];
                    const additionalTasks = dayTasks.length - 1;

                    return (
                        <div
                            key={day.format('YYYY-MM-DD')}
                            onClick={() => handleDayClick(day)}
                            className={`w-[150px] h-[120px] flex flex-col items-center justify-center p-4 rounded-lg text-center border cursor-pointer transition-colors duration-200 ${
                                day.isSame(currentDate, 'month')
                                    ? day.isSame(today, 'day')
                                        ? 'bg-green-200 border-green-500'
                                        : 'bg-white hover:bg-blue-100'
                                    : 'bg-gray-100 text-gray-400'
                            }`}
                        >
                            <span className={`block font-bold text-lg ${day.isSame(today, 'day') ? 'text-green-800' : ''}`}>
                                {day.format('D')}
                            </span>
                            {firstTask && (
                                <div className="text-sm text-gray-700 mt-2">
                                    {firstTask.title} {additionalTasks > 0 && `+${additionalTasks}`}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Calendar;