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
      res.json({ id: user.id, email: user.email ,uname: user.uname ,role: user.role});
    });
  });
});

// ✅ API route for Sign Up
app.post("/signup", (req, res) => {
  const { uname, email, password } = req.body;

  // 1️⃣ Pre-check for existing user by email or username
  const checkQuery = "SELECT uname, email FROM users WHERE email = ? OR uname = ?";
  db.query(checkQuery, [email, uname], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error while checking user" });

    if (results.length > 0) {
      // Check which one is taken
      if (results.some((u) => u.email === email)) {
        return res.status(409).json({ error: "Email already exists" });
      }
      if (results.some((u) => u.uname === uname)) {
        return res.status(409).json({ error: "Username already exists" });
      }
    }

    // 2️⃣ Hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ error: "Error hashing password" });

      // 3️⃣ Insert into database
      const insertQuery = "INSERT INTO users (uname, email, password) VALUES (?, ?, ?)";
      db.query(insertQuery, [uname, email, hashedPassword], (err, result) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            // As a fallback check, in case two requests come simultaneously
            if (err.sqlMessage.includes("uname")) {
              return res.status(409).json({ error: "Username already exists" });
            } else if (err.sqlMessage.includes("email")) {
              return res.status(409).json({ error: "Email already exists" });
            } else {
              return res.status(409).json({ error: "Duplicate entry" });
            }
          }
          return res.status(500).json({ error: "Database error while inserting user" });
        }

        // 4️⃣ Respond success
        res.json({ message: "Sign Up successful", userId: result.insertId });
      });
    });
  });
});

// ✅ API route to save booking
app.post("/bookings", (req, res) => {
  const {
    userId,
    firstname,
    lastname,
    tno,
    destination,
    pickup,
    drop,
    travel,
    cno,
    email,
    ano,
    ldate,
    rdate,
    accommodation,
    activities,
    meals,
    customRequests,
    callback,
    price
  } = req.body;

  const query = `
    INSERT INTO bookings (
      user_id, firstname, lastname, tno, destination, pickup, droped, travel, 
      cno, email, ano, ldate, rdate, accommodation, activities, meals, 
      customRequests, callback, price
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

    db.query(
    query,
    [
      userId,
      firstname,
      lastname,
      tno,
      JSON.stringify(destination), // store array as JSON
      pickup,
      drop,
      travel,
      cno,
      email,
      ano,
      ldate,
      rdate,
      accommodation,
      JSON.stringify(activities), // store array as JSON
      meals,
      customRequests,
      callback,
      price
    ],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error saving booking" });
      }
      res.json({ message: "Booking saved successfully", bookingId: result.insertId });
    }
  );
});

// ✅ API route to get bookings for a user
app.get("/bookings/:userId", (req, res) => {
  const userId = req.params.userId;

  db.query("SELECT * FROM bookings WHERE user_id = ?", [userId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error fetching bookings" });
    }
    res.json(results);
  });
});

// ✅ API route to get all bookings
app.get("/adminhome", (req, res) => {
  db.query("SELECT * FROM bookings", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error fetching bookings" });
    }
    res.json(results);
  });
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
