import { useState, useEffect } from "react";
import styles from "../css-modules/addplaces.module.css";

function Addplaces() {
  // --- Slideshow ---
  const images = [
    "/assets/kerela1.jpg",
    "/assets/kerela2.jpg",
    "/assets/kerela3.jpg",
    "/assets/kerela4.jpg",
    "/assets/kerela5.jpg",
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
      <h1 className={styles.page_title}>Kerala</h1>

      {/* Slideshow */}
      <div className={styles.slideshow}>
        <img
          src={images[currentIndex]}
          alt="Tourist Place"
          className={styles.slide_image}
        />
      </div>

      <div className={styles.vcontent} style={{ color: "#0056b3", marginTop: "20px", textAlign: "center" }}>
        <h1>Explore Kerala</h1>
        <p>
          Discover the lush greenery, backwaters, and cultural beauty of “God’s Own Country” with VTravellers. 
          From serene houseboats to tea gardens – Kerala has it all!
        </p>
      </div>

      {/* Packages */}
      <section>
        <h2 className={styles.section_title}>Our Packages</h2>
        <div className={styles.packages_container}>
          <div className={styles.package_card}>
            <h3>1 Day Package</h3>
            <p>
              Visit Kochi Fort, Chinese Fishing Nets, Marine Drive and Mattancherry Palace.  
              Includes local guide and transport.
            </p>
            <p className={styles.price}>₹2,000/- per person</p>
          </div>

          <div className={styles.package_card}>
            <h3>2 Days Package</h3>
            <p>
              Day 1: Kochi city tour (Fort Kochi, Mattancherry Palace, St. Francis Church);  
              Day 2: Alleppey backwater cruise and village visit. Includes hotel stay, breakfast, and transport.
            </p>
            <p className={styles.price}>₹6,200/- per person</p>
          </div>

          <div className={styles.package_card}>
            <h3>3 Days Package</h3>
            <p>
              Day 1: Kochi sightseeing (Mattancherry, Marine Drive, Fort Kochi);  
              Day 2: Munnar tea plantations, waterfalls;  
              Day 3: Alleppey houseboat cruise. Includes hotel stay, breakfast, and transport.
            </p>
            <p className={styles.price}>₹9,500/- per person</p>
          </div>

          <div className={styles.package_card}>
            <h3>4 Days Package</h3>
            <p>
              Complete Kerala tour covering Kochi, Munnar tea estates, Thekkady wildlife sanctuary,
              and Alleppey backwaters. Includes hotel stay, breakfast, guided tours, and transport.
            </p>
            <p className={styles.price}>₹12,800/- per person</p>
          </div>

          <div className={styles.package_card}>
            <h3>5 Days Package</h3>
            <p>
              Extended Kerala holiday with Kochi city tour, Munnar tea gardens, Thekkady safari,
              Alleppey/Kumarakom houseboat, and Kovalam beach leisure. Includes hotel stay, meals, transport, and activities.
            </p>
            <p className={styles.price}>₹16,500/- per person</p>
          </div>
        </div>
      </section>

      {/* Inclusions */}
      <section>
        <h3 className={styles.section_subtitle}>Inclusions</h3>
        <ul className={styles.list}>
          <li>Arrival and Departure assistance at the Airport/Railway station.</li>
          <li>Daily Buffet Breakfast at the hotel.</li>
          <li>Air conditioned Vehicles for all Transfers & Sightseeing as per the itinerary.</li>
          <li>Accommodation on Double Sharing Basis.</li>
          <li>All expenses related to vehicle inclusive of Toll, fuel, parking.</li>
          <li>All government related taxes.</li>
        </ul>
      </section>

      {/* Exclusions */}
      <section>
        <h3 className={styles.section_subtitle}>Exclusions</h3>
        <ul className={styles.list}>
          <li>Flight / Train Fare / Darshan tickets.</li>
          <li>Guide and Entrance Fee at monuments and sightseeing places.</li>
          <li>Lunch & Dinner at the hotel.</li>
          <li>Any personal expenses such as telephone, laundry bills etc.</li>
          <li>Any additional activities.</li>
          <li>Gala dinner charges on Christmas and New Year's Eve.</li>
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
