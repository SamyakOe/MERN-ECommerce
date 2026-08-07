import TitleBar from "../components/TitleBar";
import Modal from "../components/Modal";
import OrderList from "../components/OrderList";
import { useEffect, useCallback, useState } from "react";
import api from "../../../api/axios";
import SearchBar from "../../../components/SearchBar";

function Orders() {
  const [model, setModel] = useState({
    open: false,
    product: null,
  });
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');

  const loadOrders = useCallback(async () => {
    const response = await api.get("/orders/");
    setOrders(response.data);
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  return (
    <div className="w-full flex-1 h-full bg-neutral-50">
      <TitleBar title="Orders" />
      <div className="py-6 px-5 flex flex-col gap-4">
        <div className="flex justify-between">
          <span className="font-bold text-2xl  ">Orders</span>
        </div>
        <SearchBar setSearch={setSearch} search={search} dark={false} item="by Customer Name or Email"/>
        <OrderList setModel={setModel} orders={orders} search={search} />
      </div>
      {model.open && (
        <Modal product={model.product} setModel={() => setModel({ open: false, product: null })} />
      )}
    </div>
  );
}

export default Orders;
