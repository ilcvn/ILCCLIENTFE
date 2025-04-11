import React, {useContext, useEffect, useState} from "react";
import ItemKnowledge from "../../../components/KnowledgeSection/ItemKnowledge";
import {getArticleById, getArticles} from "../../../api/Article/article";
import {useLocation, useParams} from "react-router-dom";
import "./Article.css";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import BreadcrumbDynamic from "../../../components/layouts/Breadcrumb";
import {convertISOToDate} from "../../../helper/date";
import {useTranslation} from "react-i18next";
import {LanguageContext} from "../../../context/LanguageContext";
import ShareButton from "../../../components/layouts/ShareButton";
import {Helmet} from "react-helmet";
import NewBreadcrumbDynamic from "../../../components/layouts/newBreadcrumb";

export default function DetailPage() {
  const [articles, setArticles] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [article, setArticle] = useState({});
  const [targetId, setTargetId] = useState(0);
  const searchQuery = "";
  const {slug} = useParams();
  const {t} = useTranslation();
  const {language} = useContext(LanguageContext);
  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const category = pathParts[1].toLowerCase(); 


  const pathToCategory = {
    "dich-vu": "SERVICE",
    "dao-tao": "TRAINING", 
    "nghien-cuu": "RESEARCH",
    "tin-tuc": "NEWS",
  };

  // Nếu không tìm thấy, mặc định là "SERVICE"
  const categoryPath = pathToCategory[category] || "SERVICE";
  useEffect(() => {
    if (!slug) return;
    const parts = slug.split("=");
    const id = parts.at(-1);

    setLoading(true);
    getArticleById(id)
      .then((res) => {
        const articleData = res.data.data;
        setTargetId(articleData.id);
        setArticle(articleData);
      })
      .catch((error) => {
        console.error("Error fetching article:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const currentLanguage = (language || "VI").toUpperCase();

        const res = await getArticles(
          searchQuery,
          currentPage,
          6,
          categoryPath,
          currentLanguage
        );
        const {articles: fetchedArticles, pagination} = res.data.data;

        const filteredArticles = targetId
          ? fetchedArticles.filter((article) => article.id !== targetId)
          : fetchedArticles;

        const articlesLeague = filteredArticles.filter(
          (article) => article.language.toLowerCase() === language.toLowerCase()
        );

        const shuffleArray = (array) => {
          for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
          }
          return array;
        };

        const newArticles = shuffleArray(articlesLeague).slice(0, 4);

        setArticles(newArticles);
        setPagination(pagination);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [searchQuery, currentPage, targetId]);

  // Xử lý HTML, giữ lại iframe
  const sanitizedHTML = DOMPurify.sanitize(article.content || "", {
    ADD_TAGS: ["iframe"],
    ADD_ATTR: [
      "allow",
      "allowfullscreen",
      "frameborder",
      "scrolling",
      "src",
      "width",
      "height",
    ],
  });

  const parsedContent = parse(sanitizedHTML, {
    replace: (domNode) => {
      if (domNode.name === "iframe") {
        return (
          <div className="iframe-container">
            <iframe {...domNode.attribs} title="Embedded content" />
          </div>
        );
      }
    },
  });

  return (
    <div className="bg-white w-full">
      <Helmet>
        <title>
          {/* {article.title} {t("banner.marquee")}(ILC) */}
          {article.title + " (ILC)"}
        </title>
      </Helmet>
      <BreadcrumbDynamic header={article.title} />

      <div className="md:w-3/4 w-full mx-auto grid md:grid-cols-[2fr_1fr] grid-cols-1 gap-2 relative">
        <div className="md:border-r md:border-gray-200 md:p-4 p-2 space-y-4">
          <h1 className="font-semibold text-xl py-2">{article.title || " "}</h1>
          <h2 className="text-base opacity-75">
            {convertISOToDate(article.createDate)}
          </h2>

          <div className="space-y-6">
            {article?.preview_img && (
              <img
                src={article.preview_img}
                alt={article.title}
                className="w-full aspect-[2/1] object-cover"
              />
            )}
            <div className="article-content">{parsedContent}</div>
          </div>

          <div className="mt-4 font-semibold text-xl">
            <h2 className="mb-4">Chia sẻ</h2>
            <ShareButton />
          </div>
        </div>

        <div className="px-2 py-6 md:block md:py-2">
          <div className="sticky top-20 bottom-20 right-10 w-full">
            <h2 className="font-semibold text-xl py-2 text-red-600">
              {t("detailPage.title")}
            </h2>
            <div className="grid grid-rows-3 w-full gap-4">
              {articles.map((card, index) => (
                <div key={index}>
                  <ItemKnowledge {...card} path={category} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
