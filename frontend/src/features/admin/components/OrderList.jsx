import api from "../../../api/axios.js";
import { useState, useEffect } from "react";
import NoItemFound from "./NoItemFound";
import { format } from "date-fns";
import renderStatus from "../../../utils/renderStatus.jsx";

function OrderList({ setModel, orders, search }) {
  const [filteredOrders, setFilteredOrders] = useState(orders);
  useEffect(() => {
    setFilteredOrders(
      orders.filter((item) => {
        return search.toLowerCase() === "" ? item : item.userId.name.toLowerCase().includes(search.toLowerCase())
      })
    )
  }, [search, orders])
  
  const handleStatusChange = async (orderId, newstatus) => {
    await api.patch(`/orders/${orderId}/status`, { status: newstatus })
  }
  const onStatusChange = (orderId, newStatus) => {
    handleStatusChange(orderId, newStatus);
    setFilteredOrders((prev) =>
      prev.map((o) =>
        o._id === orderId ? { ...o, status: newStatus } : o
      )
    );

  }
  return (
    <div className="bg-white border border-neutral-200 rounded-xl">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b  w-full border-neutral-100 text-sm font-light text-neutral-500 uppercase text-left">
            <th className="py-4 px-6 ">
              Order ID
            </th>
            <th className="py-4 px-6">
              Customer
            </th>
            <th className="py-4 px-6 ">
              Date
            </th>
            <th className="py-4 px-6 ">
              Items
            </th>
            <th className="py-4 px-6 ">
              Total
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
          {filteredOrders.length === 0 && (
            <tr>
              <td colSpan={7}>
                <NoItemFound item="order" />
              </td>
            </tr>
          )}
          {filteredOrders.map((order) => (
            <tr
              key={order._id}
              className="border-b border-neutral-100 text-neutral-800 text-left "
            >
              <td className="py-4 px-6 text-sm font-semibold capitalize ">
                #{order.orderId || order._id.slice(-6).toUpperCase()}
              </td>
              <td className="py-4 px-6 text-sm font-semibold ">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-neutral-100 text-neutral-700 flex items-center justify-center font-bold uppercase size-10">
                    {order.userId.name.charAt(0)}{order.userId.name.split(' ').pop().charAt(0)}
                    </div>
                  <div className="flex flex-col text-sm">
                    <span className="font-medium">{order.userId.name}</span>
                    <span className="text-neutral-400 line-clamp-1 text-xs font-normal">
                      {order.userId.email}
                    </span>
                  </div>
                </div>
              </td>
              <td className="py-4 px-6 text-sm text-neutral-600  ">
                {format(new Date(order.createdAt), 'MMM d, yyyy')}
              </td>
              <td className="py-4 px-6 text-sm text-neutral-600  ">
                {order.items.length}
              </td>

              <td className="py-4 px-6 text-sm font-semibold ">
                Rs. {order.totalPrice}
              </td>

              <td className="py-4 px-6 text-sm font-semibold ">
                {
                  renderStatus(order.status)
                }
              </td>
              <td className="py-4 px-6 text-sm font-semibold   ">

                <select className="border text-black self-center border-neutral-200 rounded-lg p-2 text-xs font-medium" name="status"
                  value={order.status}
                  onChange={(e) => onStatusChange(order._id, e.target.value)}>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderList;
