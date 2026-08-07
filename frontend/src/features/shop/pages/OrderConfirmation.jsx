import { useLocation, Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../../api/axios";
import { CheckCircle, Loader2, Package } from "lucide-react";

export default function OrderConfirmation() {
  const { orderId } = useParams();
  const location = useLocation();
  const [order, setOrder] = useState(location.state?.order || null);
  const [loading, setLoading] = useState(!order);
  const [error, setError] = useState("");

  // If no order in state (e.g. page refresh), fetch it
  useEffect(() => {
    if (!order && orderId) {
      const fetchOrder = async () => {
        try {
          const response = await api.get(`/orders/${orderId}`);
          setOrder(response.data);
        } catch (err) {
          console.error("Error fetching order:", err);
          setError("Could not load order details.");
        } finally {
          setLoading(false);
        }
      };
      fetchOrder();
    }
  }, [order, orderId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4.5rem)]">
        <Loader2 className="size-8 animate-spin text-neutral-400" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-4.5rem)] gap-4">
        <p className="text-neutral-600 text-lg">{error || "Order not found."}</p>
        <Link
          to="/shop"
          className="bg-black text-white px-8 py-3 hover:bg-neutral-800 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="px-8">
      <div className="flex flex-col items-center justify-center py-16">
        {/* Success Icon */}
        <div className="bg-green-50 rounded-full p-6 mb-6">
          <CheckCircle className="size-16 text-green-600" />
        </div>

        <h1 className="text-3xl font-bold mb-2">Order Placed Successfully!</h1>
        <p className="text-neutral-600 mb-8">
          Thank you for your purchase. Your order has been confirmed.
        </p>

        {/* Order Details Card */}
        <div className="w-full max-w-xl border border-neutral-200 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-neutral-200">
            <div>
              <p className="text-sm text-neutral-500">Order ID</p>
              <p className="font-mono text-sm font-semibold">{order.orderId}</p>
            </div>
            <div className="bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
              {order.status}
            </div>
          </div>

          {/* Items */}
          <div className="flex items-center gap-2 mb-4">
            <Package className="size-4" />
            <h3 className="font-semibold text-sm">
              Items ({order.items.length})
            </h3>
          </div>
          <div className="flex flex-col gap-3 mb-6">
            {order.items.map((item) => (
              <div key={item.productId} className="flex justify-between text-sm">
                <span className="text-neutral-700">
                  {item.title} × {item.quantity}
                </span>
                <span className="font-semibold">
                  Rs.{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="border-t border-neutral-200 pt-4 flex flex-col gap-2">
            <div className="flex justify-between text-sm">
              <span className="text-neutral-600">Subtotal</span>
              <span className="font-semibold">Rs.{order.itemsPrice}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-neutral-600">Tax</span>
              <span className="font-semibold">Rs.{order.taxPrice}</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-2 border-t border-neutral-200 mt-2">
              <span>Total</span>
              <span>Rs.{order.totalPrice}</span>
            </div>
          </div>

          {/* Shipping Address */}
          {order.shippingAddress && (
            <div className="border-t border-neutral-200 mt-4 pt-4">
              <p className="text-sm font-semibold mb-1">Shipping To:</p>
              <p className="text-sm text-neutral-600">
                {order.shippingAddress.fullName} •{" "}
                {order.shippingAddress.phone}
              </p>
              <p className="text-sm text-neutral-600">
                {[
                  order.shippingAddress.address,
                  order.shippingAddress.area,
                  order.shippingAddress.city,
                  order.shippingAddress.region,
                ]
                  .filter(Boolean)
                  .join(", ")}
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-8">
          <Link
            to="/shop"
            className="bg-black text-white px-8 py-3 hover:bg-neutral-800 transition-colors font-medium"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
