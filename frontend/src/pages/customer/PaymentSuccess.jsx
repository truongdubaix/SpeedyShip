import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 text-center px-4">
      <CheckCircle className="text-green-600 w-20 h-20 mb-4" />
      <h1 className="text-3xl font-bold text-green-700 mb-2">
        🎉 Thanh toán thành công!
      </h1>
      <p className="text-gray-700 mb-6">
        Cảm ơn bạn đã hoàn tất thanh toán đơn hàng. Hệ thống sẽ sớm xác nhận và
        giao hàng trong thời gian sớm nhất.
      </p>
      <Link
        to="/customer/history"
        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-semibold"
      >
        🔙 Trở về lịch sử đơn hàng
      </Link>
    </div>
  );
}
