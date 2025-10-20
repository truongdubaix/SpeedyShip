import React from "react";

export default function Header() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <header className="w-full border-b bg-white sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="font-extrabold text-xl">🚚 SpeedyShip</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            {user?.name ? `${user.name} (${user.role})` : "Guest"}
          </span>
          <button
            onClick={logout}
            className="px-3 py-1.5 rounded-md bg-gray-900 text-white text-sm"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </header>
  );
}
