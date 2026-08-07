import { NavLink } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import api from "../api/axios";
import Cart from "./Cart";
import { useAuthContext } from "../context/AuthContext";
import Profile from "./Profile.jsx";

function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();
  const token = user?.token;

  const loadCart = useCallback(async () => {
    // ✅ Only run if token exists
    if (!token) {
      setCartCount(0);
      setLoading(false);
      return;
    }

    try {
      const response = await api.get("/cart", {
        headers: { Authorization: `Bearer ${token}` }, // pass token explicitly
      });
      const total = response.data.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      setCartCount(total);
    } catch (error) {
      if (error.response?.status === 404) {
        setCartCount(0);
      } else {
        console.error("Error loading cart count:", error);
      }
    } finally {
      setLoading(false);
    }
  }, [token]); // ✅ include token in dependency array

  useEffect(() => {
    loadCart();
    window.addEventListener("cartUpdated", loadCart);
    return () => {
      window.removeEventListener("cartUpdated", loadCart);
    };
  }, [loadCart]);

  return (
    <div className="flex z-20 sticky top-0 bg-white py-6 justify-between items-center px-8">
      <div>LOGO</div>
      <div className="flex gap-10">
        <NavLink to="/"><span className="hover:text-gray-600">Home</span></NavLink>
        <NavLink to="/shop"><span className="hover:text-gray-600">Shop</span></NavLink>
        <NavLink to="/about"><span className="hover:text-gray-600">About</span></NavLink>
        <NavLink to="/contact"><span className="hover:text-gray-600">Contact</span></NavLink>
      </div>
      <div className="flex gap-6 items-center">
        {!token && (
          <NavLink to="/signin">
            <span className="hover:bg-neutral-800 bg-black rounded-xl py-1 px-4 text-base font-medium text-gray-100 cursor-pointer">
              Sign In
            </span>
          </NavLink>
        )}
        <NavLink to="/cart">
          <Cart cartCount={cartCount} loading={loading} />
        </NavLink>
        {token && <Profile />}
      </div>
    </div>
  );
}

export default Navbar;
