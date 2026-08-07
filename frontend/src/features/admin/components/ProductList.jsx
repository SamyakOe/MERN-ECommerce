import api from "../../../api/axios";
import { Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import NoItemFound from "./NoItemFound";
import { useProductContext } from "../../../context/ProductContext";

function ProductList({ setModel, products, search }) {
  const { dispatch } = useProductContext();
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    setFilteredProducts(
      products.filter((item) => {
        return search.toLowerCase() === "" ? item : item.title.toLowerCase().includes(search.toLowerCase())
      })
    )
  }, [search, products])


  const deleteProduct = async (id) => {
    if (confirm("Do you want to delete this product?")) {
      try {
        await api.delete(`/products/delete/${id}`);
        dispatch({ type: 'DELETE_PRODUCT', payload: id });
        toast.success("Product deleted Successfully");
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.error("Failed to delete product");
      }
    }
  };
  return (
    <div className="bg-white border border-neutral-200 rounded-xl">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b  w-full border-neutral-100 text-sm font-semibold text-neutral-500 uppercase text-left">
            <th className="py-4 px-6 ">
              Title
            </th>
            <th className="py-4 px-6">
              Category
            </th>
            <th className="py-4 px-6">
              Price
            </th>
            <th className="py-4 px-6 ">
              Stock
            </th>
            <th className="py-4 px-6 ">
              Status
            </th>
            <th className="py-4 px-6">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length === 0 && (
            <tr>
              <td colSpan={6}>
                <NoItemFound item="Product" />
              </td>
            </tr>
          )}
          {filteredProducts.map((product) => (
            <tr
              key={product._id}
              className="border-b border-neutral-100 text-neutral-800 text-left "
            >
              <td className="py-4 px-6 text-sm font-semibold ">
                <div className="flex items-center gap-2">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="size-10  object-cover rounded-xl shrink-0"
                  />
                  <div className="flex flex-col text-sm">
                    <span className="font-medium">{product.title}</span>
                    <span className="text-neutral-400 line-clamp-1 text-xs font-normal">
                      {product.description}
                    </span>
                  </div>
                </div>
              </td>
              <td className="py-4 px-6 text-sm font-semibold  ">
                <span className="capitalize rounded-full font-medium bg-neutral-100 py-1 px-2 text-neutral-700">
                  {product.category}
                </span>
              </td>
              <td className="py-4 px-6 text-sm font-semibold ">
                Rs. {product.price}
              </td>
              <td className="py-4 px-6 text-sm font-semibold ">
                {product.stock}
              </td>
              <td className="py-4 px-6 text-sm font-semibold ">
                {product.stock == 0 ? (
                  <div className="rounded-lg flex items-center justify-center gap-2 border py-1 px-2 border-red-200 bg-red-50 text-red-600 font-medium text-xs">
                    <div className="rounded-full bg-red-500 animate-pulse size-2 shrink-0"></div>Out of Stock
                  </div>
                ) : product.stock < 10 ? (
                  <div className="rounded-lg flex items-center justify-center gap-2 border py-1 px-2 border-amber-200 bg-amber-50 text-amber-700 font-medium text-xs"><div className="rounded-full bg-amber-500 animate-pulse size-2 shrink-0"></div>Limited</div>
                ) : (
                  <div className="rounded-lg flex items-center justify-center gap-2 border py-1 px-2 border-green-200 bg-green-50 text-green-700 font-medium text-xs"><div className="rounded-full bg-green-500 animate-pulse size-2 shrink-0"></div>In Stock</div>
                )}
              </td>
              <td className="py-4 px-6 text-sm font-semibold  flex w-full justify-around text-neutral-400">
                <div
                  onClick={() =>
                    setModel({
                      open: true,
                      product: { ...product },
                    })
                  }
                  className="rounded-lg hover:bg-neutral-100 hover:text-black p-2 cursor-pointer"
                >
                  <Pencil className="size-4" />
                </div>
                <div
                  onClick={() => deleteProduct(product._id)}
                  className="rounded-lg hover:bg-red-50 hover:text-red-600 p-2 cursor-pointer"
                >
                  <Trash2 className="size-4" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
