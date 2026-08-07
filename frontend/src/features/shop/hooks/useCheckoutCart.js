import { useState, useEffect } from "react";
import api from "../../../api/axios";

/**
 * Loads the user's cart, filters to only the selected items,
 * and computes subtotal / tax / total.
 */
export default function useCheckoutCart(selectedItems) {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCart = async () => {
      try {
        const response = await api.get("/cart");
        setCart(response.data);
      } catch (err) {
        console.error("Error loading cart:", err);
        setError("Failed to load cart items.");
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, []);

  // Filter to only selected items
  const checkoutItems = cart.items.filter((item) =>
    selectedItems.includes(item.productId._id)
  );

  // Totals
  const subTotal = checkoutItems.reduce(
    (total, item) => total + item.productId.price * item.quantity,
    0
  );
  const tax = Math.round(subTotal * 0.13 * 100) / 100;
  const total = Math.round((subTotal + tax) * 100) / 100;

  return { loading, error, setError, checkoutItems, subTotal, tax, total };
}
