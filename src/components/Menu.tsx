import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBriefcase,
    faCalendar,
    faUsers,
    faChevronLeft,
    faChevronRight,
    faClipboardList,
    faTasks,
    faChevronDown,
    faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
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
    const [isTaskDropdownOpen, setIsTaskDropdownOpen] = useState<boolean>(false);
    const [isGroupDropdownOpen, setIsGroupDropdownOpen] = useState<boolean>(false);
    const [events, setEvents] = useState<Event[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            const userEvents = [
                { id: 1, name: "Event 1" },
                { id: 2, name: "Event 2" },
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
        navigate(`/conversations/event/${eventId}`);
    };

    const toggleTaskDropdown = () => {
        setIsTaskDropdownOpen(!isTaskDropdownOpen);
    };

    const toggleGroupDropdown = () => {
        setIsGroupDropdownOpen(!isGroupDropdownOpen);
    };

    return (
        <menu>
            <button
                onClick={toggleMenu}
                className={`fixed z-50 p-2 bg-white shadow-lg border border-gray-300 rounded-full transition-transform duration-300 ${
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
                    className="fixed bg-cover bg-center top-20 left-0 z-40 w-full md:w-64 bg-white shadow-md border-r border-gray-300 overflow-y-auto"
                    style={{ height: "calc(100vh - 5rem)", backgroundImage: "url('/images/gauze-08.jpg')" }}
                >
                    <ul className="list-none p-4 space-y-2 text-white">
                        <MenuItem
                            title="Tác vụ và Dự án"
                            icon={faTasks}
                            isSelected={selectedItem === "Tác vụ và Dự án"}
                            onClick={toggleTaskDropdown}
                        />
                        {isTaskDropdownOpen && (
                            <ul className="pl-6 space-y-2">
                                <li>
                                    <button
                                        className="flex items-center w-full py-2 px-3 hover:bg-gray-500 text-left rounded-lg"
                                        onClick={() => handleItemClick("Task", "/tasks")}
                                    >
                                        <span className="text-white">Nhiệm vụ</span>
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="flex items-center w-full py-2 px-3 hover:bg-gray-500 text-left rounded-lg"
                                        onClick={() => handleItemClick("Project", "/project")}
                                    >
                                        <span className="text-white">Dự án</span>
                                    </button>
                                </li>
                            </ul>
                        )}

                        <MenuItem
                            title="Công việc"
                            icon={faBriefcase}
                            isSelected={selectedItem === "Công việc"}
                            onClick={() => handleItemClick("Công việc", "/planning")}
                        />
                        <MenuItem
                            title="Sự kiện"
                            icon={faCalendar}
                            isSelected={selectedItem === "Sự kiện"}
                            onClick={() => handleItemClick("Sự kiện", "/calendar")}
                        />
                        <MenuItem
                            title="Nhóm"
                            icon={faUsers}
                            isSelected={selectedItem === "Nhóm"}
                            onClick={toggleGroupDropdown}
                        />

                        {isGroupDropdownOpen && (
                            <ul className="pl-6 space-y-2">
                                {events.map((event) => (
                                    <li key={event.id}>
                                        <button
                                            className="flex items-center w-full py-2 px-3 hover:bg-gray-500 text-left rounded-lg"
                                            onClick={() => handleEventClick(event.id)}
                                        >
                                            <FontAwesomeIcon icon={faClipboardList} className="mr-2 text-white" />
                                            <span className="text-white">{event.name}</span>
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
                      isSelected,
                      onClick,
                  }: {
    title: string;
    icon: any;
    isSelected: boolean;
    onClick: () => void;
}) => (
    <li
        className={`py-3 px-4 flex items-center space-x-4 rounded-lg cursor-pointer transition-colors duration-200 ${
            isSelected ? "bg-blue-500 text-white" : "hover:bg-gray-500 text-white"
        }`}
        onClick={onClick}
    >
        <FontAwesomeIcon icon={icon} className={`${isSelected ? "text-white" : "text-gray-300"}`} />
        <span>{title}</span>
        {["Tác vụ và Dự án", "Nhóm"].includes(title) && (
            <FontAwesomeIcon icon={isSelected ? faChevronUp : faChevronDown} className="ml-auto text-white" />
        )}
    </li>
);

export default Menu;
