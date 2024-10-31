import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'; // Import useNavigate để điều hướng

interface Project {
    id: string;
    name: string;
    progress: string;
    members: string;
    role: string;
    startDate: string;
    endDate: string;
    createdDate: string;
    memberCount: number;
}

const projectData: Project[] = [
    {
        id: "1",
        name: "Thiết kế giao diện",
        progress: "50%",
        members: "Nguyễn Văn A, Trần Văn B",
        role: "Thiết kế",
        startDate: "2024-10-01",
        endDate: "2024-10-30",
        createdDate: "2024-10-01",
        memberCount: 2,
    },
    {
        id: "2",
        name: "Viết tài liệu kỹ thuật",
        progress: "30%",
        members: "Lê Thị C, Phạm Văn D",
        role: "Kỹ thuật",
        startDate: "2024-09-15",
        endDate: "2024-10-25",
        createdDate: "2024-09-15",
        memberCount: 2,
    },
];

const Project: React.FC = () => {
    const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
    const [recordsPerPage, setRecordsPerPage] = useState<number>(5);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

    const handlecreateProjectsClick = () => {
        navigate('/createProjects');// Điều hướng đến trang /login
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

    const totalTasks = projectData.length;
    const selectedCount = selectedTasks.length;

    return (
        <div className="p-4 min-h-screen bg-cover bg-center ">
            <div className="flex items-center mb-4">
                <h1 className="text-2xl font-bold text-white">Dự án của tôi</h1>
                <div className="relative ml-4 flex items-center">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={handlecreateProjectsClick}
                    >
                        Tạo
                    </button>
                    <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-5 pr-2 py-2 rounded border border-gray-300 ml-4 w-[650px]"
                    />
                    <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                </div>
            </div>
            <div className="max-w-full border rounded-md bg-white ">
                <div className="">
                    <table className="bg-white min-w-[1200px] w-full rounded-md">
                        <thead>
                        <tr>
                            <th className="p-2 text-left w-[50px]">
                                <input type="checkbox"/>
                            </th>
                            <th className="p-2 text-left w-[100px]">ID</th>
                            <th className="p-2 text-left w-[200px]">Tên</th>
                            <th className="p-2 text-left w-[150px]">Tiến độ</th>
                            <th className="p-2 text-left w-[200px]">Thành viên</th>
                            <th className="p-2 text-left w-[150px]">Vai trò</th>
                            <th className="p-2 text-left w-[150px]">Ngày bắt đầu</th>
                            <th className="p-2 text-left w-[150px]">Ngày kết thúc</th>
                            <th className="p-2 text-left w-[150px]">Thời gian tạo</th>
                            <th className="p-2 text-left w-[150px]">Số lượng thành viên</th>
                        </tr>
                        </thead>
                        <tbody>
                        {projectData.map((task) => (
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
                                <td className="p-2">{task.progress}</td>
                                <td className="p-2">{task.members}</td>
                                <td className="p-2">{task.role}</td>
                                <td className="p-2">{task.startDate}</td>
                                <td className="p-2">{task.endDate}</td>
                                <td className="p-2">{task.createdDate}</td>
                                <td className="p-2">{task.memberCount}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
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

export default Project;
