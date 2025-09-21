import React from "react";
import "../style.css"; 
import "../contact.css";

function Contact() {
  return (
    <div
      style={{
        backgroundImage: "url('/assets/building image.jpeg')",
        backgroundSize: "cover",
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

      {/* Contact Form Section */}
      <div className="container">
        <div style={{ textAlign: "center" }}>
          <h2>Contact Us</h2>
          <p>Need help! We are here for you.</p>
        </div>

        <div className="row">
          <div className="column">
            <form>
              <label htmlFor="fname">First Name</label>
              <input type="text" id="fname" name="firstname" placeholder="Enter Your first name.." required />

              <label htmlFor="lname">Last Name</label>
              <input type="text" id="lname" name="lastname" placeholder="Enter Your last name.." />

              <label htmlFor="email">Email</label>
              <input type="text" id="email" name="email" placeholder="Enter your Email.." required />

              <label htmlFor="subject">Subject</label>
              <textarea
                id="subject"
                name="subject"
                placeholder="Write something..."
                style={{ height: "170px" }}
                required
              />

              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ textAlign: "center", marginTop: "40px" }}>
        Made with &hearts; by Vtravellers
        <br />
        &#169; 2024-&infin;
      </footer>
    </div>
  );
}

export default Contact;
