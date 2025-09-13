// src/pages/Places.js
import React from "react";
import { Link } from "react-router-dom";
import "../style.css";

const Places = () => {
  return (
    <div
      style={{
        backgroundImage: "url('/assets/building image.jpeg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh"
      }}
    >
      {/* Header */}
      <header>
        <div id="navbar">
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ paddingTop: "7px", paddingLeft: "20px", height: "35px", width: "60px" }}
          />
          <span id="logo">Vtravellers.in</span>
        </div>
      </header>

      <br />
      <br />
      <h3
        style={{
          textAlign: "center",
          fontSize: "5rem",
          color: "rgb(4, 4, 4)",
          lineHeight: 1,
          textShadow: "2px 2px #faf9f9",
        }}
      >
        TOP DESTINATIONS
      </h3>

      {/* Section 1 */}
      <div className="Places-section">
        <div className="box">
          <img src="/assets/1.jpeg" alt="Taj Mahal" style={{ height: "200px", width: "100%", borderRadius: "25px" }} />
          <div style={{ padding: "10px", backgroundColor: "azure", borderRadius: "25px" }}>
            <p>Taj Mahal, Agra</p>
          </div>
        </div>

        <div className="box">
          <Link to="/pune">
            <img src="/assets/6.jpg" alt="Pratapgarh" style={{ height: "200px", width: "100%", borderRadius: "25px" }} />
          </Link>
          <div style={{ padding: "10px", backgroundColor: "azure", borderRadius: "25px" }}>
            <p>Pratapgarh Fort, Pune</p>
          </div>
        </div>

        <div className="box">
          <img src="/assets/3.jpeg" alt="Red Fort" style={{ height: "200px", width: "100%", borderRadius: "25px" }} />
          <div style={{ padding: "10px", backgroundColor: "azure", borderRadius: "25px" }}>
            <p>Red Fort, New Delhi</p>
          </div>
        </div>

        <div className="box">
          <img src="/assets/somnath.jpeg" alt="Somnath" style={{ height: "200px", width: "100%", borderRadius: "25px" }} />
          <div style={{ padding: "10px", backgroundColor: "azure", borderRadius: "25px" }}>
            <p>Somnath Temple, Somnath</p>
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className="Places-section-1">
        <div className="box">
          <Link to="/goa">
            <img src="/assets/5.jpeg" alt="Goa" style={{ height: "200px", width: "100%", borderRadius: "25px" }} />
          </Link>
          <div style={{ padding: "10px", backgroundColor: "azure", borderRadius: "25px" }}>
            <p>Calangute, Goa</p>
          </div>
        </div>

        <div className="box">
          <img src="/assets/sea.jpg" alt="Lakshadweep" style={{ height: "200px", width: "100%", borderRadius: "25px" }} />
          <div style={{ padding: "10px", backgroundColor: "azure", borderRadius: "25px" }}>
            <p>Agatti, Lakshadweep</p>
          </div>
        </div>

        <div className="box">
          <Link to="/kerala">
            <img src="/assets/lake.jpg" alt="Kerala" style={{ height: "200px", width: "100%", borderRadius: "25px" }} />
          </Link>
          <div style={{ padding: "10px", backgroundColor: "azure", borderRadius: "25px" }}>
            <p>Vembanad Backwaters, Kerala</p>
          </div>
        </div>

        <div className="box">
          <img src="/assets/mumbai.jpg" alt="Mumbai" style={{ height: "200px", width: "100%", borderRadius: "25px" }} />
          <div style={{ padding: "10px", backgroundColor: "azure", borderRadius: "25px" }}>
            <p>India Gate, Mumbai</p>
          </div>
        </div>
      </div>

      {/* Section 3 */}
      <div className="Places-section-2">
        <div className="box">
          <img src="/assets/jaipur.jpg" alt="Jaipur" style={{ height: "200px", width: "100%", borderRadius: "25px" }} />
          <div style={{ padding: "10px", backgroundColor: "azure", borderRadius: "25px" }}>
            <p>The City Palace, Jaipur</p>
          </div>
        </div>

        <div className="box">
          <img src="/assets/dal lake.jpg" alt="Dal Lake" style={{ height: "200px", width: "100%", borderRadius: "25px" }} />
          <div style={{ padding: "10px", backgroundColor: "azure", borderRadius: "25px" }}>
            <p>Dal Lake, Srinagar</p>
          </div>
        </div>

        <div className="box">
          <img src="/assets/kanyakumari.jpg" alt="Kanyakumari" style={{ height: "200px", width: "100%", borderRadius: "25px" }} />
          <div style={{ padding: "10px", backgroundColor: "azure", borderRadius: "25px" }}>
            <p>Thiruvalluvar Statue, Kanyakumari</p>
          </div>
        </div>

        <div className="box">
          <Link to="/ayodhya">
            <img src="/assets/12.jpg" alt="Ayodhya" style={{ height: "200px", width: "100%", borderRadius: "25px" }} />
          </Link>
          <div style={{ padding: "10px", backgroundColor: "azure", borderRadius: "25px" }}>
            <p>Sri Ram Mandir, Ayodhya</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <br />
      <br />
      <br />
      <footer style={{ textAlign: "center", padding: "20px" }}>
        Made with ❤️ by Vtravellers
        <br />
        © 2024 - ∞
      </footer>
    </div>
  );
};

export default Places;
