import { NavLink, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import api from "../../../api/axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Loading from "../../../components/Loading";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const loadProducts = async () => {
    const response = await api.get(`/products/`);
    const item = response.data.find((product) => product._id === id);
    setProduct(item);
    setLoading(false);
  };
  useEffect(() => {
    loadProducts();
  }, []);
  const addToCart = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast("Please log in to add item to the cart");
      return;
    }
    try {
      const res = await api.post("/cart/add", { productId });
      if (res) {
        toast.success("Added to the cart!");
      }
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart.");
    }
  };
  if (loading) {
    return <Loading />
  } 
  return (
    <div className="px-8">
      <div className="py-6">
        <NavLink to="/shop">
          <span className="flex items-center gap-2 text-sm text-gray-500">
            <ArrowLeft />
            Back to Shop
          </span>
        </NavLink>
      </div>

      {product != null ? (
        <div className="grid grid-cols-2 gap-12 mb-10 ">
          <div className="h-150 overflow-hidden">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <span className="text-gray-500 uppercase text-base">
              {product.category}
            </span>
            <span className="text-3xl font-bold">{product.title}</span>
            <span className="text-2xl font-bold">Rs. {product.price}</span>
            <span className="text-base text-gray-500">
              {product.description}
            </span>
            <button
              onClick={() => addToCart(product._id)}
              className="bg-black hover:bg-neutral-800 text-white flex items-center justify-center py-2 px-4 cursor-pointer"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default ProductDetails;
