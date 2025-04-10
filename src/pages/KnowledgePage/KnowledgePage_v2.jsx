import React, {useContext, useState} from "react";
import BreadcrumbDynamic from "../../components/layouts/Breadcrumb";
import {Outlet, useLocation} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {LanguageContext} from "../../context/LanguageContext";
import EcoSystem from "../../components/Ecosystem";
import { Helmet } from "react-helmet";

export default function KnowledgePage() {
  const location = useLocation();
  const isRootPath = location.pathname === "/doi-tac";
  const {t} = useTranslation();
  const {language} = useContext(LanguageContext);
  const [currentPage, setCurrentPage] = useState(1);
  const strategy = "STRATEGY";
  const media = "MEDIA";
  // Tiêu đề lấy từ i18n
  const header = t("homepage.contentSection.knowledge.Strategic");
  const subheader = t("homepage.contentSection.knowledge.company");
  const headerMedia = t("homepage.contentSection.knowledge.mediaPartners");
  const subMediaMedia = t(
    "homepage.contentSection.knowledge.mediaCollaboration"
  );
  // Hàm thay đổi trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white w-full">
      <BreadcrumbDynamic />
      <Helmet>
      <title>{t("nav.legalKnowledge")} {t("banner.marquee")}(ILC)</title>
      </Helmet>
      {/* Nếu path là "/doi-tac", hiển thị EcoSystem */}
      {isRootPath && (
        <>
          <EcoSystem type={strategy} header={header} subheader={subheader} />
          <EcoSystem
            type={media}
            header={headerMedia}
            subheader={subMediaMedia}
          />
        </>
      )}

      {/* Hiển thị nội dung của route con (nếu có) */}
      <Outlet />
    </div>
  );
}
