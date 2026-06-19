import React from "react";
import { useNavigate } from "react-router-dom";
//import "./about.css";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="about-page" style={{ minHeight: "100vh", backgroundColor: "#ffffff" }}>
      {/* Top Navigation */}
      <header className="header" style={{ backgroundColor: "#06402B", padding: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div className="logo" style={{ display: "flex", alignItems: "center" }}>
          <span className="leaf" style={{ fontSize: "24px", marginRight: "10px" }}>🍃</span>
          <span style={{ color: "white", fontSize: "24px", fontWeight: "bold" }}>FarmEase</span>
        </div>
        <nav className="nav" style={{ display: "flex", gap: "20px" }}>
          <button onClick={() => navigate("/")} style={{ color: "white" }}>Home</button>
          <button onClick={() => navigate("/marketplace")} style={{ color: "white" }}>Marketplace</button>
          <button onClick={() => navigate("/community")} style={{ color: "white" }}>Community</button>
          <button>About</button>
        </nav>
      </header>

      {/* Main Content */}
      <main style={{ padding: "50px 20px", textAlign: "center", color: "#06402B" }}>
        <h1 style={{ fontSize: "36px", marginBottom: "20px" }}>About FarmEase</h1>
        <p style={{ fontSize: "18px", maxWidth: "800px", margin: "0 auto 30px auto", lineHeight: "1.6" }}>
          FarmEase is a platform dedicated to empowering farmers with modern tools, connecting them directly with consumers, and fostering a sustainable agricultural ecosystem. Our mission is to bridge the gap between farmers and technology, ensuring better efficiency, higher yield, and easier access to resources.
        </p>

        <p style={{ fontSize: "18px", maxWidth: "800px", margin: "0 auto 30px auto", lineHeight: "1.6" }}>
          Through FarmEase, users can explore fresh local produce, interact with farmers, and access tutorials and support to make informed decisions. We believe in supporting farmers and promoting healthy, sustainable living for everyone.
        </p>

        {/* Image after the paragraph */}
        <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIcntjI3H4b5h_agW4ObQqfdqu-NiQqLs3GQ&s"
            alt="Field and Agriculture"
            style={{ width: "100%", maxWidth: "800px", borderRadius: "10px", objectFit: "cover" }}
          />
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: "#06402B", color: "white", padding: "20px", textAlign: "center", marginTop: "auto" }}>
        © 2025 FarmEase. All rights reserved.
      </footer>
    </div>
  );
};

export default About;
