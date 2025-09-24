import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "./config";

const ProductDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [setProduct] = useState(location.state || null);
  const product = location.state; 
  useEffect(() => {
    // Fetch product if not passed from state
    if (!product) {
      const fetchProduct = async () => {
        try {
          const res = await fetch(`${API_BASE_URL}/products/${id}`);
          if (!res.ok) throw new Error("Failed to fetch product");
          const data = await res.json();
          setProduct(data);
        } catch (err) {
          console.error(err);
        }
      };
      fetchProduct();
    }
  }, [id, product]);

  if (!product) return <p>Loading product...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: "20px" }}>
        ⬅ Back
      </button>
      <div style={{ display: "flex", gap: "20px" }}>
        <img
          src={product.image}
          alt={product.name}
          style={{ width: "300px", height: "200px", borderRadius: "10px" }}
        />
        <div>
          <h1>{product.name}</h1>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Price:</strong> {product.price}</p>
          <p><strong>Farmer:</strong> {product.farmerName || "Unknown Farmer"}</p>
          <p><strong>Location:</strong> {product.location || "Not specified"}</p>
          <p><strong>Description:</strong> {product.description || "No description available."}</p>
          <button style={{ backgroundColor: "#06402B", color: "white", marginTop: "10px" }}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
