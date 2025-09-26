// src/pages/About.js
import React from "react";
import "../style.css";

const About = () => {
  return (
    <div
      style={{
        backgroundImage: "url('/assets/background.webp')",
        backgroundSize: "cover",
        minHeight: "100vh",
        padding: "40px",
        color: "#fff",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.6)",
          borderRadius: "15px",
          padding: "30px",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <h1 style={{ textAlign: "center", fontSize: "3rem", marginBottom: "20px" }}>
          About <span style={{ color: "#ffd700" }}>Vtravellers</span>
        </h1>

        <p style={{ fontSize: "1.2rem", lineHeight: "1.8" }}>
          Welcome to <strong>Vtravellers.in</strong> – your digital companion for discovering
          India’s most iconic and hidden travel destinations. We aim to make travel planning
          simple, fun, and inspiring by bringing you curated places, local stories, and
          must-visit experiences.
        </p>

        <h2 style={{ marginTop: "30px", color: "#ffd700" }}>✨ Our Mission</h2>
        <p style={{ fontSize: "1.2rem", lineHeight: "1.8" }}>
          To connect travelers with authentic destinations and provide a one-stop platform
          where exploring India becomes effortless. Whether you are planning a family trip,
          a weekend getaway, or a spiritual journey, Vtravellers has something for everyone.
        </p>

        <h2 style={{ marginTop: "30px", color: "#ffd700" }}>🌍 What We Offer</h2>
        <ul style={{ fontSize: "1.2rem", lineHeight: "1.8", paddingLeft: "20px" }}>
          <li>Handpicked destinations across India</li>
          <li>Easy navigation and interactive travel guides</li>
          <li>Highlights of cultural, historical, and natural landmarks</li>
          <li>Personalized travel experiences to suit your needs</li>
        </ul>

        <h2 style={{ marginTop: "30px", color: "#ffd700" }}>💡 Why Choose Us?</h2>
        <p style={{ fontSize: "1.2rem", lineHeight: "1.8" }}>
          Unlike generic travel sites, Vtravellers is built by passionate explorers who
          understand the real essence of travel. We combine modern technology with local
          knowledge to give you an experience that’s both reliable and exciting.
        </p>

        <br />
        <p style={{ textAlign: "center", fontSize: "1.3rem" }}>
          🚀 Start your journey with <strong>Vtravellers</strong> and let’s explore the
          incredible India together!
        </p>
      </div>
    </div>
  );
};

export default About;
