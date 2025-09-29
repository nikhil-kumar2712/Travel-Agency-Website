const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads")); 

// ✅ Connect to MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Nikhil@1290",
  database: "travel",
  port: 3306
});

// Set storage location
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });


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

// Route to insert place + related data
app.post("/places", upload.array("images"), (req, res) => {
  let { placeName, description, packages, inclusions, exclusions } = req.body;

  // Parse JSON strings into real arrays/objects
  try {
    packages = JSON.parse(packages || "[]");
    inclusions = JSON.parse(inclusions || "[]");
    exclusions = JSON.parse(exclusions || "[]");
  } catch (err) {
    return res.status(400).json({ error: "Invalid JSON in request" });
  }

  // Insert into places table first
  const placeQuery = "INSERT INTO places (name, description) VALUES (?, ?)";
  db.query(placeQuery, [placeName, description], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    const placeId = result.insertId;

   // Insert images
    req.files.forEach((file) => {
      const imgPath = "uploads/" + file.filename;
      console.log("Inserting image:", imgPath);
      db.query(
        "INSERT INTO place_images (place_id, image_url) VALUES (?, ?)",
        [placeId, imgPath],
        (err) => {
          if (err) console.error(err);
        }
      );
    });

    // Insert packages
    packages.forEach((pkg) => {
      console.log("Inserting package:", pkg);
      db.query(
        "INSERT INTO packages (place_id, title, description, price) VALUES (?, ?, ?, ?)",
        [placeId, pkg.heading, pkg.description, pkg.price],
        (err) => { if (err) console.error(err); }
      );
    });

    // Insert inclusions
    inclusions.forEach((inc) => {
      console.log("Inserting inclusion:", inc);
      db.query(
        "INSERT INTO inclusions (place_id, item) VALUES (?, ?)",
        [placeId, inc],
        (err) => {if (err) console.error(err);}
      );
    });

    // Insert exclusions
      exclusions.forEach((exc) => {
        console.log("Inserting exclusion:", exc);
        db.query(
          "INSERT INTO exclusions (place_id, item) VALUES (?, ?)",
          [placeId, exc],
          (err) => {if (err) console.error(err);}
        );
      });

    res.json({ message: "Place added successfully", placeId });
  });
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
