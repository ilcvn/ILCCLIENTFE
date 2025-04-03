import React, {useContext, useEffect, useState} from "react";
import BreadcrumbDynamic from "../../components/layouts/Breadcrumb";
import {Outlet, useLocation} from "react-router-dom";
import LayoutPage from "../../components/LayoutPage";
import {getArticles} from "../../api/Article/article";
import {useTranslation} from "react-i18next";
import {LanguageContext} from "../../context/LanguageContext";

export default function NewPage() {
  const location = useLocation();
  const isRootPath = location.pathname === "/tin-tuc";
  const [articles, setArticles] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const {t} = useTranslation();

  const {language, changeLanguage} = useContext(LanguageContext);
  const [articlesLn, setarticlesLn] = useState([]);
  // Tạm thời searchQuery = "" (mặc định)
  const searchQuery = "";
  const type = "NEWS";

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const currentLanguage = language.toUpperCase() || "VI";
        const res = await getArticles(
          searchQuery,
          currentPage,
          6,
          type,
          currentLanguage
        );
        const {articles, pagination} = res.data.data;
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

      {isRootPath && (
        <LayoutPage
          header={t("nav.news")}
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
}
