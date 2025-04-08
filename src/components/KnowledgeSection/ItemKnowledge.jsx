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
    <Link to={`/tong-quan/article.${slug}=${id}`}>
      <div className="text-start grid lg:grid-cols-[1fr_2fr] gap-3 cursor-pointer">
        <img
          src={displayImage}
          alt={displayTitle}
          className="w-full h-[300px] aspect-square md:aspect-[4/3] md:h-auto object-cover md:mx-auto"
        />
        <div className="mx-auto w-full">
          <h1 className="text-lg font-semibold hover:text-brandSecondary line-clamp-1">
            {displayTitle}
          </h1>
          <p className="text-base line-clamp-2">{displaySummary}</p>
          <i className="text-sm mt-2 text-neutralDGrey">
            {createDate ? format(createDate, "dd-MM-yyyy") : ""}
          </i>
        </div>
      </div>
    </Link>
  );
}
