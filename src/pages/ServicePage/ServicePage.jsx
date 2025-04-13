import React, { useContext, useEffect, useState } from "react";
import BreadcrumbDynamic from "../../components/layouts/Breadcrumb";
import { Outlet, useLocation } from "react-router-dom";
import LayoutPage from "../../components/LayoutPage";
import { getArticles } from "../../api/Article/article";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../../context/LanguageContext";
import { Helmet } from "react-helmet";
import NewBreadcrumbDynamic from "../../components/layouts/newBreadcrumb";

export default function ServicePage({ typePage }) {
  const location = useLocation();
  const isRootPath = location.pathname === "/dich-vu";
  const [articles, setArticles] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { t } = useTranslation();
  const { language, changeLanguage } = useContext(LanguageContext);
  const [articlesLn, setarticlesLn] = useState([]);
  const [type, setType] = useState("SERVICE");
  const [headerValue, setHeaderValue] = useState();

  const searchQuery = "";
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const currentLanguage = (language || "VI").toUpperCase();

        setHeaderValue(t(`nav.${typePage.toLowerCase()}`));
        const res = await getArticles(
          searchQuery,
          currentPage,
          6,
          typePage,
          currentLanguage
        );
        const data = res.data?.data;

        setType(typePage);
        if (data) {
          const { articles, pagination } = data;
          setArticles(articles);
          setPagination(pagination);
        } else {
          console.warn("No data received from API.");
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [searchQuery, currentPage, language, typePage]);

  // Hàm thay đổi trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white w-full">
      <BreadcrumbDynamic />
      <Helmet>
        <title>
          {t("nav.service")} | ILC
        </title>
      </Helmet>
      {/* Nếu path là "/tong-quan", hiển thị LayoutPage */}
      {
        <LayoutPage
          header={headerValue}
          data={articles}
          pagination={pagination}
          onPageChange={handlePageChange}
          path={location.pathname}
        />
      }

      {/* Hiển thị nội dung của route con (nếu có) */}
      <Outlet />
    </div>
  );
}
