import React, {useContext, useEffect, useState} from "react";
import BreadcrumbDynamic from "../../components/layouts/Breadcrumb";
import {Outlet, useLocation} from "react-router-dom";
import LayoutPage from "../../components/LayoutPage";
import {getArticles} from "../../api/Article/article";
import {LanguageContext} from "../../context/LanguageContext";
import {  useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

export default function SearchPage() {
  const location = useLocation();
  const isRootPath = location.pathname === "/tim-kiem";
  const searchQuery = location.state?.query || "";
  const [query, setQuery] = useState(searchQuery);
  const [articles, setArticles] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const {language, changeLanguage} = useContext(LanguageContext);
  const [articlesLn, setarticlesLn] = useState([]);
  const { t } = useTranslation();
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const res = await getArticles(searchQuery, currentPage, 100);
        const {articles, pagination} = res.data.data;

        const articlesLeague = articles.filter(
          (article) => article.language.toLowerCase() === language.toLowerCase()
        );

        setArticles(articles);
        setarticlesLn(articlesLeague); // ✅ Lưu danh sách lọc vào state
        setPagination(pagination);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [searchQuery, currentPage, language]);

  // Xử lý submit form tìm kiếm
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newQuery = formData.get("search") || "";
    // Cập nhật query và reset trang về 1
    setQuery(newQuery);
    setCurrentPage(1);
  };

  // Hàm thay đổi trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white w-full">
      <BreadcrumbDynamic />
      <Helmet>
        <title>{t("nav.search")} {t("banner.marquee")}(ILC)</title>
      </Helmet>
      {isRootPath && (
        <div className="">
          {loading ? (
            <div className="h-[50vw]">{t("search.status")}</div>
          ) : articles && articles.length > 0 ? (
            <LayoutPage
            header={ t("search.result") + (query ? ` "${query}"` : "") }
            data={articlesLn}
              pagination={pagination}
              onPageChange={handlePageChange}
              path={location.pathname}
            />
          ) : (
            <div className="w-full flex justify-center items-center h-[82vh] bg-gray-400">
              <p className="text-4xl ">{t("search.find")}</p>
            </div>
          )}
        </div>
      )}

      {/* Nếu có route con, hiển thị tại đây */}
      <Outlet />
    </div>
  );
}
