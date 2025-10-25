import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../../services/api";
import toast from "react-hot-toast";

export default function CustomerPayment() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const shipmentId = params.get("shipment_id");
  const amount = Number(params.get("amount")) || 0;
  const customerId = localStorage.getItem("customer_id") || "1";

  const [method, setMethod] = useState("momo"); // mặc định chọn momo
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (method === "cash") {
      toast.success("💵 Đơn hàng sẽ thanh toán bằng tiền mặt khi giao!");
      navigate("/customer/history");
      return;
    }

    // Nếu là momo
    setLoading(true);
    try {
      const res = await API.post("/payments/momo", {
        shipment_id: shipmentId,
        customer_id: customerId,
        amount,
      });

      const payUrl = res.data?.payUrl;
      if (payUrl) {
        window.location.href = payUrl; // chuyển thẳng đến trang momo sandbox
      } else {
        toast.error("Không lấy được link thanh toán MoMo!");
      }
    } catch (err) {
      console.error("❌ Lỗi MoMo:", err.response?.data || err.message);
      toast.error("Không thể tạo thanh toán MoMo!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-lg w-full text-center">
        <h2 className="text-2xl font-bold text-blue-700 mb-6">
          💳 Thanh toán đơn hàng
        </h2>

        <div className="text-gray-700 mb-6">
          <p>
            Mã đơn hàng:{" "}
            <span className="font-semibold text-gray-900">{shipmentId}</span>
          </p>
          <p>
            Số tiền cần thanh toán:{" "}
            <span className="font-bold text-green-600 text-xl">
              {amount.toLocaleString("vi-VN")}₫
            </span>
          </p>
        </div>

        <div className="text-left mb-6">
          <label className="font-semibold block mb-2">
            🔘 Chọn phương thức thanh toán:
          </label>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="method"
                value="momo"
                checked={method === "momo"}
                onChange={(e) => setMethod(e.target.value)}
              />
              <span>Thanh toán qua MoMo</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="method"
                value="cash"
                checked={method === "cash"}
                onChange={(e) => setMethod(e.target.value)}
              />
              <span>Thanh toán khi nhận hàng (tiền mặt)</span>
            </label>
          </div>
        </div>

        <button
          onClick={handlePayment}
          disabled={loading}
          className="bg-gradient-to-r from-pink-600 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition text-lg w-full"
        >
          {loading
            ? "⏳ Đang xử lý..."
            : method === "momo"
            ? "Thanh toán bằng MoMo"
            : "Xác nhận thanh toán tiền mặt"}
        </button>
      </div>
    </div>
  );
}
