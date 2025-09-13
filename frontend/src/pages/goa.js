import React from "react";
import "../style.css"; // keep your existing css

function Goa() {
  return (
    <div>
      {/* Header */}
      <header>
        <div id="navbar">
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ paddingTop: "7px", paddingLeft: "20px", height: "35px", width: "60px" }}
          />
          <a id="logo">Vtravellers.in</a>
        </div>
      </header>

      {/* Title */}
      <h1 style={{ border: "2px solid DodgerBlue" }}>Goa - [3 Nights / 4 Days]</h1>

      {/* Hero Image */}
      <div className="mySlides fade">
        <img src="goa.jpg" alt="Goa Beach" width="350" height="260" />
      </div>

      {/* Package Details */}
      <p>
        <h3 style={{ backgroundColor: "powderblue" }}>Goa with Zuri White Sands</h3>
        Product Code : KLLT003 <br />
        Product Name : Goa with Zuri White Sands | 3N/4D <br />
        Program : airport/railway station - Pork Vindaloo - Fort Aguada 1N - Priol 1N - Airport/Railway station <br />
        Per Person Cost: ₹5006/- Nett
      </p>

      {/* Day 1 */}
      <p>
        <h3 style={{ backgroundColor: "powderblue" }}>Day 01 : Airport/railway station - Food Exploring</h3>
        <img src="g2.jpg" alt="Day 1" width="300" height="200" />
        <p>
          Arrival in Goa. Welcome to the party capital of India. Explore sun-kissed beaches or try Goan delicacies like pork vindaloo and fish curry. Overnight stay at the hotel.
        </p>
      </p>

      {/* Day 2 */}
      <p>
        <h3 style={{ backgroundColor: "powderblue" }}>Day 02 : Fort Aguada</h3>
        <img src="g3.jpg" alt="Day 2" width="300" height="200" />
        <p>
          North Goa sightseeing tour including Fort Aguada, Coco Beach, Calangute, Baga, and Anjuna Beach. Return to hotel for overnight stay.
        </p>
      </p>

      {/* Day 3 */}
      <p>
        <h3 style={{ backgroundColor: "powderblue" }}>Day 03 : Shri Shantadurga Temple - Shri Manguesh Temple</h3>
        <img src="g4.jpg" alt="Day 3" width="300" height="200" />
        <p>
          Explore Shri Shantadurga Temple, Shri Manguesh Temple, Basilica of Bom Jesus, Se Cathedral, Dona Paula Bay, Miramar Beach. Evening boat cruise at Mandovi River. Overnight stay at hotel.
        </p>
      </p>

      {/* Day 4 */}
      <p>
        <h3 style={{ backgroundColor: "powderblue" }}>Day 04 : Departure</h3>
        <img src="g5.jpg" alt="Day 4" width="300" height="200" />
        <p>
          Departure from Goa. Transfer to airport/railway station with sweet memories of the trip.
        </p>
      </p>

      {/* Inclusions */}
      <p>
        <h3 style={{ backgroundColor: "powderblue" }}>Inclusions</h3>
        <p>Accommodation in mentioned category rooms in all the hotels or in similar</p>
        <p>Meal Plan: Breakfast & Dinner</p>
        <p>Vehicle: Sedan</p>
        <p>A/C Cab for all transfers and sightseeing as per itinerary</p>
        <p>1 Day North Goa & 1 Day South Goa sightseeing</p>
        <p>Toll, Parking, driver’s Bata, road tax & fuel charges</p>
        <p>Pick up and drop: Goa / Mopa Airport</p>
      </p>

      {/* Exclusions */}
      <p>
        <h3 style={{ backgroundColor: "powderblue" }}>Exclusions</h3>
        <p>Meals not mentioned above</p>
        <p>Entry Fees to Monuments and Palaces</p>
        <p>Anything not mentioned in the Inclusions</p>
        <p>Porterage, Tips, Insurance, Laundry, Liquors, Wine, etc.</p>
        <p>Ayurveda Charges & personal expenses</p>
        <p>Any cost due to natural calamities like landslides, roadblocks, etc.</p>
      </p>

      {/* Footer */}
      <footer>
        Made with &hearts; by Vtravellers <br />
        &#169; 2024 - &infin;
      </footer>
    </div>
  );
}

export default Goa;
