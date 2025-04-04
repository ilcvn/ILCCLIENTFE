import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// Hàm tạo slug cho tiêu đề
const createSlug = (title) => {
  return title ? title.trim().toLowerCase().replace(/\s+/g, "-") : "unknown";
};

// Ảnh mặc định nếu preview_img bị null
const fallbackImage =
  "https://th.bing.com/th/id/OIP.e56dGC9pD_mOD9EvzRg_4QHaEK?rs=1&pid=ImgDetMain";

export default function CardKnowledge({ basePath, id, title, preview_img, summary }) {
  const { t } = useTranslation();
  const navigate = useNavigate(); // Dùng để điều hướng

  const displayTitle = title || " ";
  const displayImage = preview_img || fallbackImage;
  const displaySummary = summary || " ";
  const linkSlug = createSlug(displayTitle);
  const cleanBasePath = basePath && basePath.startsWith("/") ? basePath.substring(1) : basePath;

  const linkTo = `/${cleanBasePath}/article.${linkSlug}=${id}`;

  // Hàm xử lý khi bấm vào Card
  const handleCardClick = () => {
    navigate(linkTo);
  };

  return (
    <div
      className="group text-start cursor-pointer"
      onClick={handleCardClick} // Gọi navigate khi click vào toàn bộ card
    >
      {/* Container ảnh với overflow-hidden */}
      <div className="overflow-hidden">
        <img
          src={displayImage}
          alt={displayTitle}
          className="md:h-[310px] aspect-[2/1] w-full mx-auto transform transition-transform duration-300 ease-in-out group-hover:scale-110"
        />
      </div>
      <div className="text-justify">
        <h1 className="text-lg font-semibold p-1 hover:text-brandSecondary">
          {displayTitle}
        </h1>
        <p className="text-base p-1 line-clamp-3">{displaySummary}</p>

        {/* Thay <a> thành <button> để tránh lỗi */}
        <button
          onClick={(e) => e.stopPropagation()} // Ngăn chặn điều hướng khi bấm vào nút
          className="text-base w-full inline-block p-4 mx-2 text-end text-brandSecondary font-semibold hover:mx-1 hover:text-red-600"
        >
          {t("homepage.blogCard.btnContent")}
        </button>
      </div>
    </div>
  );
}
