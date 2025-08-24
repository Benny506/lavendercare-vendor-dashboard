import { Icon } from '@iconify/react';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useNavigate, NavLink } from 'react-router-dom';
import Image from './ui/image';
import { SidebarItems } from '@/constants/constant';
import { X } from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const Navigate = useNavigate();
  return (
    <aside className={`fixed h-full md:h-max lg:h-screen max-w-max flex flex-col bg-white border-r border-[#E9E9E9] justify-between mt-0.5 transform transition-transform duration-300 z-50 ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static`}>
      <div className=''>
        {/* Logo */}
        <div className="flex items-center gap-2 px-8 pt-8 pb-6 cursor-pointer" onClick={() => Navigate('/')}>
          <Image src="assets/lavendercare-logo.svg" alt="LavenderCare Logo" className="w-50" />
          <X size={30} onClick={() => { setIsOpen(false) }} className='block lg:hidden' />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 px-8">
          {SidebarItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 py-3 px-4 rounded-lg cursor-pointer transition-colors  ${isActive
                  ? "bg-primary-500 text-grey-50"
                  : "bg-transparent text-primary-900 hover:bg-[#F3F0FA]"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <span className="w-6 h-6 flex items-center justify-center">
                <Icon
                  icon={item.icon}
                  width="24"
                  height="24"
                  className={({ isActive }) =>
                    isActive ? "text-grey-50" : "text-primary-900"
                  }
                />
              </span>
              <span className="font-medium text-md">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Settings & Support */}
        <div className="mt-10 flex flex-col gap-2 px-8">
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center gap-4 py-3 px-4 rounded-lg cursor-pointer ${isActive
                ? "bg-primary-500 text-grey-50"
                : "bg-transparent text-primary-900 hover:bg-[#F3F0FA]"
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            <span className="w-6 h-6 flex items-center justify-center">
              <Icon
                icon="material-symbols:settings-outline-rounded"
                width="24"
                height="24"
                className={({ isActive }) =>
                  isActive ? "text-grey-50" : "text-primary-900"
                }
              />
            </span>
            <span className="font-medium text-md">Settings</span>
          </NavLink>
          <div className="flex items-center gap-4 py-3 px-4 rounded-lg cursor-pointer text-[#2D1A4A] hover:bg-[#F3F0FA]">
            <span className="w-6 h-6 flex items-center justify-center">
              <Icon icon="material-symbols-light:support-agent-outline-rounded" width="24" height="24" style={{ color: "#000000" }} />
            </span>
            <span className="font-medium text-md">Contact support</span>
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="px-6 py-5 pb-15 flex items-center gap-4 border-t border-[#E9E9E9]">
        <Avatar>
          <AvatarImage src="/assets/Avatar.svg" />
          {/* <AvatarFallback>CN</AvatarFallback> */}
        </Avatar>
        <div className="flex-1">
          <div className="font-bold text-md text-[#2D1A4A]">Jane Doe</div>
          <div className="text-[#7B3FE4] text-sm">johndoe@cloudax.com</div>
        </div>
        <button className="cursor-pointer">
          <Icon icon="solar:logout-outline" width="24" height="24" style={{ color: "red" }} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;