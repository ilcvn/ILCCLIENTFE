import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BreadcrumbDynamic from "../../components/layouts/Breadcrumb";
import { getMemberById } from "../../api/Nember/nember";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { useTranslation } from "react-i18next";
import Logo from "../../assets/hello.png";
import { getTitles } from "../../helper/TitleMember";
import { getRoles } from "../../helper/RoleMember";

export default function MemberPage() {
  const { slug } = useParams(); // Lấy slug từ URL

  const ChangeRole = getRoles(); // Lấy roles từ helper
  const ChangeTitle = getTitles(); // Lấy titles từ helper

  const getRoleTitles = (roles) => {
    const roleValues = roles.split(",").map((role) => role.trim());
    const roleNames = roleValues.map((roleValue) => {
      const roleFound = ChangeRole.find((item) => item.value === roleValue);
      return roleFound ? roleFound.title : "";
    });
    return roleNames.join(", ");
  };

  // Hàm để tách học vị và tìm tên học vị
  const getTitleNames = (penName) => {
    // Tách chuỗi theo dấu phẩy
    const penNamesArray = penName.split(',');

    // Dùng map để ánh xạ mỗi giá trị trong mảng penNamesArray
    const titles = penNamesArray.map((pen) => {
      const titleFound = ChangeTitle.find((item) => item.value === pen.trim());
      return titleFound ? titleFound.title : "Chưa có học vị";
    });

    // Trả về chuỗi các tên học vị nối nhau bằng dấu phẩy
    return titles.join(", ");
  };

  const newslug = slug.slice(slug.indexOf("=") + 1);
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchMember = async () => {
      setLoading(true);
      try {
        const response = await getMemberById(newslug);
        setMember(response.data.data); // Lưu lại thông tin thành viên
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchMember();
    }
  }, [slug]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching member: {error.message}</div>;
  if (!member) return <div>No member found</div>;

  return (
    <div className="w-full">
      <BreadcrumbDynamic />
      <img src={Logo} alt="" className="w-full h-full p-4" />

      <div className="bg-white min-h-screen p-6">
        <div className="max-w-screen-2xl mx-auto bg-gray-100 p-8 rounded-lg shadow-lg mb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start relative">
            <img
              src={member.imgUrl}
              alt={member.fullName}
              className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover shadow-lg absolute z-20 bottom-32 border-4 border-brandSecondary/80 hover:border-blue-500 transition-all duration-300"
            />

            <div className="w-48 h-48 md:w-64 md:h-64"></div>

            <div className="md:ml-8 text-center md:text-left">
              <h1 className="text-5xl font-bold text-brandPrimary">
                {member.fullName}
              </h1>
              <p className="text-lg text-gray-600">
                {getRoleTitles(member.role)}
              </p>
              <p className="text-lg text-gray-600">
                {getTitleNames(member.penName)}
              </p>

              <div className="mt-4 flex flex-col gap-2">
                <a
                  href={`tel:${member.phone}`}
                  className="flex items-center space-x-2 text-brandPrimary"
                >
                  <FaPhone /> <span>{member.phone}</span>
                </a>
                <a
                  href={`mailto:${member.gmail}`}
                  className="flex items-center space-x-2 text-brandPrimary"
                >
                  <MdEmail /> <span>{member.gmail}</span>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-brandSecondary">
              {t("memberPage.infoMember")}
            </h2>
            <p className="text-lg text-gray-700 mt-2 text-justify">
              {member.description || "Chưa có thông tin"}
            </p>
          </div>
        </div>

        {/* Các phần thông tin khác */}
        {/* for tung cai cho nay */}
        <div className="max-w-7xl mx-auto bg-gray-100 p-8 rounded-md shadow-lg mb-6">
          {/* StudyStudy */}
          <div className="">
            <h2 className="text-2xl font-semibold text-brandSecondary">
              QUÁ TRÌNH HỌC TẬP
            </h2>
            <ul className="mt-4 space-y-4">
              {/* {member.timeline?.map((event, index) => ( */}
              <li className="border-l-4 border-gray-300 pl-6 relative">
                <div className="w-3 h-3 border-1 border-gray-500 rounded-full bg-brandSecondary absolute -left-2 top-1.5"></div>
                <p className="text-lg font-bold">{"2025"}</p>
                <p className="text-gray-600">{"React 2025"}</p>
              </li>

              <li className="border-l-4 border-gray-300 pl-6 relative">
                <div className="w-3 h-3 border-1 border-gray-500 rounded-full bg-brandSecondary absolute -left-2 top-1.5"></div>
                <p className="text-lg font-bold">{"2025"}</p>
                <p className="text-gray-600">{"React 2025"}</p>
              </li>

              <li className="border-l-4 border-gray-300 pl-6 relative">
                <div className="w-3 h-3 border-1 border-gray-500 rounded-full bg-brandSecondary absolute -left-2 top-1.5"></div>
                <p className="text-lg font-bold">{"2025"}</p>
                <p className="text-gray-600">{"React 2025"}</p>
              </li>

              <li className="border-l-4 border-gray-300 pl-6 relative">
                <div className="w-3 h-3 border-1 border-gray-500 rounded-full bg-brandSecondary absolute -left-2 top-1.5"></div>
                <p className="text-lg font-bold">{"2025"}</p>
                <p className="text-gray-600">{"React 2025"}</p>
              </li>
              {/* )) || <p className="text-gray-500">Chưa có thông tin</p>} */}
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto bg-gray-100 p-8 rounded-md shadow-lg mb-6">
          {/* work */}
          <div className="">
            <h2 className="text-2xl font-semibold text-brandSecondary">
              QUÁ TRÌNH CÔNG TÁC
            </h2>
            <ul className="mt-4 space-y-4">
              {/* {member.timeline?.map((event, index) => ( */}
              <li className="border-l-4 border-gray-300 pl-6 relative">
                <div className="w-3 h-3 border-1 border-gray-500 rounded-full bg-brandSecondary absolute -left-2 top-1.5"></div>
                <p className="text-lg font-bold">{"2025"}</p>
                <p className="text-gray-600">{"React 2025"}</p>
              </li>

              <li className="border-l-4 border-gray-300 pl-6 relative">
                <div className="w-3 h-3 border-1 border-gray-500 rounded-full bg-brandSecondary absolute -left-2 top-1.5"></div>
                <p className="text-lg font-bold">{"2025"}</p>
                <p className="text-gray-600">{"React 2025"}</p>
              </li>

              <li className="border-l-4 border-gray-300 pl-6 relative">
                <div className="w-3 h-3 border-1 border-gray-500 rounded-full bg-brandSecondary absolute -left-2 top-1.5"></div>
                <p className="text-lg font-bold">{"2025"}</p>
                <p className="text-gray-600">{"React 2025"}</p>
              </li>

              <li className="border-l-4 border-gray-300 pl-6 relative">
                <div className="w-3 h-3 border-1 border-gray-500 rounded-full bg-brandSecondary absolute -left-2 top-1.5"></div>
                <p className="text-lg font-bold">{"2025"}</p>
                <p className="text-gray-600">{"React 2025"}</p>
              </li>
              {/* )) || <p className="text-gray-500">Chưa có thông tin</p>} */}
            </ul>
          </div>
        </div>

        {/* experience */}
        <div className="max-w-7xl mx-auto bg-gray-100 p-8 rounded-md shadow-lg mb-6">
          <div className="">
            <h2 className="text-2xl font-semibold text-brandSecondary">
              KINH NGHIỆM TƯ VẤN
            </h2>
            <ul className="mt-4 space-y-4">
              {/* {member.timeline?.map((event, index) => ( */}
              <li className="border-l-4 border-gray-300 pl-6 relative">
                <div className="w-3 h-3 border-1 border-gray-500 rounded-full bg-brandSecondary absolute -left-2 top-1.5"></div>
                <p className="text-lg font-bold">{"2025"}</p>
                <p className="text-gray-600">{"React 2025"}</p>
              </li>

              <li className="border-l-4 border-gray-300 pl-6 relative">
                <div className="w-3 h-3 border-1 border-gray-500 rounded-full bg-brandSecondary absolute -left-2 top-1.5"></div>
                <p className="text-lg font-bold">{"2025"}</p>
                <p className="text-gray-600">{"React 2025"}</p>
              </li>

              <li className="border-l-4 border-gray-300 pl-6 relative">
                <div className="w-3 h-3 border-1 border-gray-500 rounded-full bg-brandSecondary absolute -left-2 top-1.5"></div>
                <p className="text-lg font-bold">{"2025"}</p>
                <p className="text-gray-600">{"React 2025"}</p>
              </li>

              <li className="border-l-4 border-gray-300 pl-6 relative">
                <div className="w-3 h-3 border-1 border-gray-500 rounded-full bg-brandSecondary absolute -left-2 top-1.5"></div>
                <p className="text-lg font-bold">{"2025"}</p>
                <p className="text-gray-600">{"React 2025"}</p>
              </li>
              {/* )) || <p className="text-gray-500">Chưa có thông tin</p>} */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
