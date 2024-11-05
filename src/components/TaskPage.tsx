import React, { useState, useRef, useEffect } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import {FaTimes, FaPlus, FaUserPlus, FaCalendar, FaPaperclip, FaImage, FaCheckSquare, FaListAlt, FaSearch, FaEye } from "react-icons/fa";
import Modal from "react-modal";

// Define the task data structure
interface TaskPage {
    id: string;
    content: string;
}

// Define the list data structure
interface TaskList {
    id: string;
    title: string;
    tasks: TaskPage[];
}

// Initial hardcoded lists similar to Bitrix24
const initialLists: TaskList[] = [
    { id: "list-1", title: "Quá hạn", tasks: [] },
    { id: "list-2", title: "Hạn hôm nay", tasks: [] },
    { id: "list-3", title: "Hạn tuần này", tasks: [] },
    { id: "list-4", title: "Hạn tuần sau", tasks: [] },
    { id: "list-5", title: "Không có hạn chót", tasks: [] },
    { id: "list-6", title: "Đã hoàn thành", tasks: [] },
];

// Hiển thị chi tiết nhiệm vụ
const TaskDetailModal: React.FC<{ task: TaskPage | null; onClose: () => void }> = ({ task, onClose }) => {
    const [description, setDescription] = useState("");
    const [checklist, setChecklist] = useState([
        { id: 1, text: "Chuẩn bị ghế", checked: true },
        { id: 2, text: "Chuẩn bị nước", checked: true },
        { id: 3, text: "Dựng rào chắn", checked: false },
    ]);
    const [isAddingItem, setIsAddingItem] = useState(false);
    const [newItemText, setNewItemText] = useState("");
    const [editingItemId, setEditingItemId] = useState<number | null>(null); // ID của mục đang chỉnh sửa
    const [editedText, setEditedText] = useState(""); // Text đã chỉnh sửa cho mục
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [initialDescription, setInitialDescription] = useState("");

    const toggleCheckbox = (id: number) => {
        setChecklist(checklist.map(item =>
            item.id === id ? { ...item, checked: !item.checked } : item
        ));
    };

    const handleEditedTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditedText(event.target.value);
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    };

    const progress = checklist.length > 0
        ? (checklist.filter(item => item.checked).length / checklist.length) * 100
        : 0;

    const handleNewItemKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (newItemText.trim()) {
            setChecklist([...checklist, { id: Date.now(), text: newItemText, checked: false }]);
            setNewItemText("");
            setIsAddingItem(false);
        }
    };

    const handleAddNewItem = () => {
        if (newItemText.trim()) {
            setChecklist([...checklist, { id: Date.now(), text: newItemText, checked: false }]);
            setNewItemText("");
            setIsAddingItem(false);
        }
    };

    const handleCancelAddItem = () => {
        setNewItemText("");
        setIsAddingItem(false);
    };

    const handleEditClick = (id: number, text: string) => {
        setEditingItemId(id);
        setEditedText(text);
    };

    const handleEditSubmit = () => {
        if (editedText.trim()) {
            setChecklist(checklist.map(item =>
                item.id === editingItemId ? { ...item, text: editedText } : item
            ));
            setEditingItemId(null);
            setEditedText("");
        }
    };

    const handleCancelEdit = () => {
        setEditingItemId(null);
        setEditedText("");
    };

    const handleDeleteItem = (id: number) => {
        setChecklist(checklist.filter(item => item.id !== id));
    };

    const handleSaveDescription = () => {
        // Lưu mô tả và thoát chế độ chỉnh sửa
        setIsEditingDescription(false);
    };

    const handleCancelDescription = () => {
        // Khôi phục mô tả về trạng thái ban đầu
        setDescription(initialDescription);
        setIsEditingDescription(false);
    };

    const handleEditDescription = () => {
        // Bắt đầu chỉnh sửa và lưu trạng thái ban đầu của mô tả
        setInitialDescription(description);
        setIsEditingDescription(true);
    };

    if (!task) return null;
    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            <div className="relative w-[800px] max-h-[90vh] overflow-y-auto p-4 bg-white rounded-lg shadow-lg flex">
                <button
                    className="absolute p-2 top-2 right-2 text-black hover:text-gray-700"
                    onClick={onClose}
                >
                    <FaTimes className="mr-2"/>
                </button>
                <div className="flex-1">
                    {/* Task Title */}
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-xl font-bold">{task.content}</h1>
                    </div>
                    <div className="mb-4">
                        <span className="text-sm text-gray-500">Trong danh sách</span>
                        <select className="ml-2 text-sm text-blue-600">
                            <option>Dang làm</option>
                        </select>
                    </div>

                    {/* Followers Section */}
                    <div className="flex items-center mb-4">
                        <div
                            className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">MM
                        </div>
                        <button
                            className="w-8 h-8 ml-2 bg-blue-500 rounded-full flex items-center justify-center text-white text-lg"
                            title="Thêm thành viên"
                        >
                            <FaUserPlus className="size-3"/>
                        </button>
                        <button
                            className="ml-2 flex items-center px-2 py-1 text-sm text-blue-600 border border-blue-600 rounded">
                            <FaEye  className="mr-1"/> Theo dõi
                        </button>
                    </div>
                    {/* Description Section */}
                    <div className="mb-4">
                        <h2 className="text-lg font-bold mb-2">Mô tả</h2>
                        <textarea
                            className="w-full p-2 border rounded"
                            placeholder="Thêm mô tả chi tiết hơn..."
                            value={description}
                            onChange={handleDescriptionChange}
                            onFocus={() => setIsEditingDescription(true)}
                        ></textarea>

                        {/* Hiển thị nút Lưu và Hủy khi đang chỉnh sửa */}
                        {isEditingDescription && (
                            <div className="flex gap-2 mt-2">
                                <button
                                    onClick={handleSaveDescription}
                                    className="px-4 py-1 bg-blue-600 text-white rounded"
                                >
                                    Lưu
                                </button>
                                <button
                                    onClick={handleCancelDescription}
                                    className="px-4 py-1 bg-gray-300 text-gray-700 rounded"
                                >
                                    Hủy
                                </button>
                            </div>
                        )}
                    </div>
                    {/* Checklist Section */}
                    <div className="mb-4">
                        <h2 className="text-lg font-bold mb-2">Việc cần làm</h2>
                        <div className="flex items-center mb-2">
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-green-500 h-2.5 rounded-full" style={{width: `${progress}%`}}></div>
                            </div>
                        </div>
                        {checklist.map(item => (
                            <div key={item.id} className="flex items-center mb-2">
                                <input
                                    type="checkbox"
                                    className="mr-2"
                                    checked={item.checked}
                                    onChange={() => toggleCheckbox(item.id)}
                                />
                                {editingItemId === item.id ? (
                                    <div className="flex items-center w-full">
                                        <input
                                            type="text"
                                            value={editedText}
                                            onChange={(e) => setEditedText(e.target.value)}
                                            className="p-1 border rounded mr-2 w-full"
                                        />
                                        <button onClick={handleEditSubmit}
                                                className="px-2 py-1 text-sm text-white bg-blue-500 rounded mr-2">Lưu
                                        </button>
                                        <button onClick={handleCancelEdit}
                                                className="px-2 py-1 text-sm text-gray-700 bg-gray-200 rounded">Hủy
                                        </button>
                                        <button onClick={() => handleDeleteItem(item.id)} className="ml-2 text-red-500">
                                            Xóa
                                        </button>
                                    </div>
                                ) : (
                                    <span onClick={() => handleEditClick(item.id, item.text)}
                                          className="cursor-pointer">
                                        {item.text}
                                    </span>
                                )}

                            </div>
                        ))}
                        {isAddingItem ? (
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    value={newItemText}
                                    onChange={(e) => setNewItemText(e.target.value)}
                                    placeholder="Nhập tên cho mục mới..."
                                    className="p-2 border rounded w-full mb-2 mr-2"
                                />
                                <button onClick={handleAddNewItem}
                                        className="px-2 py-1 text-sm text-white bg-blue-500 rounded mr-2">Lưu
                                </button>
                                <button onClick={handleCancelAddItem}
                                        className="px-2 py-1 text-sm text-gray-700 bg-gray-200 rounded">Hủy
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsAddingItem(true)}
                                className="flex items-center px-2 py-1 text-sm text-blue-600 border border-blue-600 rounded"
                            >
                                <FaPlus className="mr-1"/> Thêm một mục
                            </button>
                        )}
                    </div>

                    <div className="mb-4">
                        <h2 className="text-lg font-bold mb-2">Hoạt động</h2>
                        <button className="px-2 py-1 text-sm text-gray-500 border border-gray-500 rounded">
                            Hiện chi tiết
                        </button>
                        <div className="mt-2">
                            <textarea className="w-full p-2 border rounded" placeholder="Viết bình luận..."></textarea>
                        </div>
                        <div className="mt-2">
                            <div className="flex items-center mb-2">
                                <div
                                    className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">LC
                                </div>
                                <div className="ml-2">
                                    <p className="text-sm"><strong>Ly Minh Khoi (FPL CT)</strong> đã thêm thẻ này vào
                                        danh sách Cần làm</p>
                                    <p className="text-xs text-gray-500">21:34 18 thg 7, 2024</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col space-y-2 ml-4 pt-10">
                    <button className="flex items-center px-4 py-2 text-left text-sm text-gray-700 bg-gray-200 rounded">
                        <FaUserPlus className="mr-2"/> Tham gia
                    </button>
                    <button className="flex items-center px-4 py-2 text-left text-sm text-gray-700 bg-gray-200 rounded">
                        <FaCheckSquare className="mr-2"/> Việc cần làm
                    </button>
                    <button className="flex items-center px-4 py-2 text-left text-sm text-gray-700 bg-gray-200 rounded">
                        <FaCalendar className="mr-2"/> Ngày
                    </button>
                    <button className="flex items-center px-4 py-2 text-left text-sm text-gray-700 bg-gray-200 rounded">
                        <FaPaperclip className="mr-2"/> Đính kèm
                    </button>
                    <button className="flex items-center px-4 py-2 text-left text-sm text-gray-700 bg-gray-200 rounded">
                        <FaImage className="mr-2"/> Ảnh bìa
                    </button>
                    <button className="flex items-center px-4 py-2 text-left text-sm text-gray-700 bg-gray-200 rounded">
                        <FaListAlt className="mr-2"/> Tạo mẫu
                    </button>
                    <button
                        className="flex items-center px-4 py-2 text-left text-sm text-gray-700 bg-gray-200 rounded">Lưu
                        trữ
                    </button>
                    <button
                        className="flex items-center px-4 py-2 text-left text-sm text-gray-700 bg-gray-200 rounded">Chia
                        sẻ
                    </button>
                </div>
            </div>
        </div>
    );
};

const TaskPage: React.FC = () => {
    const [lists, setLists] = useState<TaskList[]>(initialLists);
    const [newTaskContent, setNewTaskContent] = useState("");
    const [currentListId, setCurrentListId] = useState<string | null>(null);
    const [selectedTask, setSelectedTask] = useState<TaskPage | null>(null); // State to track the selected task for the modal
    const taskInputRef = useRef<HTMLInputElement | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    const handleDragEnd = (result: DropResult) => {
        const {destination, source, draggableId} = result;
        if (!destination) return;

        const sourceList = lists.find((list) => list.id === source.droppableId);
        const destList = lists.find((list) => list.id === destination.droppableId);
        const draggedTask = sourceList?.tasks.find((task) => task.id === draggableId);

        if (!sourceList || !destList || !draggedTask) return;

        const newSourceTasks = Array.from(sourceList.tasks);
        newSourceTasks.splice(source.index, 1);

        const newDestTasks = Array.from(destList.tasks);
        newDestTasks.splice(destination.index, 0, draggedTask);

        const updatedLists = lists.map((list) => {
            if (list.id === source.droppableId) {
                return {...list, tasks: newSourceTasks};
            } else if (list.id === destination.droppableId) {
                return {...list, tasks: newDestTasks};
            }
            return list;
        });

        setLists(updatedLists);
    };

    const addNewTask = (listId: string) => {
        if (!newTaskContent.trim()) return;

        const newTask: TaskPage = {
            id: `task-${Math.random().toString(36).substr(2, 9)}`,
            content: newTaskContent,
        };

        const updatedLists = lists.map((list) => {
            if (list.id === listId) {
                return { ...list, tasks: [...list.tasks, newTask] };
            }
            return list;
        });

        setLists(updatedLists);
        setNewTaskContent("");
        setCurrentListId(null);
    };

    const cancelAddTask = () => {
        setCurrentListId(null);
        setNewTaskContent("");
    };

    const openTaskDetails = (task: TaskPage) => {
        setSelectedTask(task);
    };

    const closeTaskDetails = () => {
        setSelectedTask(null);
    };

    useEffect(() => {
        if (currentListId && taskInputRef.current) {
            taskInputRef.current.focus();
        }
    }, [currentListId]);

    // Function to get background color based on the list title
    const getTitleBgColor = (title: string) => {
        switch (title) {
            case "Quá hạn":
                return "bg-red-500";
            case "Hạn hôm nay":
                return "bg-orange-500";
            case "Hạn tuần này":
                return "bg-blue-500";
            case "Hạn tuần sau":
                return "bg-purple-500";
            case "Không có hạn chót":
                return "bg-gray-500";
            case "Đã hoàn thành":
                return "bg-green-500";
            default:
                return "bg-gray-300";
        }
    };

    return (
        <div className="p-4 min-h-screen">
            <div className="flex items-center mb-4">
                <h1 className="text-2xl font-bold text-white">Quản lý công việc</h1>
                <div className="relative ml-4 flex items-center">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={() => console.log("Tạo new task")}
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
                    <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
            </div>
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="flex space-x-4 overflow-x-auto">
                    {lists.map((list) => (
                        <Droppable droppableId={list.id} key={list.id}>
                            {(provided) => (
                                <div
                                    className="bg-white shadow-md p-4 rounded-md min-w-[239px] border border-gray-300"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    <h2 className={`text-sm font-semibold mb-2 text-white p-2 rounded-md ${getTitleBgColor(list.title)}`}>
                                        {list.title}
                                    </h2>
                                    {list.tasks.map((task, index) => (
                                        <Draggable draggableId={task.id} index={index} key={task.id}>
                                            {(provided) => (
                                                <div
                                                    className="bg-gray-100 p-2 mb-2 rounded shadow cursor-pointer" // Added cursor pointer
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    onClick={() => openTaskDetails(task)} // Open the modal on click
                                                >
                                                    {task.content}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}

                                    {currentListId === list.id ? (
                                        <div className="mt-2">
                                            <input
                                                ref={taskInputRef}
                                                type="text"
                                                value={newTaskContent}
                                                onChange={(e) => setNewTaskContent(e.target.value)}
                                                className="p-2 border rounded w-full mb-2"
                                                placeholder="Enter task..."
                                            />
                                            <div className="flex justify-end">
                                                <button
                                                    onClick={() => addNewTask(list.id)}
                                                    className="bg-blue-500 text-white px-4 py-1 rounded mr-2"
                                                >
                                                    Add Task
                                                </button>
                                                <button
                                                    onClick={cancelAddTask}
                                                    className="bg-gray-300 px-4 py-1 rounded"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => setCurrentListId(list.id)}
                                            className="text-blue-500 mt-2"
                                        >
                                            + Add Task
                                        </button>
                                    )}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>
            {/* Modal for displaying task details */}
            <TaskDetailModal task={selectedTask} onClose={closeTaskDetails} />
        </div>
    );
};

export default TaskPage;