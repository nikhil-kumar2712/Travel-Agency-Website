import React, { useState } from "react";
import "./style.css";
import "font-awesome/css/font-awesome.min.css";

function App() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  return (
    <div>
      {/* Header / Navbar */}
      <header>
        <div id="navbar">
          <img
            src="logo.png"
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

      {/* Hero Slides */}
      {["fpage1.jpg", "fpage2.jpg", "fpage3.jpg", "fpage4.jpg", "fpage5.jpg"].map((img, i) => (
        <div key={i} className="mySlides" style={{ backgroundImage: `url(${img})` }}>
          <div className="content">
            <span> Explore , Discover , Travel </span>
            <h3> Travel around the world </h3>
            <a href="places.html" className="btn"> Discover More </a>
          </div>
        </div>
      ))}

      {/* Services Section */}
      <section className="sevices">
        <h1 style={{ paddingLeft: "695px", paddingBottom: "3rem", fontSize: "1.5rem" }}>
          Our Services
        </h1>
        <div className="box-container">
          {[
            { img: "adventure.png", text: "Adventure" },
            { img: "tour.png", text: "Tour Guide" },
            { img: "treck.png", text: "Trekking" },
            { img: "campfire.png", text: "Camp Fire" },
            { img: "offroad.png", text: "Off Road" },
            { img: "camping.png", text: "Camping" },
          ].map((s, i) => (
            <div key={i} className="service-box">
              <img src={s.img} alt={s.text} />
              <h3>{s.text}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Quote */}
      <p style={{ textAlign: "center", paddingLeft: "100px", paddingRight: "100px", paddingBottom: "3rem", fontSize: "1.5rem" }}>
        <i>
          "Ready to embark on your next adventure? Escape to breathtaking destinations with unbeatable deals from <strong>Vtravellers</strong>. From sun-soaked beaches to cultural treasures, we've got your dream getaway covered. Book now and unlock a world of unforgettable experiences!"
        </i>
      </p>

      {/* Book Now Button */}
      <div className="button">
        <a href="booking.html" style={{ textDecoration: "none" }}>BOOK NOW</a>
      </div>

      {/* Sign Up Modal */}
      {showSignUp && (
        <div id="id01" className="modal">
          <span onClick={() => setShowSignUp(false)} className="close">x</span>
          <form className="modal-content">
            <div className="contain">
              <h1 style={{ textAlign: "center", fontSize: "1.5rem" }}>Sign Up</h1>
              <p style={{ textAlign: "center" }}>Please fill in this form to create an account.</p>
              <hr />
              <label><b>Email</b></label>
              <input type="text" placeholder="Enter Email" required />

              <label><b>Password</b></label>
              <input type="password" placeholder="Enter Password" required />

              <label><b>Repeat Password</b></label>
              <input type="password" placeholder="Repeat Password" required />

              <p><a href="#" style={{ color: "dodgerblue", textDecoration: "none" }}>Terms & Conditions</a>.</p>
              <br />
              <p>
                Do you agree?? &nbsp;
                <input type="radio" id="yes" name="agree" value="Yes" />
                <label htmlFor="yes">Yes</label>
                <input type="radio" id="no" name="agree" value="No" />
                <label htmlFor="no">No</label>
              </p>
              <br />
              <div className="clearfix">
                <button type="submit" className="signup">Sign Up</button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Sign In Modal */}
      {showSignIn && (
        <div id="id02" className="modal">
          <span onClick={() => setShowSignIn(false)} className="close">x</span>
          <form className="modal-content">
            <div className="contain">
              <h1 style={{ textAlign: "center", fontSize: "1.5rem" }}>Sign In</h1>
              <hr />
              <label><b>Email</b></label>
              <input type="text" placeholder="Enter Email" required />

              <label><b>Password</b></label>
              <input type="password" placeholder="Enter Password" required />

              <label>
                <input type="checkbox" defaultChecked name="remember" style={{ marginBottom: "15px" }} /> Remember me
              </label>

              <div className="clearfix">
                <button type="submit" className="signup">Sign In</button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Footer */}
      <section className="footer">
        <div className="Box-container">
          <div className="bottom">
            <h3>Quick Links</h3>
            <a href="home.html"><i className="fa fa-angle-right"></i> Home </a>
            <a href="places.html"><i className="fa fa-angle-right"></i> Places </a>
            <a href="booking.html"><i className="fa fa-angle-right"></i> Booking </a>
          </div>
          <div className="bottom">
            <h3>External Links</h3>
            <a href="about.html"><i className="fa fa-angle-right"></i> About Us </a>
            <a href="contact.html"><i className="fa fa-angle-right"></i> Contact Us </a>
            <a href="#"><i className="fa fa-angle-right"></i> Privacy policy </a>
            <a href="#"><i className="fa fa-angle-right"></i> Terms and Conditions </a>
          </div>
          <div className="bottom">
            <h3>Contact info</h3>
            <a href="#"><i className="fa fa-phone"></i> +123-456-7890 </a>
            <a href="#"><i className="fa fa-phone"></i> +011-435-2874 </a>
            <a href="#"><i className="fa fa-envelope"></i> vtravellers0111@gamil.com </a>
            <a href="#"><i className="fa fa-map"></i> Pune,India - 411038 </a>
          </div>
          <div className="bottom">
            <h3>Follow Us</h3>
            <a href="#"><i className="fa fa-facebook"></i> Facebook </a>
            <a href="#"><i className="fa fa-twitter"></i> Twitter </a>
            <a href="#"><i className="fa fa-instagram"></i> Instagram </a>
            <a href="#"><i className="fa fa-linkedin"></i> Linkedin </a>
          </div>
        </div>
      </section>

      <footer>
        Made with &hearts; by Vtravellers <br />
        &#169; 2024-&infin;
      </footer>
    </div>
  );
}

export default App;
