import { Outlet } from "react-router-dom";
import SideBar from "../features/admin/components/SideBar";

function AdminLayout() {
  return (
    <div className="h-screen flex overflow-hidden">
      <SideBar />
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>  
    </div>
  );
}

export default AdminLayout;
