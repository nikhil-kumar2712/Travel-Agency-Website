import React from "react";
import "../style.css"; // keep your existing css

function Pune() {
  return (
    <div>
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
      <h1 style={{ border: "2px solid DodgerBlue" }}>
        Pune - [3 Nights/4 Days]
      </h1>

      {/* Main Image */}
      <div className="mySlides fade">
        <img src="/assets/pmain.jpg" width="350" height="260" alt="Pune Main" />
      </div>

      {/* Background Video */}
      <video autoPlay muted loop id="myVideo">
        <source src="/assets/pune.mp4" type="video/mp4" />
      </video>
      <div className="vcontent">
        <h1>Heading</h1>
        <p>Lorem ipsum...</p>
      </div>

      {/* Trip Plan */}
      <section>
        <h3 style={{ backgroundColor: "powderblue" }}>Short Trip To Pune</h3>
        <p>
          Product Code : KLLT004 <br />
          Product Name : Short Trip to Pune | 3N/4D <br />
          Program : Lonavala 2N - Thekkady 1N - Pune 2N <br />
          Per Person Cost: ₹16000/- Nett
        </p>
      </section>

      {/* Day 01 */}
      <section>
        <h3 style={{ backgroundColor: "powderblue" }}>Day 01 : Arrive Pune – Lonavala</h3>
        <img src="/assets/p0.jpg" width="300" height="200" alt="Day 1" />
        <p>
          On arrival you will be received from Pune Airport / Railway Station
          and drive to Lonavala (1 hr 12 min) enroute visit Della Adventure Park,
          Karla Caves and Bhaje Buddhist Caves. On arrival check in at hotel
          and relax. Overnight stay at the hotel.
        </p>
      </section>

      {/* Day 02 */}
      <section>
        <h3 style={{ backgroundColor: "powderblue" }}>Day 02 : Imagica</h3>
        <img src="/assets/p1.jpg" width="300" height="200" alt="Day 2" />
        <p>
          After breakfast travel to Imagica. Enjoy the whole day with rides and
          shows until night. Return to hotel for dinner. Overnight stay at Novotel.
        </p>
      </section>

      {/* Day 03 */}
      <section>
        <h3 style={{ backgroundColor: "powderblue" }}>Day 03 : Lonavala – Pune</h3>
        <img src="/assets/pd1.jpg" width="300" height="200" alt="Day 3" />
        <p>
          Breakfast, checkout from hotel and drive to Pune-Kothrud at Hotel Rajwet.
          Visit Dagdushet Ganpati temple, have lunch, relax, and later visit Okiama Garden.
          Overnight stay at hotel.
        </p>
      </section>

      {/* Day 04 */}
      <section>
        <h3 style={{ backgroundColor: "powderblue" }}>Day 04 : Pune</h3>
        <img src="/assets/p4.jpg" width="300" height="200" alt="Day 4" />
        <p>
          After breakfast, check out of the hotel and drive to Harihar Fort for
          trekking. Return, have dinner, and rest at the hotel.
        </p>
      </section>

      {/* Day 05 */}
      <section>
        <h3 style={{ backgroundColor: "powderblue" }}>Day 05 : Airport</h3>
        <img src="/assets/p5.jpg" width="300" height="200" alt="Day 5" />
        <p>
          After breakfast on the final day, check out and drive back to Pune Airport /
          Railway Station with wonderful memories.
        </p>
      </section>

      {/* Inclusions */}
      <section>
        <h3 style={{ backgroundColor: "powderblue" }}>Inclusions</h3>
        <ul>
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
        <h3 style={{ backgroundColor: "powderblue" }}>Exclusions</h3>
        <ul>
          <li>Flight / Train Fare / Darshan tickets</li>
          <li>Guide and Entrance Fee at monuments</li>
          <li>Lunch & Dinner at the hotel</li>
          <li>Personal expenses (telephone, laundry etc.)</li>
          <li>Any additional activities</li>
          <li>
            Gala dinner charges on Christmas and New Year's Eve (if applicable)
          </li>
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

export default Pune;
