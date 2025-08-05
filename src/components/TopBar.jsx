import { Icon } from "@iconify/react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import { useState } from "react";

const TopBar = () => {
    const [selectedOption, setSelectedOption] = useState("lifetime");
    return (
        <header className="w-full px-6 py-2 flex items-center justify-between border-b-[1.5px] border-primary-100 pb-5">
            {/* Left: Page Title */}
            <h1 className="text-2xl font-bold text-[#000000]">Overview</h1>

            {/* Right: Search + Notification + Avatar */}
            <div className="flex items-center gap-4">
                {/* Search Bar */}
                <Select value={selectedOption} onValueChange={setSelectedOption}>
                    <SelectTrigger className="w-[140px] bg-grey-50 border border-grey-200 rounded-none py-5 font-extrabold text-md">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="lifetime">Lifetime</SelectItem>
                            <SelectItem value="A">A</SelectItem>
                            <SelectItem value="B">B</SelectItem>
                            <SelectItem value="C">C</SelectItem>
                            <SelectItem value="D">D</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>


                {/* Notification Icon with Badge */}
                <div className="relative cursor-pointer">
                    <div className="p-2 rounded-sm border border-grey-200">
                        <Icon icon="mdi:notifications-none" width="24" height="24" className="text-primary-500"/>
                    </div>
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full">
                        1
                    </span>
                </div>
            </div>
        </header>
    );
};

export default TopBar;
