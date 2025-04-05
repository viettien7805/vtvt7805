import React, { useState, useEffect } from 'react';

function App() {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState('');

    // Lấy danh sách todos từ API
    useEffect(() => {
        fetch('https://vtvt7805.onrender.com/todos')
            .then(res => res.json())
            .then(data => setTodos(data))
            .catch(err => console.error('Error fetching todos:', err));
    }, []);

    // Thêm todo
    const addTodo = () => {
        fetch('https://vtvt7805.onrender.com/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task })
        })
            .then(res => {
                if (!res.ok) throw new Error('Failed to add todo');
                return res.json();
            })
            .then(newTodo => {
                setTodos([...todos, newTodo]);
                setTask('');
            })
            .catch(err => console.error('Error adding todo:', err));
    };

    // Xóa todo
    const deleteTodo = (id) => {
        fetch(`https://vtvt7805.onrender.com/todos/${id}`, {
            method: 'DELETE'
        })
            .then(res => {
                if (!res.ok) throw new Error('Failed to delete todo');
                setTodos(todos.filter(todo => todo.id !== id));
            })
            .catch(err => console.error('Error deleting todo:', err));
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Todo List</h1>
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Nhập công việc"
            />
            <button onClick={addTodo}>Thêm</button>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        {todo.task} <button onClick={() => deleteTodo(todo.id)}>Xóa</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;