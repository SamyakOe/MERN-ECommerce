import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { MapPin, Package, Loader2, CreditCard, Wallet } from "lucide-react";
import Loading from "../../../components/Loading";
import useCheckoutCart from "../hooks/useCheckoutCart";
import useShippingAddress from "../hooks/useShippingAddress";
import usePlaceOrder from "../hooks/usePlaceOrder";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedItems = location.state?.selectedItems || [];

  const [paymentMethod, setPaymentMethod] = useState("COD");

  // Cart & totals
  const { loading, error: cartError, setError, checkoutItems, subTotal, tax, total } =
    useCheckoutCart(selectedItems);

  // Shipping address
  const { address, handleChange, saveAddress } = useShippingAddress();

  // Order placement
  const { placing, handlePlaceOrder } = usePlaceOrder({
    checkoutItems,
    address,
    paymentMethod,
    saveAddress,
    setError,
  });

  // Merge cart‑level errors into a single error string
  const error = cartError;

  // Redirect back to cart if no items were selected
  useEffect(() => {
    if (selectedItems.length === 0) {
      navigate("/cart");
    }
  }, [selectedItems, navigate]);

  if (loading) {
    return <Loading />;
  }

  if (checkoutItems.length === 0 && !loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-4.5rem)] gap-4">
        <p className="text-neutral-600 text-lg">No items to checkout.</p>
        <Link
          to="/cart"
          className="bg-black text-white px-8 py-3 hover:bg-neutral-800 transition-colors"
        >
          Back to Cart
        </Link>
      </div>
    );
  }

  return (
    <div className="px-8">
      <div className="flex flex-col">
        <div className="py-10">
          <span className="font-bold text-3xl">Checkout</span>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}

        <div className="flex w-full gap-8">
          {/* Left Column — Items + Shipping Address */}
          <div className="w-7/10">
            {/* Order Items */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Package className="size-5" />
                <h2 className="font-semibold text-lg">
                  Order Items ({checkoutItems.length})
                </h2>
              </div>
              <div className="flex flex-col gap-3">
                {checkoutItems.map((item) => (
                  <div
                    key={item.productId._id}
                    className="flex gap-4 border border-neutral-200 rounded-2xl p-4"
                  >
                    <img
                      src={item.productId.image}
                      alt={item.productId.title}
                      className="size-20 object-cover rounded-xl"
                    />
                    <div className="flex flex-col justify-between flex-1">
                      <div className="flex justify-between">
                        <div>
                          <div className="font-semibold">
                            {item.productId.title}
                          </div>
                          <div className="text-sm text-neutral-600 uppercase font-light">
                            {item.productId.category}
                          </div>
                        </div>
                        <div className="font-bold">
                          Rs.{item.productId.price * item.quantity}
                        </div>
                      </div>
                      <div className="text-sm text-neutral-500">
                        Qty: {item.quantity} × Rs.{item.productId.price}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address Form */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="size-5" />
                <h2 className="font-semibold text-lg">Shipping Address</h2>
              </div>
              <div className="border border-neutral-200 rounded-2xl p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-neutral-700">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={address.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-neutral-700">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={address.phone}
                      onChange={handleChange}
                      placeholder="98XXXXXXXX"
                      className="border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-neutral-700">
                      Region
                    </label>
                    <input
                      type="text"
                      name="region"
                      value={address.region}
                      onChange={handleChange}
                      placeholder="Province 3"
                      className="border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-neutral-700">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={address.city}
                      onChange={handleChange}
                      placeholder="Kathmandu"
                      className="border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-neutral-700">
                      Area
                    </label>
                    <input
                      type="text"
                      name="area"
                      value={address.area}
                      onChange={handleChange}
                      placeholder="Thamel"
                      className="border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-neutral-700">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={address.address}
                      onChange={handleChange}
                      placeholder="Street name, House no."
                      className="border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Wallet className="size-5" />
                <h2 className="font-semibold text-lg">Payment Method</h2>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {/* Cash on Delivery option */}
                <div
                  onClick={() => setPaymentMethod("COD")}
                  className={`border rounded-2xl p-4 cursor-pointer flex items-center gap-3 transition-all ${paymentMethod === "COD"
                    ? "border-black bg-neutral-50  border-2"
                    : "border-neutral-200 hover:border-neutral-400"
                    }`}
                >
                  <CreditCard className="size-6 text-black" />
                  <div>
                    <p className="font-semibold text-sm">Cash on Delivery</p>
                    <p className="text-xs text-neutral-500">Pay on delivery</p>
                  </div>
                </div>

                {/* eSewa Option */}
                <div
                  onClick={() => setPaymentMethod("eSewa")}
                  className={`border rounded-2xl p-4 cursor-pointer flex items-center justify-between transition-all ${paymentMethod === "eSewa"
                    ? "border-green-600 border-2 bg-green-50/50 "
                    : "border-neutral-200 hover:border-neutral-400"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <img src="esewa.png" alt="esewa" className="h-6" />
                    <div>
                      <p className="font-semibold text-sm text-green-700">eSewa</p>
                      <p className="text-xs text-neutral-500">eSewa wallet</p>
                    </div>
                  </div>
                </div>

                {/* Khalti Option */}
                <div
                  onClick={() => setPaymentMethod("Khalti")}
                  className={`border rounded-2xl p-4 cursor-pointer flex items-center justify-between transition-all ${paymentMethod === "Khalti"
                    ? "border-purple-600 border-2 bg-purple-50/50 "
                    : "border-neutral-200 hover:border-neutral-400"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <img src="khalti.png" alt="khalti" className="h-6" />

                    <div>
                      <p className="font-semibold text-sm text-purple-700">Khalti</p>
                      <p className="text-xs text-neutral-500">Khalti wallet</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column — Order Summary */}
          <div className="w-3/10 bg-neutral-50 p-8 rounded-2xl h-fit sticky top-8">
            <span className="font-semibold text-2xl pb-4">Order Summary</span>
            <div className="mt-6 flex flex-col gap-2 border-b border-neutral-200 pb-6">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">
                  Items ({checkoutItems.length})
                </span>
                <span className="text-black font-semibold">Rs.{subTotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Tax (13%)</span>
                <span className="text-black font-semibold">Rs.{tax}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Shipping</span>
                <span className="text-green-600 font-semibold">Free</span>
              </div>
            </div>
            <div className="flex justify-between text-black text-lg font-semibold pt-6">
              <span>Total</span>
              <span className="font-semibold">Rs.{total}</span>
            </div>
            <button
              onClick={handlePlaceOrder}
              disabled={placing}
              className={`bg-black hover:bg-neutral-800 text-white w-full mt-6 flex items-center justify-center py-3 px-4 cursor-pointer transition-colors ${placing ? "opacity-70 cursor-not-allowed" : ""
                }`}
            >
              {placing ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="size-4 animate-spin" />
                  Processing...
                </span>
              ) : paymentMethod === "eSewa" ? (
                "Pay with eSewa"
              ) : paymentMethod === "Khalti" ? (
                "Pay with Khalti"
              ) : (
                "Place Order"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}