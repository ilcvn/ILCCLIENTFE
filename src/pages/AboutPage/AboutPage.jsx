import React, {useContext, useEffect, useState} from "react";
import BreadcrumbDynamic from "../../components/layouts/Breadcrumb";
import {Outlet, useLocation} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {LanguageContext} from "../../context/LanguageContext";
import LayoutOverviewPage from "../../components/LayoutOverview";
import {getMembers} from "../../api/Nember/nember";
import EcoSystem from "../../components/Ecosystem";
import {Helmet} from "react-helmet";

const HUMAN_RESOURCE_DEPARTMENT_OPTIONS = [
  {value: "BOARD_OF_MANAGEMERS", filterKey: "hoi-dong-quan-ly-vien"},
  {value: "BOARD_OF_DIRECTORS", filterKey: "ban-lanh-dao"},
  {value: "SCIENTIFIC_COUNCIL", filterKey: "Hoi-dong-khoa-hoc"},
  {value: "ADVISORY_BOARD", filterKey: "Hoi-dong-co-van"},

  {
    value: "INVESTMENT_AND_COMMUNICATION_COOPERATION_DEPARTMENT",
    filterKey: "phong-ban",
  },
  {
    value: "LEGAL_AND_COMMERCIAL_INSTITUTIONS_DEPARTMENT",
    filterKey: "phong-ban",
  },
  {
    value: "HUMAN_RESOURCE_TRAINING_AND_DEVELOPMENT_DEPARTMENT",
    filterKey: "phong-ban",
  },
  {value: "SOCIAL_WORK_AND_BUSINESS_SUPPORT_BOARD", filterKey: "phong-ban"},
  {
    value: "DEPARTMENT_OF_ECONOMICS_FINANCE_AND_INTERNATIONAL_TRADE",
    filterKey: "phong-ban",
  },
  {
    value:
      "DEPARTMENT_OF_DIGITAL_ECONOMY_ARTIFICIAL_INTELLIGENCE_AND_BUSINESS_DEVELOPMENT",
    filterKey: "phong-ban",
  },

  {value: "CHIEF_OF_STAFF", filterKey: "phong-ban"},

  {value: "PARTNER", filterKey: "partner"},
];

const PARTNER_OPTIONS = [
  "EDUCATIONAL_INSTITUTION",
  "ENTERPRISE",
  "ORGANIZATION",
];

export default function AboutPage() {
  const location = useLocation();
  const currentPath = location.pathname.split("/").pop();
  const {t} = useTranslation();
  const {language} = useContext(LanguageContext);

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPages, setCurrentPages] = useState({});
  const pageSize = 8;

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const res = await getMembers("", 1, 100000, language.toLowerCase());
        const {members} = res.data.data;

        setMembers(members);
      } catch (error) {
        console.error("Error fetching members:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [language]);

  const handlePageChange = (departmentKey, page) => {
    setCurrentPages((prev) => ({
      ...prev,
      [departmentKey]: page,
    }));
  };

  // Determine which departments to render
  let optionsToRender = [];

  if (location.pathname === "/tong-quan/phong-ban") {
    optionsToRender = HUMAN_RESOURCE_DEPARTMENT_OPTIONS.filter(
      (option) => option.filterKey.toLowerCase() === "phong-ban"
    );
  } else if (location.pathname === "/tong-quan") {
    optionsToRender = HUMAN_RESOURCE_DEPARTMENT_OPTIONS;
  } else {
    const matchingOption = HUMAN_RESOURCE_DEPARTMENT_OPTIONS.find(
      (option) =>
        option.value.toLowerCase() === currentPath.toLowerCase() ||
        option.filterKey.toLowerCase() === currentPath.toLowerCase()
    );
    if (matchingOption) {
      optionsToRender = [matchingOption];
    } else {
      console.error("No matching department found for", currentPath);
      optionsToRender = [];
    }
  }

  return (
    <div className="bg-white w-full">
      <BreadcrumbDynamic />
      <Helmet>
        <title>{t("nav.overview")} | ILC</title>
      </Helmet>

      {optionsToRender.map((option, index) => {
        if (option.value !== "PARTNER") {
          const coppiedMembers = [...members];

          let filteredMembers = coppiedMembers
            .filter((member) => {
              if (member.department) {
                const departments = member.department.split(", ");
                const index = departments.indexOf(option.value);
                if (index !== -1) {
                  const roles = member.role.split(", ");
                  if (roles.length > 1) {
                    [roles[0], roles[index]] = [roles[index], roles[0]];
                    [departments[0], departments[index]] = [
                      departments[index],
                      departments[0],
                    ];
                  }
                  member.role = roles.join(", ");
                  member.department = departments.join(", ");
                  return true;
                }
              }
              return false;
            })
            .map((member) => ({...member}));

          let roleOrder = [
            "PRESIDENT",
            "VICE_PRESIDENT",
            "CHAIRPERSON",
            "VICE_CHAIRMAN",
            "MEMBER",
          ];
          if (option.value === "BOARD_OF_DIRECTORS") {
            roleOrder = ["PRESIDENT", "VICE_PRESIDENT", "MEMBER"];
          } else if (
            option.value === "SCIENTIFIC_COUNCIL" ||
            option.value === "ADVISORY_BOARD" ||
            option.value === "BOARD_OF_MANAGEMERS"
          ) {
            roleOrder = ["CHAIRPERSON", "VICE_CHAIRMAN", "MEMBER"];
          } else if (option.value === "CHIEF_OF_STAFF") {
            roleOrder = ["ROOM_PRESIDENT", "ROOM_VICE_PRESIDENT", "MEMBER"];
          } else {
            roleOrder = ["GROUP_PRESIDENT", "GROUP_VICE_PRESIDENT", "MEMBER"];
          }

          filteredMembers = filteredMembers.sort((a, b) => {
            const roleA = a.role.split(", ")[0].trim();
            const roleB = b.role.split(", ")[0].trim();
            return roleOrder.indexOf(roleA) - roleOrder.indexOf(roleB);
          });

          const currentDepartmentPage = currentPages[option.value] || 1;
          const startIndex = (currentDepartmentPage - 1) * pageSize;
          const endIndex = startIndex + pageSize;
          const paginatedMembers = filteredMembers.slice(startIndex, endIndex);

          const frontendPagination = {
            total: filteredMembers.length,
            currentPage: currentDepartmentPage,
            pageSize: pageSize,
            totalPages: Math.ceil(filteredMembers.length / pageSize),
          };

          return (
            <LayoutOverviewPage
              key={option.value}
              header={t(`about.${option.value}`)}
              content={t("about.Sub_header")}
              data={paginatedMembers}
              pagination={frontendPagination}
              onPageChange={(page) => handlePageChange(option.value, page)}
              path={location.pathname}
              isShow={true}
            />
          );
        } else {
          return (
            <div key={option.value}>
              <EcoSystem
                type={PARTNER_OPTIONS[0]}
                header={t(
                  "homepage.contentSection.partners.educationInstitution"
                )}
                subheader={t(
                  "homepage.contentSection.partners.educationInstitution_sub"
                )}
              />
              <EcoSystem
                type={PARTNER_OPTIONS[1]}
                header={t("homepage.contentSection.partners.enterprise")}
                subheader={t("homepage.contentSection.partners.enterprise_sub")}
              />
              <EcoSystem
                type={PARTNER_OPTIONS[2]}
                header={t("homepage.contentSection.partners.organization")}
                subheader={t(
                  "homepage.contentSection.partners.organization_sub"
                )}
              />
            </div>
          );
        }
      })}
      <Outlet />
    </div>
  );
}
