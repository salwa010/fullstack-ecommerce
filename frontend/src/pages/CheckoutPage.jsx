import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import { useCart } from "../context/CartContext.jsx";

const initialAddress = {
  fullName: "",
  street: "",
  city: "",
  postalCode: "",
  country: "",
};

export default function CheckoutPage() {
  const { items, totalPrice, refreshCart } = useCart();
  const [address, setAddress] = useState(initialAddress);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleChange(e) {
    setAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await api.post("/orders", { shippingAddress: address });
      await refreshCart();
      navigate(`/orders/${res.data.order._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Could not place order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center text-gray-600">
        Your cart is empty — nothing to check out.
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          name="fullName"
          placeholder="Full name"
          value={address.fullName}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <input
          name="street"
          placeholder="Street address"
          value={address.street}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            name="city"
            placeholder="City"
            value={address.city}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <input
            name="postalCode"
            placeholder="Postal code"
            value={address.postalCode}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <input
          name="country"
          placeholder="Country"
          value={address.country}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <span className="text-lg font-semibold text-gray-900">
            Total: ${totalPrice.toFixed(2)}
          </span>
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-3 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 disabled:opacity-60"
          >
            {submitting ? "Placing order..." : "Place order"}
          </button>
        </div>
      </form>

      <p className="text-xs text-gray-400">
        This is a learning project — no real payment is processed. Placing an order simulates a
        successful payment.
      </p>
    </div>
  );
}
