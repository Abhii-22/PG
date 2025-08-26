// src/Amenities.jsx
import React from 'react';
import { motion } from 'framer-motion';
import "./Amenities.css"; // Import the CSS for styling
import "bootstrap-icons/font/bootstrap-icons.css";

// Array of amenities with their icon names, labels, and links
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const amenities = [
  { icon: "router-fill", label: "24x7 Wi-Fi" },
  { icon: "house-lock-fill", label: "Locker Facility" },
  { icon: "cup-hot-fill", label: "Hot Water" },
  { icon: "badge-wc-fill", label: "Washing Machine" },
  { icon: "droplet-fill", label: "Pure Drinking Water" },
  { icon: "bicycle", label: "2-Wheeler Parking" },
  { icon: "snow", label: "AC/Non-AC Rooms" },
  { icon: "lightning-charge-fill", label: "24/7 Power Backup" },
  { icon: "camera-video-fill", label: "24/7 CCTV Surveillance" },
  { icon: "archive-fill", label: "Refrigerator" },
  { icon: "segmented-nav", label: "Bed & Pillow" },
  { icon: "person-wheelchair", label: "Western Attached Toilets" },
];

const Amenities = () => {
  return (
    <div className="amenities-section">
      <h1 className="heading">PG Amenities</h1>
      <motion.div
        className="amenities-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {amenities.map((amenity, index) => (
          <motion.div key={index} className="amenity-item" variants={itemVariants}>
            <div className="icon-box">
              <i className={`bi bi-${amenity.icon}`}></i>
            </div>
            <div className="amenity-label">{amenity.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Amenities;
