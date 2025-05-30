import React, { useState, useRef, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Todo } from '../../features/todos/types';
import Modal from '../modal/Modal';

import './TodoList.scss'

interface TodoItemProps {
    task: Todo;
    index: number;
    onToggle: (id: string) => void;
    onRemove: (id: string) => void;
    moveTask: (dragIndex: number, hoverIndex: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ task, index, onToggle, onRemove, moveTask }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [, drag] = useDrag({
        type: 'TASK',
        item: { index },
    });

    const [, drop] = useDrop({
        accept: 'TASK',
        hover: (item: { index: number }) => {
            if (item.index !== index) {
                moveTask(item.index, index);
                item.index = index;
            }
        },
    });

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (ref.current) {
            drag(drop(ref.current));
        }
    }, [drag, drop]);

    return (
        <>
            <div
                ref={ref}
                className='todoList-item'
                style={{backgroundColor: task.completed ? '#e0e0e0' : '#fff'}}
            >
                <span
                    style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                    onClick={() => onToggle(task.id)}
                >
                  {task.text}
                </span>

                <div className="todoList-item__buttons">
                    <button className='edit' onClick={openModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path d="M1.31128 14.1984C1.34932 13.8561 1.36833 13.685 1.42012 13.525C1.46606 13.3831 1.53098 13.2481 1.6131 13.1235C1.70566 12.9832 1.82742 12.8614 2.07094 12.6179L13.0031 1.68577C13.9174 0.77141 15.3999 0.771411 16.3143 1.68577C17.2286 2.60013 17.2286 4.0826 16.3142 4.99696L5.38213 15.9291C5.1386 16.1726 5.01684 16.2943 4.87648 16.3869C4.75194 16.469 4.61688 16.5339 4.47496 16.5799C4.315 16.6317 4.14385 16.6507 3.80157 16.6887L1 17L1.31128 14.1984Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <button className='delete' onClick={() => onRemove(task.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" viewBox="0 0 23 24" fill="none">
                            <path d="M15.2604 6.16667V5.45833C15.2604 4.46657 15.2604 3.97069 15.0674 3.59189C14.8976 3.25869 14.6267 2.98779 14.2935 2.81801C13.9147 2.625 13.4188 2.625 12.4271 2.625H11.0104C10.0187 2.625 9.52278 2.625 9.14398 2.81801C8.81077 2.98779 8.53987 3.25869 8.37009 3.59189C8.17708 3.97069 8.17708 4.46657 8.17708 5.45833V6.16667M9.94792 11.0365V15.4635M13.4896 11.0365V15.4635M3.75 6.16667H19.6875M17.9167 6.16667V16.0833C17.9167 17.571 17.9167 18.3148 17.6272 18.883C17.3725 19.3828 16.9661 19.7892 16.4663 20.0438C15.8981 20.3333 15.1543 20.3333 13.6667 20.3333H9.77083C8.28319 20.3333 7.53937 20.3333 6.97117 20.0438C6.47137 19.7892 6.06501 19.3828 5.81035 18.883C5.52083 18.3148 5.52083 17.571 5.52083 16.0833V6.16667" stroke="#fff" stroke-width="1.77083" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                taskId={task.id}
                currentText={task.text}
                onClose={closeModal}
            />
        </>
    );
};

export default TodoItem;