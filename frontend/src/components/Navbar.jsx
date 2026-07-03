import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <nav className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-emerald-100">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-emerald-700">
          ShopLoop
        </Link>

        <div className="flex items-center gap-6 text-sm font-medium text-gray-700">
          <Link to="/" className="hover:text-emerald-600">
            Products
          </Link>

          <Link to="/cart" className="relative hover:text-emerald-600">
            Cart
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-emerald-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          {user ? (
            <>
              <Link to="/orders" className="hover:text-emerald-600">
                Orders
              </Link>
              <span className="text-gray-400">Hi, {user.name.split(" ")[0]}</span>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 transition"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-emerald-600">
                Log in
              </Link>
              <Link
                to="/register"
                className="px-3 py-1.5 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 transition"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
