import React from "react";
import "font-awesome/css/font-awesome.min.css";

function Header({ setShowSignIn, setShowSignUp }) {
  return (
    <header>
      <div id="navbar">
        <img
          src="./assets/logo.png"
          alt="Logo"
          style={{ paddingTop: "7px", paddingLeft: "20px", height: "35px", width: "60px" }}
        />
        <a id="logo">Vtravellers.in</a>
        <nav role="navigation">
          <div id="menuToggle">
            <input type="checkbox" />
            <span className="menuTogglesign"></span>
            <span className="menuTogglesign"></span>
            <span className="menuTogglesign"></span>
            <ul id="menu">
              <li><span onClick={() => setShowSignIn(true)}>Sign In</span></li>
              <li><span onClick={() => setShowSignUp(true)}>Sign Up</span></li>
              <li><a href="places.html">Places</a></li>
              <li><a href="booking.html">Booking</a></li>
              <li><a href="#">About</a></li>
              <li><a href="contact.html">Contact Us</a></li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
