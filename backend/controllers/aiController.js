import axios from "axios";

export const askBot = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message)
      return res.status(400).json({ error: "Thiếu nội dung message" });

    // ⭐ THÊM: Nhận diện intent hỏi trạng thái đơn hàng
    const askTrackingIntent =
      /(đơn.*đâu|đang ở đâu|tới đâu rồi|đơn hàng của tôi|đơn của tôi)/i;

    // ====================================================
    // 🔍 1. Kiểm tra xem có mã vận đơn hay không (code GỐC)
    // ====================================================
    const codeMatch = message.toUpperCase().match(/SP[0-9]{6,}/);

    // ⭐ THÊM: Nếu user hỏi nhưng không có mã
    if (askTrackingIntent.test(message.toLowerCase()) && !codeMatch) {
      return res.json({
        reply:
          "📦 Bạn muốn tra cứu đơn hàng phải không?\nVui lòng cung cấp mã vận đơn (VD: *SP123456*).",
      });
    }

    if (codeMatch) {
      const trackingCode = codeMatch[0];

      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/shipments/code/${trackingCode}`
        );

        return res.json({
          reply: `
📦 *Kết quả tra cứu đơn ${trackingCode}:*

• Người gửi: ${data.sender_name}
• Người nhận: ${data.receiver_name}
• Trạng thái: *${data.status}*
• Lấy hàng: ${data.pickup_address}
• Giao đến: ${data.delivery_address}

🔗 Theo dõi chi tiết:
http://localhost:5173/tracking?code=${trackingCode}

👉 Cảm ơn bạn đã dùng SpeedyShip!
          `,
        });
      } catch (err) {
        return res.json({
          reply: `❌ Không tìm thấy mã vận đơn *${trackingCode}*. Vui lòng kiểm tra lại!`,
        });
      }
    }

    // ====================================================
    // 🔮 2. Nếu không phải mã đơn → gọi Groq AI (code GỐC)
    // ====================================================
    const GROQ_API_KEY = process.env.GROQ_API_KEY;

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile", // <<< MODEL MỚI
        messages: [
          {
            role: "system",
            content: `
      Bạn là chatbot hỗ trợ khách hàng SpeedyShip.
      Trả lời ngắn gọn – chuyên nghiệp – thân thiện.

      Thông tin mẫu:
      - Ship nội thành: 15.000đ
      - Liên tỉnh: 25.000–35.000đ
      - Thời gian giao: nội thành 1–2h, liên tỉnh 1–2 ngày
      - Hotline: 0363 337 081
      `,
          },
          { role: "user", content: message },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.json({
      reply: response.data.choices[0].message.content,
    });
  } catch (err) {
    console.error("❌ Bot error:", err.response?.data || err.message);
    return res.status(500).json({ error: "Chatbot bị lỗi" });
  }
};
