import { useEffect, useState } from "react";
import styles from "../css-modules/userbooking.module.css";
const API_URL = process.env.REACT_APP_API_URL;

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?.id;

    if (!userId) {
      alert("Please sign in to view your bookings");
      setLoading(false);
      return;
    }

    fetch(`${API_URL}/bookings/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // ✅ Format date (remove time)
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return dateString.split("T")[0].split(" ")[0];
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading bookings...</p>;

  return (
    <div
      style={{
        backgroundImage: "url('/assets/background.webp')",
        backgroundSize: "1600px 800px",
        minHeight: "100vh",
      }}
      className={styles.pageWrapper}
    >
      <h2 className={styles.title}>My Bookings</h2>
      {bookings.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "20px" }}>No bookings yet.</p>
      ) : (
        <div className={`${styles.tableWrapper} ${styles.scrollContainer}`}>
          <table className={styles.bookingsTable}>
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Destinations & Packages</th>
                <th>Travellers</th>
                <th>Travel Mode</th>
                <th>Pickup Location</th>
                <th>Drop Location</th>
                <th>Accommodation</th>
                <th>Activities</th>
                <th>Meal Choice</th>
                <th>Dates</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => {
                return (
                <tr key={b.id}>
                  <td>{b.id}</td>
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
                  <td>{b.travel}</td>
                  <td>{b.pickup}</td>
                  <td>{b.droped}</td>
                  <td>{b.accommodation}</td>
                  <td>{Array.isArray(b.activities) ? b.activities.join(", ") : b.activities}</td>
                  <td>{b.meals}</td>
                  <td>
                    {formatDate(b.ldate)} - {formatDate(b.rdate)}
                  </td>
                  <td className={styles.price}>
                    ₹{Number(b.price).toLocaleString("en-IN")}
                  </td>
                </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MyBookings;