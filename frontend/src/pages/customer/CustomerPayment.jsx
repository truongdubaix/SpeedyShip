import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../../services/api";
import toast from "react-hot-toast";

export default function CustomerPayment() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const shipmentId = params.get("shipment_id");
  const codAmount = Number(params.get("amount")) || 0;
  const shippingFee = Number(params.get("shipping_fee")) || 0;
  const totalAmount = codAmount + shippingFee;
  const customerId =
    localStorage.getItem("customer_id") ||
    localStorage.getItem("userId") ||
    null;

  const [method, setMethod] = useState("momo");
  const [loading, setLoading] = useState(false);
  const [showMomoPopup, setShowMomoPopup] = useState(false);
  const [momoUrl, setMomoUrl] = useState("");

  const handlePayment = async () => {
    if (!customerId) {
      toast.error("⚠️ Không xác định được tài khoản khách hàng!");
      return;
    }

    if (method === "cash") {
      toast.success("💵 Đơn hàng sẽ thanh toán bằng tiền mặt khi giao!");
      navigate("/customer/history");
      return;
    }

    // ✅ Thanh toán MoMo hiển thị trong popup
    setLoading(true);
    try {
      const res = await API.post("/payments/momo", {
        shipment_id: shipmentId,
        customer_id: customerId,
        amount: totalAmount,
      });

      const payUrl = res.data?.payUrl;
      if (payUrl) {
        setMomoUrl(payUrl);
        setShowMomoPopup(true);

        // 🔁 Kiểm tra trạng thái thanh toán mỗi 3s
        const checkPaymentStatus = setInterval(async () => {
          try {
            const res = await API.get(`/payments`);
            const payment = res.data.find(
              (p) => p.shipment_id == shipmentId && p.customer_id == customerId
            );

            if (payment && payment.status === "completed") {
              clearInterval(checkPaymentStatus);
              setShowMomoPopup(false);
              window.location.href = `/customer/payment-success?orderId=${payment.order_id}&resultCode=0&loading=true`;
            }
          } catch (err) {
            console.error("❌ Lỗi kiểm tra:", err.message);
          }
        }, 3000);
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
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
            Tiền thu hộ (COD):{" "}
            <span className="font-semibold">
              {codAmount.toLocaleString("vi-VN")}₫
            </span>
          </p>
          <p>
            Phí vận chuyển:{" "}
            <span className="font-semibold">
              {shippingFee.toLocaleString("vi-VN")}₫
            </span>
          </p>
          <p className="mt-2 text-lg font-bold text-green-600">
            Tổng thanh toán: {totalAmount.toLocaleString("vi-VN")}₫
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

      {/* Popup MoMo nhỏ gọn */}
      {showMomoPopup && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-4 w-[950px] h-[600px] relative flex flex-col items-center justify-center">
            {/* ❌ Nút đóng */}
            <button
              onClick={() => setShowMomoPopup(false)}
              className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-2xl"
            >
              ✖
            </button>

            {/* 💜 Tiêu đề */}
            <h3 className="text-2xl font-bold text-pink-600 mb-3">
              Cổng thanh toán MoMo
            </h3>

            {/* 💳 Iframe MoMo — full rộng, QR hiển thị rõ */}
            <iframe
              src={momoUrl}
              title="MoMo Payment"
              className="w-[900px] h-[520px] rounded-xl border shadow-inner"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
