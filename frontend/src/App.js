import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./style.css";
import Home from "./pages/Home.js";
import Places from "./pages/Places.js";
import Booking from "./pages/Booking.js";
import UserBookings from "./pages/UserBookings.js";
import Contact from "./pages/Contact.js";
import About from "./pages/About.js";
import Pune from "./pages/pune.js";
import Goa from "./pages/goa.js";
import Ayodhya from "./pages/ayodhya.js";
import Kerala from "./pages/kerala.js";
import HomeAfterSignIn from "./pages/HomeAfterSignIn";
import ProtectedRoute from "./pages/ProtectedRoute";
import AdminHome from "./pages/AdminHome";
import PlacesPage from "./pages/PlacesPage";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/places" element={<Places />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/userbookings" element={<UserBookings />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/pune" element={<Pune />} />
          <Route path="/goa" element={<Goa />} />
          <Route path="/ayodhya" element={<Ayodhya />} />
          <Route path="/kerala" element={<Kerala />} />
          <Route path="/homeaftersignin" element={<ProtectedRoute><HomeAfterSignIn /></ProtectedRoute>} />
          <Route path="/adminhome" element={<ProtectedRoute><AdminHome /></ProtectedRoute>} />
          <Route path="/placespage" element={<PlacesPage />} />
        </Routes>
    </Router>
  );
}

export default App;
