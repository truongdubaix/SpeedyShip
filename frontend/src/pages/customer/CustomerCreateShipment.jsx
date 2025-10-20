import { useState } from "react";

export default function CustomerCreateShipment() {
  const [form, setForm] = useState({
    sender: "",
    receiver: "",
    senderPhone: "",
    receiverPhone: "",
    pickupAddress: "",
    deliveryAddress: "",
    weight: "",
    cod: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Đã tạo đơn thành công!");
    console.log(form);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-700 mb-6">
        📝 Tạo đơn hàng mới
      </h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            Người gửi
          </label>
          <input
            type="text"
            name="sender"
            value={form.sender}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            Người nhận
          </label>
          <input
            type="text"
            name="receiver"
            value={form.receiver}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            SĐT người gửi
          </label>
          <input
            type="text"
            name="senderPhone"
            value={form.senderPhone}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            SĐT người nhận
          </label>
          <input
            type="text"
            name="receiverPhone"
            value={form.receiverPhone}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            Địa chỉ lấy hàng
          </label>
          <input
            type="text"
            name="pickupAddress"
            value={form.pickupAddress}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            Địa chỉ giao hàng
          </label>
          <input
            type="text"
            name="deliveryAddress"
            value={form.deliveryAddress}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            Cân nặng (kg)
          </label>
          <input
            type="number"
            name="weight"
            value={form.weight}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            Tiền thu hộ (COD)
          </label>
          <input
            type="number"
            name="cod"
            value={form.cod}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="md:col-span-2 text-right">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Tạo đơn hàng
          </button>
        </div>
      </form>
    </div>
  );
}
