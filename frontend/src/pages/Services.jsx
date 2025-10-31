import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function About() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-r from-blue-600 to-sky-500 text-white text-center">
        <img
          src="/assets/logo/logoSpeedyShip.png"
          alt="SpeedyShip Logo"
          className="w-40 h-40 mx-auto mb-6 rounded-full object-cover drop-shadow-2xl border-4 border-white"
          data-aos="zoom-in"
        />

        <h2 className="text-4xl font-extrabold mb-4" data-aos="fade-down">
          Về chúng tôi
        </h2>
        <p
          className="text-blue-100 max-w-2xl mx-auto text-lg"
          data-aos="fade-up"
        >
          SpeedyShip là nền tảng giao hàng thông minh có trụ sở tại{" "}
          <strong>Đà Nẵng</strong>, kết nối khách hàng, tài xế và doanh nghiệp
          trong một hệ sinh thái vận chuyển nhanh, an toàn, minh bạch.
        </p>
      </section>

      {/* Vision & Mission */}
      <section className="max-w-6xl mx-auto py-20 px-6 grid md:grid-cols-2 gap-10 items-center">
        <div className="relative" data-aos="fade-right">
          <img
            src="https://sp-ao.shortpixel.ai/client/to_avif,q_lossless,ret_img,w_1024/https://phulinh.vn/wp-content/uploads/2020/07/kh-1024x683.jpg"
            alt="SpeedyShip logistics Da Nang"
            className="rounded-lg shadow-lg hover:scale-[1.02] transition-transform duration-300"
          />
          <img
            src="/assets/logo/logoSpeedyShip.png"
            alt="SpeedyShip Logo"
            className="absolute bottom-4 right-4 w-14 h-14 rounded-full bg-white p-1 shadow-md"
          />
        </div>

        <div data-aos="fade-left">
          <h3 className="text-3xl font-bold mb-4 text-gray-800">
            💡 Tầm nhìn & Sứ mệnh
          </h3>

          <p className="text-gray-600 mb-4 leading-relaxed">
            Với trung tâm hoạt động tại <strong>TP. Đà Nẵng</strong> – thành phố
            năng động nhất miền Trung, SpeedyShip hướng đến mục tiêu trở thành
            nền tảng logistics hàng đầu Việt Nam.
          </p>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Ứng dụng công nghệ GPS, AI và Cloud để tối ưu vận hành, giúp doanh
            nghiệp tiết kiệm chi phí, đồng thời mang đến trải nghiệm giao hàng
            nhanh chóng, minh bạch và an toàn cho người dùng.
          </p>
          <a
            href="/services"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Khám phá dịch vụ
          </a>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-blue-50 py-20">
        <h3
          className="text-3xl font-bold text-center mb-12 text-gray-800"
          data-aos="fade-up"
        >
          🌟 Giá trị cốt lõi
        </h3>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6 text-center">
          {[
            {
              icon: "⚡",
              title: "Tốc độ",
              desc: "Tối ưu thời gian xử lý và giao hàng với công nghệ hiện đại.",
            },
            {
              icon: "💬",
              title: "Minh bạch",
              desc: "Cập nhật trạng thái và chi phí rõ ràng, dễ theo dõi từng bước.",
            },
            {
              icon: "🤝",
              title: "Tin cậy",
              desc: "Đội ngũ tận tâm, đảm bảo hàng hóa đến đúng nơi, đúng thời gian.",
            },
          ].map((v, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300"
              data-aos="zoom-in"
              data-aos-delay={i * 150}
            >
              <div className="text-4xl mb-3">{v.icon}</div>
              <h4 className="font-semibold text-blue-600 text-xl mb-2">
                {v.title}
              </h4>
              <p className="text-gray-600">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Achievements / Stats */}
      <section className="bg-gradient-to-r from-sky-100 to-blue-50 py-20">
        <h3
          className="text-3xl font-bold text-center mb-12 text-gray-800"
          data-aos="fade-up"
        >
          🎯 Thành tựu & Số liệu nổi bật
        </h3>

        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-center">
          {[
            { num: "10.000+", label: "Đơn hàng đã giao" },
            { num: "99%", label: "Tỷ lệ giao đúng hẹn" },
            { num: "50+", label: "Đối tác doanh nghiệp" },
            { num: "24/7", label: "Hỗ trợ khách hàng" },
          ].map((s, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition"
              data-aos="zoom-in"
              data-aos-delay={i * 150}
            >
              <h4 className="text-4xl font-extrabold text-blue-600 mb-2">
                {s.num}
              </h4>
              <p className="text-gray-600 font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team / Contact */}
      <section className="py-20 bg-white text-center px-6">
        <h3
          className="text-3xl font-bold mb-6 text-gray-800"
          data-aos="fade-up"
        >
          {" "}
          {/* Logo thương hiệu */}
          <img
            src="/assets/logo/logoSpeedyShip.png"
            alt="SpeedyShip Logo"
            className="w-24 h-24 mx-auto mb-6 rounded-full object-cover drop-shadow-md"
            data-aos="zoom-in"
          />
          👨‍💻 Đội ngũ SpeedyShip Đà Nẵng
        </h3>
        <p
          className="max-w-3xl mx-auto text-gray-600 mb-10"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          SpeedyShip được vận hành bởi những kỹ sư trẻ đam mê công nghệ và
          logistics tại <strong>Đà Nẵng</strong> – thành phố đáng sống nhất Việt
          Nam.
          <br />
          Chúng tôi không ngừng cải tiến để mang lại dịch vụ vận chuyển nhanh,
          an toàn và tiện lợi cho mọi khách hàng trên toàn quốc.
        </p>

        <a
          href="/contact"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
          data-aos="zoom-in"
        >
          Liên hệ với chúng tôi
        </a>
      </section>
    </>
  );
}
