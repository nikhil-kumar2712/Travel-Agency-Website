import React from "react";
import "../style.css"; // make sure your CSS file path is correct

function Booking() {
  return (
    <div
      style={{
        backgroundImage: "url('/assets/building image.jpeg')",
        backgroundSize: "1600px 1400px",
        minHeight: "100vh",
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
          <a id="logo">Vtravellers.in</a>
        </div>
      </header>

      {/* Form Section */}
      <div className="container">
        <div style={{ textAlign: "center" }}>
          <h2>Book Now</h2>
          <p>Fill up this form to get your customized travel package and get exciting offers.</p>
        </div>

        <div className="row">
          <div className="column">
            <form>
              <label htmlFor="fname">First Name</label>
              <input type="text" id="fname" name="firstname" placeholder="Enter Your first name.." required />

              <label htmlFor="lname">Last Name</label>
              <input type="text" id="lname" name="lastname" placeholder="Enter Your last name.." />

              <label htmlFor="tno">Number of travellers</label>
              <select id="tno" name="tno" required>
                <option value="1">One person</option>
                <option value="2">Two persons</option>
                <option value="3">Three persons</option>
                <option value="4">Four persons</option>
                <option value="5">Five persons</option>
              </select>

              <label htmlFor="destination">Destinations</label>
              <select id="destination" name="destination" required>
                <option value="Agra">Agra</option>
                <option value="Pune">Pune</option>
                <option value="New Delhi">New Delhi</option>
                <option value="Somnath">Somnath</option>
                <option value="Goa">Goa</option>
                <option value="Kerela">Kerela</option>
                <option value="Srinagar">Srinagar</option>
                <option value="Jaipur">Jaipur</option>
                <option value="Ayodhya">Ayodhya</option>
              </select>

              <label htmlFor="pickup">Pickup Point</label>
              <textarea
                id="pickup"
                name="pickup"
                placeholder="Enter your pickup address.. "
                required
                style={{ height: "100px" }}
              />

              <label htmlFor="drop">Dropping Point</label>
              <textarea
                id="drop"
                name="drop"
                placeholder="Enter your drop location.. "
                required
                style={{ height: "100px" }}
              />

              <label htmlFor="travel">Mode of Travelling</label>
              <select id="travel" name="travel">
                <option value="Air">By Air</option>
                <option value="Train">By Train</option>
                <option value="Road">By Road</option>
              </select>

              <label htmlFor="cno">Contact Number</label>
              <input type="number" id="cno" name="cno" placeholder="Your contact number.." required />

              <label htmlFor="email">Email</label>
              <input type="text" id="email" name="email" placeholder="Enter your Email.." required />

              <label htmlFor="ano">Adhar Card Number</label>
              <input type="number" id="ano" name="ano" placeholder="Enter your adhar card number.." required />

              <label htmlFor="ldate">Leaving On</label>
              <input type="date" id="ldate" name="ldate" required />

              <label htmlFor="rdate">Returning On</label>
              <input type="date" id="rdate" name="rdate" required />

              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ textAlign: "center", marginTop: "20px" }}>
        Made with &hearts; by Vtravellers
        <br />
        &#169; 2024-&infin;
      </footer>
    </div>
  );
}

export default Booking;
