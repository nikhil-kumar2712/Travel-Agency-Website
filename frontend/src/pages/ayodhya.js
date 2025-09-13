import React from "react";
import "../style.css"; // your CSS file

function Ayodhya() {
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
        Ayodhya - [4 Nights / 5 Days]
      </h1>

      {/* Hero Image */}
      <div className="mySlides fade">
        <img
          src="/assets/ayodhya-ram-mandir.jpg"
          width="350"
          height="260"
          alt="Ayodhya Ram Mandir"
        />
      </div>

      {/* Example Itinerary - You can expand like Pune */}
      <section>
        <h3 style={{ backgroundColor: "powderblue" }}>Day 01 : Arrival in Ayodhya</h3>
        <p>
          Arrive at Ayodhya airport/railway station. Meet our representative and
          transfer to hotel. Later, proceed to visit the sacred <b>Ram Janmabhoomi</b>,
          Hanuman Garhi, and nearby ghats for evening aarti. Overnight stay in Ayodhya.
        </p>
      </section>

      <section>
        <h3 style={{ backgroundColor: "powderblue" }}>Day 02 : Ayodhya Sightseeing</h3>
        <p>
          Visit <b>Kanak Bhavan</b>, Treta ke Thakur, and Nageshwarnath Temple. In the
          evening, enjoy the spiritual ambience of <b>Saryu Ghat Aarti</b>. Overnight stay.
        </p>
      </section>

      <section>
        <h3 style={{ backgroundColor: "powderblue" }}>Day 03 : Excursion to Faizabad</h3>
        <p>
          After breakfast, proceed to Faizabad (Ayodhya’s twin city). Visit Gulab Bari,
          Bahu Begum ka Maqbara, and Chowk area for local shopping. Return to Ayodhya for
          overnight stay.
        </p>
      </section>

      <section>
        <h3 style={{ backgroundColor: "powderblue" }}>Day 04 : Cultural Experience</h3>
        <p>
          Experience Ayodhya’s local culture – Ramkatha parks, temples, and spiritual
          centres. Evening free for leisure and shopping. Overnight stay.
        </p>
      </section>

      <section>
        <h3 style={{ backgroundColor: "powderblue" }}>Day 05 : Departure</h3>
        <p>
          After breakfast, check out from the hotel and transfer to airport/railway
          station with divine memories of Ayodhya.
        </p>
      </section>

      {/* Footer */}
      <footer style={{ marginTop: "20px", textAlign: "center" }}>
        Made with ♥ by Vtravellers <br />
        © 2024 - ∞
      </footer>
    </div>
  );
}

export default Ayodhya;
