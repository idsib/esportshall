const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const pool = new Pool({
  user: "admin",
  host: "localhost",
  database: "esportshall",
  password: "root",
  port: 5432,
});

app.use(cors()); 
app.use(express.json()); 

// CREATE
app.post("/users", async (req, res) => {
  const { completeName, email, password } = req.body;
  try {
    const result = await pool.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *", [completeName, email, password]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al insertar usuario:', err);
    res.status(500).json({ message: 'Error al crear usuario' });
  }
});

// READ
app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener usuarios:', err);
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
});

// UPDATE
app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const result = await pool.query("UPDATE users SET name = $1 WHERE id = $2 RETURNING *", [name, id]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al actualizar usuario:', err);
    res.status(500).json({ message: 'Error al actualizar usuario' });
  }
});

// DELETE
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM users WHERE id = $1", [id]);
    res.json({ message: "Item deleted" });
  } catch (err) {
    console.error('Error al eliminar usuario:', err);
    res.status(500).json({ message: 'Error al eliminar usuario' });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
