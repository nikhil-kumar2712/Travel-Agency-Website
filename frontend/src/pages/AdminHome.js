import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    <div>
      <h1>Admin Panel</h1>
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
    </div>
  );
}

export default AdminPanel;
