import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import HeaderAfterSignIn from "../components/headeraftersignin";
import Footer from "../components/footer";
import Slides from "../components/slides";
import Services from "../components/services";

function HomeAfterSignIn() {
  const navigate = useNavigate();

  useEffect(() => {
    // push a dummy state so back button triggers popstate
    window.history.pushState(null, "", window.location.href);

    const handleBack = () => {
      // logout on back
      localStorage.removeItem("user");
      navigate("/", { replace: true });
    };

    window.addEventListener("popstate", handleBack);
    return () => window.removeEventListener("popstate", handleBack);
  }, [navigate]);

  return (
    <div>
      <HeaderAfterSignIn />

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