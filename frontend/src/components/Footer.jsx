export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 px-6">
        <div>
          <h4 className="text-xl font-bold mb-3">🚚 SpeedyShip</h4>
          <p className="text-gray-400 text-sm">
            Giải pháp vận chuyển hiện đại dành cho mọi quy mô doanh nghiệp.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-3">Liên hệ</h4>
          <p className="text-gray-300 text-sm">Email: support@speedyship.com</p>
          <p className="text-gray-300 text-sm">Hotline: 1900 888 999</p>
          <p className="text-gray-300 text-sm">
            123 Nguyễn Văn Linh, Q.7, TP.HCM
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-3">Kết nối</h4>
          <div className="flex space-x-4 text-gray-300">
            <a href="#" className="hover:text-blue-400">
              Facebook
            </a>
            <a href="#" className="hover:text-blue-400">
              LinkedIn
            </a>
            <a href="#" className="hover:text-blue-400">
              YouTube
            </a>
          </div>
        </div>
      </div>
      <p className="text-center text-gray-500 text-sm mt-8">
        © 2025 SpeedyShip. All rights reserved.
      </p>
    </footer>
  );
}
