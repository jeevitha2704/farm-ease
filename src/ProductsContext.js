import React, { createContext, useContext, useState, useEffect } from "react";
import { API_BASE_URL } from "./config";

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async (signal) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/products`, { signal });
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      // Keep locally added products that aren't persisted to the backend yet
      setProducts((prev) => [...prev.filter((p) => p.local), ...data]);
    } catch (err) {
      console.error("Products backend unavailable:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add a product to the shared store so it shows up immediately (offline-friendly)
  const addProduct = (product) => {
    setProducts((prev) => [{ ...product }, ...prev]);
  };

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    fetchProducts(controller.signal).finally(() => clearTimeout(timeout));
    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  return (
    <ProductsContext.Provider value={{ products, setProducts, addProduct, loading, error, fetchProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};
export const useProducts = () => useContext(ProductsContext);