import React, { useState, useRef, useEffect } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { FaSearch } from "react-icons/fa"; // Import the search icon

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
    { id: "list-6", title: "Hạn trong 2 tuần", tasks: [] },
];

// Hiển thị chi tiết nhiệm vụ
const TaskDetailModal: React.FC<{ task: TaskPage | null; onClose: () => void }> = ({ task, onClose }) => {
    if (!task) return null; // Không kết xuất nếu không có nhiệm vụ

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-lg">
                <h2 className="text-lg font-bold mb-2">{task.content}</h2>
                <p><strong>Tiến độ:</strong> In Progress</p>
                <p><strong>Thời gian được tạo ra:</strong> {new Date().toLocaleString()}</p>
                <p><strong>Bắt đầu:</strong> TBD</p>
                <p><strong>Kết thúc:</strong> TBD</p>
                <p><strong>Được tạo bởi:</strong> User A</p>
                <p><strong>Người được phân công:</strong> User B</p>
                <button onClick={onClose} className="mt-4 bg-gray-300 px-4 py-2 rounded">Đóng</button>
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
        const { destination, source, draggableId } = result;
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
                return { ...list, tasks: newSourceTasks };
            } else if (list.id === destination.droppableId) {
                return { ...list, tasks: newDestTasks };
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
        setSelectedTask(task); // Set the selected task for the modal
    };

    const closeTaskDetails = () => {
        setSelectedTask(null); // Close the modal
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
                return "bg-green-500";
            case "Không có hạn chót":
                return "bg-gray-500";
            case "Hạn trong 2 tuần":
                return "bg-purple-500";
            default:
                return "bg-gray-300";
        }
    };

    return (
        <div className="p-4 min-h-screen">
            <div className="flex items-center mb-4">
                <h1 className="text-2xl font-bold text-white">Task Management</h1>
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
                        className="pl-5 pr-2 py-2 rounded border border-gray-300 ml-4 w-[250px]"
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
