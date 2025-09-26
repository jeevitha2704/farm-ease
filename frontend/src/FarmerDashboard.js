import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "./config";
import { useProducts } from "./ProductsContext";

const FarmerDashboard = () => {
  const navigate = useNavigate();
  const { products, setProducts } = useProducts(); // products from context (including added ones)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [customerOrders, setCustomerOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("myProducts");

  // Fetch products & orders from backend
  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch products from backend
      const productsRes = await fetch(`${API_BASE_URL}/products`);
      if (!productsRes.ok) throw new Error("Failed to fetch products");
      const backendProducts = await productsRes.json();

      // Merge backend products with context products to include newly added ones
      const mergedProducts = [...backendProducts, ...products.filter(p => !p._id)];
      setProducts(mergedProducts);

      // Fetch customer orders
      const ordersRes = await fetch(`${API_BASE_URL}/orders`);
      if (!ordersRes.ok) throw new Error("Failed to fetch orders");
      const ordersData = await ordersRes.json();
      setCustomerOrders(ordersData);

      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to fetch dashboard data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <div style={{ width: "250px", backgroundColor: "#06402B", color: "white", padding: "20px", display: "flex", flexDirection: "column", minHeight: "100vh", fontSize: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", fontSize: "22px", fontWeight: "bold" , marginBottom: "40px"}}>
          <span style={{ fontSize: "28px", marginRight: "10px" }}>🍃</span>
          <span>FarmEase</span>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "20px"}}>
          <button onClick={() => navigate("/")} style={sidebarBtnStyle}>Home</button>
          <button onClick={() => navigate("/marketplace")} style={sidebarBtnStyle}>Marketplace</button>
          <button onClick={() => navigate("/farmer-dashboard")} style={{ ...sidebarBtnStyle, fontWeight: "bold" }}>Farmer Dashboard</button>
          <button onClick={() => navigate("/add-product")} style={sidebarBtnStyle}>Add Product</button>
          <button onClick={() => navigate("/community")} style={sidebarBtnStyle}>Community</button>
        </nav>
      </div>

      {/* Main Dashboard */}
      <main style={{ flex: 1, padding: "20px", backgroundColor: "#f9f9f9" }}>
        <header style={{ marginBottom: "30px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ fontSize: "28px", color: "#06402B" }}>Farmer Dashboard</h1>
            <p style={{ fontSize: "16px", color: "#06402B" }}>
              Manage your products, track stock, and view marketplace stats.
            </p>
          </div>
          <button
            onClick={() => navigate("/add-product")}
            style={publishBtnStyle}
          >
            <span style={{ fontSize: "18px" }}>＋</span> Add Product
          </button>
        </header>

        {/* Top 4 Cards */}
        <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "20px" }}>
          <div style={cardStyle}>
            <h3>Active Products</h3>
            <p style={{ fontSize: "20px", fontWeight: "bold" }}>{products.filter(p => p.status === "Available").length}</p>
          </div>
          <div style={cardStyle}>
            <h3>Pending Orders</h3>
            <p style={{ fontSize: "20px", fontWeight: "bold" }}>{customerOrders.filter(o => o.status === "Pending").length}</p>
          </div>
          <div style={cardStyle}>
            <h3>Total Orders</h3>
            <p style={{ fontSize: "20px", fontWeight: "bold" }}>{customerOrders.length}</p>
          </div>
          <div style={cardStyle}>
            <h3>Total Revenue</h3>
            <p style={{ fontSize: "20px", fontWeight: "bold" }}>
              ₹{customerOrders.reduce((acc, o) => acc + parseInt(o.total.replace(/₹/, "")), 0)}
            </p>
          </div>
        </section>

        {/* Tabs */}
        <section style={{ marginBottom: "20px" }}>
          <button
            onClick={() => setActiveTab("myProducts")}
            style={activeTab === "myProducts" ? activeTabBtnStyle : inactiveTabBtnStyle}
          >
            My Products
          </button>
          <button
            onClick={() => setActiveTab("customerOrders")}
            style={activeTab === "customerOrders" ? activeTabBtnStyle : inactiveTabBtnStyle}
          >
            Customer Orders
          </button>
        </section>

        {/* Tab Content */}
        {activeTab === "myProducts" && (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#06402B", color: "white" }}>
                <th style={{ padding: "12px" }}>Product Name</th>
                <th>Place</th>
                <th>Category</th>
                <th>Price</th>
                <th>Available</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, idx) => (
                <tr key={idx} style={{ borderBottom: "1px solid #ccc", textAlign: "center" }}>
                  <td style={{ padding: "12px" }}>{p.name}</td>
                  <td>{p.location || "N/A"}</td>
                  <td>{p.category}</td>
                  <td>{p.price}</td>
                  <td>{p.quantity}</td>
                  <td>{p.status}</td>
                  <td>
                    <button style={{ padding: "5px 10px", borderRadius: "5px", border: "none", backgroundColor: "#06402B", color: "white", cursor: "pointer" }}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === "customerOrders" && (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#06402B", color: "white" }}>
                <th style={{ padding: "12px" }}>Customer Name</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Method</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {customerOrders.map((o, idx) => (
                <tr key={idx} style={{ borderBottom: "1px solid #ccc", textAlign: "center" }}>
                  <td style={{ padding: "12px" }}>{o.name}</td>
                  <td>{o.product}</td>
                  <td>{o.quantity}</td>
                  <td>{o.total}</td>
                  <td>{o.method}</td>
                  <td>{o.status}</td>
                  <td>{o.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
};


// Styles
const sidebarBtnStyle = {
  display: "block",
  marginBottom: "20px",
  background: "none",
  border: "none",
  color: "white",
  fontSize: "16px",
  textAlign: "center",
  cursor: "pointer",
};

const publishBtnStyle = {
  backgroundColor: "#06402B",
  color: "white",
  padding: "12px 20px",
  fontSize: "16px",
  borderRadius: "8px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "5px",
};

const cardStyle = {
  backgroundColor: "#c5f8d2",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
};

const activeTabBtnStyle = {
  padding: "10px 20px",
  marginRight: "10px",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "#06402B",
  color: "white",
  cursor: "pointer",
};

const inactiveTabBtnStyle = {
  padding: "10px 20px",
  marginRight: "10px",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "#ccc",
  color: "black",
  cursor: "pointer",
};

export default FarmerDashboard;
