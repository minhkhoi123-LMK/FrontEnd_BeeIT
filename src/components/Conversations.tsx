import React from 'react';

const Conversations = () => {
    const conversations = [
        { id: 1, name: 'John Doe', lastMessage: 'Hello, how are you?', time: '10:30 AM', avatarUrl: 'https://via.placeholder.com/150' },
        { id: 2, name: 'Jane Smith', lastMessage: 'Can we meet tomorrow?', time: '09:15 AM', avatarUrl: 'https://via.placeholder.com/150' },
        { id: 3, name: 'Alice Johnson', lastMessage: 'Thank you for your help!', time: 'Yesterday', avatarUrl: 'https://via.placeholder.com/150' },
        {
            id: 4,
            name: 'Group Chat',
            lastMessage: 'New messages in group!',
            time: '2 days ago',
            members: [
                { name: 'John Doe', avatarUrl: 'https://via.placeholder.com/150' },
                { name: 'Jane Smith', avatarUrl: 'https://via.placeholder.com/150' },
                { name: 'Alice Johnson', avatarUrl: 'https://via.placeholder.com/150' },
                { name: 'Bob Brown', avatarUrl: 'https://via.placeholder.com/150' },
            ]
        }
    ];

    const messages = [
        { id: 1, sender: 'John Doe', content: 'Hello, how are you?', time: '10:30 AM', avatarUrl: 'https://via.placeholder.com/150' },
        { id: 2, sender: 'You', content: 'I am fine, thank you!', time: '10:31 AM', avatarUrl: 'https://via.placeholder.com/150' },
        { id: 3, sender: 'John Doe', content: 'Glad to hear that!', time: '10:32 AM', avatarUrl: 'https://via.placeholder.com/150' }
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-1/4 bg-white border-r overflow-y-auto ">
                <div className="p-4 border-b">
                    <h2 className="text-xl font-semibold">Cuộc trò chuyện</h2>
                </div>
                <ul>
                    {conversations.map((conversation) => (
                        <li key={conversation.id} className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    {/* Hiển thị avatar cho cuộc trò chuyện */}
                                    {conversation.members ? (
                                        <div className="flex -space-x-2">
                                            <img
                                                src={conversation.members[0].avatarUrl} // Avatar đại diện cho nhóm
                                                alt="Group Avatar"
                                                className="w-10 h-10 rounded-full border-2 border-white" // Tăng kích thước avatar
                                            />
                                            {/* Hiển thị số lượng thành viên nếu có nhiều hơn 1 */}
                                            {conversation.members.length > 1 && (
                                                <div className="w-10 h-10 rounded-full bg-gray-300 text-xs flex items-center justify-center text-gray-600">
                                                    +{conversation.members.length - 1}
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <img
                                            src={conversation.avatarUrl}
                                            alt={`${conversation.name} avatar`}
                                            className="w-10 h-10 rounded-full border-2 border-white" // Tăng kích thước avatar
                                        />
                                    )}
                                    <div className="ml-2">
                                        <h3 className="text-lg font-medium">{conversation.name}</h3>
                                        <p className="text-sm text-gray-500">{conversation.lastMessage}</p>
                                    </div>
                                </div>
                                <span className="text-xs text-gray-400">{conversation.time}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

                {/* Main chat window */}
                <div className="w-3/4 flex flex-col bg-cover bg-center"
                     style={{ backgroundImage: "url('/images/gauze-05.jpg')"}}>
                </div>
            </div>
    );
};

export default Conversations;
