import { Eye, MessageCircleMore } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
const createSlug = (title) => {
  return title ? title.trim().toLowerCase().replace(/\s+/g, "-") : "unknown";
};
export default function Card({ id, preview_img, title, summary, views = 0, comments = 0, star = 3 }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleClick = () => {
    // Tạo slug từ fullName và kết hợp với id theo định dạng "slug=id"
    const slug = createSlug(title);
    navigate(`/dich-vu/${id}`);
  };

  const [rating, setRating] = useState(star);
  const [totalComments, setTotalComments] = useState(0);

  return (
    <div className="text-justify cursor-pointer w-full" onClick={handleClick}>
      <div className="overflow-hidden rounded-md hover:scale-105 duration-300">
        <div className="w-full aspect-[3/2]">
          <img
            src={
              preview_img ||
              "https://th.bing.com/th/id/OIP.2DKs9SGRKVXDYlFidn7NQAHaH5?w=1500&h=1600&rs=1&pid=ImgDetMain"
            }
            alt={title || " "}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="p-1">
        <h1 className="text-base font-semibold py-1 text-brandPrimary hover:text-brandSecondary text-justify">
          {title || ""}
        </h1>

        <p className="text-[14px] line-clamp-4 h-[85px]">{summary || ""}</p>

        <div
          className="flex flex-row gap-2 items-center 
                md:flex-col md:items-start md:gap-2 
                lg:flex-row lg:items-center lg:justify-between lg:gap-6"
        >
          {/* Stars */}
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                onClick={() => {}}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={rating >= star ? "#facc15" : "#e5e7eb"}
                className="w-5 h-5 cursor-pointer transition-colors"
              >
                <path d="M12 .587l3.668 7.431L24 9.168l-6 5.849L19.335 24 12 19.897 4.665 24 6 15.017 0 9.168l8.332-1.15z" />
              </svg>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="w-full text-[10px] text-gray-500">
              <div className="flex items-center gap-2">
                <span className="text-[16px]"> {comments || 0}</span>
                <MessageCircleMore className="w-4 h-4" />
              </div>
            </div>

            <div className="w-full text-[10px] text-gray-500">
              <div className="flex items-center gap-2">
                <span className="text-[16px]"> {views || 0}</span>
                <Eye className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* "Xem thêm" button */}
          <a
            href=""
            className="text-sm text-brandSecondary font-semibold hover:text-red-600 
              w-full text-right 
              md:self-end md:w-auto 
              lg:w-full lg:text-left whitespace-nowrap"
          >
            {t("homepage.blogCard.btnContent")}
          </a>
        </div>
      </div>
    </div>
  );
}
