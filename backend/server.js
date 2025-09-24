// server.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Import route files
import productRoutes from "./routes/products.js";
import userRoutes from "./routes/users.js";
import orderRoutes from "./routes/orders.js";
import postRoutes from "./routes/posts.js";
import cartRoutes from "./routes/cartRoutes.js";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// API Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/cart", cartRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});
const __dirname = path.resolve();

// Serve React frontend
app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
