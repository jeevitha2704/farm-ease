import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import Marketplace from "./Marketplace";
import Community from "./Community";
import About from "./About"; 
import FarmerDashboard from "./FarmerDashboard";
import AddProduct from "./AddProduct";
import ProductDetail from "./ProductDetail";
import { CartProvider } from "./CartContext";
import Cart from "./Cart";
import MyOrders from "./MyOrders";
import AllOrders from "./AllOrders";
import { ProductsProvider } from "./ProductsContext"; // <- new
//import path from "path";

function App() {
  return (
  <ProductsProvider>
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/community" element={<Community />} />
          <Route path="/about" element={<About />} /> 
          <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/all-orders" element={<AllOrders />} />
        </Routes>
      </Router>
    </CartProvider>
  </ProductsProvider>
  );
}
//const __dirname = path.resolve();

// Serve React frontend
//app.use(express.static(path.join(__dirname, "build")));

//app.get("*", (req, res) => {
 // res.sendFile(path.join(__dirname, "build", "index.html"));
//});

export default App;
