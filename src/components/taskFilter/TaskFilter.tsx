import React from 'react';
import { useDispatch } from 'react-redux';
import { setFilter } from '../../features/todos/todoSlice';
import './TaskFilter.scss'

const TaskFilter: React.FC = () => {
    const dispatch = useDispatch();

    return (
        <div className="task-filter">
            <button onClick={() => dispatch(setFilter('all'))}>Все</button>
            <button onClick={() => dispatch(setFilter('active'))}>Активные</button>
            <button onClick={() => dispatch(setFilter('completed'))}>Выполненые</button>
        </div>
    );
};

export default TaskFilter;
