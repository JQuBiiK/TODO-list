import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editTask } from '../../features/todos/todoSlice';
import './Modal.scss';

interface ModalProps {
    isOpen: boolean;
    taskId: string;
    currentText: string;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, taskId, currentText, onClose }) => {
    const [newText, setNewText] = useState(currentText);
    const dispatch = useDispatch();

    const handleSubmit = () => {
        if (newText.trim()) {
            dispatch(editTask({ id: taskId, text: newText }));
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="overlay">
            <div className="modal">
                <h3>Редактирование</h3>
                <input
                    type="text"
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                />
                <div className="buttons">
                    <button className='accept' onClick={handleSubmit} >Сохранить</button>
                    <button className='cancel' onClick={onClose} >Отмена</button>
                </div>

            </div>
        </div>
    );
};

export default Modal;
