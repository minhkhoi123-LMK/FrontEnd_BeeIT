import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Project: React.FC = () => {
    const [projects, setProjects] = useState<any[]>([]);
    const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
    const [recordsPerPage, setRecordsPerPage] = useState<number>(5);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState<boolean>(true);
    
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            setError(""); 
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("Token không tồn tại");
                    return;
                }
                
                const response = await axios.get("http://localhost:8080/api/user/project/findProjectsByOwner", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 200) {
                    setProjects(response.data);
                } else {
                    setError("Không thể lấy dữ liệu");
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    if (error.response) {
                        setError("Lỗi: " + (error.response.data.message || "Lỗi không xác định"));
                    } else {
                        setError("Lỗi không kết nối được với máy chủ");
                    }
                } else {
                    setError("Lỗi: " + (error as any).message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    // Search and Pagination Logic
    const filteredProjects = projects.filter(project =>
        project.projectName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalTasks = filteredProjects.length;
    const totalPages = Math.ceil(totalTasks / recordsPerPage);
    const paginatedProjects = filteredProjects.slice(
        (currentPage - 1) * recordsPerPage,
        currentPage * recordsPerPage
    );

    const handleCreateProjectsClick = () => {
        navigate('/create-project');
    };

    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const selectedCount = selectedTasks.length;

    return (
        <div className="p-4 min-h-screen bg-cover bg-center">
            <div className="flex items-center mb-4">
                <h1 className="text-2xl font-bold text-white">Dự án của tôi</h1>
                <div className="relative ml-4 flex items-center">
                    <button 
                        className="bg-blue-500 text-white px-4 py-2 rounded" 
                        onClick={handleCreateProjectsClick}>
                        Tạo
                    </button>
                    <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-5 pr-2 py-2 rounded border border-gray-300 ml-4 w-[650px]"
                    />
                    <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
            </div>

            {loading ? (
                <div className="text-white">Đang tải dữ liệu...</div>
            ) : error ? (
                <div className="text-red-500">{error}</div>
            ) : (
                <div className="max-w-full border rounded-md bg-white">
                    <table className="bg-white min-w-[1200px] w-full rounded-md">
                        <thead>
                            <tr>
                                <th className="p-2 text-left w-[50px]">
                                    <input type="checkbox" />
                                </th>
                                <th className="p-2 text-left w-[100px]">ID</th>
                                <th className="p-2 text-left w-[200px]">Tên</th>
                                <th className="p-2 text-left w-[200px]">Mô tả</th>
                                <th className="p-2 text-left w-[150px]">Ngày bắt đầu</th>
                                <th className="p-2 text-left w-[150px]">Ngày kết thúc</th>
                                <th className="p-2 text-left w-[150px]">Trạng thái</th>
                                <th className="p-2 text-left w-[150px]">Chủ sở hữu</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedProjects.map((project) => (
                                <tr key={project.projectID} className="border-b">
                                    <td className="p-2">
                                        <input
                                            type="checkbox"
                                            checked={selectedTasks.includes(project.projectID.toString())}
                                            onChange={() => {
                                                if (selectedTasks.includes(project.projectID.toString())) {
                                                    setSelectedTasks(selectedTasks.filter(id => id !== project.projectID.toString()));
                                                } else {
                                                    setSelectedTasks([...selectedTasks, project.projectID.toString()]);
                                                }
                                            }}
                                        />
                                    </td>
                                    <td className="p-2">{project.projectID}</td>
                                    <td className="p-2">{project.projectName}</td>
                                    <td className="p-2">{project.description}</td>
                                    <td className="p-2">{new Date(project.startDate).toLocaleDateString()}</td>
                                    <td className="p-2">{new Date(project.endDate).toLocaleDateString()}</td>
                                    <td className="p-2">{project.status}</td>
                                    <td className="p-2">{project.owner.username}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
                    <div className="flex justify-center mt-4">
                        <button 
                            className="px-4 py-2 mx-1 bg-gray-300 rounded" 
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Trang trước
                        </button>
                        <span>Trang {currentPage} / {totalPages}</span>
                        <button 
                            className="px-4 py-2 mx-1 bg-gray-300 rounded" 
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Trang sau
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Project;