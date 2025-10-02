import { useEffect, useState  } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../components/adminheader";
import styles from "../css-modules/adminhome.module.css";
import bookingstyles from "../css-modules/userbooking.module.css";
import placestyles from "../css-modules/addplaces.module.css";

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
  const [placeData, setPlaceData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Format date (remove time)
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

  const handleSubmitedit = async (e) => {
    e.preventDefault();

    if (!placeData) return;

    try {
      const formData = new FormData();

      // ✅ Add basic fields
      formData.append("placename", placeData.name)
      formData.append("description", placeData.description);
      formData.append("packages", JSON.stringify(placeData.packages));
      formData.append("inclusions", JSON.stringify(placeData.inclusions));
      formData.append("exclusions", JSON.stringify(placeData.exclusions));

      // Append all images (both new File objects and existing images paths)
      placeData.images.forEach((img) => {
        // If the img is a File object → newly added
        if (img instanceof File) {
          formData.append("images", img);
        } else {
          // If string → existing image path stored in DB
          formData.append("existingImages[]", img);
        }
      });

      await fetch(`http://localhost:5000/places/${placeData.id}`,{
        method: "POST",
        body: formData
      });

      alert("✅ Place updated successfully!");
      console.log(formData);
    } catch (err) {
      console.error("❌ Error updating place:", err);
      alert("Error updating place. Check console for details.");
    }
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
              activeSection === "edit-place" ? styles.active : ""
            }`}
            onClick={() => setActiveSection("edit-place")}
          >
            Edit Places
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
        id="edit-place"
        style={{ display: activeSection === "edit-place" ? "block" : "none" }}
      >
        <div className={styles.pageWrapper}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ marginLeft: "535px" , paddingBottom: "30px" }} className={styles.title}>Select the place to edit</h2>   
          </div>
          <div style={{ marginBottom: "0px", textAlign: "center" }}>
            <label style={{ fontWeight: "bold", marginRight: "10px" }}>
              Existing Places:
            </label>
            <select
              onChange={async (e) => {
                const placename = e.target.value;
                if (!placename) {
                  setPlaceData(null);
                  return;
                }
                try {
                  const res = await fetch(`http://localhost:5000/places/${encodeURIComponent(placename)}`);
                  const data = await res.json();
                  setPlaceData(data);
                } catch (err) {
                  console.error("Error fetching place data:", err);
                }
              }}
              style={{ padding: "5px", width: "300px", textAlign: "center" }}
            >
              <option value="">-- List of all already available places --</option>
              {existingPlaces.map((place) => (
                <option key={place.id} value={place.name}>
                  {place.name}
                </option>
              ))}
            </select>
          </div>
          {placeData && ( <form onSubmit={handleSubmitedit} encType="multipart/form-data">
            <div 
              style={{
                backgroundImage: "url('/assets/background.webp')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "100vh",
                padding: "10px",
                borderRadius: "10px"
              }}
              className={placestyles.container}>

              {/* Title */}
              <input
                type="text"
                value={placeData.name}
                onChange={(e) => setPlaceData({ ...placeData, name: e.target.value })}
                style={{
                  margin:"20px 610px",
                  width:"12%",
                  background: "white",
                  textAlign: "center",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "#333",
                }}
              />

              {/* Slideshow */}
              {placeData.images && placeData.images.length > 0 && (
              <div className={placestyles.slideshow} style={{ marginTop: "40px" }}>
                <div style={{ position: "relative" }}>
                  <img
                    src={
                      placeData.images[currentIndex] instanceof File
                        ? URL.createObjectURL(placeData.images[currentIndex]) // ✅ preview for new file
                        : `http://localhost:5000/${placeData.images[currentIndex]}` // ✅ already saved image
                    }
                    alt={`slide-${currentIndex}`}
                    className={placestyles.slide_image}
                    style={{ width: "1200px", borderRadius: "8px" }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const updatedImgs = [...placeData.images];
                      updatedImgs.splice(currentIndex, 1);
                      setPlaceData({ ...placeData, images: updatedImgs });
                      setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
                    }}
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      background: "red",
                      color: "#fff",
                      border: "none",
                      borderRadius: "50%",
                      cursor: "pointer",
                      width: "30px",
                      height: "30px",
                      fontSize: "16px",
                    }}
                  >
                    ✕
                  </button>
                  {/* Prev Button */}
                  <button
                    type="button"
                    onClick={() => setCurrentIndex((prev) => (prev === 0 ? placeData.images.length - 1 : prev - 1))}
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "10px",
                      transform: "translateY(-50%)",
                      background: "rgba(0,0,0,0.5)",
                      color: "#fff",
                      border: "none",
                      borderRadius: "50%",
                      cursor: "pointer",
                      width: "40px",
                      height: "40px",
                    }}
                  >
                    ◀
                  </button>

                  {/* Next Button */}
                  <button
                    type="button"
                    onClick={() => setCurrentIndex((prev) => (prev === placeData.images.length - 1 ? 0 : prev + 1))}
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "10px",
                      transform: "translateY(-50%)",
                      background: "rgba(0,0,0,0.5)",
                      color: "#fff",
                      border: "none",
                      borderRadius: "50%",
                      cursor: "pointer",
                      width: "40px",
                      height: "40px",
                    }}
                  >
                    ▶
                  </button>
                </div>
              </div>
              )}
              <input
                type="file"
                style={{
                  marginTop: "20px",
                  background: "rgb(225 193 255)",
                  border: "none",
                  padding:"5px 5px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  margin:"20px 560px"
                }}
                accept="image/*"
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  setPlaceData({ ...placeData, images: [...placeData.images, ...files] });
                  setCurrentIndex(placeData.images.length); // Show newly added image
                }}
              />

              <div className={placestyles.vcontent} style={{ color: "#0056b3" , marginTop: "20px", textAlign: "center" }}>
                  <h1>Explore {placeData.name}</h1>
                  <textarea
                    value={placeData.description}
                    onChange={(e) => setPlaceData({ ...placeData, description: e.target.value })}
                    style={{
                      width: "80%",
                      minHeight: "50px",
                      marginTop: "10px",
                      padding: "10px",
                      borderRadius: "5px",
                    }}
                  />
              </div>
            
              {/* Packages */}
              <section>
                  <h2 className={placestyles.section_title}>Our Packages</h2>
                  <div className={placestyles.packages_container}>
                      {placeData.packages.map((pkg, idx) => (
                      <div key={idx} className={placestyles.package_card}>
                        <input
                          type="text"
                          value={pkg.heading}
                          onChange={(e) => {
                            const updated = [...placeData.packages];
                            updated[idx].heading = e.target.value;
                            setPlaceData({ ...placeData, packages: updated });
                          }}
                        />
                        <textarea
                          value={pkg.description}
                          onChange={(e) => {
                            const updated = [...placeData.packages];
                            updated[idx].description = e.target.value;
                            setPlaceData({ ...placeData, packages: updated });
                          }}
                        />
                        <input
                          type="text"
                          value={pkg.price}
                          onChange={(e) => {
                            const updated = [...placeData.packages];
                            updated[idx].price = e.target.value;
                            setPlaceData({ ...placeData, packages: updated });
                          }}
                        /><button
                          type="button"
                          style={{
                            padding: "5px 10px",
                            background: "rgb(225 193 255)",
                            color: "#000000ff",
                            border: "none",
                            marginLeft:"75px",
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            const updated = [...placeData.packages];
                            updated.splice(idx, 1);
                            setPlaceData({ ...placeData, packages: updated });
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      style={{
                      padding: "20px 20px",
                      background: "#ffffffff",
                      color: "#000000ff",
                      border: "none",
                      borderRadius: "10px",
                      cursor: "pointer",
                      fontSize: "1rem"
                    }}
                      onClick={() =>
                        setPlaceData({
                          ...placeData,
                          packages: [...placeData.packages, { heading: "", description: "", price: "" }],
                        })
                      }
                    >
                      ➕ Add Package
                    </button>
                  </div>
              </section>
              
              {/* Inclusions */}
              <section>
                  <h3 className={placestyles.section_subtitle}>Inclusions</h3>
                  <ul className={placestyles.list}>
                  {placeData.inclusions.map((inc, i) => (
                    <li key={i}>
                      <input
                        type="text"
                        value={inc}
                        onChange={(e) => {
                          const updated = [...placeData.inclusions];
                          updated[i] = e.target.value;
                          setPlaceData({ ...placeData, inclusions: updated });
                        }}
                      />
                      <button
                          type="button"
                          style={{
                            padding: "5px 10px",
                            background: "rgb(225 193 255)",
                            color: "#000000ff",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            const updated = [...placeData.inclusions];
                            updated.splice(i, 1);
                            setPlaceData({ ...placeData, inclusions: updated });
                          }}
                        >
                          Remove
                      </button>
                    </li>
                  ))}
                  </ul>
                  <button
                    type="button"
                    style={{
                      padding: "10px 502px",
                      background: "#ffffffff",
                      color: "#000000ff",
                      marginLeft:"145px",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                    onClick={() => setPlaceData({ ...placeData, inclusions: [...placeData.inclusions, ""] })}
                  >
                    ➕ Add Inclusion
                  </button>
              </section>

              {/* Exclusions */}
              <section>
                  <h3 className={placestyles.section_subtitle}>Exclusions</h3>
                  <ul className={placestyles.list}>
                  {placeData.exclusions.map((exc, i) => (
                    <li key={i}>
                      <input
                        type="text"
                        value={exc}
                        onChange={(e) => {
                          const updated = [...placeData.exclusions];
                          updated[i] = e.target.value;
                          setPlaceData({ ...placeData, exclusions: updated });
                        }}
                      />
                      <button
                          type="button"
                          style={{
                            padding: "5px 10px",
                            background: "rgb(225 193 255)",
                            color: "#000000ff",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            const updated = [...placeData.exclusions];
                            updated.splice(i, 1);
                            setPlaceData({ ...placeData, exclusions: updated });
                          }}
                        >
                          Remove
                      </button>
                    </li>
                  ))}
                  </ul>
                  <button
                    type="button"
                    style={{
                      padding: "10px 502px",
                      background: "#ffffffff",
                      color: "#000000ff",
                      marginLeft:"145px",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      marginBottom:"30px"
                    }}
                    onClick={() => setPlaceData({ ...placeData, exclusions: [...placeData.exclusions, ""] })}
                  >
                    ➕ Add Exclusion
                  </button>
              </section>
            </div>
            {/* Submit */}
            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <button
                type="submit"
                style={{
                  padding: "10px 20px",
                  background: "#0056b3",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Save Changes
              </button>
            </div>
          </form>
          )}
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
                  <th>Destinations & Packages</th>
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
                    <td>
                      {Array.isArray(b.destination)
                        ? b.destination.flat().map((placeName, idx) => {
                            const nestedPackages = b.selectedPackages?.[0] || [];
                            const pkg = nestedPackages.find((p) => p.placeName === placeName);

                            return (
                              <div key={idx}>
                                {placeName} {pkg ? `(${pkg.packageTitle})` : ""}
                              </div>
                            );
                          })
                        : b.destination}
                    </td>
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
                    <td>{b.callback ? "Yes" : "No"}</td>
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