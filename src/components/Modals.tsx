// src/Modals.tsx
import React from 'react';

interface ModalProps {
    onClose: () => void;
}

// Example Modal Components
const CreateProjectModal: React.FC<ModalProps> = ({ onClose }) => (
    <div className="modal">
        <div className="modal-content">
            <h2>Tạo dự án mới</h2>
            <button onClick={onClose}>Đóng</button>
        </div>
    </div>
);

const EditProjectModal: React.FC<ModalProps> = ({ onClose }) => (
    <div className="modal">
        <div className="modal-content">
            <h2>Chỉnh sửa dự án</h2>
            <button onClick={onClose}>Đóng</button>
        </div>
    </div>
);

interface ModalsControllerProps {
    activeModal: string | null;
    onClose: () => void;
}

const ModalsController: React.FC<ModalsControllerProps> = ({ activeModal, onClose }) => {
    switch (activeModal) {
        case 'createProject':
            return <CreateProjectModal onClose={onClose} />;
        case 'editProject':
            return <EditProjectModal onClose={onClose} />;
        default:
            return null;
    }
};

export default ModalsController;
