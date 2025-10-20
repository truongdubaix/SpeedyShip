import { useState } from "react";

export default function Tracking() {
  const [code, setCode] = useState("");
  const [shown, setShown] = useState(false);
  const mock = {
    code: "SP123456",
    sender: "Phạm Minh",
    receiver: "Nguyễn Lan",
    phone: "0912 345 678",
    status: "Đang giao hàng",
    cod: 120000,
    created: "2025-10-20",
    pay: "COD",
    timeline: [
      {
        title: "Đã tạo đơn hàng",
        time: "2025-10-19 08:30",
        note: "Hệ thống ghi nhận đơn mới",
        type: "done",
      },
      {
        title: "Đã lấy hàng",
        time: "2025-10-19 10:20",
        note: "Tài xế Trần Tài đã lấy hàng",
        type: "done",
      },
      {
        title: "Đang giao hàng",
        time: "2025-10-20 09:00",
        note: "Tại Quận 1, TP.HCM",
        type: "active",
      },
      {
        title: "Chờ xác nhận hoàn tất",
        time: "Dự kiến 11:30",
        note: "",
        type: "pending",
      },
    ],
  };

  const search = () => {
    if (!code || code.length < 3)
      return alert("Vui lòng nhập mã vận đơn hợp lệ!");
    setShown(true);
  };

  return (
    <>
      <section className="pt-28 pb-10 bg-gradient-to-r from-blue-600 to-blue-400 text-white text-center">
        <h2 className="text-3xl font-bold mb-4" data-aos="fade-down">
          Tra cứu trạng thái vận đơn
        </h2>
        <p className="mb-6 text-blue-100" data-aos="fade-up">
          Nhập mã đơn hàng để xem thông tin chi tiết
        </p>
        <div
          className="flex flex-col md:flex-row items-center justify-center gap-3 max-w-2xl mx-auto px-4"
          data-aos="zoom-in"
        >
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            type="text"
            placeholder="Nhập mã vận đơn (VD: SP123456)"
            className="w-full md:w-3/4 p-3 rounded text-gray-700 focus:outline-none"
          />
          <button
            onClick={search}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded font-semibold transition"
          >
            Tra cứu
          </button>
        </div>
      </section>

      {shown && (
        <section className="max-w-5xl mx-auto py-16 px-6" data-aos="fade-up">
          {/* Summary */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-10">
            <h3 className="text-2xl font-bold text-gray-700 mb-4">
              📦 Thông tin đơn hàng
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p>
                  <strong>Mã đơn:</strong> {code || mock.code}
                </p>
                <p>
                  <strong>Người gửi:</strong> {mock.sender}
                </p>
                <p>
                  <strong>Người nhận:</strong> {mock.receiver}
                </p>
                <p>
                  <strong>Số điện thoại:</strong> {mock.phone}
                </p>
              </div>
              <div>
                <p>
                  <strong>Trạng thái:</strong>{" "}
                  <span className="text-blue-600 font-semibold">
                    {mock.status}
                  </span>
                </p>
                <p>
                  <strong>COD:</strong> ₫{mock.cod.toLocaleString("vi-VN")}
                </p>
                <p>
                  <strong>Ngày tạo:</strong> {mock.created}
                </p>
                <p>
                  <strong>Thanh toán:</strong> {mock.pay}
                </p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-bold text-gray-700 mb-6">
              📍 Hành trình đơn hàng
            </h3>
            <ol className="relative border-l-2 border-blue-200 ml-6">
              {mock.timeline.map((t, i) => (
                <li key={i} className="mb-8 ml-6">
                  <span
                    className={`absolute -left-[11px] w-[14px] h-[14px] rounded-full ${
                      t.type === "done"
                        ? "bg-green-500"
                        : t.type === "active"
                        ? "bg-blue-600"
                        : "bg-yellow-500"
                    }`}
                  />
                  <p
                    className={`font-semibold ${
                      t.type === "done"
                        ? "text-green-600"
                        : t.type === "active"
                        ? "text-blue-600"
                        : "text-gray-500"
                    }`}
                  >
                    {t.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    {t.time} {t.note && `- ${t.note}`}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* Actions */}
          <div className="text-center mt-10">
            <a
              href="/customer-create-shipment"
              className="bg-blue-600 text-white px-5 py-3 rounded hover:bg-blue-700 transition"
            >
              Tạo đơn mới
            </a>
            <a
              href="/contact"
              className="ml-4 border border-blue-600 text-blue-600 px-5 py-3 rounded hover:bg-blue-50 transition"
            >
              Liên hệ hỗ trợ
            </a>
          </div>
        </section>
      )}
    </>
  );
}
