import { useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import ChatBubble from "../components/ChatBubble.jsx"; // 🧩 thêm import

AOS.init({ duration: 800, once: true });

export default function Home() {
  const [trackingCode, setTrackingCode] = useState("");

  return (
    <>
      {/* Hero */}
      <section className="relative h-[90vh] flex items-center justify-center text-center pt-16">
        <img
          src="https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&w=1600&q=80"
          alt="logistics"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 max-w-3xl px-4" data-aos="fade-down">
          <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
            Nhanh hơn. An toàn hơn. Tin cậy hơn.
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            SpeedyShip – nền tảng vận chuyển thông minh, giúp bạn gửi hàng dễ
            dàng và theo dõi mọi lúc mọi nơi.
          </p>

          {/* Form tra cứu */}
          <div className="bg-white rounded-lg shadow-lg p-3 flex flex-col md:flex-row gap-2 items-center justify-between max-w-2xl mx-auto">
            <input
              type="text"
              value={trackingCode}
              onChange={(e) => setTrackingCode(e.target.value)}
              placeholder="Nhập mã vận đơn..."
              className="flex-1 border-none outline-none p-3 rounded text-gray-700"
            />
            <Link
              to={`/tracking?code=${trackingCode}`}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded w-full md:w-auto transition"
            >
              Tra cứu
            </Link>
          </div>
        </div>
      </section>

      {/* Services teaser */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h3
            className="text-3xl font-bold text-center mb-12"
            data-aos="fade-up"
          >
            🚀 Dịch vụ của chúng tôi
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "https://cdn-icons-png.flaticon.com/512/1995/1995574.png",
                title: "Giao hàng nội thành",
                desc: "Nhanh trong 2–4 giờ, theo dõi GPS & hỗ trợ COD.",
              },
              {
                icon: "https://cdn-icons-png.flaticon.com/512/2899/2899650.png",
                title: "Liên tỉnh - Bắc Nam",
                desc: "Xuyên Việt an toàn, đúng hẹn, chi phí tối ưu.",
              },
              {
                icon: "https://cdn-icons-png.flaticon.com/512/1514/1514406.png",
                title: "Giao hàng quốc tế",
                desc: "Đối tác DHL/FedEx/UPS, có bảo hiểm hàng hóa.",
              },
            ].map((s, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-lg shadow hover:shadow-xl transition"
                data-aos="zoom-in"
              >
                <img src={s.icon} className="w-16 mb-4" />
                <h4 className="text-xl font-semibold mb-2 text-blue-600">
                  {s.title}
                </h4>
                <p className="text-gray-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="bg-blue-50 py-20">
        <div className="max-w-6xl mx-auto text-center px-6">
          <h3 className="text-3xl font-bold mb-8" data-aos="fade-up">
            💼 Đối tác & khách hàng
          </h3>
          <p
            className="text-gray-600 mb-10"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Hàng nghìn khách hàng tin tưởng SpeedyShip – từ cửa hàng nhỏ đến
            doanh nghiệp lớn.
          </p>
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            data-aos="zoom-in"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Shopee_logo.svg/512px-Shopee_logo.svg.png"
              className="w-32 mx-auto grayscale hover:grayscale-0 transition"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Lazada_%282019%29.svg/512px-Lazada_%282019%29.svg.png"
              className="w-32 mx-auto grayscale hover:grayscale-0 transition"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Tiki_logo_2021.svg/512px-Tiki_logo_2021.svg.png"
              className="w-28 mx-auto grayscale hover:grayscale-0 transition"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Grab_Logo.svg/512px-Grab_Logo.svg.png"
              className="w-28 mx-auto grayscale hover:grayscale-0 transition"
            />
          </div>
        </div>
      </section>

      {/* 💬 Chat popup */}
      <ChatBubble />
    </>
  );
}
