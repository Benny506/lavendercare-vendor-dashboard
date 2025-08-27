import { bookingsInfo, bookingsTableData, bookingStatuses } from "@/constants/constant";
import { Icon } from "@iconify/react";
import Table from "@/components/Table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import Pagination from "@/components/Pagination";
import CancelAppointment from "./CancelAppointment";
import ConfirmAppointmentSuccess from "./ConfirmAppointmentSuccess";
import ConfirmAppointment from "./ConfirmAppointment";
import CancelAppointmentSuccess from "./CancelAppointmentSuccess";
import { bookingsMap, getBookingStatusBadge, getServiceStatusBadge } from "@/lib/utilsJsx";
import { useSelector } from "react-redux";
import { getUserDetailsState } from "@/redux/slices/userDetailsSlice";
import { usePagination } from "@/hooks/usePagination";
import { useNavigate } from "react-router-dom";

const Bookings = () => {

    const navigate = useNavigate()

    const allBookings = useSelector(state => getUserDetailsState(state).bookings)
    const services = useSelector(state => getUserDetailsState(state).services)

    const [filter, setFilter] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [bookings, setBookings] = useState([])
    const [pageListIndex, setPageListIndex] = useState(0)    
    const [bookingsCount, setBookingsCount] = useState({
        all: 0, total: 0, upcoming: 0, ongoing: 0, attended: 0, missed: 0, cancelled: 0
    })

    useEffect(() => {
        const countObj = {
            all: 0, upcoming: 0, ongoing: 0, attended: 0, missed: 0, cancelled: 0
        }

        const _b = (allBookings || []).map(b => {

            const { status } = b

            const prevValue = countObj[status] || 0

            countObj[status] = prevValue + 1

            const service = (services || []).filter(s => s?.id == b?.service_id)[0]
            return {
                ...b,
                serviceInfo: service,
                location: 'Dummy location'
            }
        })

        countObj['all'] = _b?.length

        setBookings(_b)

        setBookingsCount(countObj)
    }, allBookings, services)

    // Table Columns
    const columns = [
        { key: "id", label: "Booking Number" },
        { key: "day", label: "Booking Date" },
        { 
            key: "service_name", 
            label: "Service Booked",
            render: (row) => (
                <span>
                    { row?.serviceInfo?.service_name }
                </span>
            ),            
        },
        { key: "location", label: "Location" },
        {
            key: "status",
            label: "Status",
            render: (row) => (
                getBookingStatusBadge({ status: row?.status })
            ),
        },
        {
            key: "action",
            label: "Action",
            render: (row) => (
                <button 
                    onClick={() => navigate('/bookings/booking', { state: { booking_id: row?.id } })}
                    className="cursor-pointer px-4 py-1 text-sm bg-primary-500 text-grey-50 rounded-4xl"
                >
                    View
                </button>
            ),
        },
    ];

    // ✅ Filter & Search
    const filteredData = bookings.filter(
        (item) => {

            const { id, serviceInfo } = item

            const { service_name } = serviceInfo

            const matchSearch = 
                (searchTerm.toLowerCase().includes(service_name?.toLowerCase())
                ||
                service_name.toLowerCase().includes(searchTerm?.toLowerCase()))

                ||

                (searchTerm.toLowerCase().includes(id?.toLowerCase())
                ||
                id.toLowerCase().includes(searchTerm?.toLowerCase()))

            const matchesFilter = (filter?.toLowerCase() === "all" || item.status === filter)

            return matchesFilter && matchSearch
        }
    );

    const { pageItems, pageList, totalPageListIndex } = usePagination({
        arr: filteredData,
        maxShow: 4,
        index: currentPage,
        maxPage: 5,
        pageListIndex
    });

    const incrementPageListIndex = () => {
        if(pageListIndex === totalPageListIndex){
            setPageListIndex(0)
         
        } else{
            setPageListIndex(prev => prev+1)
        }

        return
    }

    const decrementPageListIndex = () => {
        if(pageListIndex == 0){
            setPageListIndex(totalPageListIndex)
        
        } else{
            setPageListIndex(prev => prev-1)
        }

        return
    }    

    return (
        <div className="mt-4">
            {/* ✅ Summary Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6 overscroll-x-none">
                {Object.keys(bookingsCount).map((status, index) => {

                    const iconColor = bookingsMap[status]?.color

                    const count = bookingsCount[status]

                    const isActive = filter.toLowerCase() === status?.toLowerCase()

                    return (
                        <div
                            key={index}
                            onClick={() => setFilter(status)}
                            className={`p-6 cursor-pointer rounded-lg flex items-center justify-between ${isActive ? 'bg-white' : 'bg-primary-50'}`}
                        >
                            <div className="flex flex-col gap-3">
                                <div className="flex gap-2 items-center">
                                    {
                                        status != 'all'
                                        &&
                                            <Icon icon={'uil:calender'} className={`text-xl ${iconColor}`} />
                                    }
                                    <p className="text-sm text-grey-600 capitalize">{status}</p>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">{count}</h2>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* ✅ Table Section */}
            <div className="bg-white rounded-2xl border">
                <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 p-4 pb-1 border-b-1">
                    <div className="flex flex-col gap-1">
                        <h2 className="font-bold text-xl text-gray-900">All Bookings</h2>
                        <p className="text-xs text-gray-400">See all your bookings below</p>
                    </div>

                    {/* ✅ Search & Filter Controls */}
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-3">
                        {/* Search Input */}
                        <Input
                            placeholder="Search by booking number or name"
                            className="w-full md:min-w-sm py-5"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />

                        {/* Filter Dropdown */}
                        {/* <Select onValueChange={setFilter} defaultValue="All">
                            <SelectTrigger className="py-5">
                                <SelectValue placeholder="Filter by: All" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">All</SelectItem>
                                {
                                    bookingStatuses.map(s => (
                                        <SelectItem value={s} className={'capitalize'}> { s } </SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select> */}
                    </div>
                </div>

                {/* Table */}
                <Table
                    columns={columns}
                    data={pageItems}
                    styles={{
                        wrapper: "md:p-3 overflow-x-auto max-w-xs md:max-w-full",
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
                        <>
                            {
                                pageItems.length > 0
                                &&
                                    <div className="mt-6 flex items-center justify-between">
                                        <button 
                                            disabled={pageListIndex > 0 ? false : true}
                                            onClick={decrementPageListIndex} 
                                            style={{
                                                opacity: pageListIndex > 0 ? 1 : 0.5
                                            }}
                                            className="cursor-not-allowed flex items-center text-gray-600 hover:text-gray-800 font-bold"
                                        >
                                            <Icon icon="mdi:arrow-left" className="mr-2" /> 
                                            <span className="hidden md:inline">Previous</span>
                                        </button>                        

                                        <div className="flex flex-wrap justify-center gap-2">
                                            {pageList?.map((p, i) => {

                                                const isActivePAge = p-1 === currentPage

                                                const handlePClick = () => {
                                                    if (p === '...'){
                                                        
                                                        if(i == 0){
                                                            decrementPageListIndex()
                                                        
                                                        } else{
                                                            incrementPageListIndex()
                                                        }

                                                        return;
                                                    }

                                                    setCurrentPage(p-1)

                                                    return;
                                                }

                                                return (
                                                    <button
                                                        key={i}
                                                        onClick={handlePClick}
                                                        className={`w-8 h-8 cursor-pointer rounded-full ${isActivePAge ? "bg-primary-100 text-primary-600" : "text-gray-600"} flex items-center justify-center`}
                                                    >
                                                        {p}
                                                    </button>
                                                )}
                                            )}
                                        </div>
                                        <button 
                                            disabled={pageListIndex < totalPageListIndex ? false : true}
                                            onClick={incrementPageListIndex} 
                                            style={{
                                                opacity: pageListIndex < totalPageListIndex ? 1 : 0.5
                                            }}
                                            className="cursor-pointer flex items-center text-gray-600 hover:text-gray-800 font-bold"
                                        >
                                            <span className="hidden md:inline">Next</span> <Icon icon="mdi:arrow-right" className="ml-2" />
                                        </button>                        
                                    </div>                    
                            }
                        </>                        
                        // <Pagination
                        //     currentPage={currentPage}
                        //     totalPages={totalPages}
                        //     onPageChange={handlePageChange}
                        // />
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