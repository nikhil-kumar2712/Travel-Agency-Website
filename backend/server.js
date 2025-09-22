const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Connect to MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Nikhil@1290",
  database: "travel",
  port: 3306
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
    return;
  }
  console.log("✅ Connected to MySQL database");
});

// ✅ API route for Sign In
app.post("/signin", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length === 0) {
      return res.status(401).json({ error: "User not found" });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // ✅ Send only user data
      res.json({ id: user.id, email: user.email });
    });
  });
});

// ✅ API route for Sign Up
app.post("/signup", (req, res) => {
  const { email, password } = req.body;

  // Hash the password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ error: "Error hashing password" });

    // Insert into database
    const query = "INSERT INTO users (email, password) VALUES (?, ?)";
    db.query(query, [email, hashedPassword], (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(409).json({ error: "Email already exists" });
        }
        return res.status(500).json({ error: "Database error" });
      }

      res.json({ message: "Sign Up successful", userId: result.insertId });
    });
  });
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
