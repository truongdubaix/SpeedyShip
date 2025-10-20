export default function Contact() {
  return (
    <>
      <section className="pt-28 pb-12 bg-gradient-to-r from-blue-600 to-blue-400 text-white text-center">
        <h2 className="text-4xl font-bold mb-4" data-aos="fade-down">
          Liên hệ & Hỗ trợ
        </h2>
        <p className="text-blue-100 max-w-2xl mx-auto" data-aos="fade-up">
          SpeedyShip luôn sẵn sàng lắng nghe và hỗ trợ bạn 24/7.
        </p>
      </section>

      <section className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-10">
        <div data-aos="fade-right">
          <h3 className="text-2xl font-bold mb-4">📍 Văn phòng chính</h3>
          <p className="text-gray-600 mb-3">
            123 Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh
          </p>
          <p className="text-gray-600 mb-3">
            Hotline: <strong>1900 888 999</strong>
          </p>
          <p className="text-gray-600 mb-3">Email: support@speedyship.com</p>
          <iframe
            src="https://www.google.com/maps?q=Nguyen+Van+Linh,+District+7,+Ho+Chi+Minh&output=embed"
            width="100%"
            height="300"
            className="rounded-lg shadow mt-6"
            title="map"
          />
        </div>

        <div data-aos="fade-left">
          <h3 className="text-2xl font-bold mb-4">✉️ Gửi yêu cầu hỗ trợ</h3>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Đã gửi yêu cầu!");
            }}
          >
            <input
              type="text"
              placeholder="Họ và tên"
              className="w-full border p-3 rounded"
              required
            />
            <input
              type="email"
              placeholder="Email liên hệ"
              className="w-full border p-3 rounded"
              required
            />
            <textarea
              rows="5"
              placeholder="Nội dung yêu cầu..."
              className="w-full border p-3 rounded"
            />
            <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition">
              Gửi yêu cầu
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
