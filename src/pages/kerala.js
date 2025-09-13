import React from "react";

function Kerala() {
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
      <h1 style={{ border: "2px solid DodgerBlue" }}>Kerala</h1>

      {/* Hero Image */}
      <div className="mySlides fade">
        <img src="istockphoto-511119924-612x612.jpg" alt="Kerala Scenic" width="350" height="260" />
      </div>

      {/* Package Details */}
      <p>
        <h3 style={{ backgroundColor: "powderblue" }}>Short Trip To Kerala</h3>
        Product Code : KLLT001 <br />
        Product Name : Short Trip to Kerala | 4N/5D <br />
        Program : Cochin - Munnar 2N - Thekkady 1N - Alleppey 1N - Cochin <br />
        Travel Validity : From Now to March 2024 <br />
        Per Person Cost: ₹14000/- Nett <br />
        <br />
        <strong>Hotel Options:</strong> <br />
        Munnar : At Woods Resorts | Munnar Castle | Lake N Hills <br />
        Thekkady : Periyar Meadows | Patio | Peppervine <br />
        Alleppey : AJ Park | Pagoda <br />
        *Note: Hotels will be blocked based on availability only.
      </p>

      {/* Day 1 */}
      <p>
        <h3 style={{ backgroundColor: "powderblue" }}>Day 01 : Arrive Cochin – Munnar</h3>
        <img src="k1.jpg" alt="Day 1" width="300" height="200" />
        <p>
          On arrival at Cochin Airport / Ernakulam Railway station, drive to Munnar (04 Hrs) enroute visit Valara and Cheeyappara waterfalls and natural scenic spots. Check in at hotel and relax for rest of the day. Overnight stay at Munnar.
        </p>
      </p>

      {/* Day 2 */}
      <p>
        <h3 style={{ backgroundColor: "powderblue" }}>Day 02 : Munnar</h3>
        <img src="k2.jpg" alt="Day 2" width="300" height="200" />
        <p>
          After breakfast, local sightseeing of Munnar including Tata Tea Museum, Mattupetty Dam, Echo Point, Photo Point, and Rajamalai (Eravikulam National Park) to spot Nilgiri Thars. Overnight stay at Munnar.
        </p>
      </p>

      {/* Day 3 */}
      <p>
        <h3 style={{ backgroundColor: "powderblue" }}>Day 03 : Munnar – Thekkady</h3>
        <img src="k3.jpg" alt="Day 3" width="300" height="200" />
        <p>
          After breakfast, drive to Thekkady (04 Hrs). Visit Periyar Wildlife Sanctuary, enjoy boating at Periyar Lake, Kathakali, Kalari, and Spice Plantation (direct payment basis). Overnight stay at Thekkady.
        </p>
      </p>

      {/* Day 4 */}
      <p>
        <h3 style={{ backgroundColor: "powderblue" }}>Day 04 : Thekkady - Alleppey</h3>
        <img src="k4.jpg" alt="Day 4" width="300" height="200" />
        <p>
          After breakfast, drive to Alleppey (04 Hrs). Famous for houseboat cruises along Kerala backwaters. Visit Sree Krishnaswamy temple, Lighthouse, Coir Museum & Beach. Overnight stay at Alleppey.
        </p>
      </p>

      {/* Day 5 */}
      <p>
        <h3 style={{ backgroundColor: "powderblue" }}>Day 05 : Alleppey - Cochin</h3>
        <img src="k5.jpg" alt="Day 5" width="300" height="200" />
        <p>
          After breakfast, check out from hotel and drive back to Cochin Airport / Railway station with wonderful holiday memories of God’s Own Country.
        </p>
      </p>

      {/* Inclusions */}
      <p>
        <h3 style={{ backgroundColor: "powderblue" }}>Inclusions</h3>
        <p>Arrival and Departure assistance at the Airport/Railway station.</p>
        <p>Daily Buffet Breakfast at the hotel.</p>
        <p>Air conditioned Vehicles for all Transfers & Sightseeing as per the itinerary.</p>
        <p>Accommodation on Double Sharing Basis.</p>
        <p>All expenses related to vehicle inclusive of Toll, fuel, parking.</p>
        <p>All government related taxes.</p>
      </p>

      {/* Exclusions */}
      <p>
        <h3 style={{ backgroundColor: "powderblue" }}>Exclusions</h3>
        <p>Flight / Train Fare / Darshan tickets.</p>
        <p>Guide and Entrance Fee at monuments and sightseeing places.</p>
        <p>Lunch & Dinner at the hotel.</p>
        <p>Any personal expenses such as telephone, laundry bills etc.</p>
        <p>Any additional activities.</p>
        <p>Gala dinner charges on Christmas and New Year's Eve.</p>
      </p>

      {/* Footer */}
      <footer>
        Made with &hearts; by Vtravellers <br />
        &#169; 2024 - &infin;
      </footer>
    </div>
  );
}

export default Kerala;
