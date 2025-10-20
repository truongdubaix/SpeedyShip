import { Link, NavLink } from "react-router-dom";

const NavItem = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `px-2 py-1 transition ${
        isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
      }`
    }
  >
    {children}
  </NavLink>
);

export default function Navbar() {
  return (
    <nav className="bg-white shadow fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <Link to="/" className="text-2xl font-extrabold text-blue-600">
          🚚 SpeedyShip
        </Link>
        <ul className="hidden md:flex space-x-6 font-medium">
          <li>
            <NavItem to="/services">Dịch vụ</NavItem>
          </li>
          <li>
            <NavItem to="/tracking">Tra cứu</NavItem>
          </li>
          <li>
            <NavItem to="/about">Giới thiệu</NavItem>
          </li>
          <li>
            <NavItem to="/contact">Liên hệ</NavItem>
          </li>
        </ul>
        <div className="hidden md:flex space-x-3">
          <a
            href="/login"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Đăng nhập
          </a>
          <a
            href="/register"
            className="border border-blue-500 text-blue-600 px-4 py-2 rounded hover:bg-blue-100"
          >
            Đăng ký
          </a>
        </div>
      </div>
    </nav>
  );
}
