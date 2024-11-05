import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(dayjs());
    const today = dayjs();
    const navigate = useNavigate();

    const startOfMonth = currentDate.startOf('month');
    const endOfMonth = currentDate.endOf('month');
    const startOfWeek = startOfMonth.startOf('week').add(1, 'day'); // Start from Monday
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

    // Update the handleDayClick function
    const handleDayClick = (day: dayjs.Dayjs) => {
        navigate(`/dailyView/${day.format('YYYY-MM-DD')}`); // Pass the selected date to the URL
    };

    return (
        <div className="max-w-9xl mx-auto mt-10 p-4 bg-cover bg-center">
            {/* Navigation for the month */}
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={previousMonth}
                    className="text-gray-700 hover:text-blue-500 focus:outline-none"
                >
                    <FaChevronLeft />
                </button>
                <h2 className="text-2xl font-semibold text-white">
                    {currentDate.format('ngày D, MMMM , YYYY').replace(/\b\w/, (char) => char.toUpperCase())}
                </h2>
                <button
                    onClick={nextMonth}
                    className="text-gray-700 hover:text-blue-500 focus:outline-none"
                >
                    <FaChevronRight />
                </button>
            </div>

            {/* Days of the week */}
            <div className="grid grid-cols-7 gap-x-2 gap-y-4 text-center font-semibold text-white">
                {daysOfWeek.map((day) => (
                    <div key={day} className="text-lg">{day}</div>
                ))}
            </div>

            {/* Days in the month */}
            <div className="grid grid-cols-7 gap-x-2 gap-y-4 mt-4">
                {days.map((day) => (
                    <div
                        key={day.format('YYYY-MM-DD')}
                        onClick={() => handleDayClick(day)} // Call the updated function
                        className={`w-[150px] h-[120px] flex items-center justify-center p-4 rounded-lg text-center border cursor-pointer transition-colors duration-200 ${
                            day.isSame(currentDate, 'month')
                                ? day.isSame(today, 'day')
                                    ? 'bg-green-200 border-green-500'
                                    : 'bg-white hover:bg-blue-100'
                                : 'bg-gray-100 text-gray-400'
                        }`}
                    >
                        <span className={`block font-bold text-lg ${
                            day.isSame(today, 'day') ? 'text-green-800' : ''
                        }`}>
                            {day.format('D')}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calendar;
