export const serviceStatuses = [
  'pending', 'approved', 'hidden', 'rejected'
]

export const bookingStatuses = [
  'new', 'ongoing', 'completed', 'cancelled', 'missed'
]

export const vendorServicesOptions = [
  "Medical And Clinical Care",
  "Wellness And Therapy",
  "Baby Care Services",
  "Fitness And Recovery",
  "Home And Lifestyle Support",
  "Education And Coaching",
  "Products And Essentials"
]

export const currencies = ['NGN']

export const ticketFields = ['billing', 'account', 'bookings', 'services', 'other']

// Sidebar list 
export const SidebarItems = [
  { label: 'Dashboard', icon: 'material-symbols:dashboard-outline', path: '/' },
  { label: 'Services', icon: 'material-symbols:work-outline', path: '/services' },
  { label: 'Bookings', icon: 'uil:calender', path: "/bookings" },
  { label: 'Inbox', icon: 'ic:outline-message', path: "/inbox" },
  { label: 'Wallet', icon: 'ic:outline-account-balance-wallet', path: "wallet" },
];

// Dashboard Data 
export const statsData = {
  totalBookings: 2323,
  totalClients: 123423,
};

export const chartData = [
  { month: "Jan", bookings: 400 },
  { month: "Feb", bookings: 650 },
  { month: "Mar", bookings: 500 },
  { month: "Apr", bookings: 700 },
  { month: "May", bookings: 600 },
  { month: "Jun", bookings: 800 },
  { month: "Jul", bookings: 720 },
  { month: "Aug", bookings: 900 },
  { month: "Sep", bookings: 850 },
  { month: "Oct", bookings: 1000 },
  { month: "Nov", bookings: 950 },
  { month: "Dec", bookings: 1100 },
];

export const topLocations = [
  { id: 1, name: "OR4, Ikoyi, Lagos", orders: 9 },
  { id: 2, name: "Obal, Ikoyi, Lagos", orders: 8 },
  { id: 3, name: "Lekki, Lagos", orders: 6 },
  { id: 4, name: "VI, Lagos", orders: 5 },
  { id: 5, name: "Yaba, Lagos", orders: 3 },
];

export const bookingsData = [
  {
    bookingNumber: "#w3e3wq233213",
    bookingDate: "23-08-23 / 03:00 - 4:00PM",
    serviceBooked: "Baby sitting, Full body Massage",
    location: "Lekki, Lagos",
    status: "Upcoming",
  },
  {
    bookingNumber: "#w3e3wq233213",
    bookingDate: "23-08-23 / 03:00 - 4:00PM",
    serviceBooked: "Baby sitting, Full body Massage",
    location: "Lekki, Lagos",
    status: "Ongoing",
  },
  {
    bookingNumber: "#w3e3wq233213",
    bookingDate: "23-08-23 / 03:00 - 4:00PM",
    serviceBooked: "Baby sitting, Full body Massage",
    location: "Lekki, Lagos",
    status: "Attended",
  },
  {
    bookingNumber: "#w3e3wq233213",
    bookingDate: "23-08-23 / 03:00 - 4:00PM",
    serviceBooked: "Baby sitting, Full body Massage",
    location: "Lekki, Lagos",
    status: "Cancelled",
  },
  {
    bookingNumber: "#w3e3wq233213",
    bookingDate: "23-08-23 / 03:00 - 4:00PM",
    serviceBooked: "Baby sitting, Full body Massage",
    location: "Lekki, Lagos",
    status: "Missed",
  },
];

export const statusColors = {
  Upcoming: "bg-orange-100 text-orange-600",
  Ongoing: "bg-green-100 text-green-600",
  Attended: "bg-purple-100 text-purple-600",
  Cancelled: "bg-gray-100 text-gray-500",
  Missed: "bg-red-100 text-red-600",
};

export const servicesData = {
  active: 23,
  inactive: null,
}

export const services = [
  {
    id: 1,
    title: "Massage therapy",
    price: "$4000/Session",
    tags: ["Massage", "Therapy"],
    status: "Active",
    description: "Prospective clients can see this service",
  },
  {
    id: 2,
    title: "Massage therapy",
    price: "$4000/Session",
    tags: ["Massage", "Therapy"],
    status: "Hidden",
    description: "Prospective clients can not see this service",
  },
  {
    id: 3,
    title: "Massage therapy",
    price: "$4000/Session",
    tags: ["Massage", "Therapy"],
    status: "Rejected",
    description: "Service did not pass our checks",
  },
  {
    id: 4,
    title: "Massage therapy",
    price: "$4000/Session",
    tags: ["Massage", "Therapy"],
    status: "Pending",
    description: "This service is being reviewed",
  },
];

// Bookings 
export const bookingsInfo = [
  { title: "Total Bookings", value: 234, color: "bg-white", icon: null },
  { title: "Upcoming Bookings", value: 23, color: "bg-primary-50 text-warning-500", icon: "uil:calender" },
  { title: "Ongoing Bookings", value: 232, color: "bg-primary-50 text-success-500", icon: "uil:calender" },
  { title: "Completed Bookings", value: 23, color: "bg-primary-50 text-primary-500", icon: "uil:calender" },
  { title: "Missed Bookings", value: 2323, color: "bg-primary-50 text-error-500", icon: "uil:calender" },
  { title: "Cancelled Bookings", value: 32, color: "bg-primary-50 text-grey-600", icon: "uil:calender" },
];

export const bookingsTableData = [
  {
    number: "#we3ewq233213",
    date: "23-08-23 / 03:00 - 4:00PM",
    service: "Baby sitting, Full body Massage",
    location: "Lekki, Lagos",
    status: "Upcoming",
  },
  {
    number: "#we3ewq233213",
    date: "23-08-23 / 03:00 - 4:00PM",
    service: "Baby sitting, Full body Massage",
    location: "Lekki, Lagos",
    status: "Ongoing",
  },
  {
    number: "#we3ewq233213",
    date: "23-08-23 / 03:00 - 4:00PM",
    service: "Baby sitting, Full body Massage",
    location: "Lekki, Lagos",
    status: "Attended",
  },
  {
    number: "#we3ewq233213",
    date: "23-08-23 / 03:00 - 4:00PM",
    service: "Baby sitting",
    location: "Lekki, Lagos",
    status: "Cancelled",
  },
  {
    number: "#we3ewq233213",
    date: "23-08-23 / 03:00 - 4:00PM",
    service: "Baby sitting, Full body Massage",
    location: "Lekki, Lagos",
    status: "Missed",
  },
];

// Wallet 
export const walletInfo = [
  { title: "Available Balance", value: 7200000.00, color: "bg-white text-success-500", icon: "ic:outline-account-balance-wallet" },
  { title: "Pending Balance", value: 7200000.00, color: "bg-primary-50 text-error-500", icon: "ic:outline-account-balance-wallet" },
  { title: "Withdrawn", value: 7200000.00, color: "bg-primary-50 text-grey-700", icon: "ic:outline-account-balance-wallet" },
];

export const walletTransactions = [
  {
    id: "txn1",
    withdrawalDate: "Jun 14, 2024 / 4:00PM",
    referenceId: "12392884218WERSDDAAI",
    receivingBankAccount: "Access Bank / 812171762935",
    amount: "23,000,000",
    status: "Processing",
  },
  {
    id: "txn2",
    withdrawalDate: "Jun 14, 2024 / 4:00PM",
    referenceId: "12392884218WERSDDAAI",
    receivingBankAccount: "Access Bank / 812171762935",
    amount: "23,000,000",
    status: "Success",
  },
  {
    id: "txn3",
    withdrawalDate: "Jun 14, 2024 / 4:00PM",
    referenceId: "12392884218WERSDDAAI",
    receivingBankAccount: "Access Bank / 812171762935",
    amount: "23,000,000",
    status: "Success",
  },
  {
    id: "txn4",
    withdrawalDate: "Jun 14, 2024 / 4:00PM",
    referenceId: "12392884218WERSDDAAI",
    receivingBankAccount: "Access Bank / 812171762935",
    amount: "23,000,000",
    status: "Processing",
  },
  {
    id: "txn5",
    withdrawalDate: "Jun 14, 2024 / 4:00PM",
    referenceId: "12392884218WERSDDAAI",
    receivingBankAccount: "Access Bank / 812171762935",
    amount: "23,000,000",
    status: "Failed",
  },
  {
    id: "txn6",
    withdrawalDate: "Jun 14, 2024 / 4:00PM",
    referenceId: "12392884218WERSDDAAI",
    receivingBankAccount: "Access Bank / 812171762935",
    amount: "23,000,000",
    status: "Success",
  },
  {
    id: "txn7",
    withdrawalDate: "Jun 14, 2024 / 4:00PM",
    referenceId: "12392884218WERSDDAAI",
    receivingBankAccount: "Access Bank / 812171762935",
    amount: "23,000,000",
    status: "Success",
  },
];

export const countries = [
  { value: 'nigeria', title: 'Nigeria 🇳🇬', countryCode: '+234' },
  // { value: 'ghana', title: 'Ghana 🇬🇭' },
  // { value: 'united states', title: 'United States 🇺🇸' },
  // { value: 'united kingdom', title: 'United Kingdom 🇬🇧' },
];

export const states = [
  { "title": "Abia", "value": "abia", country: 'nigeria' },
  { "title": "Adamawa", "value": "adamawa", country: 'nigeria' },
  { "title": "Akwa Ibom", "value": "akwa_ibom", country: 'nigeria' },
  { "title": "Anambra", "value": "anambra", country: 'nigeria' },
  { "title": "Bauchi", "value": "bauchi", country: 'nigeria' },
  { "title": "Bayelsa", "value": "bayelsa", country: 'nigeria' },
  { "title": "Benue", "value": "benue", country: 'nigeria' },
  { "title": "Borno", "value": "borno", country: 'nigeria' },
  { "title": "Cross River", "value": "cross_river", country: 'nigeria' },
  { "title": "Delta", "value": "delta", country: 'nigeria' },
  { "title": "Ebonyi", "value": "ebonyi", country: 'nigeria' },
  { "title": "Edo", "value": "edo", country: 'nigeria' },
  { "title": "Ekiti", "value": "ekiti", country: 'nigeria' },
  { "title": "Enugu", "value": "enugu", country: 'nigeria' },
  { "title": "Gombe", "value": "gombe", country: 'nigeria' },
  { "title": "Imo", "value": "imo", country: 'nigeria' },
  { "title": "Jigawa", "value": "jigawa", country: 'nigeria' },
  { "title": "Kaduna", "value": "kaduna", country: 'nigeria' },
  { "title": "Kano", "value": "kano", country: 'nigeria' },
  { "title": "Katsina", "value": "katsina", country: 'nigeria' },
  { "title": "Kebbi", "value": "kebbi", country: 'nigeria' },
  { "title": "Kogi", "value": "kogi", country: 'nigeria' },
  { "title": "Kwara", "value": "kwara", country: 'nigeria' },
  { "title": "Lagos", "value": "lagos", country: 'nigeria' },
  { "title": "Nasarawa", "value": "nasarawa", country: 'nigeria' },
  { "title": "Niger", "value": "niger", country: 'nigeria' },
  { "title": "Ogun", "value": "ogun", country: 'nigeria' },
  { "title": "Ondo", "value": "ondo", country: 'nigeria' },
  { "title": "Osun", "value": "osun", country: 'nigeria' },
  { "title": "Oyo", "value": "oyo", country: 'nigeria' },
  { "title": "Plateau", "value": "plateau", country: 'nigeria' },
  { "title": "Rivers", "value": "rivers", country: 'nigeria' },
  { "title": "Sokoto", "value": "sokoto", country: 'nigeria' },
  { "title": "Taraba", "value": "taraba", country: 'nigeria' },
  { "title": "Yobe", "value": "yobe", country: 'nigeria' },
  { "title": "Zamfara", "value": "zamfara", country: 'nigeria' },
  { "title": "FCT - Abuja", "value": "fct", country: 'nigeria' }
]

export const cities = [
  { title: 'Calabar', country: 'nigeria', state: 'cross_river' }
]