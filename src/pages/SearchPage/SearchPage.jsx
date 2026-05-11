import React, { useContext, useEffect, useState } from "react";
import BreadcrumbDynamic from "../../components/layouts/Breadcrumb";
import { Outlet, useLocation } from "react-router-dom";
import LayoutPage from "../../components/LayoutPage";
import { getArticles } from "../../api/Article/article";
import { LanguageContext } from "../../context/LanguageContext";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { Frown } from "lucide-react";

export default function SearchPage() {
  const location = useLocation();
  const isRootPath = location.pathname === "/tim-kiem";
  const [query, setQuery] = useState(location.state?.query || "");
  const [articles, setArticles] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { language } = useContext(LanguageContext);
  const [articlesLn, setarticlesLn] = useState([]);
  const { t } = useTranslation();

  // Cập nhật query từ location.state mỗi khi thay đổi
  useEffect(() => {
    if (location.state?.query) {
      setQuery(location.state.query);
      setCurrentPage(1);
    }
  }, [location.state?.query]);

  // Fetch bài viết mỗi khi query, page hoặc language thay đổi
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const res = await getArticles(query, currentPage, 100);
        const { articles, pagination } = res.data.data;

        const articlesLeague = articles.filter(
          (article) =>
            article.language.toLowerCase() === language.toLowerCase(),
        );

        setArticles(articles);
        setarticlesLn(articlesLeague);
        setPagination(pagination);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    if (query) fetchArticles();
  }, [query, currentPage, language]);

  // Hàm thay đổi trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white w-full">
      <BreadcrumbDynamic />
      <Helmet>
        <title>{t("nav.search")} | ILC</title>
      </Helmet>
      {isRootPath && (
        <div>
          {loading ? (
            <div className="h-[50vw] flex items-center justify-center">
              {t("search.status")}
            </div>
          ) : articles && articles.length > 0 ? (
            <LayoutPage
              header={t("search.result") + (query ? ` "${query}"` : "")}
              data={articlesLn}
              pagination={pagination}
              onPageChange={handlePageChange}
              path={location.pathname}
            />
          ) : (
            <div className="w-full flex justify-center items-center h-[82vh] bg-slate-50">
              <p className="text-3xl">{t("search.find")}</p>{" "}
              <Frown className="ml-2 w-8 h-8" />
            </div>
          )}
        </div>
      )}

      {/* Nếu có route con, hiển thị tại đây */}
      <Outlet />
    </div>
  );
}
