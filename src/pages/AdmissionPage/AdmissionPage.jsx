import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../../context/LanguageContext";
import { getArticles } from "../../api/Article/article";
import BreadcrumbDynamic from "../../components/layouts/Breadcrumb";
import { Helmet } from "react-helmet";
import { Outlet, useLocation } from "react-router-dom";
import LayoutPage from "../../components/LayoutPage";

const AdmissionPage = () => {
  const location = useLocation();
  const isRootPath = location.pathname === "/tuyen-sinh";
  const [articles, setArticles] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { t } = useTranslation();

  const { language, changeLanguage } = useContext(LanguageContext);
  const [articlesLn, setarticlesLn] = useState([]);
  // Tạm thời searchQuery = "" (mặc định)
  const searchQuery = "";
  const type = "ADMISSIONS";

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const currentLanguage = language.toUpperCase() || "VI";
        const res = await getArticles(
          searchQuery,
          currentPage,
          10,
          type,
          currentLanguage,
        );
        const { articles, pagination } = res.data.data;
        setArticles(articles);
        setPagination(pagination);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [searchQuery, currentPage, language]);

  // Hàm thay đổi trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white w-full">
      <BreadcrumbDynamic />
      <Helmet>
        <title>{t("nav.admissions")} | ILC</title>
      </Helmet>
      {isRootPath && (
        <LayoutPage
          header={t("nav.admissions")}
          data={articles}
          pagination={pagination}
          onPageChange={handlePageChange}
          path={location.pathname}
        />
      )}

      {/* Hiển thị nội dung của route con (nếu có) */}
      <Outlet />
    </div>
  );
};

export default AdmissionPage;
