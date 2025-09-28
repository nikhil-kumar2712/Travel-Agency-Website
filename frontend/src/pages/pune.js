import { useState, useEffect } from "react";
import styles from "../css-modules/addplaces.module.css";

function Addplaces() {
  // --- Slideshow ---
  const images = [
    "/assets/pune1.jpg",
    "/assets/pune2.jpg",
    "/assets/pune3.jpg",
    "/assets/pune4.jpg",
    "/assets/pune5.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div style={{
        backgroundImage: "url('/assets/background.webp')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh"
      }}
      className={styles.container}>
      {/* Header */}
      <header>
        <div id="navbar">
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
        </div>
      </header>

      {/* Title */}
      <h1 className={styles.page_title}>Pune</h1>

      {/* Slideshow */}
      <div className={styles.slideshow}>
        <img
          src={images[currentIndex]}
          alt="Tourist Place"
          className={styles.slide_image}
        />
      </div>

      <div className={styles.vcontent} style={{ color: "#0056b3" , marginTop: "20px", textAlign: "center" }}>
        <h1>Explore Pune</h1>
        <p>
          Discover the cultural capital of Maharashtra with VTravellers. Heritage,
          adventure, and leisure – all in one place.
        </p>
      </div>

      {/* Packages */}
      <section>
        <h2 className={styles.section_title}>Our Packages</h2>
        <div className={styles.packages_container}>
          <div className={styles.package_card}>
            <h3>1 Day Package</h3>
            <p>Visit major attractions like Dagdushet Ganpati, Shaniwar Wada & Aga Khan Palace. Includes breakfast & transport.</p>
            <p className={styles.price}>₹5000/- per person</p>
          </div>
          <div className={styles.package_card}>
            <h3>2 Days Package</h3>
            <p>Day 1: Lonavala sightseeing | Day 2: Imagica Adventure Park. Includes hotel stay, breakfast, transport.</p>
            <p className={styles.price}>₹9500/- per person</p>
          </div>
          <div className={styles.package_card}>
            <h3>3 Days Package</h3>
            <p>Day 1: Pune City | Day 2: Lonavala Adventure | Day 3: Imagica Theme Park.</p>
            <p className={styles.price}>₹14000/- per person</p>
          </div>
          <div className={styles.package_card}>
            <h3>4 Days Package</h3>
            <p>Complete Pune + Lonavala experience including Dagdushet Ganpati, Karla Caves, Imagica, and Harihar Fort trek.</p>
            <p className={styles.price}>₹16000/- per person</p>
          </div>
        </div>
      </section>

      {/* Inclusions */}
      <section>
        <h3 className={styles.section_subtitle}>Inclusions</h3>
        <ul className={styles.list}>
          <li>Arrival and Departure assistance at the Airport/Railway station</li>
          <li>Daily Buffet Breakfast at the hotel</li>
          <li>Air conditioned Vehicles for all Transfers & Sightseeing</li>
          <li>Accommodation on Double Sharing Basis</li>
          <li>All expenses related to vehicle inclusive of Toll, fuel, parking</li>
          <li>All government related taxes</li>
        </ul>
      </section>

      {/* Exclusions */}
      <section>
        <h3 className={styles.section_subtitle}>Exclusions</h3>
        <ul className={styles.list}>
          <li>Flight / Train Fare / Darshan tickets</li>
          <li>Guide and Entrance Fee at monuments</li>
          <li>Lunch & Dinner at the hotel</li>
          <li>Personal expenses (telephone, laundry etc.)</li>
          <li>Any additional activities</li>
          <li>Gala dinner charges on Christmas and New Year's Eve (if applicable)</li>
        </ul>
      </section>

      {/* Footer */}
      <footer style={{ marginTop: "20px", textAlign: "center" }}>
        Made with ♥ by Vtravellers <br />
        © 2024 - ∞
      </footer>
    </div>
  );
}

export default Addplaces;

