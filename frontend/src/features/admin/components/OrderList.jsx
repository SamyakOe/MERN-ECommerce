import api from "../../../api/axios.js";
import { useState, useEffect } from "react";
import NoItemFound from "./NoItemFound";
import { format } from "date-fns";
import renderStatus from "../../../utils/renderStatus.jsx";
import SortableTableHeader from "../../../components/SortableTableHeader.jsx";
import useSortTable from "../hooks/useSortTable.js";

function OrderList({ setModel, orders, search }) {
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const { sortConfig, handleSort, sortedData } = useSortTable(filteredOrders);


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
    <div className="bg-white border border-neutral-200 rounded-xl ">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b   border-neutral-100 text-xs font-light text-neutral-500 uppercase text-left">
            <SortableTableHeader label="Order ID" sortKey="orderId" sortConfig={sortConfig} onSort={handleSort} />
            <SortableTableHeader label="Customer" sortKey="userId.name" sortConfig={sortConfig} onSort={handleSort} />
            <SortableTableHeader label="Date" sortKey="createdAt" sortConfig={sortConfig} onSort={handleSort} />
            <SortableTableHeader label="Items" sortKey="items.length" sortConfig={sortConfig} onSort={handleSort} />
            <SortableTableHeader label="Total" sortKey="totalPrice" sortConfig={sortConfig} onSort={handleSort} />
            <SortableTableHeader label="Status" sortKey="status" sortConfig={sortConfig} onSort={handleSort} />

            <th className="py-4 px-6">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.length === 0 && (
            <tr>
              <td colSpan={7}>
                <NoItemFound item="order" />
              </td>
            </tr>
          )}
          {sortedData.map((order) => (
            <tr
              key={order._id}
              className="border-b  border-neutral-100 text-neutral-800 text-left "
            >
              <td className="py-4 px-6 text-xs font-semibold capitalize ">
                #{order.orderId || order._id.slice(-6).toUpperCase()}
              </td>
              <td className="py-4 px-6 text-sm font-semibold ">
                <div className="flex items-center gap-2 ">
                  <div className="rounded-full text-xs bg-neutral-100 text-neutral-700 flex items-center justify-center font-bold uppercase size-7">
                    {order.userId.name.charAt(0)}{order.userId.name.split(' ').pop().charAt(0)}
                  </div>
                  <div className="flex flex-col text-xs min-w-0 max-w-30">
                    <span className="font-medium truncate">{order.userId.name}</span>
                    <span className="text-neutral-400 line-clamp-1 text-xs font-normal truncate">
                      {order.userId.email}
                    </span>
                  </div>
                </div>
              </td>
              <td className="py-4 px-6 text-xs text-neutral-600  ">
                {format(new Date(order.createdAt), 'MMM d, yyyy')}
              </td>
              <td className="py-4 px-6 text-xs text-neutral-600  ">
                {order.items.length}
              </td>

              <td className="py-4 px-6 text-xs font-semibold ">
                Rs. {order.totalPrice}
              </td>

              <td className="py-4 px-6 text-xs font-semibold ">
                {
                  renderStatus(order.status)
                }
              </td>
              <td className="py-4 px-6 text-xs font-semibold   ">

                <select className="border text-black self-center border-neutral-200 rounded-lg p-2 text-xs font-medium whitespace-nowrap" name="status"
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
