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
              <li><span style={{ cursor: "pointer" }} onClick={() => setShowSignIn(true)}>Sign In</span></li>
              <li><span style={{ cursor: "pointer" }} onClick={() => setShowSignUp(true)}>Sign Up</span></li>
              <li><a href="/places">Places</a></li>
              <li><a href="/booking">Booking</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/contact" style={{ whiteSpace: "nowrap" }}>Contact Us</a></li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
