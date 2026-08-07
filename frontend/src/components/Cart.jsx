import { ShoppingCart, Loader2 } from "lucide-react";

function Cart({ cartCount, loading }) {
  return (
    <div className="relative">
      <ShoppingCart className="hover:text-gray-600 cursor-pointer" />

      <div className="absolute -top-3 -right-2 text-white bg-black rounded-full size-5 flex items-center justify-center text-sm">
        {loading ? <Loader2 className="size-3 animate-spin text-white" /> : cartCount}
      </div>

    </div>
  );
}

export default Cart;
