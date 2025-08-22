import { bookingsInfo, bookingsTableData } from "@/constants/constant";
import { Icon } from "@iconify/react";
import Table from "@/components/Table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import Pagination from "@/components/Pagination";
import CancelAppointment from "./CancelAppointment";
import ConfirmAppointmentSuccess from "./ConfirmAppointmentSuccess";
import ConfirmAppointment from "./ConfirmAppointment";
import CancelAppointmentSuccess from "./CancelAppointmentSuccess";

const Bookings = () => {
    const [filter, setFilter] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    // Table Columns
    const columns = [
        { key: "number", label: "Booking Number" },
        { key: "date", label: "Booking Date" },
        { key: "service", label: "Service Booked" },
        { key: "location", label: "Location" },
        {
            key: "status",
            label: "Status",
            render: (row) => (
                <span
                    className={`px-3 py-1 text-xs rounded-2xl font-medium
          ${row.status === "Ongoing" && "bg-success-50 text-success-500"}
          ${row.status === "Upcoming" && "bg-warning-50 text-warning-700"}
          ${row.status === "Attended" && "bg-primary-50 text-primary-700"}
          ${row.status === "Cancelled" && "bg-grey-100 text-grey-700"}
          ${row.status === "Missed" && "bg-error-50 text-error-700"}`}
                >
                    {row.status}
                </span>
            ),
        },
        {
            key: "action",
            label: "Action",
            render: (row) => (
                <button className="px-4 py-1 text-sm bg-primary-500 text-grey-50 rounded-4xl">
                    View
                </button>
            ),
        },
    ];

    // ✅ Filter & Search
    const filteredData = bookingsTableData.filter(
        (item) =>
            (filter === "All" || item.status === filter) &&
            (item.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.service.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const totalPages = 10;

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="mt-4">
            {/* ✅ Summary Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
                {bookingsInfo.map((info, index) => {
                    const [bgColor, iconColor] = info.color.split(" ");
                    return (
                        <div
                            key={index}
                            className={`p-6 rounded-lg flex items-center justify-between ${bgColor}`}
                        >
                            <div className="flex flex-col gap-3">
                                <div className="flex gap-2 items-center">
                                    {info.icon && (
                                        <Icon icon={info.icon} className={`text-xl ${iconColor}`} />
                                    )}
                                    <p className="text-sm text-grey-600">{info.title}</p>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">{info.value}</h2>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* ✅ Table Section */}
            <div className="bg-white rounded-2xl border">
                <div className="w-full flex items-center justify-between gap-4 p-4 pb-1 border-b-1">
                    <div className="flex flex-col gap-1">
                        <h2 className="font-bold text-xl text-gray-900">All Bookings</h2>
                        <p className="text-xs text-gray-400">See all your bookings below</p>
                    </div>

                    {/* ✅ Search & Filter Controls */}
                    <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-3">
                        {/* Search Input */}
                        <Input
                            placeholder="Search by booking number or name"
                            className="w-full min-w-sm py-5"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />

                        {/* Filter Dropdown */}
                        <Select onValueChange={setFilter} defaultValue="All">
                            <SelectTrigger className="py-5">
                                <SelectValue placeholder="Filter by: All" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">All</SelectItem>
                                <SelectItem value="Upcoming">Upcoming</SelectItem>
                                <SelectItem value="Ongoing">Ongoing</SelectItem>
                                <SelectItem value="Attended">Attended</SelectItem>
                                <SelectItem value="Cancelled">Cancelled</SelectItem>
                                <SelectItem value="Missed">Missed</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Table */}
                <Table
                    columns={columns}
                    data={filteredData}
                    styles={{
                        wrapper: "p-3 overflow-x-auto",
                        table: "w-full border-collapse -mt-3",
                        headerRow: "bg-grey-50 text-left text-gray-700 text-sm border-b border-grey-100",
                        headerCell: "p-4 font-semibold",
                        row: "border-b hover:bg-gray-50",
                        cell: "p-4 text-sm",
                        emptyWrapper: "flex flex-col items-center justify-center py-20 text-center",
                        icon: "w-20 h-20 mb-6 text-primary-500",
                        emptyTitleText: "No bookings available",
                        emptySubText: "Your bookings will appear here once added",
                        emptyIcon: "uil:schedule"
                    }}
                    pagination={
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    }
                />
            </div>

            {/* Modals (uncomment to activate) */}
            {/* <CancelAppointment /> */}
            {/* <ConfirmAppointmentSuccess /> */}
            {/* <ConfirmAppointment /> */}
            {/* <CancelAppointmentSuccess /> */}
        </div>
    );
};

export default Bookings;