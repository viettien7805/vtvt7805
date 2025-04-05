import React, { useState, useEffect } from 'react';

function App() {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState('');

    // Lấy danh sách todos từ API
    useEffect(() => {
        fetch('http://localhost:5000/todos')
            .then(res => res.json())
            .then(data => setTodos(data));
    }, []);

    // Thêm todo
    const addTodo = () => {
        fetch('https://vtvt7805.onrender.com', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task })
        })
            .then(res => res.json())
            .then(newTodo => setTodos([...todos, newTodo]));
        setTask('');
    };

    // Xóa todo
    const deleteTodo = (id) => {
        fetch(`https://vtvt7805.onrender.com`, { method: 'DELETE' })
            .then(() => setTodos(todos.filter(todo => todo.id !== id)));
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