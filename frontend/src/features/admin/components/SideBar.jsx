import { LayoutDashboard, Package, UsersRound, ShoppingBag } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function SideBar() {
  const location = useLocation();
  const [page, setPage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const currentPath = location.pathname.split("/").pop();
    setPage(currentPath || "dashboard");
  }, [location.pathname]);
  const onClickNav = (id) => {
    setPage(id);
    navigate(id);
  };
  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="size-4" />,
    },
    {
      id: "products",
      label: "Products",
      icon: <Package className="size-4" />,
    },
    {
      id: "customers",
      label: "Customers",
      icon: <UsersRound className="size-4" />,
    },
    {
      id: "orders",
      label: "Orders",
      icon: <ShoppingBag  className="size-4" />,
    },
  ];
  return (
    <div className=" h-screen bg-white flex flex-col border-2 border-r border-neutral-200 shrink-0 w-3xs shadow-lg ">
      <div className="border-b  border-neutral-200 px-4 py-6 flex flex-col justify-center gap-1">
        <span className="text-xl font-bold cursor-pointer" onClick={()=>navigate("/")}>LOGO</span>
        <span className="text-neutral-400 text-xs ">Admin Panel</span>
      </div>
      <div className="px-4 py-6 flex flex-col justify-center gap-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={()=>onClickNav(item.id)}
            className={`flex items-center gap-3  text-sm font-medium rounded-2xl py-3 px-4  cursor-pointer
                ${page == item.id ? "bg-black text-white hover:bg-neutral-800" : "text-neutral-600 hover:bg-neutral-100"}`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SideBar;
