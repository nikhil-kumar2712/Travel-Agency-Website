import React from "react";
import { Link } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";

function Footer() {
  return (
    <>
      <section className="footer">
        <div className="Box-container">
          <div className="bottom">
            <h3>Quick Links</h3>
            <Link to="/"><i className="fa fa-angle-right"></i> Home </Link>
            <Link to="/places"><i className="fa fa-angle-right"></i> Places </Link>
            <Link to="/booking"><i className="fa fa-angle-right"></i> Booking </Link>
          </div>
          <div className="bottom">
            <h3>External Links</h3>
            <Link to="/about"><i className="fa fa-angle-right"></i> About Us </Link>
            <Link to="/contact"><i className="fa fa-angle-right"></i> Contact Us </Link>
            <Link to="/"><i className="fa fa-angle-right"></i> Privacy policy </Link>
            <Link to="/"><i className="fa fa-angle-right"></i> Terms and Conditions </Link>
          </div>
          <div className="bottom">
            <h3>Contact info</h3>
            <a href="#"><i className="fa fa-phone"></i> +123-456-7890 </a>
            <a href="#"><i className="fa fa-phone"></i> +011-435-2874 </a>
            <a href="#"><i className="fa fa-envelope"></i> vtravellers0111@gamil.com </a>
            <a href="#"><i className="fa fa-map"></i> Pune,India - 411038 </a>
          </div>
          <div className="bottom">
            <h3>Follow Us</h3>
            <a href="#"><i className="fa fa-facebook"></i> Facebook </a>
            <a href="#"><i className="fa fa-twitter"></i> Twitter </a>
            <a href="#"><i className="fa fa-instagram"></i> Instagram </a>
            <a href="#"><i className="fa fa-linkedin"></i> Linkedin </a>
          </div>
        </div>
      </section>

      <footer>
        Made with &hearts; by Vtravellers <br />
        &#169; 2024-&infin;
      </footer>
    </>
  );
}

export default Footer;
