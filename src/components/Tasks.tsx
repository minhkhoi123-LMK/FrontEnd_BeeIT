import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const WorkTable: React.FC = () => {
    const [selectedWorks, setSelectedWorks] = useState<string[]>([]);
    const [recordsPerPage, setRecordsPerPage] = useState<number>(5);
    const [searchTerm, setSearchTerm] = useState("");
    const [workData, setWorkData] = useState<any[]>([]); // Dữ liệu công việc
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log("Token:", token); // Log để kiểm tra token có được lấy hay không
        axios.get("http://localhost:8080/api/work/findAllWorksByTask", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => setWorkData(response.data))
        .catch(error => console.error("Lỗi tải dữ liệu công việc:", error));
    }, []);
    

    const handleCreateWorkClick = () => {
        navigate('/createWork');
    };

    const handleCheckboxChange = (workId: string) => {
        setSelectedWorks((prevSelected) => {
            if (prevSelected.includes(workId)) {
                return prevSelected.filter(id => id !== workId);
            } else {
                return [...prevSelected, workId];
            }
        });
    };

    const totalWorks = workData.length;
    const selectedCount = selectedWorks.length;

    return (
        <div className="p-4 min-h-screen bg-cover bg-center ">
            <div className="flex items-center mb-4">
                <h1 className="text-2xl font-bold text-white">Công việc của tôi</h1>
                <div className="relative ml-4 flex items-center">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={handleCreateWorkClick}
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
                <table className="bg-white min-w-[1200px] w-full rounded-md">
                    <thead>
                        <tr>
                            <th className="p-2 text-left w-[50px]">
                                <input type="checkbox" />
                            </th>
                            <th className="p-2 text-left w-[100px]">ID</th>
                            <th className="p-2 text-left w-[200px]">Tên công việc</th>
                            <th className="p-2 text-left w-[150px]">Mô tả</th>
                            <th className="p-2 text-left w-[150px]">Trạng thái</th>
                            <th className="p-2 text-left w-[150px]">Thời hạn</th>
                            <th className="p-2 text-left w-[150px]">Người tạo</th>
                            <th className="p-2 text-left w-[200px]">Dự án</th>
                            <th className="p-2 text-left w-[150px]">Ngày tạo</th>
                            <th className="p-2 text-left w-[150px]">Ngày sửa đổi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {workData.map((work) => (
                            <tr key={work.workID} className="border-b">
                                <td className="p-2">
                                    <input
                                        type="checkbox"
                                        checked={selectedWorks.includes(work.workID)}
                                        onChange={() => handleCheckboxChange(work.workID)}
                                    />
                                </td>
                                <td className="p-2">{work.workID}</td>
                                <td className="p-2">{work.workName}</td>
                                <td className="p-2">{work.description}</td>
                                <td className="p-2">{work.status}</td>
                                <td className="p-2">{work.expirationTime}</td>
                                <td className="p-2">{work.createdUser}</td>
                                <td className="p-2">{work.project.projectName}</td>
                                <td className="p-2">{work.createdDate}</td>
                                <td className="p-2">{work.updatedDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-between items-center mt-4">
                    <div>
                        <span>{selectedCount} mục đã chọn / {totalWorks} tổng số mục</span>
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

export default WorkTable;
