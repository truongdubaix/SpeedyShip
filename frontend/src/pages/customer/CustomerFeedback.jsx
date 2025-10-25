import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import API from "../../services/api";
import toast from "react-hot-toast";

export default function CustomerFeedback() {
  const [params] = useSearchParams();
  const shipmentId = params.get("shipment_id");
  // 🔹 Lấy ID khách hàng chính xác, kể cả khi localStorage key khác nhau
  const customerId =
    localStorage.getItem("customer_id") ||
    localStorage.getItem("userId") ||
    localStorage.getItem("userid");

  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🧠 In ra dữ liệu gửi để kiểm tra
    console.log({
      customer_id: customerId,
      shipment_id: shipmentId,
      content,
      rating,
    });

    if (!customerId || !shipmentId) {
      toast.error("⚠️ Thiếu ID người dùng hoặc đơn hàng!");
      return;
    }

    try {
      await API.post("/feedbacks", {
        customer_id: Number(customerId),
        shipment_id: Number(shipmentId),
        content: content.trim(),
        rating: Number(rating),
      });

      toast.success("✅ Gửi đánh giá thành công!");
      navigate("/customer/history");
    } catch (err) {
      console.error("❌ Lỗi gửi feedback:", err.response?.data || err.message);
      toast.error("❌ Lỗi khi gửi đánh giá!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">
        💬 Đánh giá đơn hàng
      </h2>
      <p className="text-gray-600 text-center mb-4">
        Đơn hàng mã: <strong>{shipmentId}</strong>
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Nhập nội dung đánh giá..."
          className="w-full border p-3 rounded-md"
          required
        />

        <div className="flex justify-between items-center">
          <label className="font-semibold text-gray-700">
            Mức độ hài lòng:
          </label>
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="border p-2 rounded-md"
          >
            {[1, 2, 3, 4, 5].map((r) => (
              <option key={r} value={r}>
                ⭐ {r} sao
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          Gửi đánh giá
        </button>
      </form>
    </div>
  );
}
