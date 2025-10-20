// src/pages/Unauthorized.jsx
export default function Unauthorized() {
  return (
    <div className="flex items-center justify-center h-screen bg-red-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-2">403</h1>
        <p className="text-gray-700">Bạn không có quyền truy cập trang này.</p>
        <a
          href="/"
          className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Quay lại trang chủ
        </a>
      </div>
    </div>
  );
}
