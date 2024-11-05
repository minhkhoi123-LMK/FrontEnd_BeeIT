import React, { useState, useRef, useEffect,Dispatch, SetStateAction } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import {FaTimes, FaPlus, FaUserPlus, FaCalendar, FaPaperclip, FaImage, FaCheckSquare, FaListAlt, FaSearch, FaEye, FaChevronLeft, FaChevronRight, FaRegClock } from "react-icons/fa";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-modal";
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/vi';

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

interface DatePickerModalProps {
    showDatePicker: boolean;
    setShowDatePicker: Dispatch<SetStateAction<boolean>>;
    onDateChange: (date: Date | null) => void; // Thêm dòng này
}

dayjs.locale('vi'); // Set locale to Vietnamese
// Modal tùy chỉnh thời gian cho nút "Ngày" trong chi tiết nhiệm vụ
const DatePickerModal: React.FC<DatePickerModalProps> = ({ showDatePicker, setShowDatePicker }) => {
    const today = dayjs();
    const [currentMonth, setCurrentMonth] = useState(today.month());
    const [currentYear, setCurrentYear] = useState(today.year());
    const [selectedDate, setSelectedDate] = useState<string>(today.format('DD/MM/YYYY')); // Start date as string
    const [endDate, setEndDate] = useState<string>(today.add(1, 'day').format('DD/MM/YYYY')); // End date as string

    // Function to get days in the current month
    const getDaysInMonth = (month: number, year: number): (number | null)[] => {
        const firstDayOfMonth = dayjs(new Date(year, month, 1));
        const daysInMonth = firstDayOfMonth.daysInMonth();
        const startDayOfWeek = firstDayOfMonth.day();
        const days: (number | null)[] = Array(startDayOfWeek === 0 ? 6 : startDayOfWeek - 1).fill(null);

        for (let day = 1; day <= daysInMonth; day++) {
            days.push(day);
        }
        return days;
    };

    const days = getDaysInMonth(currentMonth, currentYear);

    // Handle month navigation
    const handlePrevMonth = () => {
        const prevMonth = dayjs(new Date(currentYear, currentMonth)).subtract(1, 'month');
        setCurrentMonth(prevMonth.month());
        setCurrentYear(prevMonth.year());
    };

    const handleNextMonth = () => {
        const nextMonth = dayjs(new Date(currentYear, currentMonth)).add(1, 'month');
        setCurrentMonth(nextMonth.month());
        setCurrentYear(nextMonth.year());
    };

    const handleDateSelect = (day: number) => {
        if (day) {
            const newSelectedDate = dayjs(new Date(currentYear, currentMonth, day));
            setSelectedDate(newSelectedDate.format('DD/MM/YYYY'));
        }
    };

    // Update start and end dates without additional validation
    const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(event.target.value);
    };

    const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEndDate(event.target.value);
    };

    const handleEndTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = dayjs(event.target.value, 'HH:mm', true);
        if (newTime.isValid()) {
            setEndDate(prevEndDate => {
                const updatedDate = dayjs(prevEndDate, 'DD/MM/YYYY').hour(newTime.hour()).minute(newTime.minute());
                return updatedDate.format('DD/MM/YYYY HH:mm');
            });
        }
    };

    const isToday = (day: number | null) =>
        day &&
        day === today.date() &&
        currentMonth === today.month() &&
        currentYear === today.year();

    return showDatePicker ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
            <div className="bg-white rounded-lg shadow-lg p-6 w-80 relative">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Ngày</h2>
                    <button onClick={() => setShowDatePicker(false)} className="text-black hover:text-gray-700">
                        <FaTimes />
                    </button>
                </div>
                <div className="flex justify-between items-center mb-4">
                    <button onClick={handlePrevMonth} className="text-blue-600 hover:underline">
                        <FaChevronLeft />
                    </button>
                    <span className="text-lg font-semibold">{`Tháng ${currentMonth + 1} ${currentYear}`}</span>
                    <button onClick={handleNextMonth} className="text-blue-600 hover:underline">
                        <FaChevronRight />
                    </button>
                </div>
                <div className="grid grid-cols-7 text-center mb-4">
                    {['Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'CN'].map((day) => (
                        <div key={day} className="text-sm font-semibold">{day}</div>
                    ))}
                    {days.map((day, index) => (
                        <div
                            key={index}
                            className={`py-1 ${
                                day && isToday(day) ? 'bg-green-100 text-green-600 rounded' :
                                    day && dayjs(selectedDate, 'DD/MM/YYYY').date() === day &&
                                    dayjs(selectedDate, 'DD/MM/YYYY').month() === currentMonth &&
                                    dayjs(selectedDate, 'DD/MM/YYYY').year() === currentYear
                                        ? 'bg-blue-100 text-blue-600 rounded'
                                        : ''
                            }`}
                            onClick={() => handleDateSelect(day || 0)}
                        >
                            {day || ''}
                        </div>
                    ))}
                </div>

                {/* Start Date */}
                <div className="mb-4">
                    <span>Ngày bắt đầu</span>
                    <input
                        type="text"
                        className="w-full border rounded px-2 py-1 mt-2"
                        value={selectedDate}
                        onChange={handleStartDateChange}
                    />
                </div>

                {/* End Date */}
                <div className="mb-4">
                    <span className="mb-3">Ngày hết hạn</span>
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            className="w-1/2 border rounded px-2 py-1"
                            value={endDate}
                            onChange={handleEndDateChange}
                        />
                        <input
                            type="time"
                            className="w-1/2 border rounded px-2 py-1"
                            value={dayjs(endDate, 'DD/MM/YYYY HH:mm').format('HH:mm')}
                            onChange={handleEndTimeChange}
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label>Thiết lập Nhắc nhở</label>
                    <select className="w-full border rounded px-2 py-1 mt-2">
                        <option>1 Giờ trước</option>
                        <option>30 Phút trước</option>
                        <option>15 Phút trước</option>
                        <option>10 Phút trước</option>
                        <option>5 Phút trước</option>
                    </select>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                    Nhắc nhở sẽ được gửi đến tất cả các thành viên và người theo dõi thẻ này.
                </p>
                <div className="flex justify-between">
                    <button className="bg-blue-600 text-white rounded px-4 py-2">Lưu</button>
                    <button className="bg-gray-200 text-gray-700 rounded px-4 py-2"
                            onClick={() => setShowDatePicker(false)}>Gỡ bỏ
                    </button>
                </div>
            </div>
        </div>
    ) : null;
};

// Hiển thị chi tiết nhiệm vụ
const TaskDetailModal: React.FC<{ task: TaskPage | null; onClose: () => void }> = ({task, onClose}) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [description, setDescription] = useState("");
    const [checklist, setChecklist] = useState([
        {id: 1, text: "Chuẩn bị ghế", checked: true},
        {id: 2, text: "Chuẩn bị nước", checked: true},
        {id: 3, text: "Dựng rào chắn", checked: false},
    ]);
    const [isAddingItem, setIsAddingItem] = useState(false);
    const [newItemText, setNewItemText] = useState("");
    const [editingItemId, setEditingItemId] = useState<number | null>(null); // ID của mục đang chỉnh sửa
    const [editedText, setEditedText] = useState(""); // Text đã chỉnh sửa cho mục
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [initialDescription, setInitialDescription] = useState("");
    const [selectedMember, setSelectedMember] = useState<string | null>(null);
    const [dueDate, setDueDate] = useState<string | null>(null);
    const [isMemberListOpen, setIsMemberListOpen] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [assignedMember, setAssignedMember] = useState<string | null>(null);
    const [isDueDateCardVisible, setIsDueDateCardVisible] = useState(false);
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);

    const handleSaveDates = (start: string, end: string) => {
        setStartDate(start);
        setEndDate(end);
    };

    const toggleCheckbox = (id: number) => {
        setChecklist(checklist.map(item =>
            item.id === id ? { ...item, checked: !item.checked } : item
        ));
    };

    const MemberListCard = ({ onSelectMember }: { onSelectMember: (member: string) => void }) => (
        <div className="absolute bg-white border rounded shadow p-3 w-48">
            <h3 className="text-sm font-semibold mb-2">Chọn thành viên</h3>
            {["Member 1", "Member 2", "Member 3"].map(member => (
                <div
                    key={member}
                    onClick={() => onSelectMember(member)}
                    className="cursor-pointer p-1 hover:bg-gray-100 rounded"
                >
                    {member}
                </div>
            ))}
        </div>
    );


    const handleDueDateClick = () => {
        setIsDueDateCardVisible(!isDueDateCardVisible);
    };

    const handleSaveDueDate = () => {
        // Implement save logic here
        console.log("Due Date Saved: ", dueDate);
        setIsDueDateCardVisible(false); // Hide the card after saving
    };

    const handleCancelDueDate = () => {
        setIsDueDateCardVisible(false); // Hide the card if cancelled
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

    const handleDateChange = (date: Date | null) => {
        if (date) {
            setSelectedDate(date);
        }
        setShowDatePicker(false); // Close the date picker after selecting
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
                <div className="flex-1 p-2">
                    {/* Task Title */}
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-xl font-bold">{task.content}</h1>
                    </div>
                    <div className="mb-4">
                        <span className="text-sm text-gray-500">Trong danh sách</span>
                        <select className="ml-2 text-sm text-blue-600">
                            <option>Cần làm</option>
                            <option>Đang làm</option>
                            <option>Đã xong</option>
                        </select>
                    </div>

                    {/* Followers Section */}
                    <span className="pb-2 text-sm text-gray-500">Thành viên</span>
                    <div className="flex items-center mb-4">
                        <div
                            className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">MM
                        </div>
                        <button
                            className="w-8 h-8 ml-2 bg-gray-500 rounded-full flex items-center justify-center text-white text-lg"
                            title="Thêm thành viên"
                        >
                            <FaUserPlus className="size-3"/>
                        </button>
                        <button
                            className="ml-2 flex items-center px-2 py-1 text-sm text-blue-600 border border-blue-600 rounded">
                            <FaEye className="mr-1"/> Theo dõi
                        </button>
                    </div>
                    <div className="mt-4">
                        <span className="text-sm text-gray-500">Ngày</span>
                        <div className="flex items-center space-x-2">
                            <input type="checkbox" className="form-checkbox"/>
                            <span className="text-gray-500">7 thg 11 - 21:16 8 thg 11</span>
                            <span className="bg-green-200 text-green-700 px-3 py-1 rounded">Hoàn tất</span>
                        </div>
                    </div>

                    {/* Description Section */}
                    <div className="mt-4">
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
                        <div className="max-h-64 overflow-y-auto pr-2">
                        {checklist.map(item => (
                            <div key={item.id} className="flex items-center mb-2 pl-3">
                                <input
                                    type="checkbox"
                                    className="mr-2 transform scale-150"
                                    checked={item.checked}
                                    onChange={() => toggleCheckbox(item.id)}
                                />
                                {editingItemId === item.id ? (
                                    <div className="flex flex-col items-start w-full">
                                        <input
                                            type="text"
                                            value={editedText}
                                            onChange={(e) => setEditedText(e.target.value)}
                                            className="p-1 border rounded w-full mb-2"
                                        />
                                        <div className="flex gap-2">
                                            <button
                                                onClick={handleEditSubmit}
                                                className="px-3 py-2 text-sm text-white bg-blue-500 rounded"
                                            >
                                                Lưu
                                            </button>
                                            <button
                                                onClick={handleCancelEdit}
                                                className="px-3 py-2 text-sm text-gray-700 bg-gray-200 rounded"
                                            >
                                                Hủy
                                            </button>

                                                <button
                                                    className="px-3 py-2 text-sm text-gray-700 flex items-center space-x-1 "
                                                    onClick={() => setIsMemberListOpen(!isMemberListOpen)}
                                                >
                                                    <FaUserPlus className="mr-1"/>
                                                    <span>Chỉ định</span>
                                                </button>
                                                {/* Member List Card positioned at bottom-right of the button */}
                                                {isMemberListOpen && (
                                                        <div className="mb-4">
                                                            <MemberListCard
                                                                onSelectMember={(member) => {
                                                                    setAssignedMember(member);
                                                                    setIsMemberListOpen(false); // Close the card after selecting a member
                                                                }}
                                                            />
                                                    </div>
                                                )}
                                            <div>
                                                {/* Button for "Ngày Hết Hạn" */}
                                                <button
                                                    onClick={handleDueDateClick}
                                                    className="px-3 py-2 text-sm text-gray-700 flex items-center space-x-1"
                                                >
                                                    <FaRegClock className="mr-2" />
                                                    <span>Ngày Hết Hạn</span>
                                                </button>

                                                {/* Due Date Card */}
                                                {isDueDateCardVisible && (
                                                    <div className="absolute mt-2 p-4 bg-white shadow-lg rounded-md border border-gray-300 w-64 transition-all transform duration-300 ease-out"
                                                    >
                                                        <div className="mb-4">
                                                            {/* Input for Due Date */}
                                                            <input
                                                                type="date"
                                                                onChange={(e) => setDueDate(e.target.value)}
                                                                className="w-full p-2 border rounded"
                                                            />
                                                        </div>

                                                        <div className="flex gap-2">
                                                            {/* Save Button */}
                                                            <button
                                                                onClick={handleSaveDueDate}
                                                                className="px-3 py-2 text-sm text-white bg-blue-500 rounded"
                                                            >
                                                                Lưu
                                                            </button>

                                                            {/* Cancel Button */}
                                                            <button
                                                                onClick={handleCancelDueDate}
                                                                className="px-3 py-2 text-sm text-gray-700 bg-gray-200 rounded"
                                                            >
                                                                Hủy
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            <button
                                                onClick={() => handleDeleteItem(item.id)}
                                                className="px-3 py-2 text-sm text-red-500 rounded"
                                            >
                                                Xóa
                                            </button>
                                        </div>
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
                                <div className="flex flex-col items-start">
                                    <input
                                        type="text"
                                        value={newItemText}
                                        onChange={(e) => setNewItemText(e.target.value)}
                                    placeholder="Nhập tên cho mục mới..."
                                    className="p-2 border rounded w-full mb-2"
                                />
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleAddNewItem}
                                        className="px-3 py-2 text-sm text-white bg-blue-500 rounded"
                                    >
                                        Lưu
                                    </button>
                                    <button
                                        onClick={handleCancelAddItem}
                                        className="px-3 py-2 text-sm text-gray-700 bg-gray-200 rounded"
                                    >
                                        Hủy
                                    </button>
                                    <button
                                        className="px-3 py-2 text-sm text-gray-700 flex items-center space-x-1 "
                                        onClick={() => setIsMemberListOpen(!isMemberListOpen)}
                                    >
                                        <FaUserPlus className="mr-1"/>
                                        <span>Chỉ định</span>
                                    </button>
                                    {/* Member List Card positioned at bottom-right of the button */}
                                    {isMemberListOpen && (
                                        <div className="mb-4">
                                            <MemberListCard
                                                onSelectMember={(member) => {
                                                    setAssignedMember(member);
                                                    setIsMemberListOpen(false); // Close the card after selecting a member
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <label
                                onClick={() => setIsAddingItem(true)}
                                className="text-sm text-blue-600 cursor-pointer"
                            >
                                + Thêm việc cần làm
                            </label>
                        )}
                        </div>
                    </div>

                    <div className="mb-4">
                        <div className="flex items-center space-x-2">
                            <h2 className="text-lg font-bold mb-2">Hoạt động</h2>
                            <button className="px-3 py-1 mb-2 text-sm text-gray-500 border border-gray-500 rounded">
                                Hiện chi tiết
                            </button>
                        </div>
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
                    {/* Button để mở DatePickerModal */}
                    <button
                        className="flex items-center px-4 py-2 text-left text-sm text-gray-700 bg-gray-200 rounded"
                        onClick={() => setShowDatePicker(true)}
                    >
                        <FaCalendar className="mr-2"/> Ngày
                    </button>

                    {/* Hiển thị DatePickerModal */}
                    <DatePickerModal
                        showDatePicker={showDatePicker}
                        setShowDatePicker={setShowDatePicker}
                        onDateChange={handleDateChange}
                    />
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
        const { destination, source, draggableId } = result;
        if (!destination) return;

        const sourceList = lists.find((list) => list.id === source.droppableId);
        const destList = lists.find((list) => list.id === destination.droppableId);
        const draggedTask = sourceList?.tasks.find((task) => task.id === draggableId);

        if (!sourceList || !destList || !draggedTask) return;

        // Check if source and destination are the same and if index is different
        if (sourceList === destList && source.index === destination.index) {
            return; // No change needed if the task is dropped in the same spot
        }

        // Remove task from source list
        const newSourceTasks = Array.from(sourceList.tasks);
        newSourceTasks.splice(source.index, 1);

        // Add task to destination list
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

    // Chức năng lấy màu nền dựa trên tiêu đề danh sách
    const getTitleBgColor = (title: string) => {
        switch (title) {
            case "Quá hạn":
                return "bg-red-500";
            case "Hạn hôm nay":
                return "bg-blue-400";
            case "Hạn tuần này":
                return "bg-blue-500";
            case "Hạn tuần sau":
                return "bg-purple-500";
            case "Không có hạn chót":
                return "bg-gray-400";
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
                                    className="bg-white bg-opacity-10 p-2 rounded-md min-w-[239px] "
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    <h2 className={`text-sm font-semibold mb-2 text-white p-2 ${getTitleBgColor(list.title)}`}>
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
                                                    Thêm
                                                </button>
                                                <button
                                                    onClick={cancelAddTask}
                                                    className="bg-gray-300 px-4 py-1 rounded"
                                                >
                                                    Hủy
                                                </button>
                                            </div>
                                        </div>
                                    ) : list.title !== "Quá hạn" && list.title !== "Đã hoàn thành" ? (
                                        <button
                                            onClick={() => setCurrentListId(list.id)}
                                            className="text-white mt-2"
                                        >
                                            + Thêm thẻ
                                        </button>
                                    ) : null}
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