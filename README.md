🌏 VTravellers – Travel Booking Web Application ✈️🏖️

VTravellers is a full-stack travel booking platform where users can explore travel packages, sign up, and book trips. The app is built with React.js for the frontend, Node.js + Express for the backend, and MySQL for data storage.

✨ Features

📝 User Authentication with Sign Up and Sign In

🔒 Secure password storage using bcrypt hashing

🏝️ Browse travel packages with detailed itineraries & images

📱 Responsive design for mobile, tablet, and desktop

🎯 "Book Now" interface for trip reservations

🎞️ Interactive slideshows & service sections

🛠️ Tech Stack

Frontend: React.js, HTML5, CSS3

Backend: Node.js, Express.js

Database: MySQL

Authentication: bcryptjs

Other Tools: Axios, CORS, Body-parser

🚀 Installation
Prerequisites

Node.js (https://nodejs.org
)

MySQL (https://dev.mysql.com/downloads/
)

Git (https://git-scm.com/
)

Steps

Clone the repository:

git clone https://github.com/yourusername/vtravellers.git
cd vtravellers


Install frontend dependencies:

cd client
npm install


Install backend dependencies:

cd ../server
npm install

💾 Database Setup

Open MySQL Workbench or your preferred client.

Create the database and users table:

CREATE DATABASE travel;

USE travel;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255) NOT NULL
);


Update server.js with your MySQL credentials:

🏃‍♂️ Running the Project

Start the backend server:

cd server
node server.js


Server will run at http://localhost:5000.

Start the frontend React app:

cd client
npm start


Frontend runs at http://localhost:3000.

🧑‍💻 Author

Nikhil Kumar
✉️ Email: nk8201059@gmail.com
