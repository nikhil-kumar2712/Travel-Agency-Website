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
  password: "yourpassword",
  database: "yourdbname",
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

    // ✅ Compare hashed password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      res.json({ message: "Login successful", user: { id: user.id, email: user.email } });
    });
  });
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
