import React from "react";
import styles from "../css-modules/contact.module.css";
const API_URL = process.env.REACT_APP_API_URL;

function Contact() {

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      firstname: e.target.firstname.value,
      lastname: e.target.lastname.value,
      email: e.target.email.value,
      subject: e.target.subject.value,
    };

    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      alert(data.message);
    } catch (err) {
      console.error(err);
      alert("Failed to send message.");
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
      <div className={styles.container}>
        <div style={{ textAlign: "center" }}>
          <h2>Contact Us</h2>
          <p>Need help! We are here for you.</p>
        </div>

        <div className={styles.row}>
          <div className={styles.column}>
            <form onSubmit={handleSubmit}>
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
