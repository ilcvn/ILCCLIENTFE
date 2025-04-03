import React from "react";
import { useNavigate } from "react-router-dom";
import { getRoles } from "../helper/RoleMember";
import { getTitles } from "../helper/TitleMember";

// Hàm chuyển đổi fullName thành slug (ví dụ "Thành Viên" -> "thanh-vien")
const createSlug = (title) => {
  return title ? title.trim().toLowerCase().replace(/\s+/g, "-") : "unknown";
};

export default function CardAvatar({ props = {} }) {
  const {
    id = "unknown-id",
    fullName = "",
    imgUrl = "https://www.thaimediafund.or.th/wp-content/uploads/2024/07/default-avatar-profile-icon--1280x1280.jpg",
    role = null,
    penName = null,
  } = props;

  const language = localStorage.getItem("language");
  const navigate = useNavigate();

  const handleClick = () => {
    // Tạo slug từ fullName và kết hợp với id theo định dạng "slug=id"
    const slug = createSlug(fullName);
    navigate(`/thanh-vien/${slug}=${id}`);
  };

  // Hàm tìm kiếm title của role dựa trên value
  const getRoleTitle = (roleValue) => {
    if (!roleValue) return " ";
    const roles = getRoles();
    const roleFound = roles.find(
      (role) => role.value === roleValue.toUpperCase()
    );
    return roleFound ? roleFound.title : "";
  };

  // Hàm tìm kiếm title dựa trên penName
  const getTitle = (titleValue) => {
    if (!titleValue) return "";
    const titles = getTitles();
    const titleFound = titles.find(
      (title) => title.value === titleValue.toUpperCase()
    );
    return titleFound ? titleFound.title : "";
  };

  return (
    <div
      className="text-center cursor-pointer"
      onClick={language === "vi" ? handleClick : undefined}
    >
      <img
        src={imgUrl}
        alt={fullName}
        className="p-2 w-[330px] aspect-square mx-auto rounded-full object-cover transition-transform duration-300 hover:scale-90"
      />
      <div className="p-2">
        <h1 className="text-lg font-bold p-2 w-full h-8 text-brandSecondary">
          {getTitle(penName)}
        </h1>
        <h1 className="text-lg font-bold p-2 w-full h-8 text-brandSecondary">
          {fullName}
        </h1>
        <p className="text-[14px] mt-3 text-neutralDGrey font-medium">
          {getRoleTitle(role)}
        </p>
      </div>
    </div>
  );
}
