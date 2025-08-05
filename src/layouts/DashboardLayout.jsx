import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => (
  <div className="flex min-h-screen bg-primary-100 bg-img">
    <Sidebar />
    <div className="flex-1 p-6">
      <TopBar />
      <Outlet />
    </div>
  </div>
);


export default DashboardLayout;