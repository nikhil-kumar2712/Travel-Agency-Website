import React, { useEffect, useState } from "react";

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

    fetch(`http://localhost:5000/bookings/${userId}`)
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

  const safeParseArray = (value) => {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed.join(", ") : parsed;
    } catch {
      return value; // fallback if plain string
    }
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading bookings...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Booking ID</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Destinations</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Travellers</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Travel Mode</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Accommodation</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Activities</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Dates</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Price</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{b.id}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {safeParseArray(b.destination)}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{b.tno}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{b.travel}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{b.accommodation}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {safeParseArray(b.activities)}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {b.ldate} - {b.rdate}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>₹{Number(b.price).toLocaleString("en-IN")}</td> 
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MyBookings;

