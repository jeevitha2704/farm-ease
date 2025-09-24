import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  description: String,
  photo: String,
  organic: Boolean,
  price: String,
  unit: String,
  quantity: Number,
  harvestDate: String,
  farmerName: String,
  location: String,
  contactNumber: String,
  contactEmail: String,
  pickupAvailable: Boolean,
  deliveryAvailable: Boolean,
  status: { type: String, default: "Available" },
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
