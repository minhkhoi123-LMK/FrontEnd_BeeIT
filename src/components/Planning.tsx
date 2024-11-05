import React, { useState, useRef, useEffect } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";

// Khai báo kiểu cho dữ liệu card
interface Card {
    id: string;
    content: string;
}

// Khai báo kiểu cho dữ liệu list
interface List {
    id: string;
    title: string;
    color: string;
    cards: Card[];
}

// Khai báo kiểu cho dữ liệu state tổng thể
interface AppState {
    lists: { [key: string]: List };
    listIds: string[];
}

const initialData: AppState = {
    lists: {
        "list-1": {
            id: "list-1",
            title: "Quá hạn(0)",
            color: "#FFFFFF",
            cards: [
                { id: "card-1", content: "Hoàn thành dự án" },
                { id: "card-2", content: "Họp với khách hàng" },
            ],
        },
        "list-2": {
            id: "list-2",
            title: "Hạn hôm nay(0)",
            color: "#FFFFFF",
            cards: [
                { id: "card-3", content: "Xây dựng giao diện" },
                { id: "card-4", content: "Viết tài liệu dự án" },
            ],
        },
        "list-3": {
            id: "list-3",
            title: "Hạn tuần này(0)",
            color: "#FFFFFF",
            cards: [{ id: "card-5", content: "Nghiên cứu thị trường" }],
        },
        "list-4": {
            id: "list-4",
            title: "Không có hạn chót(0)",
            color: "#FFFFFF",
            cards: [{ id: "", content: "" }],
        },
        "list-5": {
            id: "list-5",
            title: "Hạn tuần sau(1)",
            color: "#FFFFFF",
            cards: [{ id: "card-5", content: "Nghiên cứu thị trường" }],
        },
    },
    listIds: ["list-1", "list-2", "list-3"],
};

const Planning: React.FC = () => {
    const [data, setData] = useState<AppState>(initialData);
    const [newListTitle, setNewListTitle] = useState("");
    const [isAddingList, setIsAddingList] = useState(false);
    const [newCardContent, setNewCardContent] = useState("");
    const [currentListId, setCurrentListId] = useState<string | null>(null);
    const [editingListId, setEditingListId] = useState<string | null>(null);
    const [editedListTitle, setEditedListTitle] = useState("");
    const [editedListColor, setEditedListColor] = useState("#FFFFFF");
    const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

    const cardInputRef = useRef<HTMLInputElement | null>(null);

    const handleDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        const sourceList = data.lists[source.droppableId];
        const destList = data.lists[destination.droppableId];
        const draggedCard = sourceList.cards.find((card) => card.id === draggableId);

        if (!draggedCard) return;

        const newSourceCards = Array.from(sourceList.cards);
        newSourceCards.splice(source.index, 1);

        const newDestCards = Array.from(destList.cards);
        newDestCards.splice(destination.index, 0, draggedCard);

        const newState: AppState = {
            ...data,
            lists: {
                ...data.lists,
                [source.droppableId]: {
                    ...sourceList,
                    cards: newSourceCards,
                },
                [destination.droppableId]: {
                    ...destList,
                    cards: newDestCards,
                },
            },
        };

        setData(newState);
    };

    const addNewList = () => {
        if (!newListTitle.trim()) return;

        const newListId = `list-${data.listIds.length + 1 + Math.floor(Math.random() * 1000)}`;
        const newList: List = {
            id: newListId,
            title: newListTitle,
            color: "#FFFFFF",
            cards: [],
        };

        const newState: AppState = {
            ...data,
            lists: {
                ...data.lists,
                [newListId]: newList,
            },
            listIds: [...data.listIds, newListId],
        };

        setData(newState);
        setNewListTitle("");
        setIsAddingList(false);
    };

    const addNewCard = (listId: string) => {
        if (!newCardContent.trim()) return;

        const newCardId = `card-${Math.random().toString(36).substr(2, 9)}`;
        const newCard: Card = {
            id: newCardId,
            content: newCardContent,
        };

        const newState: AppState = {
            ...data,
            lists: {
                ...data.lists,
                [listId]: {
                    ...data.lists[listId],
                    cards: [...data.lists[listId].cards, newCard],
                },
            },
        };

        setData(newState);
        setNewCardContent("");
        setCurrentListId(null);
    };

    const cancelAddCard = () => {
        setCurrentListId(null);
        setNewCardContent("");
    };

    const handleListEdit = (listId: string) => {
        const list = data.lists[listId];
        setEditedListTitle(list.title);
        setEditedListColor(list.color);
        setEditingListId(listId);
    };

    const saveListEdit = (listId: string) => {
        const updatedList = {
            ...data.lists[listId],
            title: editedListTitle,
            color: editedListColor,
        };

        const newState: AppState = {
            ...data,
            lists: {
                ...data.lists,
                [listId]: updatedList,
            },
        };

        setData(newState);
        setEditingListId(null);
    };

    useEffect(() => {
        if (currentListId && cardInputRef.current) {
            cardInputRef.current.focus();
        }
    }, [currentListId]);

    return (
        <div className="p-4 min-h-screen bg-cover bg-center">
            <h1 className="text-3xl font-bold mb-4">Trình lập kế hoạch</h1>
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="flex overflow-x-auto space-x-4">
                    {data.listIds.map((listId) => {
                        const list = data.lists[listId];
                        return (
                            <Droppable droppableId={list.id} key={list.id}>
                                {(provided) => (
                                    <div
                                        className="bg-gray-100 p-4 rounded-md min-w-[250px] border-2 border-white relative"
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        style={{ backgroundColor: list.color}} // Đặt màu danh sách
                                    >
                                        {/* Hiển thị biểu tượng chỉnh sửa danh sách */}
                                        <button
                                            className="absolute top-2 right-2 p-1"
                                            onClick={() => handleListEdit(list.id)}
                                        >
                                            ...
                                        </button>

                                        {/* Nếu đang chỉnh sửa danh sách */}
                                        {editingListId === list.id ? (
                                            <div className="absolute bg-white shadow-lg rounded p-4 z-10 w-72 right-1">
                                                <input
                                                    type="text"
                                                    value={editedListTitle}
                                                    onChange={(e) => setEditedListTitle(e.target.value)}
                                                    className="p-2 border rounded mb-2 w-60" // Thay đổi từ w-full thành w-60
                                                    placeholder="Nhập tên danh sách"
                                                />
                                                <input
                                                    type="color"
                                                    value={editedListColor}
                                                    onChange={(e) => setEditedListColor(e.target.value)}
                                                    className="mb-2"
                                                    title="Chọn màu danh sách"
                                                />
                                                <div className="flex justify-end mt-2">
                                                    <button
                                                        onClick={() => saveListEdit(list.id)}
                                                        className="bg-blue-500 text-white px-4 py-2 rounded font-bold mr-2"
                                                    >
                                                        Lưu
                                                    </button>
                                                    <button
                                                        onClick={() => setEditingListId(null)}
                                                        className="bg-red-500 text-white px-4 py-2 rounded font-bold"
                                                    >
                                                        Hủy
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <h2 className="text-lg font-bold mb-2">{list.title}</h2>
                                                {list.cards.map((card, index) => (
                                                    <Draggable
                                                        draggableId={card.id}
                                                        index={index}
                                                        key={card.id}
                                                    >
                                                        {(provided) => (
                                                            <div
                                                                className="bg-white p-2 mb-2 rounded shadow relative"
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                            >
                                                                {card.content}
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}

                                                {currentListId === list.id ? (
                                                    <div className="flex flex-col mb-2">
                                                        <input
                                                            ref={cardInputRef}
                                                            type="text"
                                                            value={newCardContent}
                                                            onChange={(e) => setNewCardContent(e.target.value)}
                                                            className="p-2 border rounded mb-2"
                                                            placeholder="Nhập nội dung thẻ..."
                                                        />
                                                        <div className="flex">
                                                            <button
                                                                onClick={() => addNewCard(list.id)}
                                                                className="bg-blue-500 text-white px-4 rounded font-bold"
                                                            >
                                                                Thêm
                                                            </button>
                                                            <button
                                                                onClick={cancelAddCard}
                                                                className="text-black px-2 py-2 rounded font-bold"
                                                            >
                                                                Hủy
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={() => setCurrentListId(list.id)}
                                                        className="text-black px-4 py-2 rounded mb-2 flex items-center font-bold"
                                                    >
                                                        <svg
                                                            className="w-4 h-4 mr-2"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M12 4v16m8-8H4"
                                                            />
                                                        </svg>
                                                        Thêm thẻ
                                                    </button>
                                                )}
                                            </>
                                        )}
                                    </div>
                                )}
                            </Droppable>
                        );
                    })}

                    <div className="min-w-[250px] flex items-center justify-center">
                        {/* Giữ lại chức năng thêm danh sách */}
                        {isAddingList ? (
                            <div className="flex flex-col mb-2">
                                <input
                                    type="text"
                                    value={newListTitle}
                                    onChange={(e) => setNewListTitle(e.target.value)}
                                    className="p-2 border rounded mb-2"
                                    placeholder="Nhập tên danh sách..."
                                />
                                <div className="flex">
                                    <button
                                        onClick={addNewList}
                                        className="bg-blue-500 text-white px-4 rounded font-bold"
                                    >
                                        Thêm
                                    </button>
                                    <button
                                        onClick={() => setIsAddingList(false)}
                                        className="text-white px-3 py-3 rounded font-bold"
                                    >
                                        Hủy
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsAddingList(true)}
                                className="text-white px-4 py-2 rounded mb-2 flex items-center font-bold"
                            >
                                <svg
                                    className="w-4 h-4 mr-2"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>
                                Thêm danh sách
                            </button>
                        )}
                    </div>
                </div>
            </DragDropContext>
        </div>
    );
};

export default Planning;
