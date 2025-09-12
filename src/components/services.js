import React from "react";
import "../style.css";

const services = [
  { img: "/assets/adventure.png", text: "Adventure" },
  { img: "/assets/tour.png", text: "Tour Guide" },
  { img: "/assets/treck.png", text: "Trekking" },
  { img: "/assets/campfire.png", text: "Camp Fire" },
  { img: "/assets/offroad.png", text: "Off Road" },
  { img: "/assets/camping.png", text: "Camping" },
];

function Services() {
  return (
    <section className="services">
      <h1
        style={{
          paddingTop: "5%",
          paddingLeft: "695px",
          paddingBottom: "3rem",
          fontSize: "1.5rem",
        }}
      >
        Our Services
      </h1>
      <div className="box-container">
        {services.map((s, i) => (
          <div key={i} className="service-box">
            <img src={s.img} alt={s.text} />
            <h3>{s.text}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;
