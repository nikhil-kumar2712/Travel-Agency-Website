import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import "./style.css";
import Home from "./pages/Home.js";
import Places from "./pages/Places.js";
import Booking from "./pages/Booking.js";
import Contact from "./pages/Contact.js";
import About from "./pages/About.js";
import Pune from "./pages/pune.js";
import Goa from "./pages/goa.js";
import Ayodhya from "./pages/ayodhya.js";
import Kerala from "./pages/kerala.js";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/places" element={<Places />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/pune" element={<Pune />} />
          <Route path="/goa" element={<Goa />} />
          <Route path="/ayodhya" element={<Ayodhya />} />
          <Route path="/kerala" element={<Kerala />} />
        </Routes>
    </Router>
  );
}

export default App;
