import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface ProjectCardProps {
    title: string;
    category: string;
    description: string;
    questions: string;
    comments: string;
    teamImages: string[];
    progress: string;
    progressColor: string;
    status: string;
    statusColor: string;
}

const ProjectPage: React.FC = () => {
    const [projects, setProjects] = useState<any[]>([]);
    const ProjectCard: React.FC<ProjectCardProps> = ({
                                                         title,
                                                         category,
                                                         description,
                                                         questions,
                                                         comments,
                                                         teamImages,
                                                         progress,
                                                         progressColor,
                                                         status,
                                                         statusColor
                                                     }) => {
        return (
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">{title}</h2>
                    <span className={`px-2 py-1 rounded-full text-sm ${statusColor}`}>{status}</span>
                </div>
                <p className="text-sm text-gray-500 mb-2">{category}</p>
                <p className="text-sm text-gray-700 mb-4">{description} <a href="#" className="text-blue-500">Xem thêm</a></p>
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <p className="text-sm text-gray-500">Câu hỏi</p>
                        <p className="text-lg font-bold">{questions}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Bình luận</p>
                        <p className="text-lg font-bold">{comments}</p>
                    </div>
                </div>
                <div className="flex items-center mb-4">
                    <p className="text-sm text-gray-500 mr-2">Đội:</p>
                    <div className="flex -space-x-2">
                        {teamImages.map((src, index) => (
                            <img key={index} src={src} alt={`Team member ${index + 1}`} className="w-8 h-8 rounded-full border-2 border-white" />
                        ))}
                    </div>
                </div>
                <div>
                    <p className="text-sm text-gray-500 mb-2">Tiến triển</p>
                    <p className="text-right text-sm font-bold">{progress} %</p>

                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                        <div className={`h-2.5 rounded-full ${progressColor}`} style={{width: `${progress}%`}}></div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="p-8">
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">Dự án</h1>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-full">+ Tạo dự án</button>
            </header>
            <div className="grid grid-cols-3 gap-6">
                <ProjectCard
                    title="Thiết kế quản trị mới"
                    category="THIẾT KẾ WEB"
                    description="Nếu nhiều ngôn ngữ hợp nhất thì ngữ pháp sẽ đơn giản và có quy tắc hơn so với ngữ pháp của từng ngôn ngữ riêng lẻ..."
                    questions="56"
                    comments="452"
                    teamImages={["https://placehold.co/32x32", "https://placehold.co/32x32", "https://placehold.co/32x32", "https://placehold.co/32x32", "https://placehold.co/32x32"]}
                    progress="80"
                    progressColor="bg-green-500"
                    status="Hoàn thành"
                    statusColor="bg-green-100 text-green-600"
                />
                <ProjectCard
                    title="Thiết kế và phát triển ứng dụng"
                    category="ANDROID"
                    description="Mọi người đều nhận ra lý do tại sao một ngôn ngữ chung mới lại đang mong muốn, người ta có thể từ chối trả tiền cho những người dịch thuật đắt tiền..."
                    questions="77"
                    comments="875"
                    teamImages={["https://placehold.co/32x32", "https://placehold.co/32x32", "https://placehold.co/32x32", "https://placehold.co/32x32", "https://placehold.co/32x32"]}
                    progress="45"
                    progressColor="bg-blue-500"
                    status="Hoàn thành"
                    statusColor="bg-blue-100 text-blue-600"
                />
                <ProjectCard
                    title="Thiết kế trang đích"
                    category="THIẾT KẾ WEB"
                    description="Nó sẽ đơn giản như tiếng phương Tây, thực tế là đối với người Anh, nó sẽ giống như tiếng Anh giản lược..."
                    questions="87"
                    comments="125"
                    teamImages={["https://placehold.co/32x32", "https://placehold.co/32x32", "https://placehold.co/32x32", "https://placehold.co/32x32"]}
                    progress="68"
                    progressColor="bg-pink-500"
                    status="Hoàn thành"
                    statusColor="bg-pink-100 text-pink-600"
                />
                <ProjectCard
                    title="Thiết kế và phát triển ứng dụng"
                    category="ANDROID"
                    description="Mọi người đều nhận ra lý do tại sao một ngôn ngữ chung mới lại đang mong muốn, người ta có thể từ chối trả tiền cho những người dịch thuật đắt tiền..."
                    questions="77"
                    comments="875"
                    teamImages={["https://placehold.co/32x32", "https://placehold.co/32x32", "https://placehold.co/32x32", "https://placehold.co/32x32", "https://placehold.co/32x32"]}
                    progress="45"
                    progressColor="bg-blue-500"
                    status="Hoàn thành"
                    statusColor="bg-blue-100 text-blue-600"
                />
                <ProjectCard
                    title="Thiết kế trang đích"
                    category="THIẾT KẾ WEB"
                    description="At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium deleniti atque corrupti quos dolores..."
                    questions="87"
                    comments="125"
                    teamImages={["https://placehold.co/32x32", "https://placehold.co/32x32", "https://placehold.co/32x32", "https://placehold.co/32x32"]}
                    progress="68"
                    progressColor="bg-red-500"
                    status="Hoàn thành"
                    statusColor="bg-red-100 text-red-600"
                />
                <ProjectCard
                    title="Thiết kế quản trị mới"
                    category="THIẾT KẾ WEB"
                    description="Sự tồn tại riêng biệt của chúng là một huyền thoại. Đối với khoa học, âm nhạc, thể thao, v.v., Châu Âu sử dụng cùng một từ vựng..."
                    questions="56"
                    comments="452"
                    teamImages={["https://placehold.co/32x32", "https://placehold.co/32x32", "https://placehold.co/32x32"]}
                    progress="80"
                    progressColor="bg-yellow-500"
                    status="Hoàn thành"
                    statusColor="bg-yellow-100 text-yellow-600"
                />
            </div>
            <footer className="mt-8 text-center text-gray-500">
                <p>2024 © Chủ đề Adminto của Coderthemes</p>
                <div className="flex justify-center space-x-4 mt-2">
                </div>
            </footer>
        </div>
    );
};

export default ProjectPage;