import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../components/adminheader";
import styles from "../css-modules/adminhome.module.css";

function AdminPanel() {
  const navigate = useNavigate();

  useEffect(() => {
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
      </div>
      
      <nav>
        <a href="#add-place">Add New Place</a> | 
        <a href="#bookings">View Bookings</a>
      </nav>

      <section id="add-place">
        {/* Add Place Form */}
      </section>

      <section id="bookings">
        {/* Bookings Table */}
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
