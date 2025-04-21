import React from 'react';
import { useDispatch } from 'react-redux';
import { reorderTasks } from '../../features/todos/todoSlice';
import TodoItem from './TodoItem';
import { Todo } from '../../features/todos/types';

interface TodoListProps {
    todos: Todo[];
    onToggle: (id: string) => void;
    onRemove: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onRemove }) => {
    const dispatch = useDispatch();

    const moveTask = (dragIndex: number, hoverIndex: number) => {
        const updatedTodos = [...todos];
        const [movedItem] = updatedTodos.splice(dragIndex, 1);
        updatedTodos.splice(hoverIndex, 0, movedItem);
        dispatch(reorderTasks(updatedTodos));
    };

    return (
        <div className='todoList'>
            {todos.length <= 0 ? <div className='todoList__empty'>Пока нет задач</div> :
                todos.map((task, index) => (
                <TodoItem
                    key={task.id}
                    task={task}
                    index={index}
                    onToggle={onToggle}
                    onRemove={onRemove}
                    moveTask={moveTask}
                />
            ))}
        </div>
    );
};

export default TodoList;
