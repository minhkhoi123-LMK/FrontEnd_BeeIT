import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';

dayjs.locale('vi');

const hours = Array.from({ length: 24 }, (_, i) => `${i % 12 || 12} ${i < 12 ? 'AM' : 'PM'}`);
const daysOfWeek = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

interface Event {
    title: string;
    details: string;
    date: string;
    startTime: string;
    endTime: string;
}

const DailyView: React.FC = () => {
    const { date } = useParams<{ date: string }>(); // Get the date from the URL
    const navigate = useNavigate();
    const today = dayjs();

    // State to manage selected date and current month
    const [selectedDate, setSelectedDate] = useState(dayjs(date)); // Use the date from URL or fallback to today
    const [currentMonth, setCurrentMonth] = useState(selectedDate.startOf('month'));

    // Other state variables for modal and events
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedHour, setSelectedHour] = useState<string | null>(null);
    const [eventTitle, setEventTitle] = useState<string>('');
    const [eventDetails, setEventDetails] = useState<string>('');
    const [eventDate, setEventDate] = useState<string>(selectedDate.format('YYYY-MM-DD'));
    const [startTime, setStartTime] = useState<string>('');
    const [endTime, setEndTime] = useState<string>('');
    const [events, setEvents] = useState<Event[]>([]);

    const goBackToMonthView = () => navigate('/calendar');

    const openModal = (hour: string) => {
        setSelectedHour(hour);
        setStartTime(hour.includes('AM') ? hour.replace(' AM', ':00') : hour.replace(' PM', ':00'));
        setEndTime(hour.includes('AM') ? hour.replace(' AM', ':00') : hour.replace(' PM', ':00'));
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedHour(null);
        setEventTitle('');
        setEventDetails('');
        setEventDate(selectedDate.format('YYYY-MM-DD'));
        setStartTime('');
        setEndTime('');
    };

    const saveEvent = () => {
        if (selectedHour) {
            setEvents([...events, { title: eventTitle, details: eventDetails, date: eventDate, startTime, endTime }]);
        }
        closeModal();
    };

    // Month navigation handlers
    const handlePreviousMonth = () => setCurrentMonth(currentMonth.subtract(1, 'month'));
    const handleNextMonth = () => setCurrentMonth(currentMonth.add(1, 'month'));

    // Calendar days generation with offset
    const daysInMonth = Array.from({ length: currentMonth.daysInMonth() }, (_, i) => currentMonth.add(i, 'day'));
    const firstDayOfMonth = currentMonth.day();
    const dayOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    return (
        <div className="flex">
            {/* Main Daily View */}
            <div className="w-[900px] p-4 bg-white rounded-lg shadow-md max-h-[700px] overflow-y-auto">
                <button
                    onClick={goBackToMonthView}
                    className="text-blue-600 hover:underline mb-4"
                >
                    Quay lại
                </button>

                <h2 className="text-2xl font-bold text-center mb-6">
                    {selectedDate.format('dddd, ngày D, MMMM , YYYY').replace(/\b\w/, (char) => char.toUpperCase())}
                </h2>

                <div className="calendar-grid-cell-inner border border-gray-300 rounded-lg p-4">
                    {hours.map((hour) => (
                        <div key={hour} className="flex flex-col py-6 cursor-pointer" onClick={() => openModal(hour)}>
                            <span className="text-gray-700 font-medium w-16">{hour}</span>
                            <hr className="flex-1 border-t border-black"/>
                            {events.filter(event => dayjs(event.startTime, 'HH:mm').format('h A') === hour).map((event, index) => (
                                <div key={index} className="bg-blue-200 p-2 mt-1 rounded">
                                    <strong>{event.title}</strong>
                                    <p>{event.details}</p>
                                    <p>{event.date}</p>
                                    <p>{event.startTime} - {event.endTime}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* Sidebar Calendar Block */}
            <div className="calendar-right-block w-[300px] h-[350px] p-4 bg-gray-100 rounded-lg ml-4 shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <button onClick={handlePreviousMonth} className="text-blue-600 hover:underline">
                        <FaChevronLeft />
                    </button>
                    <h2 className="text-xl font-bold text-center">{currentMonth.format('MMMM YYYY')}</h2>
                    <button onClick={handleNextMonth} className="text-blue-600 hover:underline">
                        <FaChevronRight />
                    </button>
                </div>

                {/* Days of the Week */}
                <div className="grid grid-cols-7 gap-2 text-center text-sm font-semibold text-gray-600 mb-2">
                    {daysOfWeek.map((day) => (
                        <div key={day}>{day}</div>
                    ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-2 text-center text-sm">
                    {/* Offset for the first day */}
                    {Array.from({ length: dayOffset }).map((_, i) => (
                        <div key={`empty-${i}`} className="p-2"></div>
                    ))}

                    {/* Days of the current month */}
                    {daysInMonth.map((day) => {
                        const isToday = day.isSame(today, 'day');
                        return (
                            <div
                                key={day.date()}
                                onClick={() => setSelectedDate(day)} // Set the selected date when clicked
                                className={`p-2 rounded cursor-pointer ${isToday ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'} hover:bg-blue-200`}
                            >
                                {day.date()}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <h3 className="text-lg font-bold mb-4">Add Event</h3>
                        <input
                            type="text"
                            placeholder="Event Title"
                            value={eventTitle}
                            onChange={(e) => setEventTitle(e.target.value)}
                            className="border p-2 mb-2 w-full"
                        />
                        <textarea
                            placeholder="Event Details"
                            value={eventDetails}
                            onChange={(e) => setEventDetails(e.target.value)}
                            className="border p-2 mb-2 w-full"
                        />
                        <button onClick={saveEvent} className="bg-blue-600 text-white px-4 py-2 rounded">
                            Save
                        </button>
                        <button onClick={closeModal} className="ml-2 text-gray-600 underline">
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DailyView;
