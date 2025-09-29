import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../css-modules/places.module.css";

const Places = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/places")
      .then(res => res.json())
      .then(data => {
      setPlaces(data);
      })
      .catch(err => console.error(err));
  }, []);

  const toSlug = (name) => name.toLowerCase().replace(/\s+/g, "-");

  return (
    <div
      style={{
        backgroundImage: "url('/assets/background.webp')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh"
      }}
    >
      {/* Header */}
      <header>
        <div id="navbar">
          <img src="/assets/logo.png" alt="logo" style={{ paddingTop: "7px", paddingLeft: "20px", height: "35px", width: "60px" }} />
          <span id="logo">Vtravellers.in</span>
        </div>
      </header>

      <br /><br />
      <h3 style={{ textAlign: "center", fontSize: "5rem", color: "rgb(4,4,4)", lineHeight: 1, textShadow: "2px 2px #faf9f9" }}>
        TOP DESTINATIONS
      </h3>

      {/* Places Grid */}
      <div className={styles.Places_section}>
        {Array.isArray(places) && places.map((place) => (
          <div className={styles.box} key={place.id}>
            <Link to={`/place/${toSlug(place.name)}`}>
              <img src={place.image_url || "/assets/default.jpg"} alt={place.name} />
            </Link>
            <div id={styles.text}>
              <p>{place.name}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <br /><br />
      <footer style={{ textAlign: "center", padding: "20px" }}>
        Made with ❤️ by Vtravellers
        © 2024 - ∞
      </footer>
    </div>
  );
};

export default Places;