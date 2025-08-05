import React from "react";
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
import VerifyAccount from "./verification/VerifyAccount";
import VerificationForm from "./verification/VerificationForm";
import InProgress from "./verification/InProgress";

export default function Dashboard() {
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
            {statsData.totalBookings && statsData.totalBookings > 0 && (
              <div className="flex items-center mt-1">
                <div className="flex items-center w-10 h-6 rounded-lg bg-success-50 justify-center">
                  <p className="text-center px-2 text-sm text-success-500">+4</p>
                </div>
                <p className="ml-2 text-sm font-bold">vs last month</p>
              </div>
            )}
          </div>

          <div className="text-sm text-gray-500 mt-2">Total Bookings</div>

          {statsData.totalBookings && statsData.totalBookings > 0 ? (
            <div className="text-2xl font-bold my-3">
              {statsData.totalBookings}
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
            {statsData.totalClients && statsData.totalClients > 0 && (
              <div className="flex items-center mt-1">
                <div className="flex items-center w-10 h-6 rounded-lg bg-error-50 justify-center">
                  <p className="text-center px-2 text-sm text-error-600">+4</p>
                </div>
                <p className="ml-2 text-sm font-bold">vs last month</p>
              </div>
            )}
          </div>

          <div className="text-sm text-gray-500 mt-2">Total Clients</div>

          {statsData.totalClients && statsData.totalClients > 0 ? (
            <div className="text-2xl font-bold my-3">
              {statsData.totalClients}
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
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="bookings"
                stroke="#6b46c1"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div>
          <div className="flex border-b font-bold w-full bg-white shadow rounded-lg p-4 pb-0 mb-3">
            <button className="flex-1 pb-2 px-3 text-primary-700 border-b-2 border-primary-700">
              Top Locations
            </button>
            <button className="flex-1 pb-2 px-3 text-gray-400">
              Popular Services
            </button>
          </div>
          <ul className="text-sm text-gray-700 space-y-2 bg-white shadow rounded-lg p-4 pt-2">
            {topLocations.length ? (
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
            )}
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

        {bookingsData.length > 0 ? (
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-gray-500 border-b border-t border-gray-200">
                <th className="py-3 px-3 text-md font-bold">Booking Number</th>
                <th className="py-3 px-3 text-md font-bold">Booking Date</th>
                <th className="py-3 px-3 text-md font-bold">Service Booked</th>
                <th className="py-3 px-3 text-md font-bold">Location</th>
                <th className="py-3 px-3 text-md font-bold">Status</th>
                <th className="py-3 px-3 text-md font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookingsData.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 last:border-b-0">
                  <td className="py-6 px-3 text-md font-semibold">
                    {item.bookingNumber}
                  </td>
                  <td className="py-6 px-3 text-md font-semibold">
                    {item.bookingDate}
                  </td>
                  <td className="py-6 px-3 text-md font-semibold">
                    {item.serviceBooked}
                  </td>
                  <td className="py-6 px-3 text-md font-semibold">
                    {item.location}
                  </td>
                  <td className="py-6 px-3 text-md font-semibold">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[item.status]}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-6 px-3 text-md font-semibold">
                    <button className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <Icon icon="uil:calender" className="w-16 h-16 mb-4 text-primary-700" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              No data to display
            </h3>
            <p className="text-sm text-gray-500">
              Recent appointments will appear here
            </p>
          </div>
        )}
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
