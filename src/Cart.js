// Cart.js
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_BASE_URL } from "./config";
import { useCart } from "./CartContext";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, setCart } = useCart(); // shared cart state

  const userId = "68d11c098e2cf2a631f49432"; // ✅ replace with logged-in user's ID
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch cart items from backend
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/cart/${userId}`);
        if (!res.ok) throw new Error("Failed to fetch cart");
        const data = await res.json();

        // backend returns { userId, items: [...] }
        setCartItems(data.items || []);
        setCart(data.items || []); // update global state
      } catch (err) {
        console.error("Error fetching cart:", err);
        setError("Failed to fetch cart");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userId, setCart]);

  // ✅ Remove product from cart
  const removeFromCart = async (productId) => {
    try {
      await fetch(`${API_BASE_URL}/cart/${userId}/${productId}`, {
        method: "DELETE",
      });

      // Refresh cart after delete
      const res = await fetch(`${API_BASE_URL}/cart/${userId}`);
      const updated = await res.json();

      setCartItems(updated.items || []);
      setCart(updated.items || []);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

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
            {cartItems.map((item) => (
              <div
                key={item.productId?._id || item.product._id}
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
                  src={item.productId?.image || item.product.image}
                  alt={item.productId?.name || item.product.name}
                  style={{
                    width: "100%",
                    height: "160px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
                <h3>{item.productId?.name || item.product.name}</h3>
                <p>Price: ₹{item.productId?.price || item.product.price}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Farmer: {item.productId?.farmerName || item.product.farmerName}</p>

                <div
                  className="actions"
                  style={{ display: "flex", gap: "10px", marginTop: "10px" }}
                >
                  <button
                    onClick={() =>
                      removeFromCart(item.productId?._id || item.product._id)
                    }
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
                      navigate(`/product/${item.productId?._id || item.product._id}`)
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
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;
