import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Icon } from "@iconify/react";
import { Menu, X } from "lucide-react";
import DeleteMessage from "./DeleteMessage";

const Inbox = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [Sidebar, setSidebar] = useState(false);
    const [messages] = useState([
        {
            sender: "self",
            text: "Hi, how can i get bigger arms? Give me muscles",
            time: "10:00 AM",
            date: "yesterday",
        },
        {
            sender: "other",
            text: "Hello, Prince. Getting bigger arms would require having a workout routine that targets your biceps and triceps. Would you like to create a workout routine to this effect?",
            time: "10:00 AM",
            date: "today",
        },
    ]);

    return (
        <div className="flex lg:h-screen">
            {/* Sidebar */}
            <div
                className={`
          fixed top-0 left-0 h-full w-xs md:w-md 
          bg-grey-50 lg:bg-transparent border-r border-primary-100
          flex flex-col gap-4 px-3 py-6 z-50
          transform transition-transform duration-300
          ${Sidebar ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:flex
        `}
            >
                {/* Close btn on mobile */}
                <div className="lg:hidden flex justify-end mb-3">
                    <X
                        size={30}
                        onClick={() => setSidebar(false)}
                        className="cursor-pointer"
                    />
                </div>

                {/* Search bar */}
                <div className="max-w-[400px]">
                    <Input
                        className="bg-grey-50 border-grey-300 py-3 rounded-xl w-full"
                        placeholder="Search"
                    />
                </div>

                {/* Chat list */}
                {Array.from({ length: 3 }).map((_, i) => (
                    <div
                        key={i}
                        className="flex flex-col md:flex-row gap-2 border-b border-grey-200 pb-4 p-2 w-full cursor-pointer"
                    >
                        <Avatar className="border-primary-400 border-2 rounded-full h-12 w-12">
                            <AvatarImage src="/assets/avatar-2.svg" alt="User avatar" />
                        </Avatar>
                        <div className="flex flex-col flex-1">
                            <p className="text-grey-800 font-medium">Lavendare care</p>
                            <p className="text-grey-500 text-sm truncate">
                                Jane Doe: Women are awesome and ...
                            </p>
                        </div>
                        <div className="flex md:flex-col flex-row items-end gap-1">
                            <p className="text-[13px]">4:00 AM</p>
                            <div className="flex gap-1.5 items-center">
                                <Icon
                                    icon="mi:notification-off"
                                    width="20"
                                    height="20"
                                    className="text-grey-500"
                                />
                                <span className="rounded-full bg-primary-100 text-primary-500 px-2 text-sm">
                                    2
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Chat section */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="bg-primary-50 flex items-center justify-between p-4 border-b border-grey-200">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebar(true)}
                            className="lg:hidden cursor-pointer"
                        >
                            <Menu size={24} />
                        </button>
                        <Avatar className="rounded-full h-12 w-12">
                            <AvatarImage src="/assets/avatar-2.svg" alt="User avatar" />
                        </Avatar>
                        <div>
                            <p className="text-grey-800 text-xl font-bold">Jane Doe</p>
                            <span className="text-primary-500 italic">Typing...</span>
                        </div>
                    </div>

                    {/* 3-dot menu */}
                    <div className="relative">
                        <Icon
                            icon="qlementine-icons:menu-dots-16"
                            width="20"
                            height="20"
                            className="cursor-pointer"
                            onClick={() => setShowMenu((prev) => !prev)}
                        />
                        {showMenu && (
                            <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg border border-grey-200 w-40 z-50">
                                <ul className="flex flex-col">
                                    <li className="px-4 py-2 hover:bg-grey-100 cursor-pointer">
                                        View info
                                    </li>
                                    <li className="px-4 py-2 hover:bg-grey-100 cursor-pointer">
                                        Mute Notification
                                    </li>
                                    <li className="px-4 py-2 hover:bg-grey-100 cursor-pointer">
                                        Pin Chat
                                    </li>
                                    <li className="px-4 py-2 hover:bg-red-100 text-red-600 cursor-pointer">
                                        Delete chat
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                {/* Chat body */}
                <div className="flex-1 p-6 flex flex-col gap-4 overflow-y-auto">
                    {messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-grey-400">
                            <Icon
                                icon="mdi:message-text-outline"
                                width="48"
                                height="48"
                                className="text-primary-700"
                            />
                            <p className="mt-2 text-lg font-bold text-grey-600">
                                No messages to display
                            </p>
                            <p className="text-sm text-grey-500">
                                Messages from LavenderCare users will appear here
                            </p>
                        </div>
                    ) : (
                        <>
                            <p className="text-center text-grey-400 text-sm">Yesterday</p>
                            <div className="self-end bg-grey-200 text-grey-800 px-4 py-2 rounded-xl max-w-xs">
                                Hi, how can i get bigger arms? Give me muscles
                                <span className="block text-right text-xs text-grey-500 mt-1">
                                    10:00 AM ✔
                                </span>
                            </div>

                            <p className="text-center text-grey-400 text-sm">Today</p>
                            <div className="self-start">
                                <p className="bg-secondary-500 text-grey-50 px-4 py-2 rounded-xl max-w-sm">
                                    Hello, Prince. Getting bigger arms would require having a workout routine that targets your biceps and triceps. Would you like to create a workout routine to this effect?
                                    <span className="block text-right text-xs text-grey-100 mt-1">
                                        10:00 AM
                                    </span>
                                </p>
                            </div>
                        </>
                    )}
                </div>

                {/* Input bar */}
                <div className="flex items-center gap-2 p-3 border-t border-grey-200">
                    <div className="relative flex-1">
                        <Input
                            className="bg-grey-50 rounded pl-10 pr-20 py-6"
                            placeholder="Type a message"
                        />
                        <Icon
                            icon="fluent:emoji-16-regular"
                            width="22"
                            height="22"
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-grey-500 cursor-pointer"
                        />
                        <Icon
                            icon="mdi:paperclip"
                            width="22"
                            height="22"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-grey-500 cursor-pointer"
                        />
                    </div>
                    <div className="bg-primary-500 rounded-full text-grey-50 p-2 cursor-pointer w-10 h-10 flex items-center justify-center">
                        <Icon icon="material-symbols:mic-outline" width="22" height="22" />
                    </div>
                </div>
            </div>
            {/* Delete modal  */}
            {/* <DeleteMessage /> */}
        </div>
    );
};

export default Inbox;
