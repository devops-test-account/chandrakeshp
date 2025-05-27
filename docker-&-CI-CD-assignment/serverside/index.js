const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'mysql', // Use the service name defined in Docker Compose
    user: 'root',
    password: 'root', // Replace with your MySQL root password
    database: 'mydb' // Replace with your database name
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database!');
});
// Define your CRUD routes here

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Create
app.post('/items', (req, res) => {
    const { name, description } = req.body;
    const query = 'INSERT INTO items (name, description) VALUES (?, ?)';
    db.execute(query, [name, description], (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(201).send({ id: results.insertId, name, description });
    });
});
// Read
app.get('/items', (req, res) => {
    db.query('SELECT * FROM items', (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});
// Update
app.put('/items/:id', (req, res) => {
    const { name, description } = req.body;
    const query = 'UPDATE items SET name = ?, description = ? WHERE id = ?';
    db.execute(query, [name, description, req.params.id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.send({ id: req.params.id, name, description });
    });
});
// Delete
app.delete('/items/:id', (req, res) => {
    const query = 'DELETE FROM items WHERE id = ?';
    db.execute(query, [req.params.id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(204).send();
    });
});