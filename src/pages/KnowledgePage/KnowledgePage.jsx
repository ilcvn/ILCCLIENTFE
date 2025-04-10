import React, {useContext, useEffect, useState} from "react";
import BreadcrumbDynamic from "../../components/layouts/Breadcrumb";
import {Outlet, useLocation} from "react-router-dom";
import LayoutPage from "../../components/LayoutPage";
import {getArticles} from "../../api/Article/article";
import {useTranslation} from "react-i18next";
import {LanguageContext} from "../../context/LanguageContext";
import { Helmet } from "react-helmet";

export default function KnowledgePage({ typePage }) {
  const location = useLocation();
    //const isRootPath = location.pathname === "/nghien-cuu";
    const [articles, setArticles] = useState([]);
    const [pagination, setPagination] = useState({});
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [type, setType] = useState("RESEARCH");
    const [headerValue, setHeaderValue] = useState();
    const {t} = useTranslation();
  
    const {language, changeLanguage} = useContext(LanguageContext);
    const searchQuery = "";

    useEffect(() => {

      setType(typePage);
      setHeaderValue(t(`nav.${typePage.toLowerCase()}`));

      const fetchArticles = async () => {
        try {
          setLoading(true);
          const currentLanguage = language.toUpperCase() || "VI";
          
          const res = await getArticles(
            searchQuery,
            currentPage,
            6,
            typePage,
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
    }, [searchQuery, currentPage, language, typePage]);
  
    // Hàm thay đổi trang
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };
  
    return (
      
      <div className="bg-white w-full">
        <BreadcrumbDynamic />
        <Helmet>
          <title>{t("nav.research")} {t("banner.marquee")}(ILC)</title>
        </Helmet>
        {
        (
          <LayoutPage
            header={headerValue + "--" + typePage}
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
  