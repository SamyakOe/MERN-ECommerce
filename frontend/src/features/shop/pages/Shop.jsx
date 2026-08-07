import CategoryFilter from "../../../components/CategoryFilter";
import ProductsList from "../../../components/ProductsList";
import Loading from "../../../components/Loading";

import { useState, useEffect } from "react";
import api from "../../../api/axios";
import SearchBar from "../../../components/SearchBar";

function Shop() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadProducts = async () => {
      const response = await api.get(
        `/products/?search=${search}&category=${category}`,
      );

      setProducts(response.data);
      setLoading(false);
    };
    loadProducts();
  }, [search, category]);

  return (
    <div>
      <div className="bg-black px-8 py-14 flex flex-col items-start gap-4">
        <span className="text-white text-5xl font-bold">All Products</span>
        <span className="text-white text-base">
          Discover the latest trends in fashion
        </span>
        <div className="w-md">

          <SearchBar search={search} setSearch={setSearch} dark={true} item="Products" />
        </div>
      </div>

      <CategoryFilter category={category} setCategory={setCategory} />
      {loading ? (  
        <Loading />
      ) : (
        <ProductsList products={products} />
      )}
    </div>
  );
}

export default Shop;
