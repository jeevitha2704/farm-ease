import Order from "../models/Order.js";

// Get all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add new order
export const addOrder = async (req, res) => {
  const { customerName, product, quantity, total, method, status, date } = req.body;

  const newOrder = new Order({ customerName, product, quantity, total, method, status, date });

  try {
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
