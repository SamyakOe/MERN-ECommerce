import { useState, useEffect } from "react";
import api from "../../../api/axios";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import CheckBox from "../../../components/CheckBox";
import Loading from "../../../components/Loading";

function CartPage() {
  const [cart, setCart] = useState({ items: [] });
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const allSelected = cart.items.length > 0 && selectedItems.length === cart.items.length;
  const subTotal = cart.items
    .filter((item) => selectedItems.includes(item.productId._id))
    .reduce((total, item) => total + item.productId.price * item.quantity, 0);

  const tax = subTotal * 0.13;
  const total = subTotal + tax;

  const toggleSelect = (id) => {
    setSelectedItems((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id])
  }
  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cart.items.map((item) => item.productId._id));
    }
  }

  //Load Cart Items
  const loadCart = async () => {
    try {
      const response = await api.get("/cart");
      setCart(response.data);
      setLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setCart({ items: [] });
        setLoading(false);
      } else {
        console.error("Error loading cart:", error);
      }
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  //Remove Item from cart
  const removeItem = async (productId) => {
    try {
      await api.post("/cart/remove", { productId });
      loadCart();
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity === 0) {
      await removeItem(productId);
      return;
    }
    try {

      await api.post("/cart/update", { productId, quantity });
      setCart(prev => ({
        ...prev,
        items: prev.items.map(item =>
          item.productId._id === productId
            ? { ...item, quantity }
            : item
        )
      }));
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };
  if (loading) {
    return <Loading />
  }
  return (
    <div className="px-8 ">
      {cart.items.length > 0 && (
        <div className="flex flex-col ">
          <span className="font-bold text-3xl py-10">Shopping Cart</span>
          <div className="flex w-full gap-6">
            <div className="w-7/10">
              <div
                className={`flex  items-center mb-4 gap-4 w-full  border border-neutral-200 rounded-2xl p-4  `}
              >
                <CheckBox checked={allSelected} onChange={() => toggleSelectAll()} />
                <span className="font-semibold text-sm">{allSelected ? "Deselect All" : "Select All"}</span>
              </div>
              {cart.items.map((item) => {
                const isSelected = selectedItems.includes(item.productId._id);
                return (

                  <div
                    key={item.productId._id}
                    className={`flex mb-4 gap-4 w-full pr-4 pb-6 border rounded-2xl p-4  ${isSelected ? "border-black" : "border-neutral-200"}`}
                  >
                    <CheckBox checked={isSelected} onChange={() => toggleSelect(item.productId._id)} />
                    <img
                      src={item.productId.image}
                      alt={item.productId.title}
                      className="size-30 object-cover overflow-hidden rounded-2xl"
                    />
                    <div className="flex flex-col w-full justify-between ">
                      <div className="flex gap-2 flex-col">
                        <div className="flex justify-between ">
                          <div className="  font-semibold">
                            {item.productId.title}
                          </div>
                          <div className="font-bold">
                            Rs.{item.productId.price * item.quantity}
                          </div>
                        </div>
                        <div className="text-sm text-neutral-600 uppercase font-light">
                          {item.productId.category}
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div className="flex gap-8 items-center">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.productId._id,
                                item.quantity - 1,
                              )
                            }
                            className="size-8 flex items-center justify-center border-2 border-neutral-300 hover:bg-neutral-100 transition-colors cursor-pointer"
                          >
                            <Minus className="size-4" />
                          </button>
                          {item.quantity}
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.productId._id,
                                item.quantity + 1,
                              )
                            }
                            className="size-8 flex items-center justify-center border-2 border-neutral-300 hover:bg-neutral-100 transition-colors cursor-pointer"
                          >
                            <Plus className="size-4" />
                          </button>
                        </div>
                        <div
                          onClick={() => removeItem(item.productId._id)}
                          className="rounded-lg hover:bg-red-50 hover:text-red-600 p-2 cursor-pointer"
                        >
                          <Trash2 className="size-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="w-3/10 bg-neutral-50 p-8">
              <span className="font-semibold text-2xl pb-4">Order Summary</span>
              <div className="mt-6 flex flex-col gap-2 border-b border-neutral-200 pb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Subtotal</span>
                  <span className="text-black font-semibold">
                    Rs.
                    {subTotal}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Tax</span>
                  <span className="text-black font-semibold">
                    Rs.
                    {tax}
                  </span>
                </div>
              </div>
              <div className="flex justify-between text-black text-lg font-semibold pt-6">
                <span className="">Total</span>
                <span className=" font-semibold">
                  Rs.
                  {total}
                </span>
              </div>
              <button
                onClick={() => {
                  if (selectedItems.length > 0) {
                    navigate("/checkout", { state: { selectedItems } });
                  }
                }}
                className={`bg-black hover:bg-neutral-800 text-white w-full mt-6 flex items-center justify-center py-2 px-4  ${selectedItems.length > 0 ? "cursor-pointer" : "opacity-50 cursor-not-allowed"}`}
              >
                {selectedItems.length > 0 ? "Checkout" : "Select Items to Checkout"}
              </button>
            </div>
          </div>
        </div>
      )}
      {cart.items.length == 0 && (
        <div className="flex flex-col items-center w-full gap-2 h-[calc(100vh-4.5rem)] justify-center">
          <ShoppingBag className="size-18 text-neutral-200 mb-2" />
          <h2 className="text-3xl mb-2 font-bold">Your cart is empty</h2>
          <p className="text-neutral-600 mb-8">
            Start shopping and add some fresh drops
          </p>
          <Link
            to="/shop"
            className="inline-block bg-black text-white px-8 py-4 hover:bg-neutral-800 transition-colors font-medium"
          >
            Shop Now
          </Link>
        </div>
      )}
    </div>
  );
}

export default CartPage;
