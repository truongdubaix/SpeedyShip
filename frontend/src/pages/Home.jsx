import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import ChatBubble from "../components/ChatBubble.jsx";

export default function Home() {
  const [trackingCode, setTrackingCode] = useState("");

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <>
      {/* 🌟 Hero Slider */}
      <section className="relative h-[90vh]">
        <Swiper
          spaceBetween={0}
          centeredSlides={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          navigation={true}
          effect="fade"
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          className="h-full"
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div className="relative h-full flex items-center justify-center bg-red-600">
              <img
                src="/assets/banners/banner1.png"
                alt="Tăng tốc vượt giới hạn"
                className="absolute inset-0 w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-red-800/40" />
              <div className="relative z-10 text-center text-white px-6">
                <h2 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
                  TĂNG TỐC VƯỢT GIỚI HẠN
                </h2>
                <p className="text-lg md:text-xl font-light">
                  Giao đúng giờ – Nhận chu toàn
                </p>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div className="relative h-full flex items-center justify-center bg-gradient-to-r from-red-700 to-red-500">
              <img
                src="https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&w=1600&q=80"
                alt="Nhanh hơn an toàn hơn"
                className="absolute inset-0 w-full h-full object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative z-10 text-white text-center px-6">
                <h2 className="text-5xl font-bold mb-2">
                  Nhanh hơn – An toàn hơn
                </h2>
                <p className="text-lg">SpeedyShip – Vận chuyển đáng tin cậy</p>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide>
            <div className="relative h-full flex items-center justify-center bg-gray-900">
              <img
                src="https://images.unsplash.com/photo-1598515213640-5b086db46a42?auto=format&fit=crop&w=1600&q=80"
                alt="Giao hàng toàn quốc"
                className="absolute inset-0 w-full h-full object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-black/50" />
              <div className="relative z-10 text-white text-center px-6">
                <h2 className="text-5xl font-bold mb-2">Giao hàng toàn quốc</h2>
                <p className="text-lg">
                  Mọi miền đất nước – Nhanh, uy tín, chuyên nghiệp
                </p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        {/* 🔍 Tracking form */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-2xl">
          <div className="bg-white rounded-lg shadow-lg p-3 flex flex-col md:flex-row gap-2 items-center justify-between">
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

      {/* 🚀 Services */}
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

      {/* 💼 Partners */}
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
