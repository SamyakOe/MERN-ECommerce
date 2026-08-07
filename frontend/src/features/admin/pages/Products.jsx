import TitleBar from "../components/TitleBar";
import Modal from "../components/Modal";
import { Plus } from "lucide-react";
import ProductList from "../components/ProductList";
import { useEffect, useCallback, useState } from "react";
import api from "../../../api/axios";
import SearchBar from "../../../components/SearchBar";
import { useProductContext } from "../../../context/ProductContext";

function Products() {
  const [model, setModel] = useState({
    open: false,
    product: null,
  });
  const { products, dispatch } = useProductContext();
  const [search, setSearch] = useState('');

  const loadProducts = useCallback(async () => {
    const response = await api.get("/products/");
    dispatch({ type: 'SET_PRODUCTS', payload: response.data });
  }, [dispatch]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <div className="w-full flex-1 h-full bg-neutral-50">
      <TitleBar title="Products" />
      <div className="py-6 px-5 flex flex-col gap-4">
        <div className="flex justify-between">
          <span className="font-bold text-2xl  ">Products</span>
          <button
            onClick={() => setModel({ open: true, product: null })}
            className="flex bg-neutral-800 hover:bg-neutral-700 cursor-pointer text-white rounded-xl px-4 py-2 text-sm items-center gap-2 font-medium">
            <Plus className="size-4" />
            Add Product
          </button>
        </div>
        <SearchBar setSearch={setSearch} search={search} dark={false} item="Products"/>
        <ProductList setModel={setModel} products={products} search={search} />
      </div>
      {model.open && (
        <Modal product={model.product} setModel={() => setModel({ open: false, product: null })} />
      )}
    </div>
  );
}

export default Products;
