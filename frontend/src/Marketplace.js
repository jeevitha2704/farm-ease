import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_BASE_URL } from "./config";
import { useCart } from "./CartContext";

const Marketplace = () => {
  const navigate = useNavigate();
  const { cart, setCart } = useCart();
  const [backendProducts, setBackendProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [location, setLocation] = useState("");
  
  const sampleProducts = [
    { name: "Fresh Tomatoes", category: "Vegetables", price: "₹200/kg", image: "https://t4.ftcdn.net/jpg/01/68/20/25/360_F_168202520_D8r8ouEY4RAv7kFy9IQYYzQHZ6wfObUR.jpg" },
    { name: "Organic Spinach", category: "Vegetables", price: "₹150/kg", image: "https://happyharvestfarms.com/blog/wp-content/uploads/2023/11/Spinach-1.jpg" },
    { name: "Farm Eggs", category: "Dairy", price: "₹300/12pcs", image: "https://tiimg.tistatic.com/fp/1/006/455/100-natural-fresh-eggs-338.jpg" },
    { name: "Carrots", category: "Vegetables", price: "₹120/kg", image: "https://www.alaskanaturalfoods.com/wp-content/uploads/240_F_95449632_TdIDzEmuxuzmyIAHt6Prr4UWCZFMjCN2.jpg" },
    { name: "Local Honey", category: "Other", price: "₹500/250g", image: "https://5.imimg.com/data5/SELLER/Default/2024/7/436939823/KB/SK/VA/44786418/shakti-chyawanprash-500x500.jpg"},
    { name: "Fresh Milk", category: "Dairy", price: "₹60/litre", image: "https://freshmilkuae.com/wp-content/uploads/2025/03/fresh-2-1200x800.jpg" },
    { name: "Apples", category: "Fruits", price: "₹180/kg", image: "https://cdn.pixabay.com/photo/2014/10/22/18/40/apples-498659_1280.jpg" },
    { name: "Bananas", category: "Fruits", price: "₹50/dozen", image: "https://static.toiimg.com/thumb/116988465/116988465.jpg?height=746&width=420&resizemode=76&imgsize=31868" },
    { name: "Cucumbers", category: "Vegetables", price: "₹70/kg", image: "https://images.pexels.com/photos/2329440/pexels-photo-2329440.jpeg" },
    { name: "Strawberries", category: "Fruits", price: "₹300/kg", image: "https://images.pexels.com/photos/46174/strawberries-berries-fruit-freshness-46174.jpeg" },
  ];

  useEffect(() => {
    const fetchBackendProducts = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setBackendProducts(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.message);
        setLoading(false);
      }
    };
    fetchBackendProducts();
  }, []);

  const allProducts = [...sampleProducts, ...backendProducts];

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All Categories" || product.category === category;
    const matchesLocation = location === "" || product.location?.toLowerCase().includes(location.toLowerCase());
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const addToCart = (product) => {
    setCart((prev) => [...prev, { product, quantity: 1 }]);
    alert(`${product.name} added to cart!`);
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <div style={{ width: "250px", backgroundColor: "#06402B", color: "white", padding: "20px", display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <div style={{ display: "flex", alignItems: "center", fontSize: "22px", fontWeight: "bold", marginBottom: "40px" }}>
          <span style={{ fontSize: "28px", marginRight: "10px" }}>🍃</span>
          <span>FarmEase</span>
        </div>
        <nav style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <button onClick={() => navigate("/")} style={{ background: "none", border: "none", color: "white", textAlign: "center", cursor: "pointer",fontSize: "18px" }}>Home</button>
          <button onClick={() => navigate("/marketplace")} style={{ background: "none", border: "none", color: "white", textAlign: "center", cursor: "pointer" ,fontSize: "18px"}}>Marketplace</button>
          <button onClick={() => navigate("/farmer-dashboard")} style={{ background: "none", border: "none", color: "white", textAlign: "center", cursor: "pointer",fontSize: "18px" }}>Farmer Dashboard</button>
          <button onClick={() => navigate("/add-product")} style={{ background: "none", border: "none", color: "white", textAlign: "center", cursor: "pointer",fontSize: "18px" }}>Add Product</button>
          <button onClick={() => navigate("/community")} style={{ background: "none", border: "none", color: "white", textAlign: "center", cursor: "pointer",fontSize: "18px" }}>Community</button>
          <Link to="/cart" style={{ color: "white", textDecoration: "none", textAlign: "center",fontSize: "18px"  }}>
    🛒 Cart ({cart.length})
  </Link>
  <Link to="/my-orders" style={{ color: "white", textAlign: "center",textDecoration: "none" ,fontSize: "18px" }}>
    My Orders
  </Link>
  <Link to="/all-orders" style={{ color: "white", textDecoration: "none" , textAlign: "center",fontSize: "18px" }}>
    All Orders
  </Link>

        </nav>
      </div>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "20px", backgroundColor: "#f9f9f9" }}>
        {/* Top Banner */}
        <section style={{ backgroundColor: "#c5f8d2", padding: "60px 20px", borderRadius: "10px", marginBottom: "20px" }}>
          <h1 style={{ color: "#06402B" }}>100% Fresh Local Farmers’ Produce</h1>
          <p>Connect directly with local farmers and get the freshest farm-to-table produce in your area!</p>
        </section>

        {/* Search Bar */}
        <section style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Search Products"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "40%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ width: "20%", padding: "15px", borderRadius: "6px", border: "2px solid #ccc" }}
          >
            <option>All Categories</option>
            <option>Vegetables</option>
            <option>Fruits</option>
            <option>Dairy</option>
            <option>Other</option>
          </select>
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={{ width: "30%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
          />
          <button style={{ width: "10%", backgroundColor: "#06402B", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>Search</button>
        </section>

        {/* Products Grid */}
        <section>
          <h2>Available Products</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, idx) => (
                <div key={product._id || idx} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "8px", backgroundColor: "#fff" }}>
                  <img
                    src={product.image || (product.photo ? `${API_BASE_URL}/uploads/${product.photo}` : "https://via.placeholder.com/200x150")}
                    alt={product.name}
                    style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px", cursor: "pointer" }}
                    onClick={() => navigate(`/product/${product._id || idx}`, { state: product })}
                  />
                  <h3 style={{ color: "#06402B" }}>{product.name}</h3>
                  <p>{product.price}</p>
                  <p>{product.category}</p>
                  <button style={{ background: "#06402B", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer" }} onClick={() => addToCart(product)}>Add to Cart</button>
                </div>
              ))
            ) : (
              <p style={{ gridColumn: "1/-1", textAlign: "center" }}>No products available.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Marketplace;
