/* eslint-disable react/prop-types */
import {MoveLeft, MoveRight} from "lucide-react";
import ContentSection from "./ContentSection";
import {useNavigate} from "react-router-dom";
import {getRoles} from "../helper/RoleMember";
import {getTitles} from "../helper/TitleMember";

export default function LayoutOverviewPage({
  data,
  header,
  content,
  pagination,
  onPageChange,
  path,
  isShow,
}) {
  const navigate = useNavigate();
  const ChangeRole = getRoles();
  const ChangeTitle = getTitles();

  const membersPerPage = 8;

  const totalPages = pagination.total
    ? Math.ceil(pagination.total / membersPerPage)
    : 0;

  const getRoleTitles = (roles) => {
    const roleValues = [roles.split(",").map((role) => role.trim())[0]];

    const roleNames = roleValues.map((roleValue) => {
      const roleFound = ChangeRole.find((item) => item.value === roleValue);
      return roleFound ? roleFound.title : "Chưa có vai trò";
    });
    return roleNames.join(", ");
  };

  const getTitleNames = (penName) => {
    const titleFound = ChangeTitle.find((item) => item.value === penName);
    return titleFound ? titleFound.title : "Chưa có học vị";
  };

  return (
    isShow && (
      <div className="md:w-3/4 w-full mx-auto md:px-4 px-2 py-10 z-50 text-black">
        <ContentSection header={header} content={content} />

        <div className="flex flex-wrap justify-center gap-2 mt-3 mb-16 sm:gap-3 xl:gap-4 sm:mt-8 xl:mt-12">
          {data.map((member) => {
            const roleName = member.role
              ? getRoleTitles(member.role)
              : "Chưa có vai trò";
            const titleName = member.penName
              ? getTitleNames(member.penName)
              : "Chưa có học vị";

            return (
              <div
                key={member.id}
                className="relative w-[200px] xl:w-[286px] xl:h-[350px] group cursor-pointer bg-white shadow-lg border-dashed border-[2px] border-brandPrimary overflow-hidden hover:border-white"
                onClick={() =>
                  navigate(`/tong-quan/${member.fullName}=${member.id}`)
                }
              >
                <div className="px-2 py-10 text-center">
                  <img
                    src={member.imgUrl}
                    alt={member.name}
                    className="w-40 h-40 rounded-full mx-auto object-cover"
                  />
                  <div className="space-y-2 mt-6">
                    <h3 className="font-bold text-lg mt-3">
                      {member.fullName}
                    </h3>
                    <p className="text-sm text-gray-600">{roleName}</p>
                    <p className="text-xs text-gray-500">{titleName}</p>
                  </div>
                </div>

                <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex flex-col justify-between h-full">
                    <div className="text-white text-center p-4">
                      <h3 className="font-bold text-lg">Thông tin liên hệ</h3>
                      <p className="text-sm mt-2">Email: {member.email}</p>
                      <p className="text-sm">Số điện thoại: {member.phone}</p>
                      <div className="w-20 h-[1px] bg-white rounded-lg my-3"></div>
                      <p className="text-xs text-justify line-clamp-[8]">
                        {member.description}
                      </p>
                    </div>
                    <button className="bg-brandSecondary text-white w-full p-4">
                      Xem thêm
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Phần phân trang */}
        {pagination.total > 8 && (
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() => onPageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="px-3 py-1 border rounded-full disabled:cursor-not-allowed disabled:opacity-50"
            >
              <MoveLeft className="text-neutralGrey" />
            </button>
            {[...Array(totalPages)].map((_, index) => {
              const pageNum = index + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => onPageChange(pageNum)}
                  className={`px-3 py-1 text-neutralGrey border rounded-full ${
                    pagination.page === pageNum
                      ? "font-bold bg-brandSecondary text-white"
                      : ""
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() => onPageChange(pagination.page + 1)}
              disabled={pagination.page === totalPages}
              className="px-3 py-1 border rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <MoveRight className="text-neutralGrey" />
            </button>
          </div>
        )}
      </div>
    )
  );
}
