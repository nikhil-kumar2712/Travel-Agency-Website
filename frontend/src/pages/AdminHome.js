import { useEffect, useState  } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../components/adminheader";
import styles from "../css-modules/adminhome.module.css";
import bookingstyles from "../css-modules/userbooking.module.css";

function AdminPanel() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("add-place"); // default
  const [bookings, setBookings] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [inclusions, setInclusions] = useState([""]);
  const [exclusions, setExclusions] = useState([""]);
  const [placeName, setPlaceName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [packages, setPackages] = useState([{ heading: "", description: "", price: "" },]);
  const [existingPlaces, setExistingPlaces] = useState([]);

  // ✅ Format date (remove time)
  const formatDate = (dateString) => {
    if (!dateString) return "";
    // DB may give "YYYY-MM-DDTHH:MM:SS" or "YYYY-MM-DD HH:MM:SS"
    return dateString.split("T")[0].split(" ")[0];
  };

  useEffect(() => {
    fetch("http://localhost:5000/places") // Adjust endpoint to return all places
      .then(res => res.json())
      .then(data => setExistingPlaces(data))
      .catch(err => console.error("Error fetching existing places:", err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/adminhome")
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
      })
      .catch((err) => {
        console.error(err);
      });

    // push a dummy state so back button triggers popstate
    window.history.pushState(null, "", window.location.href);

    const handleBack = () => {
      // logout on back
      localStorage.removeItem("user");
      navigate("/", { replace: true });
    };

    window.addEventListener("popstate", handleBack);
    return () => window.removeEventListener("popstate", handleBack);
  }, [navigate]);
  
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.role !== "admin") return <p>Access Denied</p>;

  const handleInclusionChange = (index, value) => {
    const updated = [...inclusions];    
    updated[index] = value;
    setInclusions(updated);
  };

  const handleExclusionChange = (index, value) => {
    const updated = [...exclusions];
    updated[index] = value;
    setExclusions(updated);
  };

  const addInclusion = () => setInclusions([...inclusions, ""]);
  const removeInclusion = (index) => setInclusions(inclusions.filter((_, i) => i !== index));

  const addExclusion = () => setExclusions([...exclusions, ""]);
  const removeExclusion = (index) => setExclusions(exclusions.filter((_, i) => i !== index));

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handlePackageChange = (index, field, value) => {
    const newPackages = [...packages];
    newPackages[index][field] = value;
    setPackages(newPackages);
  };

  // Add new package
  const addPackage = () => {
    setPackages([...packages, { heading: "", description: "", price: "" }]);
  };

  // Remove package
  const removePackage = (index) => {
    const newPackages = packages.filter((_, i) => i !== index);
    setPackages(newPackages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("placeName", placeName);
    formData.append("description", description);

    // Append images
    images.forEach((file) => {
      formData.append("images", file);
    });

    // Append packages as JSON string
    formData.append("packages", JSON.stringify(packages));
    formData.append("inclusions", JSON.stringify(inclusions));
    formData.append("exclusions", JSON.stringify(exclusions));

    await fetch("http://localhost:5000/places", {
      method: "POST",
      body: formData
    });

    alert("Place uploaded successfully!");
  };

  return (
    <div
      style={{
        backgroundImage: "url('/assets/background.webp')",
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      <AdminHeader />

      <div style={{ textAlign: "center" }} className={styles.container}>
        <h2>Admin Panel</h2>
        {/* Buttons to toggle sections */}
        <div style={{ marginTop: "40px" }}>
          <button
            className={`${styles.toggleBtn} ${
              activeSection === "add-place" ? styles.active : ""
            }`}
            onClick={() => setActiveSection("add-place")}
          >
            Add Places
          </button>
          <button
            className={`${styles.toggleBtn} ${
              activeSection === "bookings" ? styles.active : ""
            }`}
            onClick={() => setActiveSection("bookings")}
          >
            View Bookings
          </button>
        </div>
      </div>

      {/* Conditional Sections */}
      <section
        id="add-place"
        style={{ display: activeSection === "add-place" ? "block" : "none" }}
      >
        {/* Place Form */}
        <div className={styles.pageWrapper}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ marginLeft: "460px" , paddingBottom: "30px" }} className={styles.title}>Fill this form to add a new place</h2>   
          </div>
          <div style={{ marginBottom: "20px", textAlign: "center" }}>
            <label style={{ fontWeight: "bold", marginRight: "10px" }}>
              Existing Places:
            </label>
            <select style={{ padding: "5px", width: "300px" , textAlign: "center" }}>
              <option value="">-- List of all already available places --</option>
              {existingPlaces.map((place) => (
                <option key={place.id} value={place.name}>
                  {place.name}
                </option>
              ))}
            </select>
          </div>
          <form className={styles.addPlaceForm} onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Place Name */}
            <label className={styles.label}>Place Name</label>
            <input
              type="text"
              name="placeName"
              placeholder="e.g. Goa"
              className={styles.input}
              onChange={(e) => setPlaceName(e.target.value)}
              required
            />

            {/* Description */}
            <label className={styles.label}>Short Description</label>
            <textarea
              name="description"
              placeholder="Brief intro about the place"
              className={styles.textarea}
              rows="3"
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            {/* Images */}
            <label className={styles.label}>Upload Images</label>
            <input
              type="file"
              name="images"
              className={styles.input}
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />

            {/* Packages */}
            <label className={styles.label}>Package Details</label>
            {packages.map((pkg, index) => (
              <div key={index} className="package-input">
                <input
                  type="text"
                  className="input"
                  placeholder="Package Heading (e.g. 1 Day Package)"
                  value={pkg.heading}
                  onChange={(e) => handlePackageChange(index, "heading", e.target.value)}
                />
                <textarea
                  className="input"
                  placeholder="Description"
                  value={pkg.description}
                  onChange={(e) => handlePackageChange(index, "description", e.target.value)}
                />
                <input
                  type="text"
                  className="input"
                  placeholder="Price (e.g. ₹1,000/- per person)"
                  value={pkg.price}
                  onChange={(e) => handlePackageChange(index, "price", e.target.value)}
                />
                <button type="button" onClick={() => removePackage(index)}>
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={addPackage}>
              + Add More Package
            </button>

            {/* Inclusions */}
            <label className={styles.label}>Inclusions</label>
            {inclusions.map((inc, index) => (
              <div key={index} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <input
                  type="text"
                  placeholder={`Inclusion ${index + 1}`}
                  value={inc}
                  onChange={(e) => handleInclusionChange(index, e.target.value)}
                />
                <button type="button" onClick={() => removeInclusion(index)}>Remove</button>
              </div>
            ))}
            <button
              type="button"
              className={styles.addBtn}
              onClick={addInclusion}
            >
              + Add More Inclusion
            </button>

            {/* Exclusions */}
            <label className={styles.label}>Exclusions</label>
            {exclusions.map((exc, index) => (
              <div key={index} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <input
                  type="text"
                  placeholder={`Exclusion ${index + 1}`}
                  value={exc}
                  onChange={(e) => handleExclusionChange(index, e.target.value)}
                />
                <button type="button" onClick={() => removeExclusion(index)}>Remove</button>
              </div>
            ))}
            <button
              type="button"
              className={styles.addBtn}
              onClick={addExclusion}
            >
              + Add More Exclusion
            </button>

            {/* Submit */}
            <button type="submit" className={styles.submitBtn}>
              Add Place
            </button>
          </form>
        </div>
      </section>

      <section
        id="bookings"
        style={{ display: activeSection === "bookings" ? "block" : "none" }}
      >
        {/* Bookings Table */}
        <div className={styles.pageWrapper}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ marginLeft: "550px" }} className={styles.title}>All Current Bookings</h2>

            {/* Filter by Booking Date */}
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              style={{
                padding: "6px",
                borderRadius: "6px",
                marginLeft: "410px",
                border: "1px solid #ccc",
                cursor: "pointer",
              }}
            />
          </div>
          {bookings.length === 0 ? (
          <p style={{ textAlign: "center", marginTop: "20px" }}>No bookings yet.</p>
          ) : (
          <div className={`${bookingstyles.tableWrapper} ${bookingstyles.scrollContainer}`}>
            <table className={bookingstyles.bookingsTable}>
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>User ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Destinations</th>
                  <th>Travellers</th>
                  <th>Pickup Location</th>
                  <th>Drop Location</th>
                  <th>Phone No.</th>
                  <th>Email</th>
                  <th>Addhar No.</th>
                  <th>Travel Mode</th>
                  <th>Accommodation</th>
                  <th>Meal Choice</th>
                  <th>Requests</th>
                  <th>Activities</th>
                  <th>Dates</th>
                  <th>Callback</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {bookings.filter((b) => {
                            if (!filterDate) return true; // no filter
                            // convert both to YYYY-MM-DD
                            const bookingDate = formatDate(b.created_at); 
                            return bookingDate === filterDate;
                          }).map((b) => (
                  <tr key={b.id}>
                    <td>{b.id}</td>
                    <td>{b.user_id}</td>  
                    <td>{b.firstname}</td>
                    <td>{b.lastname}</td>
                    <td>{Array.isArray(b.destination) ? b.destination.join(", ") : b.destination}</td>
                    <td>{b.tno}</td>
                    <td>{b.pickup}</td>
                    <td>{b.droped}</td>
                    <td>{b.cno}</td>
                    <td>{b.email}</td>
                    <td>{b.ano}</td>
                    <td>{b.travel}</td>
                    <td>{b.accommodation}</td>
                    <td>{b.meals}</td>
                    <td>{b.customRequests}</td>
                    <td>{Array.isArray(b.activities) ? b.activities.join(", ") : b.activities}</td>
                    <td style={{ whiteSpace: "nowrap" }}>
                      {formatDate(b.ldate)} - {formatDate(b.rdate)}
                    </td>
                    <td>{b.callback}</td>
                    <td className={bookingstyles.price}>
                      ₹{Number(b.price).toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      </section>

      {/* Footer */}
      <footer style={{ textAlign: "center", marginTop: "20px" }}>
        Made with &hearts; by Vtravellers
        <br />
        &#169; 2024-&infin;
      </footer>
    </div>
  );
}

export default AdminPanel;
