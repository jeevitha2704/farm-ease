import React, { useState } from "react";
import Sidebar from "./Sidebar";

const AllOrders = () => {
  // Sample all orders (for admin/farmer view)
  const [allOrders] = useState([
    {
      id: "ORD001",
      customer: "Arun Prasad",
      product: "Farm Eggs",
      price: "₹300/12pcs",
      farmerName: "Farmer Raj",
      location: "Coimbatore",
      status: "Delivered",
    },
    {
      id: "ORD002",
      customer: "Meena Kumari",
      product: "Local Honey",
      price: "₹500/250g",
      farmerName: "Farmer Devi",
      location: "Chennai",
      status: "Pending",
    },
  ]);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar isAdmin={true} />
      <main style={{ flex: 1, padding: "20px" }}>
        <h1>📊 All Orders</h1>
        {allOrders.length === 0 ? (
          <p>No orders available.</p>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "20px",
              background: "white",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <thead style={{ background: "#06402B", color: "white" }}>
              <tr>
                <th style={{ padding: "12px" }}>Order ID</th>
                <th style={{ padding: "12px" }}>Customer</th>
                <th style={{ padding: "12px" }}>Product</th>
                <th style={{ padding: "12px" }}>Farmer</th>
                <th style={{ padding: "12px" }}>Location</th>
                <th style={{ padding: "12px" }}>Price</th>
                <th style={{ padding: "12px" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {allOrders.map((order) => (
                <tr key={order.id} style={{ borderBottom: "1px solid #ddd", textAlign: "center" }}>
                  <td style={{ padding: "10px" }}>{order.id}</td>
                  <td style={{ padding: "10px" }}>{order.customer}</td>
                  <td style={{ padding: "10px" }}>{order.product}</td>
                  <td style={{ padding: "10px" }}>{order.farmerName}</td>
                  <td style={{ padding: "10px" }}>{order.location}</td>
                  <td style={{ padding: "10px" }}>{order.price}</td>
                  <td style={{ padding: "10px" }}>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
};

export default AllOrders;
