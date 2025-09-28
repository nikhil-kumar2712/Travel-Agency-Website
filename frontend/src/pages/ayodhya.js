import { useState, useEffect } from "react";
import styles from "../css-modules/addplaces.module.css";

function Addplaces() {
  // --- Slideshow ---
  const images = [
    "/assets/ayodhya1.jpg",
    "/assets/ayodhya2.jpg",
    "/assets/ayodhya3.jpg",
    "/assets/ayodhya4.jpg",
    "/assets/ayodhya5.jpg",
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
      <h1 className={styles.page_title}>Ayodhya</h1>

      {/* Slideshow */}
      <div className={styles.slideshow}>
        <img
          src={images[currentIndex]}
          alt="Tourist Place"
          className={styles.slide_image}
        />
      </div>

      <div className={styles.vcontent} style={{ color: "#0056b3", marginTop: "20px", textAlign: "center" }}>
        <h1>Explore Ayodhya</h1>
        <p>
          Discover the spiritual heart of India with VTravellers. Visit sacred temples,
          ghats, and heritage landmarks in the holy city of Ayodhya.
        </p>
      </div>

      {/* Packages */}
      <section>
        <h2 className={styles.section_title}>Our Packages</h2>
        <div className={styles.packages_container}>
          <div className={styles.package_card}>
            <h3>1 Day Package</h3>
            <p>
              Visit Shri Ram Janmabhoomi, Hanuman Garhi, Dashrath Mahal and Kanak Bhawan.
              Includes local guide and transport.
            </p>
            <p className={styles.price}>₹1,200/- per person</p>
          </div>
          <div className={styles.package_card}>
            <h3>2 Days Package</h3>
            <p>
              Day 1: Shri Ram Janmabhoomi, Hanuman Garhi, Dashrath Mahal;  
              Day 2: Nageshwarnath Temple, Saryu River Aarti, Guptar Ghat. Includes hotel stay,
              breakfast, and transport.
            </p>
            <p className={styles.price}>₹4,800/- per person</p>
          </div>
          <div className={styles.package_card}>
            <h3>3 Days Package</h3>
            <p>
              Day 1: Shri Ram Janmabhoomi, Kanak Bhawan, Hanuman Garhi;  
              Day 2: Treta Ke Thakur Temple, Dashrath Mahal, Guptar Ghat;  
              Day 3: Saryu Aarti, local heritage markets. Includes hotel stay, breakfast, and transport.
            </p>
            <p className={styles.price}>₹7,500/- per person</p>
          </div>
          <div className={styles.package_card}>
            <h3>4 Days Package</h3>
            <p>
              Complete Ayodhya spiritual tour including Ram Janmabhoomi Mandir, Nageshwarnath, 
              Saryu Ghat, Guptar Ghat and nearby religious sites. Includes hotel stay, breakfast,
              guided tours, and transport.
            </p>
            <p className={styles.price}>₹9,500/- per person</p>
          </div>
          <div className={styles.package_card}>
            <h3>5 Days Package</h3>
            <p>
              Extended pilgrimage with leisure stays, visit to nearby Faizabad sites, full temple tours, 
              Saryu River Aarti, and cultural programs. Includes hotel stay, meals, transport, and activities.
            </p>
            <p className={styles.price}>₹12,000/- per person</p>
          </div>
        </div>
      </section>

      {/* Inclusions */}
      <section>
        <h3 className={styles.section_subtitle}>Inclusions</h3>
        <ul className={styles.list}>
          <li>Accommodation in mentioned category rooms in all the hotels or similar</li>
          <li>Meal Plan: Breakfast & Dinner</li>
          <li>Vehicle: Sedan / A/C Cab for transfers and sightseeing</li>
          <li>Guided visits to Shri Ram Janmabhoomi and major temples</li>
          <li>Toll, Parking, driver’s Bata, road tax & fuel charges</li>
          <li>Pick up and drop from Ayodhya Railway Station / Airport</li>
        </ul>
      </section>

      {/* Exclusions */}
      <section>
        <h3 className={styles.section_subtitle}>Exclusions</h3>
        <ul className={styles.list}>
          <li>Meals not mentioned above</li>
          <li>Entry Fees to Monuments or Special Poojas</li>
          <li>Anything not mentioned in the Inclusions</li>
          <li>Porterage, Tips, Insurance, Laundry, etc.</li>
          <li>Ayurveda/Wellness charges & personal expenses</li>
          <li>Any cost due to natural calamities like roadblocks or floods</li>
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
