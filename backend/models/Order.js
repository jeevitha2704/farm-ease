import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  product: { type: String, required: true },
  quantity: { type: Number, required: true },
  total: { type: String, required: true },
  method: { type: String, enum: ["COD", "Online"], default: "COD" },
  status: { type: String, enum: ["Pending", "Completed"], default: "Pending" },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
