import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "../css-modules/addplaces.module.css";
const API_URL = process.env.REACT_APP_API_URL;

function PlacePage() {
  const { placeName } = useParams();
  const [placeData, setPlaceData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch(`${API_URL}/places/${encodeURIComponent(placeName)}`)
      .then(res => res.json())
      .then(data => setPlaceData(data));
  }, [placeName]);

  // Slideshow timer
  useEffect(() => {
    if (placeData?.images?.length) {
      const timer = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % placeData.images.length);
      }, 3000); // 3 seconds per slide
      return () => clearInterval(timer);
    }
  }, [placeData]);

  if (!placeData) return <p>Unable to Load...</p>;

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
        <h1 className={styles.page_title}>{placeData.name}</h1>

        {/* Slideshow */}
        {placeData.images && placeData.images.length > 0 && (
        <div className={styles.slideshow}>
            <img
            src={`${API_URL}/${placeData.images[currentIndex]}`} 
            alt={`${placeData.name} slideshow`}
            className={styles.slide_image}
            />
        </div>
        )}

        <div className={styles.vcontent} style={{ color: "#0056b3" , marginTop: "20px", textAlign: "center" }}>
            <h1>Explore {placeData.name}</h1>
            <p>{placeData.description}</p>
        </div>
      
        {/* Packages */}
        <section>
            <h2 className={styles.section_title}>Our Packages</h2>
            <div className={styles.packages_container}>
                {placeData.packages.map((pkg, idx) => (
                <div className={styles.package_card} key={idx}>
                    <h3>{pkg.heading}</h3>
                    <p>{pkg.description}</p>
                    <p className={styles.price}>{pkg.price}</p>
                </div>
                ))}
            </div>
        </section>
        
        {/* Inclusions */}
        <section>
            <h3 className={styles.section_subtitle}>Inclusions</h3>
            <ul className={styles.list}>
            {placeData.inclusions.map((inc, i) => <li key={i}>{inc}</li>)}
            </ul>
        </section>

        {/* Exclusions */}
        <section>
            <h3 className={styles.section_subtitle}>Exclusions</h3>
            <ul className={styles.list}>
            {placeData.exclusions.map((exc, i) => <li key={i}>{exc}</li>)}
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

export default PlacePage;
