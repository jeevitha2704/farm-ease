import React, { createContext, useContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const itemId = (item) => item._id || item.name;

  // Add item to cart (increments quantity if it already exists)
  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => itemId(item) === itemId(product));
      if (exists) {
        return prev.map((item) =>
          itemId(item) === itemId(product)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => itemId(item) !== id));
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
