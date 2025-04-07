import React from "react";
import {useNavigate} from "react-router-dom";
import {getRoles} from "../helper/RoleMember";
import {getTitles} from "../helper/TitleMember";
import {useTranslation} from "react-i18next";
import { RiLeafFill } from "react-icons/ri";

// Hàm chuyển đổi fullName thành slug (ví dụ "Thành Viên" -> "thanh-vien")
const createSlug = (title) => {
  return title ? title.trim().toLowerCase().replace(/\s+/g, "-") : "unknown";
};

export default function CardAvatar({props = {}}) {
  const {
    id = "unknown-id",
    fullName = "",
    imgUrl = "https://www.thaimediafund.or.th/wp-content/uploads/2024/07/default-avatar-profile-icon--1280x1280.jpg",
    role = null,
    penName = null,
    department = null,
  } = props;

  const language = localStorage.getItem("language");
  const navigate = useNavigate();
  const {t} = useTranslation();
  const ChangeRole = getRoles();

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
  const getRoleTitles = (roles) => {
    const roleValues = [roles.split(",").map((role) => role.trim())[0]];

    const roleNames = roleValues.map((roleValue) => {
      const roleFound = ChangeRole.find((item) => item.value === roleValue);
      return roleFound ? roleFound.title : "Chưa có vai trò";
    });
    return roleNames.join(", ");
  };
  // Hàm tìm kiếm title dựa trên penName
  const getRoleTitlesWithDepartments = (roles, departments) => {
    if (!roles) return "";
    let role_department = "";

    let origin_roles = roles.split(", ");
    let origin_departments = departments.split(", ");

    for (let i = 0; i < origin_departments.length; i++) {
      if (i !== 0) {
        role_department += ", ";
      }

      if (
        origin_departments[i] === "BOARD_OF_DIRECTORS" &&
        origin_roles[i] !== "MEMBER"
      ) {
        role_department +=
          t(`roles.${origin_roles[i]}`) +
          " " +
          t(`about.${origin_departments[i]}`);
      } else {
        role_department +=
          t(`roles.${origin_roles[i]}`) +
          " " +
          t(`about.${origin_departments[i]}`);
      }
    }
    return role_department;
  };

  return (
    <div
      className="text-center cursor-pointer w-full"
      // onClick={language === "vi" ? handleClick : undefined}
    >
      <img
        src={imgUrl}
        alt={fullName}
        className="p-1 w-[330px]  aspect-square mx-auto rounded-full object-cover transition-transform duration-300 hover:scale-90"
      />
      <div className="p-2 md:mb-0  w-full lg:h-36 h-60 bg-white rounded-md shadow-md flex flex-col items-center justify-center text-center">
        <h2 className="text-base font-bold mt-2 p-1 w-full text-brandPrimary">
          {fullName.toUpperCase()}
        </h2>
        <p className="text-[14px] md:my-1 font-bold text-brandSecondary ">
          {getRoleTitles(role)}
        </p>
        <h2 className="text-[12px] p-1 my-2 w-full font-semibold opacity-80 text-black">
          {penName.toUpperCase()}
        </h2>
      </div>
    </div>
  );
}
