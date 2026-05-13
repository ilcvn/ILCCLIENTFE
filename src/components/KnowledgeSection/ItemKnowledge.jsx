import { format } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";

// Đường dẫn ảnh fallback khi preview_img bị null
const fallbackImage =
  "https://th.bing.com/th/id/OIP.e56dGC9pD_mOD9EvzRg_4QHaEK?rs=1&pid=ImgDetMain";

export default function ItemKnowledge({
  id,
  title,
  preview_img,
  summary,
  createDate,
  path,
  ...rest
}) {
  // Cung cấp dữ liệu ảo nếu các trường bị null hoặc undefined
  const displayTitle = title || "Chưa có tiêu đề";
  const displayImage = preview_img || fallbackImage;
  const displaySummary = summary || "Không có mô tả cho bài viết này.";

  // Tạo slug từ displayTitle, chuyển khoảng trắng thành dấu -
  const slug = displayTitle.replace(/\s+/g, "-");

  const handleGetID = (e) => {
    e.preventDefault();
  };

  return (
    <Link to={`/${path}/${id}`}>
      <div className="text-start grid lg:grid-cols-[1fr_2fr] gap-3 cursor-pointer">
        <img
          src={displayImage}
          alt={displayTitle}
          className="w-full h-[200px] md:aspect-[4/3] md:h-auto object-cover md:mx-auto"
        />
        <div className="mx-auto w-full">
          <h2 className="text-sm font-semibold text-gray-900 group-hover:text-brandSecondary line-clamp-1">
            {displayTitle}
          </h2>
          <p className="mt-1 text-xs line-clamp-2">{displaySummary}</p>
          <i className="mt-1.5 block text-xs text-gray-400">
            {createDate ? format(createDate, "dd-MM-yyyy") : ""}
          </i>
        </div>
      </div>
    </Link>
  );
}
