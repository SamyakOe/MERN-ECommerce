import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import StatCard from "../components/StatCard";
import TitleBar from "../components/TitleBar";
import { format } from "date-fns";
import renderStatus from "../../../utils/renderStatus.jsx";
import { DollarSign, Package, ShoppingBag, UsersRound } from "lucide-react";
import api from "../../../api/axios";

function DashBoard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0,
    totalRevenue: 0,
  })
  const [recentOrders, setRecentOrders] = useState(null)
  const [lowStocks, setLowStocks] = useState(null)
  const loadStats = useCallback(async () => {
    const response = await api.get("/admin/dashboard-stats");
    setStats(response.data);
  }, [])
  const loadRecentOrders = useCallback(async () => {
    const response = await api.get("/admin/recent-orders");
    setRecentOrders(response.data)
  }, [])
  const loadLowStocks = useCallback(async () => {
    const response = await api.get("/admin/low-stocks");
    setLowStocks(response.data)
  }, [])
  useEffect(() => {
    loadStats();
    loadRecentOrders();
    loadLowStocks()
  }, [loadStats, loadRecentOrders, loadLowStocks]);

  return (
    <div className="w-full flex-1 h-full bg-neutral-50">
      <TitleBar title="Dashboard" />
      <div className="px-5 py-6 flex flex-col gap-4">
        <span className="font-bold text-2xl  ">Dashboard</span>
        <div className="flex gap-4 w-full">
          <StatCard
            label="Total Revenue"
            icon={<DollarSign className="size-4" />}
            value={`Rs. ${stats.totalRevenue}`} />
          <StatCard
            label="Total Orders"
            icon={<ShoppingBag className="size-4" />}
            value={stats.totalOrders} />
          <StatCard
            label="Total Products"
            icon={<Package className="size-4" />}
            value={stats.totalProducts} />
          <StatCard
            label="Total Customers"
            icon={<UsersRound className="size-4" />}
            value={stats.totalUsers} />
        </div>
        <div className="flex gap-4">
          <div className="bg-white border border-neutral-200 rounded-2xl p-5 flex flex-col gap-2  w-6/10">
            <div className="border-b border-neutral-100 pb-3 flex justify-between items-center">

              <span className=" font-semibold text-sm">Recent Orders</span>
              <Link to={'/admin/orders'}>
                <div className=" text-xs font-medium rounded-lg hover:bg-neutral-50 border px-3 py-1 border-neutral-300 ">
                  View Orders
                </div>
              </Link>
            </div>

            <div className="space-y-1">
              {recentOrders?.map(order => (
                <div
                  key={order._id}
                  className="border-b flex justify-between py-2 border-neutral-100 text-neutral-800 text-left w-full"
                >
                  <div className="flex items-center flex-1">
                    <div className="text-sm font-semibold flex items-center gap-2">
                      <div className="rounded-full bg-neutral-100 text-neutral-700 flex items-center justify-center shrink-0 font-bold uppercase size-10">
                        {order.userId.name.charAt(0)}{order.userId.name.split(' ').pop().charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium">{order.userId.name}</span>
                        <span className="text-neutral-400 line-clamp-1 text-xs font-normal flex gap-2">
                          <span>#{order.orderId}</span>
                          <span>{format(new Date(order.createdAt), 'MMM d, yyyy')}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-sm font-semibold text-right">
                      {renderStatus(order.status)}
                    </div>
                    <div className="text-sm font-semibold">
                      Rs. {order.totalPrice}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
          <div className="bg-white border border-neutral-200 rounded-2xl p-5 flex flex-col gap-2 w-4/10">
            <div className="border-b border-neutral-100 pb-3 flex items-center justify-between">

            <span className=" font-semibold text-sm">Low Stock</span>
            <Link to={'/admin/products'}>
                <div className=" text-xs font-medium rounded-lg hover:bg-neutral-50 border px-3 py-1 border-neutral-300 ">
                  View Products
                </div>
              </Link>
            </div>
            <div className="space-y-1">
              {lowStocks?.map(stock => (
                <div
                  key={stock._id}
                  className="border-b flex justify-between py-2 border-neutral-100 text-neutral-800 text-left w-full"
                >
                  <div className="flex items-center flex-1">
                    <div className="flex items-center gap-2">
                      <img
                        src={stock.image}
                        alt={stock.title}
                        className="size-10  object-cover rounded-xl shrink-0"
                      />
                      <div className="flex flex-col text-sm">
                        <span className="font-medium">{stock.title}</span>
                        <span className="text-neutral-400 line-clamp-1 text-xs font-normal">
                          {stock.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm font-semibold">
                    {stock.stock === 0 ?
                      (<div className="rounded-lg flex items-center justify-center gap-2 border py-1 px-2 border-red-200 bg-red-50 text-red-600 font-medium text-xs">
                        Out
                      </div>) :
                      (<div className="rounded-lg flex items-center justify-center gap-2 border py-1 px-2 border-amber-200 bg-amber-50 text-amber-600 font-medium text-xs">
                        {stock.stock}
                      </div>)
                    }
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default DashBoard
