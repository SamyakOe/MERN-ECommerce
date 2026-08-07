import { X } from "lucide-react";
import api from "../../../api/axios.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useProductContext } from "../../../context/ProductContext.jsx";

function AddProduct({ setModel }) {
  const navigate = useNavigate();
  const { dispatch } = useProductContext();
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
    stock: "",
    featured: false,
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/products/add", formData);
      dispatch({ type: 'CREATE_PRODUCT', payload: response.data.product });
      toast.success("Product added Successfully.");
      setModel();
      navigate("/admin/products");
    } catch (error) {
      console.error("Error adding product: ", error);
      toast.error("Error adding product");
    }
  };
  return (
    <div className="flex flex-col h-full gap-2 justify-between  ">
      <div className="flex  justify-between items-center border-b border-neutral-200 px-6 py-4 shrink-0">
        <span className="font-semibold">Add Product</span>
        <X
          onClick={() => setModel()}
          className="text-neutral-400 size-5 cursor-pointer"
        />
      </div>
      <form id="add-product-form" onSubmit={handleSubmit}
      className="flex-1  overflow-auto px-6 py-4  flex flex-col gap-4 ">

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Product Name</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-neutral-200 rounded-xl py-3 px-4 text-sm focus:border-black focus:outline-none "
            required
          />
        </div>
        <div className="flex  gap-2">
          <div className="flex flex-col gap-2 flex-1">
            <label className="text-sm font-medium">Price (Rs.)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border border-neutral-200 rounded-xl py-3 px-4 text-sm focus:border-black focus:outline-none"
              required
            />
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <label className="text-sm font-medium">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-neutral-200 rounded-xl py-3 px-4 text-sm focus:border-black focus:outline-none"
              required
            >
              <option hidden>Choose one category</option>
              {[
                "Hoodies",
                "Jackets",
                "Footwear",
                "T-Shirts",
                "Bottoms",
                "Accessories",
              ].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex  gap-2">
          <div className="flex flex-col gap-2 flex-1">
            <label className="text-sm font-medium">Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full border border-neutral-200 rounded-xl py-3 px-4 text-sm focus:border-black focus:outline-none"
              required
            />
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <label className="text-sm font-medium">Status</label>
            <label className="flex items-center gap-3 cursor-pointer select-none border border-neutral-200 rounded-xl px-4 py-3 w-full hover:bg-neutral-50 transition-colors">
              <div
                onClick={() =>
                  setFormData((f) => ({ ...f, featured: !f.featured }))
                }
                className={`relative w-9 h-5 rounded-full transition-colors shrink-0 ${formData.featured ? "bg-black" : "bg-neutral-200"}`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 size-4 bg-white rounded-full shadow transition-transform ${formData.featured ? "translate-x-4" : ""}`}
                />
              </div>
              <span className="text-sm text-neutral-700">Featured</span>
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-neutral-200 rounded-xl py-3 px-4 text-sm focus:border-black focus:outline-none h-24"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Image URL</label>
          <input
            name="image"
            type="text"
            onChange={handleChange}
            value={formData.image}
            className="w-full border border-neutral-200 rounded-xl py-3 px-4 text-sm focus:border-black focus:outline-none"
            required
          />
        </div>


      </form>

      <div className="flex gap-4 shrink-0  px-6 py-4  ">
        <button
          className="flex justify-center items-center gap-3  text-sm font-medium rounded-2xl py-3 px-4  cursor-pointer
                text-neutral-600 hover:bg-neutral-100 flex-1 border border-neutral-200 "
          onClick={() => setModel()}
        >
          Cancel
        </button>
        <button
          type="submit"
          form="add-product-form"
          className="flex justify-center  items-center gap-3  text-sm font-medium rounded-2xl py-3 px-4  cursor-pointer
                bg-black text-white hover:bg-neutral-800 flex-1 "
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default AddProduct;
