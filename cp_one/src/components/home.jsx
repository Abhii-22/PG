import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Medini logo White.png";
import ContactUs from "./ContactUs.jsx";
import Footer from "./Footer.jsx";
import Amenities from "./amenities.jsx";
import Feedback from "./feedback.jsx";
import AnimatedSection from "./AnimatedSection.jsx";
import "./Home.css"; // ✅ Import CSS file

const Home = () => {
  const [active, setActive] = useState("Home");
  const [showNavbar, setShowNavbar] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const timeoutId = useRef(null);

  const handleMouseMove = () => {
    setShowNavbar(true);
    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => setShowNavbar(false), 2000);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeoutId.current);
    };
  }, []);

  return (
    <>
      {/* Navbar */}
      <div className={`navbar-container ${showNavbar ? "visible" : "hidden"}`}>
        <header className="d-flex align-items-center w-100">
          <div className="d-flex align-items-center gap-3">
            <img src={logo} alt="Logo" className="navbar-logo" />
            
          </div>

          {/* Desktop Navigation */}
          <ul className="nav nav-pills ms-auto">
            <li className="nav-item mx-2">
              <a href="#home" className={`nav-link ${active === 'Home' ? 'active-link' : ''}`} onClick={() => setActive('Home')}>Home</a>
            </li>
            <li className="nav-item mx-2">
              <Link to="/areas" className={`nav-link ${active === 'Areas' ? 'active-link' : ''}`} onClick={() => setActive('Areas')}>Areas</Link>
            </li>
            <li className="nav-item mx-2">
              <a href="#amenities" className={`nav-link ${active === 'Amenities' ? 'active-link' : ''}`} onClick={() => setActive('Amenities')}>Amenities</a>
            </li>
            <li className="nav-item mx-2">
              <a href="#feedback" className={`nav-link ${active === 'Feedback' ? 'active-link' : ''}`} onClick={() => setActive('Feedback')}>Feedback</a>
            </li>
            <li className="nav-item mx-2">
              <a href="#contact-us" className={`nav-link ${active === 'Contact Us' ? 'active-link' : ''}`} onClick={() => setActive('Contact Us')}>Contact Us</a>
            </li>
          </ul>

          {/* ✅ Toggle Button for Mobile */}
          <div className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </div>

          {/* ✅ Dropdown Menu for Mobile */}
          <div className={`navbar-dropdown ${menuOpen ? "show" : ""}`}>
            {[
              { name: "Home", link: "#home" },
              { name: "Areas", link: "#areas" },
              { name: "Amenities", link: "#amenities" },
              { name: "Feedback", link: "#feedback" },
              { name: "Contact Us", link: "#contact-us" },
            ].map((item) => (
              <a key={item.name} href={item.link} onClick={() => setMenuOpen(false)}>
                {item.name}
              </a>
            ))}
          </div>
        </header>
      </div>

      {/* Background Section with Welcome Text */}
      <div id="home" className="home-container">
        <div className="home-overlay"></div>
        <h1 className="home-title">Find Your Perfect PG Today</h1>
        <Link to="/areas" className="get-started-btn">Get Started</Link>
      </div>

      <div id="amenities">
        <AnimatedSection>
          <Amenities />
        </AnimatedSection>
      </div>

      <div id="feedback">
        <AnimatedSection>
          <Feedback />
        </AnimatedSection>
      </div>

      {/* Contact Us Section */}
      <div id="contact-us">
        <AnimatedSection>
          <ContactUs />
        </AnimatedSection>
      </div>

      <div style={{ marginTop: "-100px" }}>
        <AnimatedSection>
          <Footer />
        </AnimatedSection>
      </div>
    </>
  );
};

export default Home;
