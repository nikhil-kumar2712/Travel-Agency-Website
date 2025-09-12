import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import "./style.css";
import Home from "./pages/Home.js";
import Places from "./pages/Places.js";
import Booking from "./pages/Booking.js";
import Contact from "./pages/Contact.js";
import About from "./pages/About.js";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/places" element={<Places />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Routes>
    </Router>
  );
}

export default App;
