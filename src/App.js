import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import "./style.css";
import Header from "./components/header";
import Footer from "./components/footer";
import SignUp from "./components/signUp";
import SignIn from "./components/signIn";
import Home from "./pages/Home.js";
import Places from "./pages/Places.js";
import Booking from "./pages/Booking.js";
import Contact from "./pages/Contact.js";
import About from "./pages/About.js";

function App() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  return (
    <Router>
      <div>
        <Header setShowSignUp={setShowSignUp} setShowSignIn={setShowSignIn} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/places" element={<Places />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Routes>

        {/* Sign Up Modal */}
        {showSignUp && <SignUp onClose={() => setShowSignUp(false)} />}

        {/* Sign In Modal */}
        {showSignIn && <SignIn onClose={() => setShowSignIn(false)} />}

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
