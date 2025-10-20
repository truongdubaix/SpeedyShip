import { Navigate } from "react-router-dom";

// Bảo vệ route chỉ cho người có token truy cập
export default function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // chưa đăng nhập
  if (!token) return <Navigate to="/login" />;

  // có role nhưng không được phép (VD: customer vào admin)
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}
