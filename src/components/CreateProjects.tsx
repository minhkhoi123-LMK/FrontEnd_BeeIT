import React, { useState } from "react";
import { FaEdit, FaStar, FaHeart, FaThumbsUp } from "react-icons/fa";
import Modal from "react-modal";

declare function require(context: string): {
    keys(): string[];
    (id: string): any;
};

declare namespace NodeJS {
    interface Require {
        context(directory: string, useSubdirectories?: boolean, regExp?: RegExp): {
            keys: () => string[];
            (id: string): any;
        };
    }
}

// Cấu hình modal để hiển thị theo mặc định
Modal.setAppElement("#root");

const CreateProject: React.FC = () => {
    const [projectName, setProjectName] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [owner, setOwner] = useState("Nguyễn Văn A");
    const [members, setMembers] = useState<{ email: string }[]>([]);
    const [email, setEmail] = useState("");
    const [isOwnerModalOpen, setIsOwnerModalOpen] = useState(false);
    const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
    const [showDescriptionInput, setShowDescriptionInput] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState<React.ReactNode | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);

    const potentialOwners = [
        "phamvanb@example.com",
        "tranthic@example.com",
        "nguyenvana@example.com",
    ];

    const existingMembers = [
        "lethid@example.com",
        "tranvane@example.com",
        "phamquangf@example.com",
    ];

    const handleAddMember = () => {
        if (email) {
            setMembers((prevMembers) => [...prevMembers, { email }]);
            setEmail("");
        }
    };

    const handleSelectExistingMember = (memberEmail: string) => {
        if (!members.find((member) => member.email === memberEmail)) {
            setMembers((prevMembers) => [...prevMembers, { email: memberEmail }]);
        }
    };

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
        setIsImageModalOpen(true);
    };

    const icons = [
        <FaStar key="star" className="text-yellow-500" />,
        <FaHeart key="heart" className="text-red-500" />,
        <FaThumbsUp key="thumbs-up" className="text-blue-500" />,
    ];

    const handleOwnerChange = (newOwner: string) => {
        setOwner(newOwner);
        setIsOwnerModalOpen(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({
            projectName,
            description,
            startDate,
            endDate,
            owner,
            members,
        });
    };

    return (
        <div className="p-8 min-h-screen">
            <h1 className="text-3xl text-white font-bold mb-8">Tạo dự án mới</h1>
            <form onSubmit={handleSubmit} className="mt-1 p-6 rounded-lg shadow-md max-w-9xl mx-auto">
                <div className="mb-4">
                    <label className="block font-semibold mb-2 text-white">Tên dự án:</label>
                    <input
                        type="text"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        placeholder="Nhập tên dự án"
                        className="w-full px-4 py-2 border rounded-md"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label
                        className="text-white block font-semibold mb-2 cursor-pointer"
                        onClick={() => setShowDescriptionInput(!showDescriptionInput)}
                    >
                        Mô tả dự án:
                    </label>
                    {showDescriptionInput && (
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Nhập mô tả dự án"
                            className="w-full px-4 py-2 border rounded-md"
                            rows={4}
                        />
                    )}
                </div>

                <div className="mb-4 flex items-center">
                    <div className="w-full">
                        <label className="text-white block font-semibold mb-2">Chủ sở hữu dự án:</label>
                        <div className="flex items-center">
                            <input
                                type="text"
                                value={owner}
                                className="w-full px-4 py-2 border rounded-md"
                                readOnly
                            />
                            <button
                                type="button"
                                className="bg-yellow-500 text-white px-4 py-2 rounded-md ml-2 flex items-center"
                                onClick={() => setIsOwnerModalOpen(true)}
                            >
                                <FaEdit className="mr-2" />
                                Sửa
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex space-x-4 mb-4">
                    <div className="w-1/2">
                        <label className="text-white block font-semibold mb-2">Ngày bắt đầu:</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md"
                            required
                        />
                    </div>
                    <div className="w-1/2">
                        <label className="text-white block font-semibold mb-2">Ngày kết thúc:</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md"
                            required
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="text-white block font-semibold mb-2">Mời thành viên qua Email:</label>
                    <div className="flex space-x-4 mb-2">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Nhập Email"
                            className="w-full px-4 py-2 border rounded-md"
                        />
                        <button
                            type="button"
                            onClick={handleAddMember}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        >
                            Mời
                        </button>
                    </div>
                </div>

                <div className="mb-4">
                    <button
                        type="button"
                        onClick={() => setIsMemberModalOpen(true)}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md"
                    >
                        Thêm thành viên
                    </button>
                </div>

                {members.length > 0 && (
                    <div className="bg-gray-100 p-4 rounded-md">
                        <h3 className="font-semibold mb-2">Danh sách thành viên đã mời:</h3>
                        <ul className="list-disc pl-6">
                            {members.map((member, index) => (
                                <li key={index}>{member.email}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="flex justify-end mt-4">
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-6 py-2 rounded-md font-semibold"
                    >
                        Tạo dự án
                    </button>
                </div>
            </form>

            <Modal
                isOpen={isImageModalOpen}
                onRequestClose={() => setIsImageModalOpen(false)}
                className="w-full h-full flex items-center justify-center"
            >
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Chọn hình ảnh dự án</h3>

                    <div className="flex justify-end mt-4">
                        <button
                            onClick={() => setIsImageModalOpen(false)}
                            className="bg-gray-500 text-white px-4 py-2 rounded-md"
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            </Modal>

            <Modal
                isOpen={isOwnerModalOpen}
                onRequestClose={() => setIsOwnerModalOpen(false)}
                className="w-full h-full flex items-center justify-center"
            >
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Chọn chủ sở hữu dự án</h3>
                    <ul>
                        {potentialOwners.map((potentialOwner, index) => (
                            <li
                                key={index}
                                className="cursor-pointer"
                                onClick={() => handleOwnerChange(potentialOwner)}
                            >
                                {potentialOwner}
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-end mt-4">
                        <button
                            onClick={() => setIsOwnerModalOpen(false)}
                            className="bg-gray-500 text-white px-4 py-2 rounded-md"
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            </Modal>

            <Modal
                isOpen={isMemberModalOpen}
                onRequestClose={() => setIsMemberModalOpen(false)}
                className="w-full h-full flex items-center justify-center"
            >
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Thêm thành viên vào dự án</h3>
                    <ul>
                        {existingMembers.map((member, index) => (
                            <li
                                key={index}
                                className="cursor-pointer"
                                onClick={() => handleSelectExistingMember(member)}
                            >
                                {member}
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-end mt-4">
                        <button
                            onClick={() => setIsMemberModalOpen(false)}
                            className="bg-gray-500 text-white px-4 py-2 rounded-md"
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default CreateProject;
