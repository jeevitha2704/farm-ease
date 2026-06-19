// Sidebar.js
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "./CartContext";

const Sidebar = ({ isAdmin = true }) => {
  const navigate = useNavigate();
  const { cart } = useCart();

  return (
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
      {/* Logo */}
      <div
        className="sidebar-logo"
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "22px",
          fontWeight: "bold",
        }}
      >
        <span className="leaf" style={{ fontSize: "28px", marginRight: "10px" }}>
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
        <button
          onClick={() => navigate("/farmer-dashboard")}
          style={{ color: "white" }}
        >
          Farmer Dashboard
        </button>
        <button onClick={() => navigate("/add-product")} style={{ color: "white" }}>
          Add Product
        </button>
        <button onClick={() => navigate("/community")} style={{ color: "white" }}>
          Community
        </button>

        {/* Cart & Orders */}
        <Link to="/cart" style={{ color: "white", textAlign: "center",fontSize: "18px" }}>
          🛒 Cart ({cart.length})
        </Link>
        <Link to="/my-orders" style={{ color: "white" , textAlign: "center",fontSize: "18px"}}>My Orders</Link>
        {isAdmin && <Link to="/all-orders" style={{ color: "white", textAlign: "center" ,fontSize: "18px"}}>All Orders</Link>}
      </nav>
    </div>
  );
};

export default Sidebar;
