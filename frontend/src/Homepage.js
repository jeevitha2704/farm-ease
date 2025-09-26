import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./homepage.css";

const Homepage = () => {
  const navigate = useNavigate();
  const [hoverStarted, setHoverStarted] = useState(false);


  return (
    <div className="homepage" style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
      {/* Top Navigation */}
      <header className="header" style={{ backgroundColor: "#06402B", padding: "20px" }}>
        <div className="logo" style={{ display: "flex", alignItems: "center" }}>
          <span className="leaf" style={{ fontSize: "24px", marginRight: "10px" }}>🍃</span>
          <span style={{ color: "white", fontSize: "24px" }}>FarmEase</span>
        </div>
        <nav className="nav" style={{ display: "flex", gap: "20px" }}>
          <button onClick={() => navigate("/")} style={{ color: "white" }}>Home</button>
          <button onClick={() => navigate("/marketplace")} style={{ color: "white" }}>Marketplace</button>
          <button onClick={() => navigate("/community")}style={{ color: "white" }}>Community</button>
          <button onClick={() => navigate("/about")} style={{ color: "white" }}>About</button>
        </nav>
      </header>

      {/* Main Heading */}
      <main className="main-content" style={{ textAlign: "center", padding: "50px 20px" }}>
        <h1 style={{ fontSize: "36px", marginBottom: "20px" }}>Empowering Farmers with Technology</h1>
        <button
          style={{ backgroundColor: "#06402B", color: "white", padding: "15px 30px", fontSize: "18px", borderRadius: "8px", cursor: "pointer" }}
          onMouseEnter={() => setHoverStarted(true)}
          onMouseLeave={() => setHoverStarted(false)}
          onClick={() => navigate("/marketplace")}
        >
          {hoverStarted ? "Get Started Now" : "Get Started"}
        </button>

        
      </main>

      {/* Bottom Blocks */}
      <footer className="bottom-blocks">
        <div className="bottom-block">
          <h3>Modern Tools</h3>
          <p>Access the latest tools to improve farming.</p>
          <p>Increase efficiency in daily farm work.</p>
          <p>Use innovative solutions for better yield.</p>
        </div>

        <div className="bottom-block">
          <h3>Connecting Farmers</h3>
          <p>Collaborate with other farmers nearby.</p>
          <p>Share knowledge and best practices.</p>
          <p>Enhance sustainable farming techniques.</p>
        </div>

        <div className="bottom-block">
          <h3>Support</h3>
          <p>Get help from experts when needed.</p>
          <p>Access tutorials and guidance easily.</p>
          <p>Ensure smooth farm operations daily.</p>
        </div>

        <div className="footer-line">© 2025 FarmEase. All rights reserved.</div>
      </footer>
    </div>
  );
};

export default Homepage;
