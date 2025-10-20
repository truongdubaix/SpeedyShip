import { useState } from "react";

export default function DriverProfile() {
  const [form, setForm] = useState({
    name: "Trần Văn Tài",
    phone: "0909123456",
    vehicle: "Xe tải 1.5 tấn",
    license: "79A-123.45",
    licenseNo: "GPLX-556677",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Cập nhật hồ sơ thành công!");
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-700 mb-6">👤 Hồ sơ tài xế</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            Họ tên
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            Số điện thoại
          </label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            Loại xe
          </label>
          <input
            type="text"
            name="vehicle"
            value={form.vehicle}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            Biển số xe
          </label>
          <input
            type="text"
            name="license"
            value={form.license}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            Số GPLX
          </label>
          <input
            type="text"
            name="licenseNo"
            value={form.licenseNo}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Lưu thay đổi
          </button>
        </div>
      </form>
    </div>
  );
}
