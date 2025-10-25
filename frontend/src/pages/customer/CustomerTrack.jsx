import { useState } from "react";
import API from "../../services/api";
import toast from "react-hot-toast";

export default function CustomerTrack() {
  const [trackingCode, setTrackingCode] = useState("");
  const [shipment, setShipment] = useState(null);

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!trackingCode.trim()) return toast.error("Vui lòng nhập mã đơn hàng");

    try {
      const res = await API.get(`/customers/track/${trackingCode}`);
      setShipment(res.data);
      toast.success("Đã tìm thấy đơn hàng!");
    } catch (err) {
      setShipment(null);
      toast.error("Không tìm thấy đơn hàng!");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">
        🔍 Theo dõi đơn hàng
      </h2>

      <form onSubmit={handleTrack} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Nhập mã đơn hàng (VD: SP1001)"
          value={trackingCode}
          onChange={(e) => setTrackingCode(e.target.value)}
          className="border p-2 flex-1 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700 transition"
        >
          Tra cứu
        </button>
      </form>

      {shipment && (
        <div className="border rounded-lg p-4 bg-gray-50">
          <h3 className="text-xl font-semibold mb-2 text-green-700">
            Mã đơn: {shipment.tracking_code}
          </h3>
          <p>
            <strong>Người gửi:</strong> {shipment.sender_name} -{" "}
            {shipment.sender_phone}
          </p>
          <p>
            <strong>Người nhận:</strong> {shipment.receiver_name} -{" "}
            {shipment.receiver_phone}
          </p>
          <p>
            <strong>Địa chỉ lấy hàng:</strong> {shipment.pickup_address}
          </p>
          <p>
            <strong>Địa chỉ giao hàng:</strong> {shipment.delivery_address}
          </p>
          <p>
            <strong>Khối lượng:</strong> {shipment.weight_kg} kg
          </p>
          <p>
            <strong>Tiền thu hộ:</strong>{" "}
            {shipment.cod_amount?.toLocaleString()} VNĐ
          </p>
          <p>
            <strong>Trạng thái:</strong>
            <span className="ml-1 font-semibold text-blue-700">
              {shipment.status}
            </span>
          </p>
          <p>
            <strong>Vị trí hiện tại:</strong>{" "}
            {shipment.current_location || "Chưa cập nhật"}
          </p>
          <p>
            <strong>Ngày tạo:</strong>{" "}
            {new Date(shipment.created_at).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
}
