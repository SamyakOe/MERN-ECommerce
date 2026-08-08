import CategoryFilter from "../../../components/CategoryFilter";
import ProductsList from "../../../components/ProductsList";
import Loading from "../../../components/Loading";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import api from "../../../api/axios";
import SearchBar from "../../../components/SearchBar";
import Pagination from "../../../components/Pagination";

function Shop() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setLoading(true);
    const loadProducts = async () => {
      try {

        const response = await api.get(`/products/`, {
          params: {
            search,
            category,
            limit,
            page,
          },
        });
        setProducts(response.data.products);
        setTotal(response.data.total);
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }

    };
    loadProducts();
  }, [search, category, page, limit]);

  return (
    <div>
      <div className="bg-black px-8 py-14 flex flex-col items-start gap-4">
        <span className="text-white text-5xl font-bold">All Products</span>
        <span className="text-white text-base">
          Discover the latest trends in fashion
        </span>
        <div className="w-md">

          <SearchBar
            search={search}
            setSearch={(value) => {
              setSearch(value);
              setPage(1);
            }}
            dark={true} item="Products" />
        </div>
      </div>

      <CategoryFilter category={category} setCategory={(value) => {
        setCategory(value);
        setPage(1);
      }} />
      {loading ? (
        <Loading />
      ) : (
        <>
          <ProductsList products={products} />
          <Pagination page={page} limit={limit} total={total} setPage={setPage} />
        </>
      )}
    </div>
  );
}

export default Shop;
