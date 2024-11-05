import React from 'react';
import { useNavigate } from 'react-router-dom';

// ProjectCard Component
interface ProjectCardProps {
    project: {
        title: string;
        category: string;
        status: string;
        statusColor: string;
        description: string;
        questions: number;
        comments: number;
        progress: number;
        team: string[];
    };
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    const getStatusColorClass = (color: string) => {
        const colors = {
            green: 'bg-green-100 text-green-800',
            blue: 'bg-blue-100 text-blue-800',
            pink: 'bg-pink-100 text-pink-800',
        };
        return colors[color as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    };

    const getProgressColorClass = (color: string) => {
        const colors = {
            green: 'bg-green-500',
            blue: 'bg-blue-500',
            pink: 'bg-pink-500',
        };
        return colors[color as keyof typeof colors] || 'bg-gray-500';
    };

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                        <p className="text-sm text-gray-500">{project.category}</p>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColorClass(project.statusColor)}`}>
                        {project.status}
                    </span>
                </div>
                <p className="text-sm text-gray-500 line-clamp-3">{project.description}</p>
                <div className="flex space-x-6">
                    <div>
                        <p className="text-xl font-semibold text-gray-900">{project.questions}</p>
                        <p className="text-sm text-gray-500">Questions</p>
                    </div>
                    <div>
                        <p className="text-xl font-semibold text-gray-900">{project.comments}</p>
                        <p className="text-sm text-gray-500">Comments</p>
                    </div>
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">Team</p>
                    <div className="flex -space-x-2">
                        {project.team.map((member, index) => (
                            <img
                                key={index}
                                className="w-8 h-8 rounded-full border-2 border-white"
                                src={member}
                                alt={`Team member ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className={`h-2 rounded-full ${getProgressColorClass(project.statusColor)}`}
                            style={{ width: `${project.progress}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

// ProjectList Component
const projects = [
    {
        id: 1,
        title: 'New Admin Design',
        category: 'WEB DESIGN',
        status: 'Completed',
        statusColor: 'green',
        description: 'If several languages coalesce the grammar is more simple and regular than that of the individual languages...',
        questions: 56,
        comments: 452,
        progress: 80,
        team: [
            'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        ],
    },
    {
        id: 2,
        title: 'App Design and Develop',
        category: 'ANDROID',
        status: 'Completed',
        statusColor: 'blue',
        description: 'New common language will be more simple and regular than the existing European languages...',
        questions: 77,
        comments: 875,
        progress: 45,
        team: [
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80',
            'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        ],
    },
    {
        id: 3,
        title: 'Landing page Design',
        category: 'WEB DESIGN',
        status: 'Completed',
        statusColor: 'pink',
        description: 'It will be as simple as occidental in fact it will be to an english person it will seem like simplified English...',
        questions: 87,
        comments: 125,
        progress: 68,
        team: [
            'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80',
        ],
    },
];

const ProjectList = () => {
    const navigate = useNavigate(); // Khởi tạo useNavigate

    const handleCreateProjectClick = () => {
        navigate('/createProjects'); // Chuyển đến trang CreateProjects
    };

    return (
        <div className="p-6 space-y-4">
            {/* Header Section */}
            <div className="px-6 py-2 flex items-center justify-between border-b border-gray-200">
                <button
                    onClick={handleCreateProjectClick} // Gắn sự kiện nhấp
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    + Create Project
                </button>
                <div className="flex space-x-4">
                    <div>
                        <label className="text-sm text-gray-500">Phase</label>
                        <select className="ml-2 border rounded px-2 py-1">
                            <option>All Projects</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm text-gray-500">Sort</label>
                        <select className="ml-2 border rounded px-2 py-1">
                            <option>Date</option>
                        </select>
                    </div>
                </div>
            </div>
            {/* Project Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </div>
    );
};

export default ProjectList;
