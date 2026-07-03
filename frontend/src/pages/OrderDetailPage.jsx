import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios.js";

export default function OrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/orders/${id}`)
      .then((res) => setOrder(res.data.order))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="text-center py-20 text-gray-500">Loading order...</div>;
  }

  if (!order) {
    return <div className="text-center py-20 text-red-500">Order not found.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Order #{order._id.slice(-6).toUpperCase()}
        </h1>
        <p className="text-sm text-gray-500">
          Placed on {new Date(order.createdAt).toLocaleString()}
        </p>
        <span className="inline-block mt-2 text-sm capitalize px-2 py-1 rounded-full bg-emerald-50 text-emerald-700">
          {order.status}
        </span>
      </div>

      <div className="space-y-3 mb-6">
        {order.items.map((item) => (
          <div key={item.productId} className="flex items-center gap-4 border-b border-gray-100 pb-3">
            <img src={item.thumbnail} alt={item.title} className="w-14 h-14 object-cover rounded-lg" />
            <div className="flex-1">
              <p className="font-medium text-gray-900">{item.title}</p>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
            </div>
            <p className="font-semibold text-emerald-700">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>

      {order.shippingAddress && (
        <div className="mb-6 text-sm text-gray-600">
          <h2 className="font-medium text-gray-900 mb-1">Shipping to</h2>
          <p>{order.shippingAddress.fullName}</p>
          <p>{order.shippingAddress.street}</p>
          <p>
            {order.shippingAddress.city}, {order.shippingAddress.postalCode}
          </p>
          <p>{order.shippingAddress.country}</p>
        </div>
      )}

      <div className="flex items-center justify-between border-t border-gray-200 pt-4">
        <span className="text-lg font-semibold text-gray-900">Total</span>
        <span className="text-lg font-bold text-emerald-700">${order.totalAmount.toFixed(2)}</span>
      </div>
    </div>
  );
}
