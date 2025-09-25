import React, { useState } from "react";
import styles from "../css-modules/booking.module.css";

function Booking() {
  // 1️⃣ Define initial state once
  const initialFormState = {
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
  };

  // 2️⃣ State for form & price
  const [formData, setFormData] = useState(initialFormState);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?.id;

    const bookingData = {
      userId,
      price,
      ...formData
    };


    try {
      const res = await fetch("http://localhost:5000/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Booking submitted successfully!");
        console.log("Booking ID:", data.bookingId);

        // ✅ Clear form
        setFormData(initialFormState);
      } else {
        const data = await res.json();
        alert(`❌ ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Error connecting to server.");
    }
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

              <label htmlFor="destination">Destinations</label>
              <div className={styles.destinationsBox}>
                {[
                  "Agra",
                  "Pune",
                  "New Delhi",
                  "Somnath",
                  "Goa",
                  "Kerela",
                  "Srinagar",
                  "Jaipur",
                  "Ayodhya",
                ].map((city) => (
                  <label key={city} className={styles.destinationItem}>
                    <input
                      type="checkbox"
                      name="destination"
                      value={city}
                      checked={formData.destination.includes(city)}
                      onChange={(e) => {
                        let updatedDest = [...formData.destination];
                        if (e.target.checked) {
                          updatedDest.push(city);
                        } else {
                          updatedDest = updatedDest.filter((item) => item !== city);
                        }
                        setFormData({ ...formData, destination: updatedDest });
                      }}
                    />
                    {city}
                  </label>
                ))}
              </div>

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

              <label htmlFor="activities">Activities</label>
              <div className={styles.activitiesBox}>
                {[
                  { label: "Sightseeing", value: "sightseeing" },
                  { label: "Trekking", value: "trekking" },
                  { label: "Adventure Sports", value: "adventure" },
                ].map((act) => (
                  <label key={act.value} className={styles.activityItem}>
                    <input
                      type="checkbox"
                      name="activities"
                      value={act.value}
                      checked={formData.activities.includes(act.value)}
                      onChange={(e) => {
                        let updatedAct = [...formData.activities];
                        if (e.target.checked) {
                          updatedAct.push(act.value);
                        } else {
                          updatedAct = updatedAct.filter((item) => item !== act.value);
                        }
                        setFormData({ ...formData, activities: updatedAct });
                      }}
                    />
                    {act.label}
                  </label>
                ))}
              </div>

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

              <label htmlFor="uploadDocs">Upload ID Proof</label>
              <input type="file" id="uploadDocs" name="uploadDocs" multiple onChange={handleChange} />

              <div className={styles.callbackBox}>
              <input
                type="checkbox"
                id="callback"
                name="callback"
                onChange={handleChange}
              />
              <label htmlFor="callback">Request a callback from our travel advisor</label>
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