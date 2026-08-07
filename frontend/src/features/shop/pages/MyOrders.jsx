import { useState, useCallback } from "react";
import api from "../../../api/axios";
import { useEffect } from "react";
import OrdersAccordion from "../../../components/OrdersAccordian";
import Loading from "../../../components/Loading";
import SearchBar from "../../../components/SearchBar";

export default function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [search, setSearch] = useState('')
    const loadOrders = useCallback(async () => {
        const response = await api.get("/orders/my");
        setOrders(response.data);
    }, []);
    useEffect(() => {
        loadOrders();
    }, [loadOrders]);

    useEffect(() => {
        setFilteredOrders(
            orders.filter((item) => {
                return search.toLowerCase() === "" ? item : item.orderId.toLowerCase().includes(search.toLowerCase())
            })
        )
    }, [search, orders])

    return (
        <div className="px-8 py-4 h-full">
            <span className="font-bold text-3xl py-10 mb-4">My Orders</span>
            <SearchBar setSearch={setSearch} search={search} dark={false} item="by Order ID" />

            {filteredOrders.length === 0 && <Loading />}
            {filteredOrders.map((order) => (
                <OrdersAccordion key={order._id} order={order} />
            ))}
        </div>
    )
}