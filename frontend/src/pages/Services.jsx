export default function About() {
  return (
    <>
      <section className="pt-28 pb-16 bg-gradient-to-r from-blue-600 to-blue-400 text-white text-center">
        <h2 className="text-4xl font-bold mb-4" data-aos="fade-down">
          Về chúng tôi
        </h2>
        <p className="text-blue-100 max-w-2xl mx-auto" data-aos="fade-up">
          SpeedyShip kết nối khách hàng, tài xế và doanh nghiệp trong một hệ
          sinh thái giao hàng nhanh, an toàn, minh bạch.
        </p>
      </section>

      <section className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-10">
        <img
          src="https://images.unsplash.com/photo-1597096870063-6c89e0b5a362?auto=format&fit=crop&w=800&q=80"
          className="rounded-lg shadow-lg"
          data-aos="fade-right"
        />
        <div data-aos="fade-left">
          <h3 className="text-3xl font-bold mb-4">💡 Tầm nhìn & Sứ mệnh</h3>
          <p className="text-gray-600 mb-4">
            Trở thành nền tảng logistics hàng đầu Việt Nam, mang lại dịch vụ
            giao hàng nhanh chóng, minh bạch, chi phí tối ưu.
          </p>
          <p className="text-gray-600 mb-4">
            Ứng dụng GPS, AI và cloud để tối ưu vận hành, giúp doanh nghiệp tiết
            kiệm thời gian & nhân lực.
          </p>
          <a
            href="/services"
            className="bg-blue-600 text-white px-5 py-3 rounded hover:bg-blue-700 transition"
          >
            Khám phá dịch vụ
          </a>
        </div>
      </section>

      <section className="bg-blue-50 py-16">
        <h3 className="text-3xl font-bold text-center mb-12" data-aos="fade-up">
          🌟 Giá trị cốt lõi
        </h3>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6 text-center">
          {[
            { t: "Tốc độ", d: "Tối ưu thời gian xử lý và giao hàng." },
            { t: "Minh bạch", d: "Trạng thái & chi phí rõ ràng, dễ theo dõi." },
            { t: "Tin cậy", d: "Đội ngũ & hệ thống đảm bảo an toàn." },
          ].map((v, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-lg shadow"
              data-aos="zoom-in"
            >
              <h4 className="font-semibold text-blue-600 text-xl mb-2">
                {v.t}
              </h4>
              <p className="text-gray-600">{v.d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
