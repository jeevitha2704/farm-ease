// routes/cart.js
import express from "express";
import Cart from "../models/Cart.js";

const router = express.Router();

// GET cart by userId
router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate("items.productId");
    if (!cart) return res.json({ items: [] });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch cart", error: err });
  }
});

// POST add product to cart
router.post("/:userId", async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ userId: req.params.userId });

    if (!cart) {
      cart = new Cart({ userId: req.params.userId, items: [] });
    }

    cart.items.push({ productId, quantity });
    await cart.save();

    res.json({ message: "Product added to cart successfully", cart });
  } catch (err) {
    res.status(500).json({ message: "Failed to add to cart", error: err });
  }
});

export default router;   // ✅ only ESM export
