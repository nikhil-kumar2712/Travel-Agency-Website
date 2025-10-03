const nodemailer = require("nodemailer");
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
  host: process.env.DB_HOST,     
  user: process.env.DB_USER,     
  password: process.env.DB_PASS, 
  database: process.env.DB_NAME, 
  port: process.env.DB_PORT, 
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
    selectedPackages, // new field from frontend
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
      user_id, firstname, lastname, tno, destination, selectedPackages,
      pickup, droped, travel, cno, email, ano, ldate, rdate,
      accommodation, activities, meals, customRequests, callback, price
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [
      userId,
      firstname,
      lastname,
      tno,
      JSON.stringify(destination),
      JSON.stringify(selectedPackages), // store package info
      pickup,
      drop,
      travel,
      cno,
      email,
      ano,
      ldate,
      rdate,
      accommodation,
      JSON.stringify(activities),
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

  const query = "SELECT * FROM bookings WHERE user_id = ?";
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error fetching bookings" });
    }

    const safeParse = (value, fallbackArray = false) => {
      if (!value) return fallbackArray ? [] : {};
      try {
        return JSON.parse(value);
      } catch {
        return fallbackArray ? [value] : {};
      }
    };

    const parsedResults = results.map((booking) => ({
      ...booking,
      destination: safeParse(booking.destination, true),     // always array
      activities: safeParse(booking.activities, true),       // always array
      selectedPackages: safeParse(booking.selectedPackages, true),  
      callback: !!booking.callback,                          // ensure boolean
    }));

    res.json(parsedResults);
  });
});

// ✅ API route to get all bookings
app.get("/adminhome", (req, res) => {
  db.query("SELECT * FROM bookings", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error fetching bookings" });
    }

    const safeParse = (value, fallbackArray = false) => {
      if (!value) return fallbackArray ? [] : {};
      try {
        return JSON.parse(value);
      } catch {
        return fallbackArray ? [value] : {};
      }
    };

    const parsedResults = results.map((booking) => ({
      ...booking,
      destination: safeParse(booking.destination, true),     // always array
      activities: safeParse(booking.activities, true),       // always array
      selectedPackages: safeParse(booking.selectedPackages, true),            // ensure boolean
    }));

    res.json(parsedResults);
  });
});

// ✅ Route to insert place + related data
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
  console.log("Inserting place:", placeQuery);
  db.query(placeQuery, [placeName, description], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    const placeId = result.insertId;

   // Insert images
    req.files.forEach((file) => {
      const imgPath = "uploads/" + file.filename;
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
      db.query(
        "INSERT INTO packages (place_id, title, description, price) VALUES (?, ?, ?, ?)",
        [placeId, pkg.heading, pkg.description, pkg.price],
        (err) => { if (err) console.error(err); }
      );
    });

    // Insert inclusions
    inclusions.forEach((inc) => {
      db.query(
        "INSERT INTO inclusions (place_id, item) VALUES (?, ?)",
        [placeId, inc],
        (err) => {if (err) console.error(err);}
      );
    });

    // Insert exclusions
      exclusions.forEach((exc) => {
        db.query(
          "INSERT INTO exclusions (place_id, item) VALUES (?, ?)",
          [placeId, exc],
          (err) => {if (err) console.error(err);}
        );
      });

    res.json({ message: "Place added successfully", placeId });
  });
});

// ✅ Get place details by name (with images, packages, inclusions, exclusions)
app.get("/places/:placeName", (req, res) => {
  const placeName = req.params.placeName.replace(/-/g, " ");

  // Fetch main place info
  db.query("SELECT * FROM places WHERE LOWER(name) = LOWER(?)", [placeName], (err, placeResults) => {
    if (err) return res.status(500).json({ error: err });
    if (placeResults.length === 0) return res.status(404).json({ message: "Place not found" });

    const place = placeResults[0];

    // Fetch images
    db.query("SELECT image_url FROM place_images WHERE place_id = ?", [place.id], (err, imageResults) => {
      if (err) return res.status(500).json({ error: err });

      // Fetch packages
      db.query("SELECT title AS heading, description, price FROM packages WHERE place_id = ?", [place.id], (err, packageResults) => {
        if (err) return res.status(500).json({ error: err });

        // Fetch inclusions
        db.query("SELECT item FROM inclusions WHERE place_id = ?", [place.id], (err, inclusionResults) => {
          if (err) return res.status(500).json({ error: err });

          // Fetch exclusions
          db.query("SELECT item FROM exclusions WHERE place_id = ?", [place.id], (err, exclusionResults) => {
            if (err) return res.status(500).json({ error: err });

            // Combine into one JSON object
            res.json({
              id: place.id,
              name: place.name,
              description: place.description,
              images: imageResults.map(i => i.image_url),
              packages: packageResults, // already objects with heading, description, price
              inclusions: inclusionResults.map(i => i.item),
              exclusions: exclusionResults.map(i => i.item)
            });
          });
        });
      });
    });
  });
});

// ✅ Fetch all places with main image (for listing)
app.get("/places", (req, res) => {
  const query = `
    SELECT p.id,p.name,(
    SELECT pi.image_url FROM place_images pi WHERE pi.place_id = p.id LIMIT 1) AS image_url
    FROM places p
  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err });

    // Map results so each place has one representative image
    const places = results.map(row => ({
      id: row.id,
      name: row.name,
      image_url: row.image_url ? `http://localhost:5000/${row.image_url}` : null
    }));

    res.json(places);
  });
});

// ✅ GET /places-with-packages
app.get("/places-with-packages", (req, res) => {
  // Step 1: Fetch all places
  const placeQuery = "SELECT id, name FROM places";

  db.query(placeQuery, (err, places) => {
    if (err) return res.status(500).json({ error: err });

    if (places.length === 0) return res.json([]);

    // Step 2: For each place, fetch its packages
    const placeIds = places.map(p => p.id);
    const packageQuery = `
      SELECT id, place_id, title, price
      FROM packages
      WHERE place_id IN (?)
    `;

    db.query(packageQuery, [placeIds], (err, packages) => {
      if (err) return res.status(500).json({ error: err });

      // Step 3: Attach packages to their respective place
      const result = places.map(place => {
        const placePackages = packages.filter(pkg => pkg.place_id === place.id);
        return {
          id: place.id,
          name: place.name,
          packages: placePackages
        };
      });

      res.json(result);
    });
  });
});

// ✅ POST endpoint to handle contact form submissions
app.post("/contact", async (req, res) => {
  const { firstname, lastname, email, subject } = req.body;

  // Set up your transporter (SMTP details)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "nikhilkumar111076@gmail.com",  // your Gmail
      pass: "uzwv xitl apca xzhe",       // generate an App Password from Google
    },
  });

  // Compose the mail
  const mailOptions = {
    from: email,                  // sender: the email entered in the form
    to: "nikhilkumar6778op@gmail.com",// recipient: your fixed email
    subject:"User Querries from Contact Form",
    text: `Name: ${firstname} ${lastname}\nEmail: ${email}\n\nMessage:\n${subject}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "Message sent successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send message." });
  }
});

// ✅ Update Place + related data
app.post("/places/:id", upload.array("images"), (req, res) => {
  const placeId = req.params.id;
  let { placename, description, packages, inclusions, exclusions } = req.body;

  // Parse JSON strings into real arrays/objects
  try {
    packages = JSON.parse(packages || "[]");
    inclusions = JSON.parse(inclusions || "[]");
    exclusions = JSON.parse(exclusions || "[]");
  } catch (err) {
    return res.status(400).json({ error: "Invalid JSON in request" });
  }

  // ✅ Update place description
  const updatePlaceQuery = "UPDATE places SET name = ?,description = ? WHERE id = ?";
  db.query(updatePlaceQuery, [placename, description, placeId], (err) => {
    if (err) return res.status(500).json({ error: err });

    // ✅ Update images
    // Get existing images from DB
    db.query("SELECT image_url FROM place_images WHERE place_id=?", [placeId], (err, rows) => {
      if (err) return console.error(err);

      const existingDBImages = rows.map(r => r.image_url);
      let updatedImages = req.body.existingImages || [];
      if (!Array.isArray(updatedImages)) updatedImages = [updatedImages]; // single image case

      // Remove images not in updatedImages
      const imagesToDelete = existingDBImages.filter(img => !updatedImages.includes(img));
      imagesToDelete.forEach(img => {
        db.query("DELETE FROM place_images WHERE place_id=? AND image_url=?", [placeId, img], (err) => {
          if (err) console.error(err);
        });
      });
    });

    // Add new uploaded images
    req.files.forEach(file => {
        const imgPath = "uploads/" + file.filename;
        db.query(
          "INSERT INTO place_images (place_id, image_url) VALUES (?, ?)",
          [placeId, imgPath],
          (err) => { if (err) console.error(err); }
        );
    });

    // ✅ Update packages
    db.query("DELETE FROM packages WHERE place_id = ?", [placeId], (err) => {
      if (err) console.error(err);
      packages.forEach((pkg) => {
        db.query(
          "INSERT INTO packages (place_id, title, description, price) VALUES (?, ?, ?, ?)",
          [placeId, pkg.heading, pkg.description, pkg.price],
          (err) => { if (err) console.error(err); }
        );
      });
    });

    // ✅ Update inclusions
    db.query("DELETE FROM inclusions WHERE place_id = ?", [placeId], (err) => {
      if (err) console.error(err);
      inclusions.forEach((inc) => {
        db.query(
          "INSERT INTO inclusions (place_id, item) VALUES (?, ?)",
          [placeId, inc],
          (err) => { if (err) console.error(err); }
        );
      });
    });

    // ✅ Update exclusions
    db.query("DELETE FROM exclusions WHERE place_id = ?", [placeId], (err) => {
      if (err) console.error(err);
      exclusions.forEach((exc) => {
        db.query(
          "INSERT INTO exclusions (place_id, item) VALUES (?, ?)",
          [placeId, exc],
          (err) => { if (err) console.error(err); }
        );
      });
    });

    res.json({ message: "Place updated successfully" });
  });
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));