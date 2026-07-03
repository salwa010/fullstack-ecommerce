import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function CartPage() {
  const { user } = useAuth();
  const { items, updateQuantity, removeFromCart, totalPrice, loading } = useCart();

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-600 mb-4">Log in to see your cart.</p>
        <Link to="/login" className="text-emerald-700 font-medium hover:underline">
          Go to login
        </Link>
      </div>
    );
  }

  if (loading) {
    return <div className="text-center py-20 text-gray-500">Loading cart...</div>;
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-600 mb-4">Your cart is empty.</p>
        <Link to="/" className="text-emerald-700 font-medium hover:underline">
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Your cart</h1>

      <div className="space-y-4 mb-8">
        {items.map((item) => (
          <div
            key={item.productId}
            className="flex items-center gap-4 border border-gray-200 rounded-xl p-4"
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{item.title}</h3>
              <p className="text-emerald-700 font-semibold">${item.price}</p>
            </div>

            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                className="px-3 py-1.5 hover:bg-gray-100"
              >
                −
              </button>
              <span className="px-4">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                className="px-3 py-1.5 hover:bg-gray-100"
              >
                +
              </button>
            </div>

            <button
              onClick={() => removeFromCart(item.productId)}
              className="text-sm text-red-500 hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-gray-200 pt-6">
        <span className="text-lg font-semibold text-gray-900">
          Total: ${totalPrice.toFixed(2)}
        </span>
        <Link
          to="/checkout"
          className="px-6 py-3 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
}
