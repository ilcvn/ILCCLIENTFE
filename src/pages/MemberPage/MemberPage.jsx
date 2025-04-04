import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import BreadcrumbDynamic from "../../components/layouts/Breadcrumb";
import {getMemberById} from "../../api/Nember/nember";
import {FaBookOpen, FaPhone} from "react-icons/fa6";
import {MdEmail} from "react-icons/md";
import {useTranslation} from "react-i18next";
import Logo from "../../assets/hello.png";
import {getTitles} from "../../helper/TitleMember";
import {getRoles} from "../../helper/RoleMember";
import {RiContactsBook3Fill} from "react-icons/ri";
import {BsBookmarkStarFill} from "react-icons/bs";

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

  const ChangeRole = getRoles();
  const ChangeTitle = getTitles();

  const getRoleTitles = (roles) => {
    if (!roles) return "";
    return roles
      .split(",")
      .map((roleValue) => {
        const found = ChangeRole.find(
          (item) => item.value === roleValue.trim()
        );
        return found ? found.title : "";
      })
      .join(", ");
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
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchMember();
  }, [slug]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching member: {error.message}</div>;
  if (!member) return <div>No member found</div>;

  const renderTimeline = (data = []) => {
    if (data.length === 0) {
      return <p className="text-gray-500"> </p>;
    }

    return (
      <>
        <div className="relative">
          {/* Đường viền chung cho timeline */}
          <div className="absolute  top-0 bottom-0 w-1 left-[184px] bg-gray-300"></div>
          <ul className="space-y-4">
            {data.map((event, index) => (
              <li key={event.id || index} className="flex items-center">
                {/* Cột Date */}
                <div className=" text-right pr-4">
                  <p className="text-lg font-bold">
                    {event.fromDate} - {event.toDate}
                  </p>
                </div>

                {/* Cột Line (ở giữa) */}
                <div className="relative flex flex-col items-center px-2">
                  {/* Dot */}
                  <div className="absolute w-3 h-3 bg-brandSecondary top-1/2 -translate-y-1/2 rounded-full" />
                </div>

                {/* Cột Description */}
                <div className=" pl-2">
                  <p className="text-gray-600">{event.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  };

  return (
    <div className="w-full">
      <BreadcrumbDynamic />
      <img src={Logo} alt="Banner" className="w-full h-full p-4" />

      <div className="bg-white min-h-screen p-6">
        <div className="max-w-screen-2xl mx-auto bg-gray-100 p-8 rounded-lg shadow-lg mb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start relative">
            <img
              src={member.imgUrl}
              alt={member.fullName}
              className="w-60 h-80 md:w-48 md:h-48 lg:w-64 lg:h-64 md:rounded-full rounded-xl object-cover shadow-lg relative lg:absolute z-20 lg:bottom-16 border-4 border-brandSecondary/80 hover:border-blue-500 transition-all duration-300"
            />

            <div className="w-48 h-6 md:w-32 md:h-32 lg:w-64 lg:h-32" />

            <div className="lg:ml-8  my-4 text-center lg:text-left">
              <h1 className="text-5xl font-bold text-brandSecondary">
                {member.fullName}
              </h1>
              <p className="text-2xl lg:py-2 py-3 text-brandPrimary font-semibold">
                {getRoleTitles(member.role)}
              </p>
              <p className="text-xl  text-black">
                {getTitleNames(member.penName)}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 md:mb-4 my-4">
            <a
              href={`tel:${member.phone}`}
              className="flex items-center space-x-2 text-brandPrimary"
            >
              <FaPhone size={25} />
              <span className="text-black">{member.phone}</span>
            </a>
            <a
              href={`mailto:${member.gmail}`}
              className="flex items-center space-x-2 text-brandPrimary"
            >
              <MdEmail size={25} />
              <span className="text-black">{member.gmail}</span>
            </a>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-brandSecondary">
              {t("memberPage.infoMember")}
            </h2>
            <p className="text-lg text-gray-700 mt-2 text-justify">
              {member.description || ""}
            </p>
          </div>
        </div>

        {/* EDUCATION */}
        <div className="max-w-screen-2xl mx-auto bg-gray-100 p-8 rounded-md shadow-lg mb-6">
          <h2 className="text-2xl font-semibold text-brandSecondary flex gap-3">
            <FaBookOpen className="" /> {t("detailMenber.EDUCATION")}
          </h2>
          <ul className="mt-4 space-y-4">{renderTimeline(education)}</ul>
        </div>

        {/* WORK EXPERIENCE */}
        <div className="max-w-screen-2xl mx-auto bg-gray-100 p-8 rounded-md shadow-lg mb-6">
          <h2 className="text-2xl font-semibold text-brandSecondary flex gap-3">
            <RiContactsBook3Fill /> {t("detailMenber.WORK_EXPERIENCE")}
          </h2>
          <ul className="mt-4 space-y-4">{renderTimeline(workExperience)}</ul>
        </div>

        {/* CONSULT EXPERIENCE */}
        <div className="max-w-screen-2xl mx-auto bg-gray-100 p-8 rounded-md shadow-lg mb-6">
          <h2 className="text-2xl font-semibold text-brandSecondary flex gap-3">
            <BsBookmarkStarFill />
            {t("detailMenber.CONSULT_EXPERIENCE")}
          </h2>
          <ul className="mt-4 space-y-4">
            {renderTimeline(consultExperience)}
          </ul>
        </div>
      </div>
    </div>
  );
}
