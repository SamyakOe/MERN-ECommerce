import { AdminRoute } from "./wrappers.jsx";
import  AdminLayout  from "../layouts/AdminLayout.jsx";
import DashBoard from "../features/admin/pages/DashBoard.jsx";
import Products from "../features/admin/pages/Products.jsx";
import Users from "../features/admin/pages/Users.jsx";
import Orders from "../features/admin/pages/Orders.jsx";

export const adminRoutes ={
    path: "/admin",
    element: <AdminRoute><AdminLayout /></AdminRoute>,
    children: [
      { index: true, element: <DashBoard /> },
      { path: "dashboard", element: <DashBoard /> },
      { path: "products", element: <Products /> },
      { path: "customers", element: <Users /> },
      { path: "orders", element: <Orders /> },
    ],
  }