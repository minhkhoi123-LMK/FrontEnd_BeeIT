import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

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
    { id: 10, date: '2024-11-15', startTime: '16:00', endTime: '17:00', title: 'Chay aa' },
    { id: 11, date: '2024-11-15', startTime: '16:00', endTime: '17:00', title: 'Xe b' },
    { id: 11, date: '2024-11-15', startTime: '16:00', endTime: '17:00', title: 'May c' },
];

const DailyView = () => {
    const { date } = useParams();
    const navigate = useNavigate();

    const tasksForTheDay = tasks.filter(task => task.date === date);
    const formattedDate = dayjs(date).format('DD/MM/YYYY');

    return (
        <div className="max-w-lg mx-auto mt-10 p-4">
            <button onClick={() => navigate(-1)} className="text-blue-400 underline mb-4">
                Quay lại
            </button>
            <h1 className="text-2xl font-bold mb-4 text-white">Công việc cho ngày {formattedDate}</h1>
            {tasksForTheDay.length > 0 ? (
                tasksForTheDay.map(task => (
                    <div key={task.id} className="mb-4 p-4 bg-white shadow rounded-lg">
                        <h2 className="text-xl font-semibold text-blue-800">{task.title}</h2>
                        <p className="text-gray-700">
                            {task.startTime} &rarr; {task.endTime}
                        </p>
                    </div>
                ))
            ) : (
                <p className="text-gray-300">Không có công việc nào trong ngày này.</p>
            )}
        </div>
    );
};

export default DailyView