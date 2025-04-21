import React, { useState } from 'react';
import "./TodoList.scss"

interface TodoFormProps {
    onAdd: (text: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
    const [taskText, setTaskText] = useState('');

    const handleAdd = () => {
        if (taskText.trim()) {
            onAdd(taskText);
            setTaskText('');
        }
    };

    return (
        <div className="add-task">
            <input
                type="text"
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                placeholder="Напишите что хотите не забыть..."
            />
            <button onClick={handleAdd}>Добавить</button>
        </div>
    );
};

export default TodoForm;
