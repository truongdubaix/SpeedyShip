import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Tracking from "./pages/Tracking.jsx";
import About from "./pages/About.jsx";
import Services from "./pages/Services.jsx";
import Contact from "./pages/Contact.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

// Layouts
import AdminLayout from "./layouts/AdminLayout.jsx";
import DispatcherLayout from "./layouts/DispatcherLayout.jsx";
import DriverLayout from "./layouts/DriverLayout.jsx";
import CustomerLayout from "./layouts/CustomerLayout.jsx";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminShipments from "./pages/admin/AdminShipments.jsx";
import AdminDrivers from "./pages/admin/AdminDrivers.jsx";
import AdminCustomers from "./pages/admin/AdminCustomers.jsx";
import AdminPayments from "./pages/admin/AdminPayments.jsx";

// Dispatcher pages
import DispatcherDashboard from "./pages/dispatcher/DispatcherDashboard.jsx";
import DispatcherAssignments from "./pages/dispatcher/DispatcherAssignments.jsx";
import DispatcherTracking from "./pages/dispatcher/DispatcherTracking.jsx";

// Driver pages
import DriverDashboard from "./pages/driver/DriverDashboard.jsx";
import DriverAssignments from "./pages/driver/DriverAssignments.jsx";
import DriverHistory from "./pages/driver/DriverHistory.jsx";
import DriverProfile from "./pages/driver/DriverProfile.jsx";

// Customer pages
import CustomerDashboard from "./pages/customer/CustomerDashboard.jsx";
import CustomerCreateShipment from "./pages/customer/CustomerCreateShipment.jsx";
import CustomerTrack from "./pages/customer/CustomerTrack.jsx";
import CustomerHistory from "./pages/customer/CustomerHistory.jsx";
import CustomerProfile from "./pages/customer/CustomerProfile.jsx";

export default function App() {
  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen flex flex-col">
      <Routes>
        {/* Các trang công khai có Navbar + Footer */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <main className="flex-1">
                <Home />
              </main>
              <Footer />
            </>
          }
        />
        <Route
          path="/tracking"
          element={
            <>
              <Navbar />
              <main className="flex-1">
                <Tracking />
              </main>
              <Footer />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Navbar />
              <main className="flex-1">
                <About />
              </main>
              <Footer />
            </>
          }
        />
        <Route
          path="/services"
          element={
            <>
              <Navbar />
              <main className="flex-1">
                <Services />
              </main>
              <Footer />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <Navbar />
              <main className="flex-1">
                <Contact />
              </main>
              <Footer />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Navbar />
              <main className="flex-1">
                <Login />
              </main>
              <Footer />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Navbar />
              <main className="flex-1">
                <Register />
              </main>
              <Footer />
            </>
          }
        />

        {/* Khu vực quản trị */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="shipments" element={<AdminShipments />} />
          <Route path="drivers" element={<AdminDrivers />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="payments" element={<AdminPayments />} />
        </Route>

        {/* Khu vực điều phối viên */}
        <Route path="/dispatcher" element={<DispatcherLayout />}>
          <Route index element={<DispatcherDashboard />} />
          <Route path="assignments" element={<DispatcherAssignments />} />
          <Route path="tracking" element={<DispatcherTracking />} />
        </Route>

        {/* Khu vực tài xế */}
        <Route path="/driver" element={<DriverLayout />}>
          <Route index element={<DriverDashboard />} />
          <Route path="assignments" element={<DriverAssignments />} />
          <Route path="history" element={<DriverHistory />} />
          <Route path="profile" element={<DriverProfile />} />
        </Route>

        {/* Khu vực khách hàng */}
        <Route path="/customer" element={<CustomerLayout />}>
          <Route index element={<CustomerDashboard />} />
          <Route path="create" element={<CustomerCreateShipment />} />
          <Route path="track" element={<CustomerTrack />} />
          <Route path="history" element={<CustomerHistory />} />
          <Route path="profile" element={<CustomerProfile />} />
        </Route>
      </Routes>
    </div>
  );
}
