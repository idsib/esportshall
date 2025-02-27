const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
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
app.use(bodyParser.json());

// CREATE
app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  const result = await pool.query("INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *", [name, email]);
  res.json(result.rows[0]);
});

// READ
app.get("/users", async (req, res) => {
  const result = await pool.query("SELECT * FROM users");
  res.json(result.rows);
});

// UPDATE
app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const result = await pool.query("UPDATE users SET name = $1 WHERE id = $2 RETURNING *", [name, id]);
  res.json(result.rows[0]);
});

// DELETE
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM users WHERE id = $1", [id]);
  res.json({ message: "Item deleted" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
