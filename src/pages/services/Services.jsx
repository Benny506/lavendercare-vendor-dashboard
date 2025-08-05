import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@iconify/react";
import { services, servicesData } from "@/constants/constant";
import FinishSettingUp from "./FinishSettingUp";

const statusColorMap = {
    active: "bg-green-600 text-green-600",
    pending: "bg-orange-500 text-orange-500",
    rejected: "bg-red-600 text-red-600",
    hidden: "bg-gray-500 text-gray-500",
};

export default function Services() {
    const [filter, setFilter] = useState("all");

    const filteredServices =
        filter === "all"
            ? services
            : services.filter((s) => s.status === filter);

    return (
        <div className="flex flex-col gap-6 p-6 w-full">
            {/* Top Summary Boxes */}
            <div className="grid grid-cols-2">
                <div className=" bg-grey-50 rounded-l-sm p-4 flex flex-col justify-between">
                    <div className=" w-full flex items-start justify-between">
                        <div className="flex items-center gap-2">
                            <Icon icon="weui:setting-outlined" width="24" height="24" className=" text-success-500" />
                            <p className="text-sm text-grey-600">Active Services</p>
                        </div>
                        <Icon icon="material-symbols:info-outline-rounded" width="24" height="24" />
                    </div>
                    {servicesData.active > 0 && servicesData.active ? (
                        <p className="text-lg font-semibold my-5 text-grey-700">{servicesData.active}</p>
                    ) : (
                        <div className="w-3 h-1 my-6 bg-black"></div>
                    )}
                </div>
                <div className="bg-primary-50 rounded-r-sm p-4 flex flex-col justify-between">
                    <div className=" w-full flex items-start justify-between">
                        <div className="flex items-center gap-2">
                            <Icon icon="weui:setting-outlined" width="24" height="24" className=" text-error-500" />
                            <p className="text-sm text-grey-600">Inactive Services</p>
                        </div>
                        <Icon icon="material-symbols:info-outline-rounded" width="24" height="24" />
                    </div>
                    {servicesData.inactive > 0 || servicesData.inactive ? (
                        <p className="text-lg font-semibold my-5 text-grey-700">{servicesData.inactive}</p>
                    ) : (
                        <div className="w-3 h-1 my-6 bg-black"></div>
                    )}
                </div>

            </div>

            <div className="bg-white rounded-2xl border">
                {/* Search and Filter */}
                <div className="w-full flex items-center justify-between gap-4 p-4 pb-1 border-b-1">

                    <div className="flex justify-between items-center mb-3 p-2">
                        <div className="flex flex-col gap-1">
                            <h2 className="font-bold text-xl text-gray-900">All Services</h2>
                            <p className="text-xs text-gray-400">
                                See all your services below
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <div className="relative">
                            {/* <Icon icon="iconamoon:search" width="24" height="24" className="absolute text-red-50 left-2 top-2" /> */}
                            <Input placeholder="Search services" className="w-full min-w-sm py-5" />
                        </div>


                        <div className="">
                            <Select onValueChange={(value) => setFilter(value)}>
                                <SelectTrigger className="py-5">
                                    <SelectValue placeholder="Filter by: All" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All</SelectItem>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="rejected">Rejected</SelectItem>
                                    <SelectItem value="hidden">Hidden</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {services && services.length > 0 && (
                        <Button className="text-grey-50 bg-primary-500 rounded-4xl p-5 font-bold">
                            + Add New Service
                        </Button>
                    )}

                </div>


                {/* Service Cards */}
                {services && services.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4 p-4">
                        {filteredServices.map((service) => (
                            <div
                                key={service.id}
                                className="bg-white border rounded-xl p-4 space-y-4"
                            >
                                <div className="flex items-center justify-between">
                                    <p className="font-semibold">{service.title}</p>

                                    <div className="flex gap-2">
                                        {service.tags.map((tag, i) => (
                                            <Badge key={i} variant="outline" className='font-bold text-grey-700 bg-grey-100 border-none py-1 px-2 rounded-2xl'>
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <p className="text-sm text-grey-700 font-medium">
                                    Fixed Price: {service.price}
                                </p>

                                <div className="flex gap-2">
                                    <Switch checked={service.status === "active"} />
                                    <div className="flex flex-1 items-center justify-between">
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                {service.status}
                                            </p>
                                            <p className="text-xs">Prospective clients can not see this service</p>
                                        </div>

                                        <div className="flex items-center gap-2 text-primary-600 font-extrabold cursor-pointer">
                                            <p className="text-sm mt-3">View all bookings</p>
                                            <Icon icon="mdi:arrow-right" className="mt-3.5 text-xl" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-12">
                        <Icon icon="material-symbols:work-outline" className="w-16 h-16 mb-4 text-primary-700" />
                        <h3 className="text-lg font-semibold text-gray-600 mb-2">
                            No services to display
                        </h3>
                        <p className="text-sm text-gray-500">
                            You have not added any services to your LavenderCare shop
                        </p>

                        <Button className="text-grey-50 bg-primary-500 rounded-4xl p-5 px-10 font-bold mt-6">
                            + Add New Service
                        </Button>
                    </div>
                )}
            </div>

            {/* Uncomment for finish setting up modal  */}
            {/* <FinishSettingUp /> */}
        </div >
    );
}
