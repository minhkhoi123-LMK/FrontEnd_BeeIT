import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

interface Task {
    id: string;
    name: string;
    status: string;
    deadline: string;
    creator: string;
    assignee: string;
    project: string;
    createdDate: string;
    modifiedDate: string;
    closedDate: string;
    estimatedTime: string;
    reviewed: boolean;
    completed: boolean;
}

const taskData: Task[] = [
    {
        id: "1",
        name: "Thiết kế giao diện",
        status: "Đang làm",
        deadline: "2024-10-30",
        creator: "Nguyễn Văn A",
        assignee: "Trần Văn B",
        project: "Dự án ABC",
        createdDate: "2024-10-01",
        modifiedDate: "2024-10-10",
        closedDate: "2024-10-20",
        estimatedTime: "5 ngày",
        reviewed: true,
        completed: false,
    },
    {
        id: "2",
        name: "Viết tài liệu kỹ thuật",
        status: "Chưa hoàn thành",
        deadline: "2024-10-25",
        creator: "Lê Thị C",
        assignee: "Phạm Văn D",
        project: "Dự án XYZ",
        createdDate: "2024-09-15",
        modifiedDate: "2024-10-05",
        closedDate: "",
        estimatedTime: "3 ngày",
        reviewed: false,
        completed: false,
    },
];

const TaskTable: React.FC = () => {
    const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
    const [recordsPerPage, setRecordsPerPage] = useState<number>(5); // Số bản ghi trên mỗi trang
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const handlecreateTasksClick = () => {
        navigate('/createTasks');// Điều hướng đến trang /login
    };

    const handleCheckboxChange = (taskId: string) => {
        setSelectedTasks((prevSelected) => {
            if (prevSelected.includes(taskId)) {
                return prevSelected.filter(id => id !== taskId);
            } else {
                return [...prevSelected, taskId];
            }
        });
    };

    const totalTasks = taskData.length;
    const selectedCount = selectedTasks.length;

    return (
        <div className="p-4 min-h-screen bg-cover bg-center ">
            <div className="flex items-center mb-4">
                <h1 className="text-2xl font-bold text-white">Công việc của tôi</h1>
                <div className="relative ml-4 flex items-center">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={handlecreateTasksClick}
                    >
                        Tạo
                    </button>
                    <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-5 pr-2 py-2 rounded border border-gray-300 ml-4 w-[650px]" // Increased width here
                    />
                    <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                </div>
            </div>
            <div className="max-w-full border rounded-md bg-white ">
                <div className="">
                    <table className="bg-white min-w-[1200px] w-full rounded-md">
                        <thead>
                        <tr className="">
                            <th className="p-2 text-left w-[50px]">
                                <input type="checkbox"/>
                            </th>
                            <th className="p-2 text-left w-[100px]">ID</th>
                            <th className="p-2 text-left w-[200px]">Tên</th>
                            <th className="p-2 text-left w-[150px]">Hoạt động</th>
                            <th className="p-2 text-left w-[150px]">Hạn chót</th>
                            <th className="p-2 text-left w-[150px]">Người tạo</th>
                            <th className="p-2 text-left w-[200px]">Người được phân công</th>
                            <th className="p-2 text-left w-[200px]">Dự án</th>
                            <th className="p-2 text-left w-[150px]">Ngày tạo</th>
                            <th className="p-2 text-left w-[150px]">Ngày sửa đổi</th>
                            <th className="p-2 text-left w-[150px]">Ngày đóng</th>
                            <th className="p-2 text-left w-[200px]">Thời gian yêu cầu dự kiến</th>
                            <th className="p-2 text-left w-[150px]">Đã đánh giá</th>
                            <th className="p-2 text-left w-[150px]">Đã hoàn thành</th>
                        </tr>
                        </thead>
                        <tbody>
                        {taskData.map((task) => (
                            <tr key={task.id} className="border-b">
                                <td className="p-2">
                                    <input
                                        type="checkbox"
                                        checked={selectedTasks.includes(task.id)}
                                        onChange={() => handleCheckboxChange(task.id)}
                                    />
                                </td>
                                <td className="p-2">{task.id}</td>
                                <td className="p-2">{task.name}</td>
                                <td className="p-2">{task.status}</td>
                                <td className="p-2">{task.deadline}</td>
                                <td className="p-2">{task.creator}</td>
                                <td className="p-2">{task.assignee}</td>
                                <td className="p-2">{task.project}</td>
                                <td className="p-2">{task.createdDate}</td>
                                <td className="p-2">{task.modifiedDate}</td>
                                <td className="p-2">{task.closedDate || "N/A"}</td>
                                <td className="p-2">{task.estimatedTime}</td>
                                <td className="p-2">{task.reviewed ? "Có" : "Không"}</td>
                                <td className="p-2">{task.completed ? "Có" : "Không"}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                {/* Grid panel bên dưới bảng */}
                <div className="flex justify-between items-center mt-4">
                    <div>
                        <span>{selectedCount} mục đã chọn / {totalTasks} tổng số mục</span>
                    </div>
                    <div className="flex items-center">
                        <label className="mr-2">Hiển thị:</label>
                        <select
                            value={recordsPerPage}
                            onChange={(e) => setRecordsPerPage(Number(e.target.value))}
                            className="border rounded p-1"
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                        </select>
                        <span className="ml-2">bản ghi mỗi trang</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskTable;