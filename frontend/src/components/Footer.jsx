export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-12 mt-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 px-6">
        {/* Cột 1 - Giới thiệu */}
        <div data-aos="fade-up">
          <h4 className="text-xl font-bold mb-3">🚚 SpeedyShip Đà Nẵng</h4>
          <p className="text-gray-400 text-sm leading-relaxed">
            Nền tảng giao hàng thông minh hàng đầu Việt Nam — nhanh chóng, an
            toàn và minh bạch.
            <br />
            Trung tâm điều hành tại <strong>TP. Đà Nẵng</strong>.
          </p>
        </div>

        {/* Cột 2 - Liên hệ */}
        <div data-aos="fade-up" data-aos-delay="100">
          <h4 className="text-lg font-semibold mb-3">📞 Liên hệ</h4>
          <p className="text-gray-300 text-sm">Email: support@speedyship.com</p>
          <p className="text-gray-300 text-sm">Hotline: 1900 888 999</p>
          <p className="text-gray-300 text-sm">
            55 Nguyễn Văn Linh, Q. Hải Châu, Đà Nẵng
          </p>
        </div>

        {/* Cột 3 - Kết nối mạng xã hội */}
        <div data-aos="fade-up" data-aos-delay="200">
          <h4 className="text-lg font-semibold mb-3">
            🌐 Kết nối với chúng tôi
          </h4>
          <div className="flex space-x-5 text-gray-400 text-sm">
            <a
              href="#"
              className="hover:text-blue-400 transition transform hover:-translate-y-1"
            >
              <i className="fab fa-facebook"></i> Facebook
            </a>
            <a
              href="#"
              className="hover:text-blue-400 transition transform hover:-translate-y-1"
            >
              <i className="fab fa-linkedin"></i> LinkedIn
            </a>
            <a
              href="#"
              className="hover:text-blue-400 transition transform hover:-translate-y-1"
            >
              <i className="fab fa-youtube"></i> YouTube
            </a>
          </div>
        </div>
      </div>

      {/* Dòng bản quyền */}
      <p className="text-center text-gray-500 text-sm mt-10">
        © {new Date().getFullYear()} SpeedyShip Đà Nẵng. All rights reserved.
      </p>
    </footer>
  );
}
