import {Eye, MessageCircleMore} from "lucide-react";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
const createSlug = (title) => {
  return title ? title.trim().toLowerCase().replace(/\s+/g, "-") : "unknown";
};
export default function Card({
  id,
  preview_img,
  title,
  summary,
  views = 0,
  comments = 0,
  star = 3,
}) {

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
    <div
      className="text-justify cursor-pointer w-full min-h-[300px] h-full flex flex-col justify-between rounded-md hover:scale-105 duration-300 bg-white shadow-sm transition-transform"
      onClick={handleClick}
    >
      {/* IMAGE */}
      <div className="overflow-hidden w-full aspect-[3/2] rounded-t-md">
        <img
          src={
            preview_img ||
            "https://th.bing.com/th/id/OIP.2DKs9SGRKVXDYlFidn7NQAHaH5?w=1500&h=1600&rs=1&pid=ImgDetMain"
          }
          alt={title || " "}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>

      {/* CONTENT */}
      <div className="flex flex-col justify-between flex-1 p-3">
        <div>
          <h1 className="text-base font-semibold text-brandPrimary line-clamp-1 xl:line-clamp-2 md:text-[14px] hover:text-brandSecondary">
            {title || ""}
          </h1>
          <p
            className="text-[14px] line-clamp-3"
            style={{ minHeight: "4.5em" }}
          >
            {summary || ""}
          </p>
        </div>

        {/* RATING + COMMENTS + VIEWS */}
        <div className="flex justify-between items-center gap-1 mt-2 w-full">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={rating >= star ? "#facc15" : "#e5e7eb"}
                className="w-4 h-4"
              >
                <path d="M12 .587l3.668 7.431L24 9.168l-6 5.849L19.335 24 12 19.897 4.665 24 6 15.017 0 9.168l8.332-1.15z" />
              </svg>
            ))}
          </div>

          <div className="flex items-center gap-1 text-gray-500 text-[12px]">
            <div className="flex items-center gap-1">
              <span>{comments || 0}</span>
              <MessageCircleMore className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-1">
              <span>{views || 0}</span>
              <Eye className="w-4 h-4" />
            </div>
          </div>
        </div>

        <div className="mt-2">
          <a
            href=""
            className="block text-sm text-brandSecondary font-semibold hover:text-red-600 text-right"
          >
            {t("homepage.blogCard.btnContent")}
          </a>
        </div>
      </div>
    </div>
  );
}
