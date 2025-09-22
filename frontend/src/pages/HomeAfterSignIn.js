import React, { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import SignUp from "../components/signUp";
import SignIn from "../components/signIn";
import Slides from "../components/slides";
import Services from "../components/services";

console.log("Stored user:", localStorage.getItem("user"));

function HomeAfterSignIn() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  return (
    <div>
      <Header setShowSignUp={setShowSignUp} setShowSignIn={setShowSignIn} />
      {/* Sign Up Modal */}
      {showSignUp && <SignUp onClose={() => setShowSignUp(false)} />}
      {/* Sign In Modal */}
      {showSignIn && <SignIn onClose={() => setShowSignIn(false)} />}

      <div>
        <h1>Welcome, {user?.email}</h1>
      </div>

      {/* Hero Slides */}
      <Slides />

      {/* Services Section */}
      <Services />

      {/* Quote */}
      <p style={{ textAlign: "center", paddingTop: "3%" , paddingLeft: "100px", paddingRight: "100px", paddingBottom: "3rem", fontSize: "1.5rem" }}>
        <i>
          "Ready to embark on your next adventure? Escape to breathtaking destinations with unbeatable deals from <strong>Vtravellers</strong>. From sun-soaked beaches to cultural treasures, we've got your dream getaway covered. Book now and unlock a world of unforgettable experiences!"
        </i>
      </p>

      {/* Book Now Button */}
      <div className="button">
        <a href="/booking" style={{ textDecoration: "none" , whiteSpace: "nowrap" }}>BOOK NOW</a>
      </div>

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default HomeAfterSignIn;