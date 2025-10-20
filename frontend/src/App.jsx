import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// Public pages
import Home from "./pages/Home.jsx";
import Tracking from "./pages/Tracking.jsx";
import About from "./pages/About.jsx";
import Services from "./pages/Services.jsx";
import Contact from "./pages/Contact.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Logout from "./pages/Logout.jsx";
import Unauthorized from "./pages/Unauthorized.jsx";

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
import AdminUsers from "./pages/admin/AdminUsers.jsx";

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
        {/* 🌍 Public pages có Navbar + Footer */}
        {[
          { path: "/", element: <Home /> },
          { path: "/tracking", element: <Tracking /> },
          { path: "/about", element: <About /> },
          { path: "/services", element: <Services /> },
          { path: "/contact", element: <Contact /> },
          { path: "/login", element: <Login /> },
          { path: "/register", element: <Register /> },
        ].map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={
              <>
                <Navbar />
                <main className="flex-1">{element}</main>
                <Footer />
              </>
            }
          />
        ))}

        {/* 🚪 Đăng xuất & không có quyền */}
        <Route path="/logout" element={<Logout />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* 🧭 Khu vực quản trị */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="shipments" element={<AdminShipments />} />
          <Route path="drivers" element={<AdminDrivers />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="payments" element={<AdminPayments />} />
        </Route>

        {/* 🧩 Điều phối viên */}
        <Route
          path="/dispatcher"
          element={
            <ProtectedRoute allowedRoles={["dispatcher", "admin"]}>
              <DispatcherLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DispatcherDashboard />} />
          <Route path="assignments" element={<DispatcherAssignments />} />
          <Route path="tracking" element={<DispatcherTracking />} />
        </Route>

        {/* 🚚 Tài xế */}
        <Route
          path="/driver"
          element={
            <ProtectedRoute allowedRoles={["driver", "admin"]}>
              <DriverLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DriverDashboard />} />
          <Route path="assignments" element={<DriverAssignments />} />
          <Route path="history" element={<DriverHistory />} />
          <Route path="profile" element={<DriverProfile />} />
        </Route>

        {/* 👤 Khách hàng */}
        <Route
          path="/customer"
          element={
            <ProtectedRoute allowedRoles={["customer", "admin"]}>
              <CustomerLayout />
            </ProtectedRoute>
          }
        >
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
