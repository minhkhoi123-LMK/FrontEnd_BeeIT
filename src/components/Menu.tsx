import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faCalendar, faUsers, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

interface MenuItemProps {
    title: string;
    icon: any;
    note: string;
    isSelected: boolean;
    onClick: () => void;
}

const Menu = () => {
    const [selectedItem, setSelectedItem] = useState<string | null>(null); // Lưu trạng thái mục được chọn
    const [isMenuVisible, setIsMenuVisible] = useState(true); // Trạng thái hiển thị của menu

    const handleItemClick = (title: string) => {
        setSelectedItem(title); // Cập nhật mục được chọn
    };

    const toggleMenuVisibility = () => {
        setIsMenuVisible(!isMenuVisible); // Thay đổi trạng thái hiển thị menu
    };

    return (
        <menu>
            {/* Nút mũi tên để ẩn/hiện menu */}
            <button
                onClick={toggleMenuVisibility}
                className={`fixed top-20 z-50 p-2 bg-gray-100 shadow-md border border-gray-300 transition-transform duration-300 rounded-full ${
                    isMenuVisible ? "left-64" : "left-0"
                }`}
                style={{ top: "4.5rem", transform: isMenuVisible ? "translateX(-50%)" : "translateX(0)",
                    width: "30px", // Đặt kích thước của nút
                    height: "30px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center", }}
            >
                <FontAwesomeIcon icon={isMenuVisible ? faChevronLeft : faChevronRight} />
            </button>

            {/* Menu chính */}
            {isMenuVisible && (
                <div
                    className="fixed top-20 left-0 z-40 w-full md:w-64 bg-gray-100 shadow-md border-r border-gray-300 overflow-y-auto"
                    style={{height: "calc(-4rem + 100vh)"}} // Đặt top là chiều cao của header
                >
                    <ul className="list-none m-0 p-0">
                        <MenuItem
                            title="Công việc"
                            icon={faBriefcase}
                            note="Quản lý công việc hàng ngày"
                            isSelected={selectedItem === "Công việc"}
                            onClick={() => handleItemClick("Công việc")}
                        />
                        <MenuItem
                            title="Sự kiện"
                            icon={faCalendar}
                            note="Xem lịch sự kiện sắp tới"
                            isSelected={selectedItem === "Sự kiện"}
                            onClick={() => handleItemClick("Sự kiện")}
                        />
                        <MenuItem
                            title="Nhóm"
                            icon={faUsers}
                            note="Quản lý nhóm và thành viên"
                            isSelected={selectedItem === "Nhóm"}
                            onClick={() => handleItemClick("Nhóm")}
                        />
                    </ul>
                </div>
            )}
        </menu>
    );
};

const MenuItem = ({title, icon, note, isSelected, onClick}: MenuItemProps) => {
    return (
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
};

export default Menu;
