import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faCalendar, faUsers, faChevronLeft, faChevronRight, faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

interface Event {
    id: number;
    name: string;
}

interface MenuProps {
    isMenuVisible: boolean;
    toggleMenu: () => void;
}

const Menu: React.FC<MenuProps> = ({ isMenuVisible, toggleMenu }) => {
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const [events, setEvents] = useState<Event[]>([]);
    const navigate = useNavigate();

    // Giả lập lấy danh sách sự kiện mà người dùng đã tham gia
    useEffect(() => {
        // Thay bằng API thực tế để lấy danh sách sự kiện của người dùng
        const fetchEvents = async () => {
            const userEvents = [
                { id: 1, name: "Sự kiện 1" },
                { id: 2, name: "Sự kiện 2" },
            ];
            setEvents(userEvents);
        };

        fetchEvents();
    }, []);

    const handleItemClick = (title: string, path: string) => {
        setSelectedItem(title);
        navigate(path);
    };

    const handleEventClick = (eventId: number) => {
        // Điều hướng đến trang Conversations với id sự kiện
        navigate(`/conversations1`);
       /* navigate(`/conversations/event/${eventId}`);*/
    };

    return (
        <menu>
            <button
                onClick={toggleMenu}
                className={`fixed z-50 p-2 bg-gray-100 shadow-md border border-gray-300 transition-transform duration-300 rounded-full ${
                    isMenuVisible ? "left-64" : "left-0"
                }`}
                style={{
                    top: "5.8rem",
                    transform: isMenuVisible ? "translateX(-50%)" : "translateX(0)",
                    width: "30px",
                    height: "30px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <FontAwesomeIcon icon={isMenuVisible ? faChevronLeft : faChevronRight} />
            </button>

            {isMenuVisible && (
                <div
                    className="fixed top-20 left-0 z-40 w-full md:w-64 bg-gray-100 shadow-md border-r border-gray-300 overflow-y-auto"
                    style={{ height: "calc(-4rem + 100vh)" }}
                >
                    <ul className="list-none m-0 p-0">
                        <MenuItem
                            title="Công việc"
                            icon={faBriefcase}
                            note="Quản lý công việc hàng ngày"
                            isSelected={selectedItem === "Công việc"}
                            onClick={() => handleItemClick("Công việc", "/planning")}
                        />
                        <MenuItem
                            title="Sự kiện"
                            icon={faCalendar}
                            note="Xem lịch sự kiện sắp tới"
                            isSelected={selectedItem === "Sự kiện"}
                            onClick={() => handleItemClick("Sự kiện", "/calendar")}
                        />
                        <MenuItem
                            title="Nhóm"
                            icon={faUsers}
                            note="Danh sách các sự kiện tham gia"
                            isSelected={selectedItem === "Nhóm"}
                            onClick={() => setSelectedItem("Nhóm")} // Mở danh sách sự kiện
                        />

                        {/* Hiển thị danh sách sự kiện khi chọn "Nhóm" */}
                        {selectedItem === "Nhóm" && (
                            <ul className="pl-4">
                                {events.map((event) => (
                                    <li key={event.id}>
                                        <button
                                            className="py-2 px-4 text-left w-full hover:bg-gray-200"
                                            onClick={() => handleEventClick(event.id)}
                                        >
                                            {/* Icon sự kiện */}
                                            <FontAwesomeIcon icon={faClipboardList} className="text-gray-600 mr-2" />
                                            {event.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </ul>
                </div>
            )}
        </menu>
    );
};

const MenuItem = ({
                      title,
                      icon,
                      note,
                      isSelected,
                      onClick,
                  }: {
    title: string;
    icon: any;
    note: string;
    isSelected: boolean;
    onClick: () => void;
}) => (
    <li
        className={`py-4 px-6 transition duration-300 ease-in-out border-b border-gray-300 cursor-pointer ${
            isSelected ? "bg-blue-500 text-white" : "hover:bg-gray-200"
        }`}
        onClick={onClick}
    >
        <div className="flex items-center">
            <FontAwesomeIcon icon={icon} className={`text-lg mr-4 ${isSelected ? "text-white" : "text-gray-600"}`} />
            <div>
                <h5 className={`text-lg font-semibold ${isSelected ? "text-white" : "text-gray-800"}`}>{title}</h5>
                <p className={`text-sm ${isSelected ? "text-white" : "text-gray-600"}`}>{note}</p>
            </div>
        </div>
    </li>
);

export default Menu;
