import React from "react";

const Footer = () => {
  return (
    <footer
      className="container-fluid text-center text-white py-3"
      style={{
        background: "rgb(35,65,75)",
        position: "relative",
        bottom: 0,
        width: "100%",
        marginTop: "50px",
      }}
    >
      <p className="mb-0">
        &copy; {new Date().getFullYear()} Medini Technology {" "}
        
      </p>
    </footer>
  );
};

export default Footer;
