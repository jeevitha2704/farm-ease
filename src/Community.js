import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Community = () => {
  const navigate = useNavigate();
  const [postMessage, setPostMessage] = useState("");
  const [posts, setPosts] = useState([
    { name: "Farmer John", message: "Just harvested fresh tomatoes today!" },
    { name: "Farmer Meera", message: "Organic spinach is available for sale." },
  ]);

  const handlePost = () => {
    if (postMessage.trim() !== "") {
      setPosts([{ name: "You", message: postMessage }, ...posts]);
      setPostMessage("");
    }
  };

  return (
    <div className="community" style={{ display: "flex" }}>
      {/* Sidebar - SAME as Marketplace */}
      <div
        className="sidebar"
        style={{
          width: "250px",
          backgroundColor: "#06402B",
          color: "white",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          minHeight: "100vh",
          fontSize: "18px",
        }}
      >
        {/* Logo + FarmEase */}
        <div
          className="sidebar-logo"
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "22px",
            fontWeight: "bold",
          }}
        >
          <span
            className="leaf"
            style={{ fontSize: "28px", marginRight: "10px" }}
          >
            🍃
          </span>
          <span>FarmEase</span>
        </div>

        {/* Navigation */}
        <nav
          className="nav"
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <button onClick={() => navigate("/")} style={{ color: "white" }}>
            Home
          </button>
          <button onClick={() => navigate("/marketplace")} style={{ color: "white" }}>
            Marketplace
          </button>
          <button onClick={() => navigate("/about")} style={{ color: "white" }}>
            About
          </button>
        </nav>
      </div>

      {/* Main Community Content */}
      <main
        className="main-community"
        style={{ flex: 1, padding: "40px", backgroundColor: "#ffffff" }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
            backgroundColor: "#06402B",
            padding: "20px",
            color: "white",
            borderRadius: "8px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <span
              className="leaf"
              style={{ fontSize: "28px", marginRight: "10px" }}
            >
              🍃
            </span>
            <span style={{ fontSize: "24px", fontWeight: "bold" }}>
              FarmEase Community
            </span>
          </div>
        </header>

        <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>
          Join the Community
        </h1>
        <p style={{ fontSize: "18px", marginBottom: "20px" }}>
          Share updates, ask questions, and connect with fellow farmers.
        </p>

        {/* Post Box */}
        <div style={{ marginBottom: "30px" }}>
          <textarea
            value={postMessage}
            onChange={(e) => setPostMessage(e.target.value)}
            placeholder="Share something with the community..."
            style={{
              width: "100%",
              padding: "15px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
          <button
            onClick={handlePost}
            style={{
              marginTop: "10px",
              backgroundColor: "#06402B",
              color: "white",
              padding: "12px 24px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#007458";
              e.target.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#06402B";
              e.target.style.transform = "scale(1)";
            }}
          >
            Post
          </button>
        </div>

        {/* Posts */}
        <div
          className="posts"
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          {posts.map((post, index) => (
            <div
              key={index}
              style={{
                padding: "15px",
                border: "1px solid #ccc",
                borderRadius: "10px",
                backgroundColor: "#f5f5f5",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#e0ffe0")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#f5f5f5")
              }
            >
              <strong>{post.name}</strong>
              <p style={{ margin: "5px 0" }}>{post.message}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Community;
