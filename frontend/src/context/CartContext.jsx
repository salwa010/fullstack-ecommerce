import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios.js";
import { useAuth } from "./AuthContext.jsx";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  async function refreshCart() {
    if (!user) {
      setItems([]);
      return;
    }
    setLoading(true);
    try {
      const res = await api.get("/cart");
      setItems(res.data.cart.items);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  async function addToCart(product, quantity = 1) {
    const res = await api.post("/cart", {
      productId: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      quantity,
    });
    setItems(res.data.cart.items);
  }

  async function updateQuantity(productId, quantity) {
    const res = await api.put(`/cart/${productId}`, { quantity });
    setItems(res.data.cart.items);
  }

  async function removeFromCart(productId) {
    const res = await api.delete(`/cart/${productId}`);
    setItems(res.data.cart.items);
  }

  async function clearCart() {
    const res = await api.delete("/cart");
    setItems(res.data.cart.items);
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        refreshCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
