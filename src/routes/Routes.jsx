import Layout from "@/layouts/Layout";
import CreateVendorProfile from "@/pages/auth/become-vendor/CreateVendorProfile";
import Login from "@/pages/auth/Login";
import VerificationComplete from "@/pages/auth/become-vendor/VerificationComplete";
import VerifyEmail from "@/pages/auth/become-vendor/VerifyEmail";
import RecoverPassword from "@/pages/auth/forgot-password/RecoverPassword";
import EnterOtp from "@/pages/auth/forgot-password/EnterOtp";
import { Routes, Route } from "react-router-dom";
import CreateNewPassword from "@/pages/auth/forgot-password/CreateNewPassword";
import PasswordRecovered from "@/pages/auth/forgot-password/PasswordRecovered";
import DashboardLayout from "@/layouts/DashboardLayout";
import Dashboard from "@/pages/dashboard/Dashboard";
import Services from "@/pages/services/Services";
import ServiceDetails from "@/pages/services/ServiceDetails";
import Bookings from "@/pages/bookings/Bookings";
import BookingDetails from "@/pages/bookings/BookingDetails";
import Wallet from "../pages/wallet/Wallet";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Vendor Flow */}
        <Route path="/new-vendor" element={<CreateVendorProfile />} />
        <Route path="/new-vendor/verify-email" element={<VerifyEmail />} />
        <Route path="/new-vendor/verification-complete" element={<VerificationComplete />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Forgot Password */}
        <Route path="/recover-password" element={<RecoverPassword />} />
        <Route path="/recover-password/otp" element={<EnterOtp />} />
        <Route path="/recover-password/new-password" element={<CreateNewPassword />} />
        <Route path="/recover-password/password-recovered" element={<PasswordRecovered />} />
      </Route>

      {/* Dashboard  */}
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="services" element={<Services />} />
        <Route path="services/service" element={<ServiceDetails />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="bookings/booking" element={<BookingDetails />} />
        <Route path="wallet" element={<Wallet />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
