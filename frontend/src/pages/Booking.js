import React, { useState } from "react";
import styles from "../css-modules/booking.module.css";

function Booking() {
  // State for form inputs
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    tno: "1",
    destination: [],
    pickup: "",
    drop: "",
    travel: "Air",
    cno: "",
    email: "",
    ano: "",
    ldate: "",
    rdate: "",
    accommodation: "3-star",
    activities: [],
    meals: "breakfast",
    customRequests: "",
    callback: false,
  });

  const [price, setPrice] = useState(0);

  // handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked, files, options } = e.target;

    // For multi-select dropdowns
    if (type === "select-multiple") {
      const selected = [];
      for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
          selected.push(options[i].value);
        }
      }
      setFormData({ ...formData, [name]: selected });
    }
    // For checkboxes
    else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    }
    // For files
    else if (type === "file") {
      setFormData({ ...formData, [name]: files });
    }
    // For normal inputs
    else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // simple dynamic price calculation
  React.useEffect(() => {
    let basePrice = 5000; // base package price per person
    let travellers = parseInt(formData.tno);

    // add cost per destination
    basePrice += formData.destination.length * 2000;

    // accommodation multiplier
    if (formData.accommodation === "5-star") basePrice *= 1.5;
    if (formData.accommodation === "budget") basePrice *= 0.8;

    // add cost per activity
    basePrice += formData.activities.length * 1000;

    // meal plan
    if (formData.meals === "half-board") basePrice += 1000;
    if (formData.meals === "full-board") basePrice += 2000;

    // multiply by number of travellers
    setPrice(basePrice * travellers);
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Booking submitted successfully!");
    console.log(formData);
  };

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
      <div className={styles.container}>
        <div style={{ textAlign: "center" }}>
          <h2>Book Now</h2>
          <p>Fill up this form to get your customized travel package and get exciting offers.</p>
        </div>

        <div className={styles.row}>
          <div className={styles.column}>
            <form onSubmit={handleSubmit}>
              <label htmlFor="fname">First Name</label>
              <input
                type="text"
                id="fname"
                name="firstname"
                placeholder="Enter Your first name.."
                required
                onChange={handleChange}
              />

              <label htmlFor="lname">Last Name</label>
              <input
                type="text"
                id="lname"
                name="lastname"
                placeholder="Enter Your last name.."
                onChange={handleChange}
              />

              <label htmlFor="tno">Number of travellers</label>
              <select id="tno" name="tno" required onChange={handleChange}>
                <option value="1">One person</option>
                <option value="2">Two persons</option>
                <option value="3">Three persons</option>
                <option value="4">Four persons</option>
                <option value="5">Five persons</option>
              </select>

              <label htmlFor="destination">Destinations (Hold Ctrl/Command for multiple)</label>
              <select
                id="destination"
                name="destination"
                multiple
                required
                onChange={handleChange}
              >
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
                onChange={handleChange}
              />

              <label htmlFor="drop">Dropping Point</label>
              <textarea
                id="drop"
                name="drop"
                placeholder="Enter your drop location.. "
                required
                style={{ height: "100px" }}
                onChange={handleChange}
              />

              <label htmlFor="travel">Mode of Travelling</label>
              <select id="travel" name="travel" onChange={handleChange}>
                <option value="Air">By Air</option>
                <option value="Train">By Train</option>
                <option value="Road">By Road</option>
              </select>

              <label htmlFor="cno">Contact Number</label>
              <input
                type="number"
                id="cno"
                name="cno"
                placeholder="Your contact number.."
                required
                onChange={handleChange}
              />

              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Enter your Email.."
                required
                onChange={handleChange}
              />

              <label htmlFor="ano">Aadhar Card Number</label>
              <input
                type="number"
                id="ano"
                name="ano"
                placeholder="Enter your adhar card number.."
                required
                onChange={handleChange}
              />

              <label htmlFor="ldate">Leaving On</label>
              <input type="date" id="ldate" name="ldate" required onChange={handleChange} />

              <label htmlFor="rdate">Returning On</label>
              <input type="date" id="rdate" name="rdate" required onChange={handleChange} />

              {/* New Add-ons */}
              <label htmlFor="accommodation">Accommodation Type</label>
              <select id="accommodation" name="accommodation" onChange={handleChange}>
                <option value="3-star">3-Star</option>
                <option value="5-star">5-Star</option>
                <option value="budget">Budget Stay</option>
              </select>

              <label htmlFor="activities">Activities (Hold Ctrl/Command for multiple)</label>
              <select
                id="activities"
                name="activities"
                multiple
                onChange={handleChange}
              >
                <option value="sightseeing">Sightseeing</option>
                <option value="trekking">Trekking</option>
                <option value="adventure">Adventure Sports</option>
              </select>

              <label htmlFor="meals">Meal Plan</label>
              <select id="meals" name="meals" onChange={handleChange}>
                <option value="breakfast">Breakfast Only</option>
                <option value="half-board">Half Board</option>
                <option value="full-board">Full Board</option>
              </select>

              <label htmlFor="customRequests">Custom Requests</label>
              <textarea
                id="customRequests"
                name="customRequests"
                placeholder="Mention any changes, add-ons or preferences you’d like in your package..."
                style={{ height: "100px" }}
                onChange={handleChange}
              />

              <label htmlFor="uploadDocs">Upload Documents</label>
              <input type="file" id="uploadDocs" name="uploadDocs" multiple onChange={handleChange} />

              <div>
                <input
                  type="checkbox"
                  id="callback"
                  name="callback"
                  onChange={handleChange}
                />
                <label htmlFor="callback"> Request a callback from our travel advisor</label>
              </div>

              {/* Dynamic Price */}
              <div style={{ marginTop: "20px", fontSize: "18px", fontWeight: "bold" }}>
                Estimated Price: ₹{price.toLocaleString("en-IN")}
              </div>

              <input type="submit" value="Submit" style={{ marginTop: "10px" }} />
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

