import { useState } from "react";
import API from "../../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function TaoDonHang() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    sender_name: "",
    sender_phone: "",
    receiver_name: "",
    receiver_phone: "",
    pickup_address: "",
    delivery_address: "",
    weight_kg: "",
    cod_amount: "",
  });

  const customerId =
    localStorage.getItem("customer_id") || localStorage.getItem("userId"); // ✅ lấy đúng ID

  const handleChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customerId) {
      toast.error("Bạn chưa đăng nhập!");
      return;
    }
    try {
      const payload = { ...form, customer_id: Number(customerId) };
      // Nếu API cần token:
      // const token = localStorage.getItem("token");
      // const res = await API.post("/customers/shipments", payload, { headers: { Authorization: `Bearer ${token}` }});
      const res = await API.post("/customers/shipments", payload);

      toast.success(res.data?.message || "Tạo đơn hàng thành công");
      // 👉 Sau khi tạo xong, chuyển qua trang lịch sử để thấy đơn mới
      navigate("/customer/history");
    } catch (err) {
      console.error(err);
      toast.error("Không thể tạo đơn hàng. Vui lòng thử lại!");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">
        🚚 Tạo đơn hàng mới
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <input
          name="sender_name"
          placeholder="Tên người gửi"
          className="border p-2 rounded"
          value={form.sender_name}
          onChange={handleChange}
          required
        />
        <input
          name="sender_phone"
          placeholder="SĐT người gửi"
          className="border p-2 rounded"
          value={form.sender_phone}
          onChange={handleChange}
          required
        />
        <input
          name="receiver_name"
          placeholder="Tên người nhận"
          className="border p-2 rounded"
          value={form.receiver_name}
          onChange={handleChange}
          required
        />
        <input
          name="receiver_phone"
          placeholder="SĐT người nhận"
          className="border p-2 rounded"
          value={form.receiver_phone}
          onChange={handleChange}
          required
        />
        <input
          name="pickup_address"
          placeholder="Địa chỉ lấy hàng"
          className="border p-2 rounded col-span-2"
          value={form.pickup_address}
          onChange={handleChange}
          required
        />
        <input
          name="delivery_address"
          placeholder="Địa chỉ giao hàng"
          className="border p-2 rounded col-span-2"
          value={form.delivery_address}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          step="0.1"
          name="weight_kg"
          placeholder="Khối lượng (kg)"
          className="border p-2 rounded"
          value={form.weight_kg}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="cod_amount"
          placeholder="Tiền thu hộ (VNĐ)"
          className="border p-2 rounded"
          value={form.cod_amount}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Tạo đơn hàng
        </button>
      </form>
    </div>
  );
}
