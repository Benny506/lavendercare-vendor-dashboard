import React, { useEffect, useState } from "react";
import {
  statsData,
  chartData,
  topLocations,
  bookingsData,
  statusColors,
} from "@/constants/constant";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Icon } from "@iconify/react";
import Table from "@/components/Table";
import VerifyAccount from "./verification/VerifyAccount";
import VerificationForm from "./verification/VerificationForm";
import InProgress from "./verification/InProgress";
import { useSelector } from "react-redux";
import { getUserDetailsState } from "@/redux/slices/userDetailsSlice";
import { formatNumberWithCommas, getUniqueByKey, sortByKey } from "@/lib/utils";
import { getBookingStatusBadge } from "@/lib/utilsJsx";

function getMonthlyCounts(data) {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const counts = {};

  data.forEach(item => {
    const date = new Date(item.day);
    const month = monthNames[date.getMonth()];

    counts[month] = (counts[month] || 0) + 1;
  });

  return Object.entries(counts).map(([month, count]) => ({
    month,
    count
  }));
}


export default function Dashboard() {

  const allBookings = useSelector(state => getUserDetailsState(state).bookings)
  const services = useSelector(state => getUserDetailsState(state).services)

  const [bookingsCount, setBookingsCount] = useState({ thisMonth: 0, lastMonth: 0, newClientsCount: 0 })
  const [tab, setTab] = useState('locations')
  const [topServices, setTopServices] = useState([])
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    const now = new Date();

    // Current month and year
    const currentMonth = now.getMonth();  // 0 = Jan
    const currentYear = now.getFullYear();

    // Last month and year (handle January case properly)
    let lastMonth = currentMonth - 1;
    let lastMonthYear = currentYear;
    if (lastMonth < 0) {
      lastMonth = 11;
      lastMonthYear -= 1;
    }

    let thisMonthBookingsCount = 0
    let lastMonthBookingsCount = 0
    const newClientsCount = getUniqueByKey({
      arr: bookings?.map(b => b?.user_profile),
      key: 'id'
    })?.length
    const servicesCount = {}

    for(let i = 0; i < bookings.length; i++){
      const b = bookings[i]
      const d = new Date(b?.day)
      const s_id = b?.service_id

      if(d.getMonth() === currentMonth && d.getFullYear() === currentYear){
        thisMonthBookingsCount += 1
      }

      if(d.getMonth() === lastMonth && d.getFullYear() === lastMonthYear){
        lastMonthBookingsCount += 1
      }

      const current = servicesCount[s_id] || 0

      servicesCount[s_id] = current + 1
    }

    const topServices = sortByKey({
      arr:
        Object.keys(servicesCount).map(s_id => {
          const info = (services || []).filter(s => s.id === s_id)[0]

          return {
            count: servicesCount[s_id],
            info
          }
        }),
      key: 'count',
      order: 'desc'                 
    })

    const _b = (allBookings || []).map(b => {

        const service = (services || []).filter(s => s?.id == b?.service_id)[0]

        return {
            ...b,
            serviceInfo: service,
            location: 'Dummy location'
        }
    })    

    setBookings(_b)

    setTopServices(topServices.slice(0, 5))
    
    setBookingsCount({
      thisMonth: thisMonthBookingsCount, 
      lastMonth: lastMonthBookingsCount,
      newClientsCount
    })
  }, [allBookings])

  // Table columns configuration for recent bookings
  const columns = [
    { key: "id", label: "Booking Number" },
    { key: "day", label: "Booking Date" },
    {
      key: "status",
      label: "Service Booked",
      render: (row) => (
        <span>
          {row.serviceInfo?.service_name}
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
      label: "Actions",
      render: (row) => (
        <button className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm">
          View
        </button>
      ),
    },
  ];


  return (
    <div className="flex-1 p-4 min-h-screen">
      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {/* Total Bookings */}
        <div className="bg-white shadow rounded-lg p-4 flex flex-col">
          <div className="flex justify-between items-start">
            <Icon
              icon="uil:calender"
              width="24"
              height="24"
              className="w-10 h-10 bg-primary-50 text-primary-600 rounded-sm p-2"
            />
            {bookings && bookings?.length > 0 && (
              <div className="flex items-center mt-1">
                <div className="flex items-center w-10 h-6 rounded-lg bg-success-50 justify-center">
                  <p className="text-center px-2 text-sm text-success-500">
                    { bookingsCount.thisMonth >= bookingsCount.lastMonth ? '+' : '-' }{ Math.abs(bookingsCount.thisMonth - bookingsCount.lastMonth) }
                  </p>
                </div>
                <p className="ml-2 text-sm font-bold">vs last month</p>
              </div>
            )}
          </div>

          <div className="text-sm text-gray-500 mt-2">Total Bookings</div>

          {bookings && bookings?.length > 0 ? (
            <div className="text-2xl font-bold my-3">
              { formatNumberWithCommas(bookings?.length) }
            </div>
          ) : (
            <div className="w-4 h-2 my-6 bg-black"></div>
          )}

          <hr className="bg-[#D2C3EF] h-0.5 border-none" />
          <div className="flex items-center gap-2 text-primary-600 font-extrabold">
            <p className="text-lg mt-3 cursor-pointer">View all bookings</p>
            <Icon icon="mdi:arrow-right" className="mt-3.5 text-xl" />
          </div>
        </div>

        {/* Total Clients */}
        <div className="bg-white shadow rounded-lg p-4 flex flex-col">
          <div className="flex justify-between items-start">
            <Icon
              icon="ic:outline-people"
              width="24"
              height="24"
              className="w-10 h-10 bg-secondary-50 text-secondary-600 rounded-sm p-2"
            />
          </div>

          <div className="text-sm text-gray-500 mt-2">Total Clients</div>

          {bookingsCount?.newClientsCount && bookingsCount?.newClientsCount > 0 ? (
            <div className="text-2xl font-bold my-3">
              {bookingsCount?.newClientsCount}
            </div>
          ) : (
            <div className="w-4 h-2 my-6 bg-black"></div>
          )}

          <hr className="bg-[#D2C3EF] h-0.5 border-none" />
          <div className="flex items-center gap-2 text-primary-600 font-extrabold">
            <p className="text-lg mt-3 cursor-pointer">View all clients</p>
            <Icon icon="mdi:arrow-right" className="mt-3.5 text-xl" />
          </div>
        </div>
      </div>

      {/* Chart & Top Locations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
        <div className="bg-white shadow rounded-lg p-4 lg:col-span-2">
          <h2 className="text-sm font-medium text-gray-700 mb-3">Growth Chart</h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart 
              data={getMonthlyCounts(bookings)}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#6b46c1"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div>
          <div className="flex border-b font-bold w-full bg-white shadow rounded-lg p-4 pb-0 mb-3">
            {
              [
                { title: 'Top Locations', type: 'locations' },
                { title: 'Popular Services', type: 'services' },
              ]
              .map((section, i) => {
                const { title, type } = section

                const isActive = type === tab

                return(
                  <button 
                    key={i}
                    onClick={() => setTab(type)}
                    className={`cursor-pointer flex-1 pb-2 px-3 ${isActive ? 'text-primary-700 border-b-2 border-primary-700' : 'text-gray-400'}`}
                  >
                    { title }
                  </button>                  
                )
              })
            }
          </div>

          <ul className="text-sm text-gray-700 space-y-2 bg-white shadow rounded-lg p-4 pt-2">
            {
              tab === 'services'
              ?
                topServices?.length > 0
                ?
                  topServices?.map((s, i) => {
                    const { info, count } = s

                    return (
                      <li
                        key={i}
                        className="flex flex-col justify-between px-2 border-b border-gray-200 pb-1 last:border-none"
                      >
                        <span className="font-bold text-gray-700 pt-1">
                          {i + 1 < 10 ? `0${i+1}` : i+1}. { info?.service_name }
                        </span>
                        <span className="px-5 mt-1 text-gray-400">
                          {count} appointments
                        </span>
                      </li>                  
                    )
                  })
                :
                  <div className="flex flex-col items-center justify-center py-22">
                    <p className="text-gray-500 text-xl font-medium">
                      No data to display
                    </p>
                  </div>          
              :    
                topLocations.length ? (
                  topLocations.map((loc) => (
                    <li
                      key={loc.id}
                      className="flex flex-col justify-between px-2 border-b border-gray-200 pb-1 last:border-none"
                    >
                      <span className="font-bold text-gray-700 pt-1">
                        {loc.id < 10 ? `0${loc.id}` : loc.id}. {loc.name}
                      </span>
                      <span className="px-5 mt-1 text-gray-400">
                        {loc.orders} orders
                      </span>
                    </li>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-22">
                    <p className="text-gray-500 text-xl font-medium">
                      No data to display
                    </p>
                  </div>
                )              
            }
          </ul>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="mt-6 bg-white shadow rounded-lg p-4">
        <div className="flex justify-between items-center mb-3 p-2">
          <div className="flex flex-col gap-1">
            <h2 className="font-bold text-xl text-gray-900">Recent Bookings</h2>
            <p className="text-xs text-gray-400">
              See your most recent bookings below
            </p>
          </div>
          <button className="text-primary-500 font-bold flex items-center gap-1">
            View all orders <Icon icon="mdi:arrow-right" className="text-xl" />
          </button>
        </div>

        <Table
          columns={columns}
          data={bookings.slice(0, 6)}
          styles={{
            wrapper: "overflow-x-auto",
            table: "w-full text-sm text-left",
            thead: "",
            headerRow: "text-gray-500 border-b border-t border-gray-200",
            headerCell: "py-3 px-3 text-md font-bold",
            tbody: "",
            row: "border-b hover:bg-gray-50 last:border-b-0",
            cell: "py-6 px-3 text-md font-semibold",
            emptyWrapper: "flex flex-col items-center justify-center py-12",
            icon: "w-16 h-16 mb-4 text-primary-700",
            emptyTitleText: "No data to display",
            emptySubText: "Recent appointments will appear here",
            emptyIcon: "uil:calender"
          }}
        />
      </div>

      {/* Uncomment to show verify account modal  */}
      {/* <VerifyAccount /> */}

      {/* Uncomment to show verify account form modal */}
      {/* <VerificationForm /> */}

      {/* Uncomment to show in-progress modal */}
      {/* <InProgress /> */}
    </div>
  );
}