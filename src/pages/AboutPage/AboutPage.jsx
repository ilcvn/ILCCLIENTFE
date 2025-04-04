import React, {useContext, useEffect, useState} from "react";
import BreadcrumbDynamic from "../../components/layouts/Breadcrumb";
import {Outlet, useLocation} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {LanguageContext} from "../../context/LanguageContext";
import LayoutOverviewPage from "../../components/LayoutOverview";
import {getAllMember} from "../../api/Nember/nember";

const HUMAN_RESOURCE_DEPARTMENT_OPTIONS = [
  {value: "BOARD_OF_DIRECTORS", filterKey: "BLD"},
  {value: "SCIENTIFIC_COUNCIL", filterKey: "HDKH"},
  {value: "BOARD_OF_MANAGEMERS", filterKey: "HDQLV"},
  {value: "ADVISORY_BOARD", filterKey: "HDCV"},
  {value: "SOCIAL_WORK_AND_BUSINESS_SUPPORT_BOARD", filterKey: "department"},
  {value: "HUMAN_RESOURCE_TRAINING_AND_DEVELOPMENT_DEPARTMENT", filterKey: "department"},
  {value: "DEPARTMENT_OF_DIGITAL_ECONOMY_ARTIFICIAL_INTELLIGENCE_AND_BUSINESS_DEVELOPMENT", filterKey: "department"},
  {value: "DEPARTMENT_OF_ECONOMICS_FINANCE_AND_INTERNATIONAL_TRADE", filterKey: "department"},
  {value: "LEGAL_AND_COMMERCIAL_INSTITUTIONS_DEPARTMENT", filterKey: "department"},
  {value: "CHIEF_OF_STAFF", filterKey: "department"},
];

export default function AboutPage() {
  const location = useLocation();
  const allRootPath = [
    "/tong-quan/BOARD_OF_DIRECTORS",
    "/tong-quan/SCIENTIFIC_COUNCIL",
    "/tong-quan/BOARD_OF_MANAGEMERS",
    "/tong-quan/ADVISORY_BOARD",
    "/tong-quan/department",
    // "/tong-quan/office",
    // "/tong-quan/ecosystem",
  ];
  const currentPath = location.pathname.split("/").pop();
  const isRootPath = allRootPath.includes(location.pathname);

  const [members, setMembers] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const {t} = useTranslation();
  const {language} = useContext(LanguageContext);
  const [memberLn, setMemberLn] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const res = await getAllMember();
        const {members, pagination} = res.data.data;
        console.log(pagination);
        //console.log(members);
        const memberLeague = members.filter(
          (member) => member.language.toLowerCase() === language.toLowerCase()
        );
        setMembers(members);
        setMemberLn(memberLeague);
        setPagination(pagination);
      } catch (error) {
        console.error("Error fetching members:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [language]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Determine which departments to render
  let optionsToRender = [];

  if (location.pathname === "/tong-quan/department") {
    optionsToRender = HUMAN_RESOURCE_DEPARTMENT_OPTIONS.filter(
      (option) => option.filterKey.toLowerCase() === "department"
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
      {optionsToRender.map((option, index) => {
        const coppiedMembers = [...members];
        
        let filteredMembers = coppiedMembers.filter((member) => {    

          if (member.department) {

            let departments = member.department.split(", ");
            const index = departments.indexOf(option.value);
            if (index !== -1) {
                let roles = member.role.split(", ");
                if (roles.length > 1){
                  [roles[0], roles[index]] = [roles[index], roles[0]];
                  [departments[0], departments[index]] = [departments[index], departments[0]];
                }
                member.role = roles.join(', ');
                member.department = departments.join(', ');
              return member;
            }
          }
        }).map((member) => ({ ...member }));;
        
        if(option.value === 'BOARD_OF_DIRECTORS'){
          const roleOrder = ['PRESIDENT', 'VICE_PRESIDENT', 'CHAIRPERSON', 'VICE_CHAIRMAN', 'MEMBER'];

          filteredMembers = filteredMembers.sort((a, b) => {
            const roleA = a.role.split(', ')[0].trim();
            const roleB = b.role.split(', ')[0].trim();
            
            return roleOrder.indexOf(roleA) - roleOrder.indexOf(roleB);
          });

          const new_pagination = {
            page: 0,   
            limit: 8,   
            total: filteredMembers.length  
          };
          //console.log(new_pagination);
          //setPagination(new_pagination);
        }

        return (
          <LayoutOverviewPage
            key={index}
            header={t(`about.${option.value}`)} // Use t() to translate the label
            content={t("about.Sub_header")}
            data={filteredMembers}
            pagination={pagination} // Adjust if needed
            onPageChange={handlePageChange}
            path={location.pathname}
            isShow={true}
          />
        );
      })}
      <Outlet />
    </div>
  );
}
