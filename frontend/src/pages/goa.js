import { useState, useEffect } from "react";
import styles from "../css-modules/addplaces.module.css";

function Addplaces() {
  // --- Slideshow ---
  const images = [
    "/assets/goa1.jpg",
    "/assets/goa2.jpg",
    "/assets/goa3.jpg",
    "/assets/goa4.jpg",
    "/assets/goa5.jpg",
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
      <h1 className={styles.page_title}>Goa</h1>

      {/* Slideshow */}
      <div className={styles.slideshow}>
        <img
          src={images[currentIndex]}
          alt="Tourist Place"
          className={styles.slide_image}
        />
      </div>

      <div className={styles.vcontent} style={{ color: "#0056b3" , marginTop: "20px", textAlign: "center" }}>
        <h1>Explore Goa</h1>
        <p>
          Welcome to the sun-soaked beaches and vibrant culture of Goa with VTravellers.
          Relax, party, and explore heritage sites, markets, and the scenic coastline.
        </p>
      </div>

      {/* Packages */}
      <section>
        <h2 className={styles.section_title}>Our Packages</h2>
        <div className={styles.packages_container}>
          <div className={styles.package_card}>
            <h3>1 Day Package</h3>
            <p>Visit iconic beaches like Baga, Calangute, and Anjuna; explore Chapora Fort; enjoy water sports and local delicacies.</p>
            <p className={styles.price}>₹1,000/- per person</p>
          </div>
          <div className={styles.package_card}>
            <h3>2 Days Package</h3>
            <p>Day 1: North Goa sightseeing including Fort Aguada, Baga & Calangute beaches; Day 2: Mandovi River cruise, local markets. Includes hotel stay, breakfast, and transport.</p>
            <p className={styles.price}>₹4,500/- per person</p>
          </div>
          <div className={styles.package_card}>
            <h3>3 Days Package</h3>
            <p>Day 1: Arrival & beach hopping; Day 2: Old Goa churches, spice plantation tour; Day 3: Sunset cruise and leisure. Includes hotel stay, breakfast, and transport.</p>
            <p className={styles.price}>₹7,500/- per person</p>
          </div>
          <div className={styles.package_card}>
            <h3>4 Days Package</h3>
            <p>Complete Goa experience covering North & South Goa, beaches, temples, forts, and local cuisine. Includes hotel stay, breakfast, transport, and sightseeing.</p>
            <p className={styles.price}>₹10,000/- per person</p>
          </div>
          <div className={styles.package_card}>
            <h3>5 Days Package</h3>
            <p>Extended Goa trip with leisure stays, dolphin watching, sunset cruises, and full beach & heritage tour. Includes hotel stay, meals, transport, and activities.</p>
            <p className={styles.price}>₹12,500/- per person</p>
          </div>
        </div>
      </section>


      {/* Inclusions */}
      <section>
        <h3 className={styles.section_subtitle}>Inclusions</h3>
        <ul className={styles.list}>
          <li>Accommodation in mentioned category rooms in all the hotels or in similar</li>
          <li>Meal Plan: Breakfast & Dinner</li>
          <li>Vehicle: Sedan</li>
          <li>A/C Cab for all transfers and sightseeing as per itinerary</li>
          <li>Toll, Parking, driver’s Bata, road tax & fuel charges</li>
          <li>Pick up and drop: Goa / Mopa Airport</li>
        </ul>
      </section>

      {/* Exclusions */}
      <section>
        <h3 className={styles.section_subtitle}>Exclusions</h3>
        <ul className={styles.list}>
          <li>Meals not mentioned above</li>
          <li>Entry Fees to Monuments and Palaces</li>
          <li>Anything not mentioned in the Inclusions</li>
          <li>Porterage, Tips, Insurance, Laundry, Liquors, Wine, etc.</li>
          <li>Ayurveda Charges & personal expenses</li>
          <li>Any cost due to natural calamities like landslides, roadblocks, etc.</li>
        </ul>
      </section>

      {/* Footer */}
      <footer>
        Made with &hearts; by Vtravellers <br />
        &#169; 2024 - &infin;
      </footer>
    </div>
  );
}

export default Addplaces;
