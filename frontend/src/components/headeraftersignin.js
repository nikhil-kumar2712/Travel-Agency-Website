import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style.css";
import "font-awesome/css/font-awesome.min.css";

function HeaderAfterSignIn() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [uname, setUname] = useState("");
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);

  useEffect(() => {
    // ✅ Get uname from localStorage when the component mounts
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.uname) {
      setUname(storedUser.uname);
    }
  }, []);

    const handleLogout = () => {
    localStorage.removeItem("user"); // clear localStorage
    navigate("/"); // redirect to home page
  };

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
            <li
              style={{
                fontWeight: "bold",
                marginBottom: "10px",
                textAlign: "center",
                color: "#333",
                whiteSpace: "nowrap"
              }}
            >
              Hi, {uname || "User"}
            </li>
            <li>
              <a href="/places">Places</a>
            </li>
            <li>
              <a href="/booking" style={{ whiteSpace: "nowrap" }}>Book a Trip</a>
            </li>
            <li>
              <a href="/userbookings" style={{ whiteSpace: "nowrap" }}>My Bookings</a>
            </li>
            <li>
              <a href="/contact" style={{ whiteSpace: "nowrap" }}>Contact Us</a>
            </li>
            <li
              onClick={handleLogout}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              style={{
                color: hover ? "tomato" : "#232323",
                cursor: "pointer",
              }}
            >
              Logout
            </li>
          </ul>
        )}
      </div>
    </header>
  );
}

export default HeaderAfterSignIn;