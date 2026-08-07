import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/axios";

/**
 * Handles order placement logic including COD, eSewa, and Khalti flows.
 */
export default function usePlaceOrder({ checkoutItems, address, paymentMethod, saveAddress, setError }) {
  const navigate = useNavigate();
  const [placing, setPlacing] = useState(false);

  const handlePlaceOrder = async () => {
    // Validate required fields
    if (!address.fullName.trim() || !address.phone.trim()) {
      setError("Full name and phone number are required.");
      return;
    }

    setPlacing(true);
    setError("");

    try {
      const orderItems = checkoutItems.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
      }));

      //Create Order
      const response = await api.post("/orders", {
        items: orderItems,
        shippingAddress: address,
        paymentMethod: paymentMethod,
      });
      saveAddress();

      const createdOrder = response.data.order;

      // Handle eSewa payment flow
      if (paymentMethod === "eSewa") {
        const initRes = await api.post("/payment/esewa/initiate", {
          orderId: createdOrder._id,
        });

        if (initRes.data.success) {
          const { esewaData } = initRes.data;

          // Dynamically create and submit eSewa HTML form
          const form = document.createElement("form");
          form.method = "POST";
          form.action = esewaData.esewa_url;

          Object.keys(esewaData).forEach((key) => {
            if (key !== "esewa_url") {
              const hiddenField = document.createElement("input");
              hiddenField.type = "hidden";
              hiddenField.name = key;
              hiddenField.value = esewaData[key];
              form.appendChild(hiddenField);
            }
          });
          document.body.appendChild(form);
          form.submit();
          return;
        }
      }

      // Handle Khalti payment flow
      if (paymentMethod === "Khalti") {
        const initRes = await api.post("/payment/khalti/initiate", {
          orderId: createdOrder._id,
        });

        if (initRes.data.success && initRes.data.payment_url) {
          window.location.href = initRes.data.payment_url;
          return;
        }
      }

      // Default COD flow: Notify navbar to update cart badge and navigate
      window.dispatchEvent(new Event("cartUpdated"));

      navigate(`/order-confirmation/${createdOrder._id}`, {
        state: { order: createdOrder },
      });
    } catch (err) {
      console.error("Error placing order:", err);
      setError(
        err.response?.data?.message || "Failed to place order. Please try again."
      );
    } finally {
      setPlacing(false);
    }
  };

  return { placing, handlePlaceOrder };
}
