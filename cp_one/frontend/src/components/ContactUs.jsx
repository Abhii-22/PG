import React from "react";
import "./ContactUs.css"; // Import the new CSS file

const ContactUs = () => {
  return (
    <div id="contact-us" className="contact-us-section">
      <div className="contact-us-container">
        {/* Card 1: Why Choose Us */}
        <div className="contact-card">
          <h5>Why Choose Our PG?</h5>
          <p>
            Enjoy a <strong>comfortable & secure</strong> stay with modern
            amenities and a friendly atmosphere, all at an affordable price.
          </p>
        </div>

        {/* Card 2: Contact Details */}
        <div className="contact-card">
          <h5>Get in Touch</h5>
          <div class="contact-item">
            <i class="bi bi-telephone-fill"></i>
            <span><strong>+91 7483198135</strong></span>
          </div>
          <a href="https://wa.me/917483198135" target="_blank" rel="noopener noreferrer" class="contact-item">
            <i class="bi bi-whatsapp"></i>
            <span><strong>Chat on WhatsApp</strong></span>
          </a>
          <div class="contact-item">
            <i class="bi bi-geo-alt-fill"></i>
            <span><strong>#89, 18th main, 15th Cross, Near Post office, MRCR Layout, Vijayanagar, Bangalore</strong></span>
          </div>
        </div>

        {/* Card 3: Map */}
        <div className="contact-card">
          <h5>Our Location</h5>
          <iframe
            title="PG Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.020175255245!2d77.52923427845927!3d12.970560754713853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3df2b6f61611%3A0xc7ac8e95d96813ea!2s18th%20Main%20Rd%2C%20MRCR%20Layout%2C%20Stage%202%2C%20Vijayanagar%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1755167406001!5m2!1sen!2sin"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
