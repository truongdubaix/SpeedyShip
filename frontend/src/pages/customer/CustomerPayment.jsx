// src/pages/customer/CustomerPayment.jsx
import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../../services/api";
import toast from "react-hot-toast";

export default function CustomerPayment() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const shipmentId = params.get("shipment_id");
  const codAmount = Number(params.get("amount")) || 0;
  const shippingFee = Number(params.get("shipping_fee")) || 0;
  const totalAmount = codAmount + shippingFee;

  // ✅ Lấy customer_id linh hoạt
  const customerId =
    localStorage.getItem("customer_id") ||
    localStorage.getItem("userId") ||
    null;

  const [method, setMethod] = useState("momo");
  const [loading, setLoading] = useState(false);

  // 🟢 Theo dõi trạng thái shipment => nếu completed thì tự redirect
  useEffect(() => {
    if (!shipmentId) return;

    let interval;

    const checkPaymentStatus = async () => {
      try {
        const res = await API.get(`/shipments/${shipmentId}`);
        const shipment = res.data;
        console.log("🔍 Kiểm tra shipment:", shipment.status);

        if (shipment.status === "completed") {
          toast.success("✅ Thanh toán thành công!");
          navigate(
            `/customer/payment-success?orderId=${shipmentId}&resultCode=0`
          );
        }
      } catch (err) {
        console.error("❌ Lỗi kiểm tra trạng thái shipment:", err);
      }
    };

    // 🟢 Gọi ngay lần đầu tiên
    checkPaymentStatus();

    // ⏱️ Sau đó kiểm tra mỗi 3 giây
    interval = setInterval(checkPaymentStatus, 3000);

    return () => clearInterval(interval);
  }, [shipmentId]);

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

    // 🔹 Thanh toán MoMo
    setLoading(true);
    try {
      const res = await API.post("/payments/momo", {
        shipment_id: shipmentId,
        customer_id: customerId,
        amount: totalAmount,
      });

      const payUrl = res.data?.payUrl;
      if (payUrl) {
        // 🪟 Mở tab MoMo
        const momoTab = window.open(payUrl, "_blank");

        // 💡 Polling: kiểm tra thanh toán mỗi 3s
        const checkPaymentStatus = setInterval(async () => {
          try {
            const res = await API.get(`/payments`);
            const payment = res.data.find(
              (p) => p.shipment_id == shipmentId && p.customer_id == customerId
            );

            if (payment && payment.status === "completed") {
              clearInterval(checkPaymentStatus);
              if (momoTab && !momoTab.closed) momoTab.close(); // 🔒 Đóng tab MoMo
              // ✅ Chuyển sang trang loading trước khi hiển thị success
              window.location.href = `/customer/payment-success?orderId=${payment.order_id}&resultCode=0&loading=true`;
            }
          } catch (err) {
            console.error("❌ Lỗi khi kiểm tra trạng thái:", err.message);
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
    </div>
  );
}
