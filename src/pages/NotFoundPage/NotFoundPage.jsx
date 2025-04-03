import React from "react";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-2xl text-gray-600 mb-4">Không tìm thấy trang</h2>
      <p className="text-gray-500 mb-6">
        Trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-7 py-2 bg-brandPrimary text-white rounded"
      >
        Quay lại trang chủ
      </button>
    </div>
  );
}

export default NotFoundPage;
