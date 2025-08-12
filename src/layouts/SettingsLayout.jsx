import { NavLink, Outlet } from "react-router-dom";

const SettingsLayout = () => {
    const tabs = [
        { name: "Business Profile", path: "business-profile" },
        { name: "Bank Accounts", path: "bank-accounts" },
        { name: "Change Password", path: "change-password" },
    ];

    return (
        <div className="w-full mx-auto p-6">
            {/* Tabs */}
            <div className="flex gap-6 border-b border-grey-200 mb-6">
                {tabs.map((tab) => (
                    <NavLink
                        key={tab.path}
                        to={tab.path}
                        className={({ isActive }) =>
                            `p-3 pb-2 font-bold ${isActive
                                ? "text-primary-500 border-b-2 border-primary-500 bg-grey-100"
                                : "text-grey-400"
                            }`
                        }
                    >
                        {tab.name}
                    </NavLink>
                ))}
            </div>

            {/* Content */}
            <Outlet />
        </div>
    );
};

export default SettingsLayout;