import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

interface TodosState {
    todos: Todo[];
    filter: 'all' | 'completed' | 'active';
}

const loadTodosFromLocalStorage = (): Todo[] => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
        return JSON.parse(savedTodos);
    }
    return [];
};

const saveTodosToLocalStorage = (todos: Todo[]) => {
    localStorage.setItem('todos', JSON.stringify(todos));
};

const initialState: TodosState = {
    todos: loadTodosFromLocalStorage(),
    filter: 'all',
};

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<string>) => {
            const newTask: Todo = {
                id: Date.now().toString(),
                text: action.payload,
                completed: false,
            };
            state.todos.push(newTask);
            saveTodosToLocalStorage(state.todos);
        },
        toggleTask: (state, action: PayloadAction<string>) => {
            const task = state.todos.find((task) => task.id === action.payload);
            if (task) {
                task.completed = !task.completed;
                saveTodosToLocalStorage(state.todos);
            }
        },
        removeTask: (state, action: PayloadAction<string>) => {
            state.todos = state.todos.filter((task) => task.id !== action.payload);
            saveTodosToLocalStorage(state.todos);
        },
        editTask: (state, action: PayloadAction<{ id: string; text: string }>) => {
            const task = state.todos.find((task) => task.id === action.payload.id);
            if (task) {
                task.text = action.payload.text;
                saveTodosToLocalStorage(state.todos);
            }
        },
        setFilter: (state, action: PayloadAction<'all' | 'completed' | 'active'>) => {
            state.filter = action.payload;
        },
        reorderTasks: (state, action: PayloadAction<Todo[]>) => {
            state.todos = action.payload;
            saveTodosToLocalStorage(state.todos);
        },
    },
});

export const { addTask, toggleTask, removeTask, editTask, setFilter, reorderTasks } = todoSlice.actions;
export default todoSlice.reducer;