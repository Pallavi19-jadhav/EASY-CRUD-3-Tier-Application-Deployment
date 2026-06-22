const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

console.log("SERVER FILE LOADED");

// Test Route
app.get("/", (req, res) => {
  res.send("Backend Running Successfully");
});

// POST API
app.post("/employees", (req, res) => {
  const { name, email } = req.body;

  const sql = "INSERT INTO employees (name, email) VALUES (?, ?)";

  db.query(sql, [name, email], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error adding employee");
    }

    res.send("Employee Added Successfully");
  });
});

// GET API
console.log("REGISTERING EMPLOYEES GET ROUTE");
app.get("/employees", (req, res) => {
  console.log("EMPLOYEES ROUTE HIT");
  res.send("EMPLOYEES ROUTE WORKING");
});

// Start Server (IMPORTANT FIX HERE)
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.delete("/employees/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM employees WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).send(err);

    res.send("Employee Deleted");
  });
});

app.put("/employees/:id", (req, res) => {
  const id = req.params.id;
  const { name, email } = req.body;

  db.query(
    "UPDATE employees SET name=?, email=? WHERE id=?",
    [name, email, id],
    (err, result) => {
      if (err) return res.status(500).send(err);

      res.send("Employee Updated");
    }
  );
});