const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors'); // Require the 'cors' package

const app = express();
const port = 3000;

// Use the 'cors' middleware to enable CORS
app.use(cors());


app.use(bodyParser.json());

// MySQL database connection configuration
const db = mysql.createConnection({
  host: 'localhost',       // Replace with your MySQL server host
  user: 'root',   // Replace with your MySQL username
  password: 'Mysql1101', // Replace with your MySQL password
  database: 'nodecrud',    // Your database name (nodecrud)
  authPlugin: 'mysql_native_password',
});

// Connect to the MySQL database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Create a new book
app.post('/books', (req, res) => {
  const { name, author, publish_date } = req.body;
  const sql = 'INSERT INTO books (name, author, publish_date) VALUES (?, ?, ?)';
  db.query(sql, [name, author, publish_date], (err, result) => {
    if (err) {
      console.error('Error creating book:', err);
      res.status(500).json({ message: 'Error creating book' });
    } else {
      res.status(201).json({ message: 'Book created successfully' });
    }
  });
});

// Get all books
app.get('/books', (req, res) => {
  const sql = 'SELECT * FROM books';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching books:', err);
      res.status(500).json({ message: 'Error fetching books' });
    } else {
      res.status(200).json(results);
    }
  });
});

// Get a specific book by ID
app.get('/books/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM books WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error fetching book:', err);
      res.status(500).json({ message: 'Error fetching book' });
    } else if (result.length === 0) {
      res.status(404).json({ message: 'Book not found' });
    } else {
      res.status(200).json(result[0]);
    }
  });
});

// Update a book by ID
app.put('/books/:id', (req, res) => {
  const id = req.params.id;
  const { name, author, publish_date } = req.body;
  const sql = 'UPDATE books SET name = ?, author = ?, publish_date = ? WHERE id = ?';
  db.query(sql, [name, author, publish_date, id], (err, result) => {
    if (err) {
      console.error('Error updating book:', err);
      res.status(500).json({ message: 'Error updating book' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Book not found' });
    } else {
      res.status(200).json({ message: 'Book updated successfully' });
    }
  });
});

// Delete a book by ID
app.delete('/books/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM books WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting book:', err);
      res.status(500).json({ message: 'Error deleting book' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Book not found' });
    } else {
      res.status(200).json({ message: 'Book deleted successfully' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
