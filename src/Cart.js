// Cart.js
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "./CartContext";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart(); // shared cart state

  // Normalize item shape: support flat items as well as { product } / { productId }
  const getProduct = (item) => item.productId || item.product || item;
  const getId = (item) => {
    const p = getProduct(item);
    return p._id || p.name;
  };

  const cartItems = cart;

  return (
    <div className="cart-page" style={{ display: "flex" }}>
      {/* Sidebar (same as Marketplace) */}
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
          <button onClick={() => navigate("/farmer-dashboard")} style={{ color: "white" }}>
            Farmer Dashboard
          </button>
          <button onClick={() => navigate("/add-product")} style={{ color: "white" }}>
            Add Product
          </button>
          <button onClick={() => navigate("/community")} style={{ color: "white" }}>
            Community
          </button>

          {/* 🛒 Cart link */}
          <Link to="/cart" style={{ color: "white", textAlign: "center", fontSize: "18px" }}>
            🛒 Cart ({cart.length})
          </Link>

          {/* Orders links */}
          <Link to="/my-orders" style={{ color: "white", textAlign: "center", fontSize: "18px" }}>
            My Orders
          </Link>
          <Link to="/all-orders" style={{ color: "white", textAlign: "center", fontSize: "18px" }}>
            All Orders
          </Link>
        </nav>
      </div>

      {/* Main Cart Content */}
      <main className="cart-main" style={{ flex: 1, padding: "20px" }}>
        <h2>My Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div
            className="cart-list"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            {cartItems.map((item) => {
              const product = getProduct(item);
              const id = getId(item);
              return (
              <div
                key={id}
                className="cart-item"
                style={{
                  border: "1px solid #ccc",
                  padding: "15px",
                  borderRadius: "10px",
                  background: "white",
                  color: "black",
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "160px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
                <h3>{product.name}</h3>
                <p>Price: ₹{product.price}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Farmer: {product.farmerName || "Unknown Farmer"}</p>

                <div
                  className="actions"
                  style={{ display: "flex", gap: "10px", marginTop: "10px" }}
                >
                  <button
                    onClick={() => removeFromCart(id)}
                    style={{
                      background: "red",
                      color: "white",
                      padding: "5px 10px",
                      borderRadius: "6px",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Remove
                  </button>
                  <button
                    onClick={() =>
                      navigate(`/product/${id}`, { state: product })
                    }
                    style={{
                      background: "#06402B",
                      color: "white",
                      padding: "5px 10px",
                      borderRadius: "6px",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;
