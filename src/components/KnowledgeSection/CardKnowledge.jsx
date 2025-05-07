import {Eye, MessageCircleMore} from "lucide-react";
import React, {useCallback, useState} from "react";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";

// Hàm tạo slug cho tiêu đề
const createSlug = (title) => {
  return title ? title.trim().toLowerCase().replace(/\s+/g, "-") : "unknown";
};

// Ảnh mặc định nếu preview_img bị null
const fallbackImage =
  "https://th.bing.com/th/id/OIP.e56dGC9pD_mOD9EvzRg_4QHaEK?rs=1&pid=ImgDetMain";

// eslint-disable-next-line react/prop-types
export default function CardKnowledge({
  basePath,
  id,
  title,
  preview_img,
  summary,
  star = 3,
  views = 0,
  comments = 0,
  typeArticle = "NEWS",
}) {
  const {t} = useTranslation();
  const navigate = useNavigate(); // Dùng để điều hướng
  const useDebounce = (callback, delay) => {
    const [timer, setTimer] = useState(null);

    return useCallback(
      (...args) => {
        if (timer) clearTimeout(timer);
        setTimer(setTimeout(() => callback(...args), delay));
      },
      [callback, delay, timer]
    );
  };
  const displayTitle = title || " ";
  const displayImage = preview_img || fallbackImage;
  const displaySummary = summary || " ";
  const totalViews = views || 0;
  const totalComments = comments || 0;
  const linkSlug = createSlug(displayTitle);
  // eslint-disable-next-line react/prop-types
  const cleanBasePath =
    basePath && basePath.startsWith("/") ? basePath.substring(1) : basePath;

  const linkTo = `/${cleanBasePath}/${id}`;

  const [rating, setRating] = useState(star);

  // Hàm xử lý khi bấm vào Card
  const handleCardClick = useDebounce(() => {
    navigate(linkTo);
  }, 300);
  const handleClickContact = useDebounce(() => {
    navigate("/lien-he");
  }, 300);

  const handleClickDetailArticle = useDebounce(() => {
    navigate(`/dich-vu/${id}`);
  }, 300);

  return (
    <div className="group text-start cursor-pointer border-0 shadow-sm">
      {/* Container ảnh với overflow-hidden */}
      <div className="overflow-hidden" onClick={handleCardClick}>
        <img
          src={displayImage}
          alt={displayTitle}
          loading="lazy"
          className="md:h-[310px] aspect-[2/1] w-full mx-auto transform transition-transform duration-300 ease-in-out group-hover:scale-110"
        />
      </div>
      <div className="text-justify ">
        <div onClick={handleCardClick} className="min-h-[120px]">
          <h1 className="text-lg font-semibold p-1 hover:text-brandSecondary">
            {displayTitle}
          </h1>
          <p className="text-base py-1 line-clamp-3 max-h-[4.5em] text-gray-600">
            {displaySummary}
          </p>
        </div>

        <div className="flex items-center justify-between gap-4 py-2">
          <div className="flex gap-2">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  onClick={() =>
                    // handleRateSubmit(
                    //   INTERACTED_ARTICLE_ENUM["RATE"],
                    //   star.toString()
                    // )

                    {}
                  }
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill={rating >= star ? "#facc15" : "#e5e7eb"}
                  className="xl:w-6 xl:h-6 h-4 w-4 cursor-pointer transition-colors"
                >
                  <path d="M12 .587l3.668 7.431L24 9.168l-6 5.849L19.335 24 12 19.897 4.665 24 6 15.017 0 9.168l8.332-1.15z" />
                </svg>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <div className="w-full text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <span className="lg:text-base text-sm ">
                    {" "}
                    {totalComments}
                  </span>
                  <MessageCircleMore className="w-4 h-4 " />
                </div>
              </div>

              <div className="w-full text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <span className="lg:text-base text-sm "> {totalViews}</span>
                  <Eye className="w-4 h-4 " />
                </div>
              </div>
            </div>
          </div>

          {typeArticle === "NEWS" ? (
            <button
              onClick={handleClickDetailArticle}
              className="block text-sm text-white  bg-brandSecondary p-2 rounded-lg font-semibold hover:bg-red-600 text-center min-w-16 min-h-9"
            >
              {t("homepage.blogCard.btnContent")}
            </button>
          ) : (
            <button
              onClick={handleClickContact}
              className="block text-sm text-white  bg-brandSecondary p-2 rounded-lg font-semibold hover:bg-red-600  min-w-16 min-h-9 text-center"
            >
              {t("homepage.blogCard.btnRegister")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
