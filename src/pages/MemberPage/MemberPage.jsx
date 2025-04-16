import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import BreadcrumbDynamic from "../../components/layouts/Breadcrumb";
import {getMemberById} from "../../api/Nember/nember";
import {FaBookOpen, FaPhone} from "react-icons/fa6";
import {MdEmail} from "react-icons/md";
import {useTranslation} from "react-i18next";
import {getTitles} from "../../helper/TitleMember";
import {getRoles} from "../../helper/RoleMember";
import {RiContactsBook3Fill} from "react-icons/ri";
import {BsBookmarkStarFill} from "react-icons/bs";
import {Helmet} from "react-helmet";
import {BannerMemberDetail} from "../../assets/index";

export default function MemberPage() {
  const {slug} = useParams();
  const newslug = slug?.slice(slug.indexOf("=") + 1);
  const {t} = useTranslation();

  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [education, setEducation] = useState([]);
  const [workExperience, setWorkExperience] = useState([]);
  const [consultExperience, setConsultExperience] = useState([]);
  const navigate = useNavigate();
  const ChangeRole = getRoles();
  const ChangeTitle = getTitles();

  const getRoleTitles = (roles) => {
    if (!roles) return "";
    return roles
      .split(", ")
      .map((roleValue) => {
        const found = ChangeRole.find(
          (item) => item.value === roleValue.trim()
        );
        return found ? found.title : "";
      })
      .join(", ");
  };

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
        role_department += t(`roles.${origin_roles[i]}`);
      } else {
        role_department +=
          t(`roles.${origin_roles[i]}`) +
          " " +
          t(`about.${origin_departments[i]}`);
      }
    }
    return role_department;
  };

  const getTitleNames = (penName) => {
    if (!penName) return "";
    return penName
      .split(",")
      .map((pen) => {
        const found = ChangeTitle.find((item) => item.value === pen.trim());
        return found ? found.title : "";
      })
      .join(", ");
  };

  useEffect(() => {
    const fetchMember = async () => {
      setLoading(true);
      try {
        const response = await getMemberById(newslug);
        const data = response.data.data;
        const details = data?.memberDetails || [];

        const educationData = details.filter(
          (item) => item.typeDetail === "EDUCATION"
        );
        const workData = details.filter(
          (item) => item.typeDetail === "WORK_EXPERIENCE"
        );
        const consultData = details.filter(
          (item) => item.typeDetail === "CONSULT_EXPERIENCE"
        );

        setMember(data);
        setEducation(educationData);
        setWorkExperience(workData);
        setConsultExperience(consultData);
      } catch (err) {
        navigate("/not-found", {replace: true});
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchMember();
  }, [slug]);

  if (loading) return <div>Loading...</div>;

  const renderTimeline = (data = []) => {
    if (data.length === 0) {
      return <p className="text-gray-500"> </p>;
    }

    return (
      <div className="relative">
        <div className="absolute top-1 bottom-0 w-1 left-[178px] bg-gray-200 md:block hidden"></div>
        <ul className="">
          {data.map((event, index) => (
            <li
              key={event.id || index}
              className="flex flex-col items-start justify-start my-2 md:items-start md:my-7 md:flex-row border-t border-gray-300 md:border-none first:border-none pt-4 md:pt-0"
            >
              {/* Cột Date */}
              <div className="text-left sm:text-right md:pr-4 w-full md:w-[180px]">
                <p className="text-base text-left md:text-md">
                  {event.fromDate} - {event.toDate}
                </p>
              </div>

              {/* Cột Line (ở giữa) */}
              <div className="relative md:flex-col items-center md:flex hidden">
                <div className="absolute w-3 h-3 bg-brandSecondary top-4 bottom-0 -translate-y-1/2 rounded-full " />
              </div>

              <div className=""></div>

              {/* Cột Description */}
              <div className="md:px-4">
                <p className="md:p-1 font-bold text-brandPrimary">
                  {event.title}
                </p>
                <p className="mt-2 md:p-1 md:mt-0 font-bold text-brandPrimary">
                  {event.place}
                </p>
                <p className="md:p-1 break-words whitespace-pre-line truncate text-sm text-gray-700 max-w-[300px]">
                  {event.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="w-full">
      <BreadcrumbDynamic header={member.fullName} />
      <Helmet>
        <title>{member.fullName} | ILC</title>
      </Helmet>
      <div className="flex justify-center">
        <img
          src="https://www.ilcvn.vn/assets/logo-jN9dnkTi.png"
          alt="Banner"
          className="w-[500px] h-[450px] p-4 "
        />
      </div>

      {/* Wrapper with Background Image and Overlay */}
      <div
        className="relative bg-cover bg-center bg-no-repeat min-h-screen w-full"
        style={{
          backgroundImage: `url(${BannerMemberDetail})`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-white/85 backdrop-blur-sm z-0" />

        {/* Content */}
        <div className="relative z-10">
          <div className="max-w-screen-2xl mx-auto bg-white p-8 shadow-lg mb-6">
            <div className="flex flex-col md:flex-row items-center md:items-start relative">
              <img
                src={member.imgUrl}
                alt={member.fullName}
                className="w-64 h-64 p-1 lg:w-60 lg:h-60 rounded-full object-cover shadow-lg relative lg:absolute z-20 lg:bottom-16 border-4 border-brandSecondary/80 hover:border-blue-500 transition-all duration-300"
              />

              <div className="w-48 h-6 md:w-32 md:h-32 lg:h-32 lg:mr-[10%] mx-1 lg:mx-11" />

              <div className="lg:ml-8 my-4 text-left">
                <h1 className="text-4xl font-bold text-brandSecondary">
                  {member.fullName}
                </h1>
                <p className="md:text-2xl text-xl lg:py-2 py-3 text-brandPrimary font-semibold">
                  {getRoleTitlesWithDepartments(member.role, member.department)}
                </p>
                <p className="text-xl text-black">{member.penName}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 md:mb-4 my-6">
              <a
                href={`tel:${member.phone}`}
                className="flex items-center space-x-2 text-brandSecondary"
              >
                <FaPhone size={20} />
                <span className="text-black/80">{member.phone}</span>
              </a>
              <a
                href={`mailto:${member.gmail}`}
                className="flex items-center space-x-2 text-brandSecondary"
              >
                <MdEmail size={20} />
                <span className="text-black/80">{member.gmail}</span>
              </a>
            </div>

            <div>
              <h2 className="md:text-2xl text-xl font-semibold text-brandSecondary">
                {t("memberPage.infoMember")}
              </h2>
              <p className="text-md text-gray-700 mt-2 text-justify whitespace-pre-line">
                {member.description || ""}
              </p>
            </div>
          </div>

          {/* EDUCATION */}
          <div className="w-full lg:max-w-screen-2xl mx-auto p-8 bg-white shadow-lg mb-6">
            <h2 className="md:text-xl text-lg font-semibold text-brandSecondary flex gap-3">
              <FaBookOpen className="" /> {t("detailMember.EDUCATION")}
            </h2>
            <ul className="space-y-4">{renderTimeline(education)}</ul>
          </div>

          {/* WORK EXPERIENCE */}
          <div className="max-w-screen-2xl mx-auto p-8 bg-white shadow-lg mb-6">
            <h2 className="md:text-xl text-lg font-semibold text-brandSecondary flex gap-3">
              <RiContactsBook3Fill /> {t("detailMember.WORK_EXPERIENCE")}
            </h2>
            <ul className="space-y-4">{renderTimeline(workExperience)}</ul>
          </div>

          {/* CONSULT EXPERIENCE */}
          <div className="max-w-screen-2xl mx-auto p-8 bg-white shadow-lg mb-6">
            <h2 className="md:text-xl text-lg font-semibold text-brandSecondary flex gap-3">
              <BsBookmarkStarFill />
              {t("detailMember.CONSULT_EXPERIENCE")}
            </h2>
            <ul className="space-y-4">{renderTimeline(consultExperience)}</ul>
          </div>
        </div>
      </div>
    </div>
  );
}
