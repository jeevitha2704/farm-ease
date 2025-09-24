import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const navigate = useNavigate();

  // Sample order data
  const [orders] = useState([
    {
      id: "ORD001",
      product: {
        _id: "PROD001",
        name: "Fresh Tomatoes",
        image: "https://t4.ftcdn.net/jpg/01/68/20/25/360_F_168202520_D8r8ouEY4RAv7kFy9IQYYzQHZ6wfObUR.jpg",
        price: "₹200/kg",
        category: "Vegetables",
        farmerName: "Ramesh Kumar",
        farmerLocation: "Tamil Nadu",
      },
      quantity: 2,
      total: "₹400",
      status: "Delivered",
    },
    {
      id: "ORD002",
      product: {
        _id: "PROD002",
        name: "Organic Spinach",
        image: "https://happyharvestfarms.com/blog/wp-content/uploads/2023/11/Spinach-1.jpg",
        price: "₹150/kg",
        category: "Vegetables",
        farmerName: "Sita Devi",
        farmerLocation: "Kerala",
      },
      quantity: 1,
      total: "₹150",
      status: "On the way",
    },
  ]);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main style={{ flex: 1, padding: "20px" }}>
        <h1>📦 My Orders</h1>
        {orders.length === 0 ? (
          <p>You have no orders yet.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            {orders.map((order) => (
              <div
                key={order.id}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  padding: "15px",
                  backgroundColor: "#fff",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                }}
              >
                <img
                  src={order.product.image}
                  alt={order.product.name}
                  style={{
                    width: "100%",
                    height: "160px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
                <h3>{order.product.name}</h3>
                <p>Price: {order.product.price}</p>
                <p>
                  <strong>Farmer:</strong> {order.product.farmerName}
                </p>
                <p>
                  <strong>Location:</strong> {order.product.farmerLocation}
                </p>
                <p>
                  <strong>Status:</strong> {order.status}
                </p>
                <button
                  onClick={() =>
                    navigate(`/product/${order.product._id}`, {
                      state: order.product,
                    })
                  }
                  style={{
                    marginTop: "10px",
                    background: "#06402B",
                    color: "white",
                    padding: "8px 12px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyOrders;
