const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

let todos = [];

// Lấy danh sách todos
app.get('/todos', (req, res) => {
    res.json(todos);
});

// Thêm todo mới
app.post('/todos', (req, res) => {
    const { task } = req.body;
    const newTodo = { id: todos.length + 1, task };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// Xóa todo
app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    todos = todos.filter(todo => todo.id !== id);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});