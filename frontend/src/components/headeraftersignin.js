import React, { useState } from "react";
import "../style.css";
import "font-awesome/css/font-awesome.min.css";

function HeaderAfterSignIn() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <div id="navbar" style={{ position: "relative" }}>
        <img
          src="/assets/logo.png"
          alt="Logo"
          style={{
            paddingTop: "7px",
            paddingLeft: "20px",
            height: "35px",
            width: "60px",
          }}
        />
        <a id="logo">Vtravellers.in</a>

        {/* User Icon */}
        <img
          src="/assets/user.png"
          alt="User"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            cursor: "pointer",
            position: "absolute",
            top: "10px",
            right: "10px",
            height: "35px",
            width: "40px",
            zIndex: 3,
          }}
        />

        {/* Menu */}
        {menuOpen && (
          <ul
            id="menu"
            style={{
              position: "absolute",
              top: "60px", // just below the header
              right: "143px", // align to right margin
              width: "200px",
              background: "#ededed",
              listStyle: "none",
              padding: "20px",
              margin: 0,
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              zIndex: 1
            }}
          >
            <li>
              <a href="/places">Places</a>
            </li>
            <li>
              <a href="/booking">Booking</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/contact" style={{ whiteSpace: "nowrap" }}>Contact Us</a>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
}

export default HeaderAfterSignIn;