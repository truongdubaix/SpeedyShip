import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// 🗺️ Icon marker văn phòng
const officeIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [38, 38],
  iconAnchor: [19, 38],
});

function ZoomToOffice() {
  const map = useMap();
  useEffect(() => {
    map.setView([16.0544, 108.2022], 13, { animate: true });
  }, [map]);
  return null;
}

export default function Contact() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <>
      {/* Header */}
      <section className="pt-28 pb-12 bg-gradient-to-r from-blue-600 to-sky-500 text-white text-center">
        <h2 className="text-4xl font-extrabold mb-4" data-aos="fade-down">
          Liên hệ & Hỗ trợ
        </h2>
        <p className="text-blue-100 max-w-2xl mx-auto" data-aos="fade-up">
          SpeedyShip Đà Nẵng luôn sẵn sàng lắng nghe và hỗ trợ bạn 24/7 — nhanh
          chóng, tận tâm, chuyên nghiệp.
        </p>
      </section>

      {/* Contact info + Form */}
      <section className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-10">
        {/* Left - Info */}
        <div data-aos="fade-right">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">
            📍 Văn phòng chính - Đà Nẵng
          </h3>
          <p className="text-gray-600 mb-3">
            55 Nguyễn Văn Linh, Quận Hải Châu, TP. Đà Nẵng, Việt Nam
          </p>
          <p className="text-gray-600 mb-3">
            Hotline: <strong>1900 888 999</strong>
          </p>
          <p className="text-gray-600 mb-3">
            Email: <strong>support@speedyship.com</strong>
          </p>
          <p className="text-gray-600">
            Giờ làm việc: <strong>Thứ 2 - Thứ 7 (8:00 - 18:00)</strong>
          </p>

          {/* Leaflet Map */}
          <div className="rounded-lg shadow-lg mt-6 overflow-hidden h-[320px]">
            <MapContainer
              center={[16.0544, 108.2022]}
              zoom={12}
              scrollWheelZoom={false}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[16.0544, 108.2022]} icon={officeIcon}>
                <Popup>
                  <strong>SpeedyShip Đà Nẵng</strong>
                  <br />
                  55 Nguyễn Văn Linh, Hải Châu, Đà Nẵng
                </Popup>
              </Marker>
              <ZoomToOffice />
            </MapContainer>
          </div>
        </div>

        {/* Right - Form */}
        <div data-aos="fade-left">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">
            ✉️ Gửi yêu cầu hỗ trợ
          </h3>
          <p className="text-gray-600 mb-6">
            Điền thông tin bên dưới, đội ngũ SpeedyShip Đà Nẵng sẽ phản hồi
            trong thời gian sớm nhất.
          </p>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              alert(
                "✅ Yêu cầu của bạn đã được gửi! Cảm ơn bạn đã liên hệ SpeedyShip Đà Nẵng."
              );
            }}
          >
            <input
              type="text"
              placeholder="Họ và tên"
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="email"
              placeholder="Email liên hệ"
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="tel"
              placeholder="Số điện thoại"
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <textarea
              rows="5"
              placeholder="Nội dung yêu cầu..."
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition font-semibold"
            >
              Gửi yêu cầu
            </button>
          </form>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-blue-50 py-12 text-center">
        <h4
          className="text-2xl font-bold mb-3 text-gray-800"
          data-aos="fade-up"
        >
          💬 Cần hỗ trợ ngay?
        </h4>
        <p
          className="text-gray-600 mb-6"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Liên hệ tổng đài <strong>1900 888 999</strong> hoặc chat trực tuyến
          với đội ngũ SpeedyShip Đà Nẵng.
        </p>
        <a
          href="mailto:support@speedyship.com"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
          data-aos="zoom-in"
        >
          📧 Gửi Email Hỗ Trợ
        </a>
      </section>
    </>
  );
}
