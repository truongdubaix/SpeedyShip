import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ✅ Cấu hình chuẩn cho React Router
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true, // tự mở trình duyệt khi chạy
    historyApiFallback: true,
  },
});
