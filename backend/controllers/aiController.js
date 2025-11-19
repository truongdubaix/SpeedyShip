import axios from "axios";

export const askBot = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message)
      return res.status(400).json({ error: "Thiếu nội dung message" });

    const msg = message.toLowerCase();

    // Intent 1: hỏi trạng thái đơn hàng
    const askTrackingIntent =
      /(đơn.*đâu|đang ở đâu|tới đâu rồi|đơn hàng của tôi|đơn của tôi)/i;

    // 1. KIỂM TRA MÃ VẬN ĐƠN SPxxxxxx

    const codeMatch = message.toUpperCase().match(/SP[0-9]{6,}/);

    // Nếu hỏi đơn nhưng chưa có mã
    if (askTrackingIntent.test(msg) && !codeMatch) {
      return res.json({
        reply:
          "📦 Bạn muốn tra cứu đơn hàng phải không?\nVui lòng cung cấp mã vận đơn (VD: *SP123456*).",
      });
    }

    // Nếu có mã → trả về chi tiết đơn hàng
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
🔗 **Theo dõi chi tiết:**
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

    // 2. INTENT FAQ (không gửi AI)

    //  Website
    if (/website|web|trang web|link web|liên hệ website/.test(msg)) {
      return res.json({
        reply: `
🌐 *Website SpeedyShip:*  
https://speedyship.vn  

👉 Bạn có thể truy cập để đặt đơn, tra cứu, và xem thông tin dịch vụ.
                  `,
      });
    }

    // Hotline
    if (/hotline|sdt|số điện thoại|gọi điện|tư vấn/.test(msg)) {
      return res.json({
        reply: `
📞 *Hotline SpeedyShip:* **0363 337 081**  
👉 Hỗ trợ từ 7:00 đến 22:00 mỗi ngày.
`,
      });
    }

    // Email
    if (/email|mail|gửi mail|hỗ trợ mail|support/.test(msg)) {
      return res.json({
        reply: `
📩 *Email hỗ trợ:*  
support@speedyship.vn  

👉 Bạn có thể gửi khiếu nại, tư vấn kỹ thuật, đối tác.
 `,
      });
    }

    // Facebook/Fanpage
    if (/facebook|fanpage|page|fb/.test(msg)) {
      return res.json({
        reply: `
📘 *Fanpage SpeedyShip:*  
https://facebook.com/speedyship.vn  

👉 Nhắn tin trực tiếp để được hỗ trợ.
`,
      });
    }

    // Địa chỉ văn phòng
    if (/địa chỉ|văn phòng|ở đâu|tới đâu/i.test(msg)) {
      return res.json({
        reply: `
🏢 *Văn phòng SpeedyShip:*  
**Số 123, Nguyễn Văn Linh, Thanh Khê, TP Đà Nẵng**  
⏰ *Giờ làm việc:* 7:00 – 22:00  
`,
      });
    }

    // Giờ làm việc
    if (/giờ mở cửa|giờ làm việc|làm lúc nào/.test(msg)) {
      return res.json({
        reply: `
⏰ *Giờ làm việc SpeedyShip:*  
**7:00 – 22:00** mỗi ngày, kể cả cuối tuần.
        `,
      });
    }

    // 🔮 3. Không thuộc FAQ → gọi Groq AI

    const GROQ_API_KEY = process.env.GROQ_API_KEY;

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
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
- Website: https://speedyship.vn
- Email: truongcss1220@gmail.com
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
