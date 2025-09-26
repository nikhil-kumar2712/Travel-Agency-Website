import { Link } from "react-router-dom";
import "../style.css";
import styles from "../css-modules/places.module.css";

const Places = () => {
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
      <div className={styles.Places_section}>
        <div className={styles.box}>
          <img src="/assets/1.jpeg" alt="Taj Mahal" />
          <div id={styles.text}>
            <p>Taj Mahal, Agra</p>
          </div>
        </div>

        <div className={styles.box}>
          <Link to="/pune">
            <img src="/assets/6.jpg" alt="Pratapgarh" />
          </Link>
          <div id={styles.text}>
            <p>Pratapgarh Fort, Pune</p>
          </div>
        </div>

        <div className={styles.box}>
          <img src="/assets/3.jpeg" alt="Red Fort" />
          <div id={styles.text}>
            <p>Red Fort, New Delhi</p>
          </div>
        </div>

        <div className={styles.box}>
          <img src="/assets/somnath.jpeg" alt="Somnath" />
          <div id={styles.text}>
            <p>Somnath Temple, Somnath</p>
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className={styles.Places_section}>
        <div className={styles.box}>
          <Link to="/goa">
            <img src="/assets/5.jpeg" alt="Goa" />
          </Link>
          <div id={styles.text}>
            <p>Calangute, Goa</p>
          </div>
        </div>

        <div className={styles.box}>
          <img src="/assets/sea.jpg" alt="Lakshadweep" />
          <div id={styles.text}>
            <p>Agatti, Lakshadweep</p>
          </div>
        </div>

        <div className={styles.box}>
          <Link to="/kerala">
            <img src="/assets/lake.jpg" alt="Kerala" />
          </Link>
          <div id={styles.text}>
            <p>Vembanad Backwaters, Kerala</p>
          </div>
        </div>

        <div className={styles.box}>
          <img src="/assets/mumbai.jpg" alt="Mumbai" />
          <div id={styles.text}>
            <p>India Gate, Mumbai</p>
          </div>
        </div>
      </div>

      {/* Section 3 */}
      <div className={styles.Places_section}>
        <div className={styles.box}>
          <img src="/assets/jaipur.jpg" alt="Jaipur" />
          <div id={styles.text}>
            <p>The City Palace, Jaipur</p>
          </div>
        </div>

        <div className={styles.box}>
          <img src="/assets/dal lake.jpg" alt="Dal Lake" />
          <div id={styles.text}>
            <p>Dal Lake, Srinagar</p>
          </div>
        </div>

        <div className={styles.box}>
          <img src="/assets/kanyakumari.jpg" alt="Kanyakumari" />
          <div id={styles.text}>
            <p>Thiruvalluvar Statue, Kanyakumari</p>
          </div>
        </div>

        <div className={styles.box}>
          <Link to="/ayodhya">
            <img src="/assets/12.jpg" alt="Ayodhya" />
          </Link>
          <div id={styles.text}>
            <p>Sri Ram Mandir, Ayodhya</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <br/>
      <br/>
      <footer style={{ textAlign: "center", padding: "20px" }}>
        Made with ❤️ by Vtravellers
        © 2024 - ∞
      </footer>
    </div>
  );
};

export default Places;
