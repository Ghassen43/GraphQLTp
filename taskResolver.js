// taskResolver.js
const pool = require('./database');

const taskResolver = {
    Query: {
        task: async (_, { id }) => {
            const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [id]);
            return rows[0];
        },
        tasks: async () => {
            const [rows] = await pool.query('SELECT * FROM tasks');
            return rows;
        },
    },
    Mutation: {
        addTask: async (_, { title, description, completed }) => {
            const [result] = await pool.query(
                'INSERT INTO tasks (title, description, completed) VALUES (?, ?, ?)',
                [title, description, completed]
            );
            const [newTask] = await pool.query('SELECT * FROM tasks WHERE id = ?', [result.insertId]);
            return newTask[0];
        },
        completeTask: async (_, { id }) => {
            await pool.query('UPDATE tasks SET completed = true WHERE id = ?', [id]);
            const [updatedTask] = await pool.query('SELECT * FROM tasks WHERE id = ?', [id]);
            return updatedTask[0];
        },
        // Ajoutez d'autres mutations ici (changeDescription, deleteTask, etc.)
    },
};

module.exports = taskResolver;