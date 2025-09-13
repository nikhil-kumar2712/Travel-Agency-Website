import React, { useState, useEffect } from "react";
import "../style.css";

const slides = [
  "/assets/fpage1.jpg",
  "/assets/fpage2.jpg",
  "/assets/fpage3.jpg",
  "/assets/fpage4.jpg",
  "/assets/fpage5.jpg",
];

export default function HeroSlides() {
  const [slideIndex, setSlideIndex] = useState(0);

  // Auto play every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setSlideIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setSlideIndex(index);
  };

  return (
    <div className="slideshow-container">
      {/* Slides */}
      {slides.map((img, i) => (
        <div
          key={i}
          className="mySlides fade"
          style={{
            display: i === slideIndex ? "block" : "none",
            backgroundImage: `url(${img})`,
          }}
        >
          <div className="content">
            <span>Explore , Discover , Travel</span>
            <h3>Travel around the world</h3>
            <a href="places.html" className="btn">Discover More</a>
          </div>
        </div>
      ))}

      {/* Prev/Next Buttons */}
      <button className="prev" onClick={prevSlide}>&#10094;</button>
      <button className="next" onClick={nextSlide}>&#10095;</button>

      {/* Dots */}
      <div className="dots">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === slideIndex ? "active" : ""}`}
            onClick={() => goToSlide(i)}
          ></span>
        ))}
      </div>
    </div>
  );
}
