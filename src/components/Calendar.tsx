import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(dayjs());
    const today = dayjs();
    const navigate = useNavigate();

    const events = [
        { id: 1, date: dayjs('2024-10-10'), title: 'Họp công ty' },
        { id: 2, date: dayjs('2024-10-15'), title: 'Sinh nhật' },
        { id: 3, date: dayjs('2024-10-20'), title: 'Dự án Deadline' },
    ];

    const startOfMonth = currentDate.startOf('month');
    const endOfMonth = currentDate.endOf('month');
    const startOfWeek = startOfMonth.startOf('week');
    const endOfWeek = endOfMonth.endOf('week');

    const previousMonth = () => setCurrentDate(currentDate.subtract(1, 'month'));
    const nextMonth = () => setCurrentDate(currentDate.add(1, 'month'));

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const days = [];
    let currentDay = startOfWeek;
    while (currentDay.isBefore(endOfWeek)) {
        days.push(currentDay);
        currentDay = currentDay.add(1, 'day');
    }

    const getEventsForDay = (day: dayjs.Dayjs) => {
        return events.filter(event => event.date.isSame(day, 'day'));
    };

    const handleDayClick = (day: dayjs.Dayjs) => {
        navigate(`/timeslive/${day.format('YYYY-MM-DD')}`);
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 p-4 bg-cover bg-center">
            {/* Điều hướng tháng */}
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={previousMonth}
                    className="text-gray-700 hover:text-blue-500 focus:outline-none"
                >
                    <FaChevronLeft />
                </button>
                <h2 className="text-2xl font-semibold text-white">
                    {currentDate.format('MMMM YYYY')}
                </h2>
                <button
                    onClick={nextMonth}
                    className="text-gray-700 hover:text-blue-500 focus:outline-none"
                >
                    <FaChevronRight />
                </button>
            </div>

            {/* Tên các ngày trong tuần */}
            <div className="grid grid-cols-7 gap-4 text-center font-semibold text-white">
                {daysOfWeek.map((day) => (
                    <div key={day}>{day}</div>
                ))}
            </div>

            {/* Các ngày trong tháng */}
            <div className="grid grid-cols-7 gap-4 mt-2">
                {days.map((day) => (
                    <div
                        key={day.format('YYYY-MM-DD')}
                        onClick={() => handleDayClick(day)}
                        className={`p-4 rounded-lg text-center border cursor-pointer transition-colors duration-200 ${
                            day.isSame(currentDate, 'month')
                                ? day.isSame(today, 'day')
                                    ? 'bg-green-200 border-green-500'
                                    : 'bg-white hover:bg-blue-100'
                                : 'bg-gray-100 text-gray-400'
                        }`}
                    >
                        <>
                            <span className={`block font-bold mb-2 ${
                                day.isSame(today, 'day') ? 'text-green-800' : ''
                            }`}>
                                {day.format('D')}
                            </span>
                            {getEventsForDay(day).map((event) => (
                                <div
                                    key={event.id}
                                    className="text-sm bg-blue-200 text-blue-700 rounded-md px-2 py-1 mt-1"
                                >
                                    {event.title}
                                </div>
                            ))}
                        </>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calendar;
