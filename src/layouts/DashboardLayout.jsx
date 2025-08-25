import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="flex min-h-screen bg-primary-100 bg-img">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="flex-1 p-6">
        <TopBar setIsOpen={setIsOpen} />
        <Outlet/>
      </div>
    </div>
  );
}

export default DashboardLayout;