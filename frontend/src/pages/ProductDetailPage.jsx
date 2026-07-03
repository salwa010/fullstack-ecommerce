import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await res.json();
      setProduct(data);
      setLoading(false);
    }
    fetchProduct();
  }, [id]);

  async function handleAddToCart() {
    if (!user) {
      navigate("/login");
      return;
    }
    await addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  if (loading) {
    return <div className="text-center py-20 text-gray-500">Loading product...</div>;
  }

  if (!product) {
    return <div className="text-center py-20 text-red-500">Product not found.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-emerald-700 hover:underline mb-6"
      >
        ← Back to products
      </button>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <p className="text-sm text-gray-500 capitalize mb-1">{product.category}</p>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-bold text-emerald-700">${product.price}</span>
            {product.discountPercentage > 0 && (
              <span className="text-sm text-emerald-600 font-medium">
                {Math.round(product.discountPercentage)}% off
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 mb-6">
            <label className="text-sm text-gray-600">Quantity</label>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-1.5 hover:bg-gray-100"
              >
                −
              </button>
              <span className="px-4">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-1.5 hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className={`w-full sm:w-auto px-6 py-3 rounded-lg font-medium transition ${
              added
                ? "bg-emerald-700 text-white"
                : "bg-emerald-600 text-white hover:bg-emerald-700"
            }`}
          >
            {added ? "Added to cart!" : "Add to cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
