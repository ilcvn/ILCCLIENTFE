import React from "react";
import { useNavigate } from "react-router-dom";
const createSlug = (title) => {
  return title
    ? title.trim().toLowerCase().replace(/\s+/g, "-")
    : "unknown";
};
export default function Card({ id,preview_img, title, summary }) {
  
    const navigate = useNavigate();
  const handleClick = () => {
      // Tạo slug từ fullName và kết hợp với id theo định dạng "slug=id"
      const slug = createSlug(title);
      navigate(`/dich-vu/${slug}=${id}`);
    };
  
  
  return (
    <div className="text-justify cursor-pointer w-full" onClick={handleClick}>
      <div className="overflow-hidden rounded-md hover:scale-105 duration-300">
        <div className="w-full aspect-[3/2]">
          <img src={preview_img||"https://th.bing.com/th/id/OIP.2DKs9SGRKVXDYlFidn7NQAHaH5?w=1500&h=1600&rs=1&pid=ImgDetMain"} alt={title||" "} className="w-full h-full object-cover" />
        </div>
      </div>
      <div className="p-1">
        <h1 className="text-base font-semibold py-1 text-brandPrimary hover:text-brandSecondary text-justify">
          {title||""}
        </h1>
        <p className="text-[14px] line-clamp-4 h-[85px]">{summary||""}</p>
        <a
          href=""
          className="text-[14px] h-16 p-1 text-brandSecondary font-semibold hover:text-base hover:text-red-600"
        >
          Xem Thêm
        </a>
      </div>
    </div>
  );
}
