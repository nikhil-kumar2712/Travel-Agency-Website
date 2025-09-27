import { useEffect, useState  } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../components/adminheader";
import styles from "../css-modules/adminhome.module.css";
import bookingstyles from "../css-modules/userbooking.module.css";

function AdminPanel() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("add-place"); // default
  const [bookings, setBookings] = useState([]);

  // ✅ Format date (remove time)
  const formatDate = (dateString) => {
    if (!dateString) return "";
    // DB may give "YYYY-MM-DDTHH:MM:SS" or "YYYY-MM-DD HH:MM:SS"
    return dateString.split("T")[0].split(" ")[0];
  };

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
        {/* ✅ Buttons to toggle sections */}
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

      {/* ✅ Conditional Sections */}
      <section
        id="add-place"
        style={{ display: activeSection === "add-place" ? "block" : "none" }}
      >
        {/* Add Place Form */}
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <h3>Add a New Place</h3>
          {/* Your form code here */}
        </div>
      </section>

      <section
        id="bookings"
        style={{ display: activeSection === "bookings" ? "block" : "none" }}
      >
        {/* Bookings Table */}
        <div className={styles.pageWrapper}>
          <h2 className={bookingstyles.title}>All Current Bookings</h2>
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
                {bookings.map((b) => (
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
