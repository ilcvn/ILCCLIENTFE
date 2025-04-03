import React from "react";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";

// Hàm tạo slug cho tiêu đề
const createSlug = (title) => {
  return title ? title.trim().toLowerCase().replace(/\s+/g, "-") : "unknown";
};
const fallbackImage =
  "https://th.bing.com/th/id/OIP.e56dGC9pD_mOD9EvzRg_4QHaEK?rs=1&pid=ImgDetMain";

// Ảnh mặc định nếu preview_img bị null

export default function CardKnowledge({
  basePath,
  id,
  title,
  preview_img,
  summary,
}) {
  const {t} = useTranslation();
  const displayTitle = title || " ";
  const displayImage = preview_img || fallbackImage;
  const displaySummary = summary || " ";
  const linkSlug = createSlug(displayTitle);
  const cleanBasePath =
    basePath && basePath.startsWith("/") ? basePath.substring(1) : basePath;

  const linkTo = `/${cleanBasePath}/article.${linkSlug}=${id}`;

  const getID = (e) => {
    e.preventDefault();
  };

  return (
    <Link to={linkTo}>
      <div className="group text-start cursor-pointer">
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
          <a
            href=""
            onClick={getID}
            className="text-base w-full inline-block p-4 mx-2 text-end text-brandSecondary font-semibold hover:mx-1 hover:text-red-600"
          >
           {t("homepage.blogCard.btnContent")}
          </a>
        </div>
      </div>
    </Link>
  );
}
