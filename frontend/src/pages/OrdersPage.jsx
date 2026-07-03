import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios.js";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/orders")
      .then((res) => setOrders(res.data.orders))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-center py-20 text-gray-500">Loading orders...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-600 mb-4">You haven't placed any orders yet.</p>
        <Link to="/" className="text-emerald-700 font-medium hover:underline">
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Your orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <Link
            key={order._id}
            to={`/orders/${order._id}`}
            className="block border border-gray-200 rounded-xl p-4 hover:shadow-md transition"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-900">
                Order #{order._id.slice(-6).toUpperCase()}
              </span>
              <span className="text-sm capitalize px-2 py-1 rounded-full bg-emerald-50 text-emerald-700">
                {order.status}
              </span>
            </div>
            <p className="text-sm text-gray-500">
              {new Date(order.createdAt).toLocaleDateString()} · {order.items.length} item(s)
            </p>
            <p className="font-semibold text-emerald-700 mt-1">
              ${order.totalAmount.toFixed(2)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
