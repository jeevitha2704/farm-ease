import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaAppleAlt, FaDollarSign, FaUser, FaTruck } from "react-icons/fa";
import { API_BASE_URL } from "./config";
import { useProducts } from "./ProductsContext";

const AddProduct = () => {
  const navigate = useNavigate();
  const { products,setProducts } = useProducts();
  const [message, setMessage] = useState("");
  const [productInfo, setProductInfo] = useState({
    name: "",
    category: "",
    description: "",
    photo: null,
    organic: false,
    price: "",
    unit: "",
    quantity: "",
    harvestDate: "",
    farmerName: "",
    location: "",
    contactNumber: "",
    contactEmail: "",
    pickupAvailable: false,
    deliveryAvailable: false,
  });

  // Publish product
  const handlePublish = () => {
    const formData = new FormData();

    // Append all product info fields
    for (const key in productInfo) {
      if (productInfo[key] !== null) {
        formData.append(key, productInfo[key]);
      }
    }

    fetch(`${API_BASE_URL}/products`, {
      method: "POST",
      body: formData, // send as multipart/form-data
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Product published:", data);
        alert("✅ Product published successfully!");
        setProductInfo({
          name: "",
          category: "",
          description: "",
          photo: null,
          organic: false,
          price: "",
          unit: "",
          quantity: "",
          harvestDate: "",
          farmerName: "",
          location: "",
          contactNumber: "",
          contactEmail: "",
          pickupAvailable: false,
          deliveryAvailable: false,
        });
        navigate("/farmer-dashboard");
      })
      .catch((err) => {
        console.error(err);
        alert("❌ Failed to publish product");
      });
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setProductInfo({ ...productInfo, [name]: checked });
    } else if (type === "file") {
      setProductInfo({ ...productInfo, [name]: files[0] });
    } else {
      setProductInfo({ ...productInfo, [name]: value });
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "250px",
          backgroundColor: "#06402B",
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
          minHeight: "100vh",
          fontSize: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "22px",
            fontWeight: "bold",
            marginBottom: "40px",
          }}
        >
          <span style={{ fontSize: "28px", marginRight: "10px" }}>🍃</span>
          <span>FarmEase</span>
        </div>

        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            width: "100%",
          }}
        >
          <button onClick={() => navigate("/")} style={sidebarBtnStyle}>
            Home
          </button>
          <button onClick={() => navigate("/marketplace")} style={sidebarBtnStyle}>
            Marketplace
          </button>
          <button onClick={() => navigate("/farmer-dashboard")} style={sidebarBtnStyle}>
            Farmer Dashboard
          </button>
          <button style={{ ...sidebarBtnStyle, fontWeight: "bold" }}>Add Product</button>
          <button onClick={() => navigate("/community")} style={sidebarBtnStyle}>
            Community
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "20px", backgroundColor: "#f9f9f9" }}>
        <section style={{ marginBottom: "30px" }}>
          <h1 style={{ color: "#06402B" }}>Add a Fresh Product</h1>
          <p>
            Showcase your fresh produce to customers directly. Fill out the details below to publish your product.
          </p>
          {message && <p style={{ marginTop: "10px", color: message.includes("✅") ? "green" : "red" }}>{message}</p>}
        </section>

        <section style={{ display: "grid", gridTemplateColumns: "1fr", gap: "20px", marginBottom: "30px" }}>
          {/* Product Information */}
          <div style={boxStyle}>
            <h3 style={blockTitleStyle}><FaAppleAlt style={{ marginRight: "8px" }} /> Product Information</h3>
            <label>Product Name</label>
            <input type="text" name="name" value={productInfo.name} onChange={handleChange} style={inputStyle} />

            <label>Category</label>
            <input type="text" name="category" value={productInfo.category} onChange={handleChange} style={inputStyle} />

            <label>Description</label>
            <textarea name="description" value={productInfo.description} onChange={handleChange} style={textareaStyle} />

            <label>Photo (optional)</label>
            <input type="file" name="photo" onChange={handleChange} style={{ marginTop: "10px", marginBottom: "15px" }} />

            <label>Organic Certified</label>
            <label style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
              <input type="checkbox" name="organic" checked={productInfo.organic} onChange={handleChange} style={{ marginRight: "10px" }} /> Yes
            </label>
          </div>

          {/* Pricing & Inventory */}
          <div style={boxStyle}>
            <h3 style={blockTitleStyle}><FaDollarSign style={{ marginRight: "8px" }} /> Pricing & Inventory</h3>
            <label>Price per Unit</label>
            <input type="text" name="price" value={productInfo.price} onChange={handleChange} style={inputStyle} />

            <label>Unit Type</label>
            <input type="text" name="unit" value={productInfo.unit} onChange={handleChange} style={inputStyle} />

            <label>Available Quantity</label>
            <input type="number" name="quantity" value={productInfo.quantity} onChange={handleChange} style={inputStyle} />

            <label>Harvest Date</label>
            <input type="date" name="harvestDate" value={productInfo.harvestDate} onChange={handleChange} style={inputStyle} />
          </div>

          {/* Farmer Information */}
          <div style={boxStyle}>
            <h3 style={blockTitleStyle}><FaUser style={{ marginRight: "8px" }} /> Farmer Information</h3>
            <label>Farmer Name</label>
            <input type="text" name="farmerName" value={productInfo.farmerName} onChange={handleChange} style={inputStyle} />

            <label>Location</label>
            <input type="text" name="location" value={productInfo.location} onChange={handleChange} style={inputStyle} />

            <label>Contact Number</label>
            <input type="text" name="contactNumber" value={productInfo.contactNumber} onChange={handleChange} style={inputStyle} />

            <label>Email</label>
            <input type="email" name="contactEmail" value={productInfo.contactEmail} onChange={handleChange} style={inputStyle} />
          </div>

          {/* Fulfillment Options */}
          <div style={boxStyle}>
            <h3 style={blockTitleStyle}><FaTruck style={{ marginRight: "8px" }} /> Fulfillment Options</h3>
            <label>Customer Pickup Available</label>
            <label style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
              <input type="checkbox" name="pickupAvailable" checked={productInfo.pickupAvailable} onChange={handleChange} style={{ marginRight: "10px" }} /> Yes
            </label>

            <label>Delivery Available</label>
            <label style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
              <input type="checkbox" name="deliveryAvailable" checked={productInfo.deliveryAvailable} onChange={handleChange} style={{ marginRight: "10px" }} /> Yes
            </label>
          </div>
        </section>

        <button onClick={handlePublish} style={publishBtnStyle}>
          Publish Product
        </button>
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

const boxStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
};

const blockTitleStyle = {
  fontSize: "18px",
  fontWeight: "bold",
  marginBottom: "15px",
  display: "flex",
  alignItems: "center",
  color: "#06402B",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "5px",
  marginBottom: "15px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const textareaStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "5px",
  marginBottom: "15px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  minHeight: "80px",
};

const publishBtnStyle = {
  backgroundColor: "#06402B",
  color: "white",
  padding: "15px 30px",
  fontSize: "18px",
  borderRadius: "8px",
  cursor: "pointer",
};

export default AddProduct;

