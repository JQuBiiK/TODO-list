import React from 'react';
import HeaderList from '../headerList/HeaderList';
import TodoForm from '../todoList/TodoForm';
import TodoList from '../todoList/TodoList';
import TaskFilter from '../taskFilter/TaskFilter';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, toggleTask, removeTask } from '../../features/todos/todoSlice';
import { RootState } from '../../store/store';
import './App.scss'

const App: React.FC = () => {
    const dispatch = useDispatch();
    const todos = useSelector((state: RootState) => state.todos.todos);
    const filter = useSelector((state: RootState) => state.todos.filter);

    const filteredTodos = todos.filter((task) => {
        if (filter === 'completed') return task.completed;
        if (filter === 'active') return !task.completed;
        return true;
    });

    const handleAddTask = (text: string) => {
        dispatch(addTask(text));
    };

    const handleToggleTask = (id: string) => {
        dispatch(toggleTask(id));
    };

    const handleRemoveTask = (id: string) => {
        dispatch(removeTask(id));
    };

    return (
        <div className='container'>
            <HeaderList />
            <TodoForm onAdd={handleAddTask} />
            <TaskFilter />
            <TodoList todos={filteredTodos} onToggle={handleToggleTask} onRemove={handleRemoveTask} />
        </div>
    );
};

export default App;
