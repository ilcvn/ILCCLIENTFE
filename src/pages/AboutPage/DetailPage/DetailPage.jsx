import React, { useContext, useEffect, useState } from "react";
import ItemKnowledge from "../../../components/KnowledgeSection/ItemKnowledge";
import { getArticleById, getArticles } from "../../../api/Article/article";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./Article.css";
import parse, { domToReact } from "html-react-parser";
import DOMPurify from "dompurify";
import BreadcrumbDynamic from "../../../components/layouts/Breadcrumb";
import { convertISOToDate } from "../../../helper/date";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../../../context/LanguageContext";
import ShareButton from "../../../components/layouts/ShareButton";
import { Helmet } from "react-helmet";
import LoginModal from "../../../components/LoginModal";
import clsx from "clsx";
import { createInteractedArticle } from "../../../api/InteractedArticle/interactedArticle";
import { toast } from "react-toastify";

export default function DetailPage() {
  const [articles, setArticles] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [article, setArticle] = useState({});
  const [targetId, setTargetId] = useState(0);

  const searchQuery = "";
  const { slug } = useParams();
  const { t } = useTranslation();
  const { language } = useContext(LanguageContext);
  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const category = pathParts[1].toLowerCase();

  const [comment, setComment] = useState("");

  const [comments, setComments] = useState([]);
  const [rating, setRating] = useState(0);
  const [totalRating, setTotalRating] = useState(2);
  const [hoverRating, setHoverRating] = useState(0);

  const [showLoginPrompt, setShowLoginPrompt] = useState(true);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const navigate = useNavigate();
  const pathToCategory = {
    "dich-vu": "SERVICE",
    "dao-tao": "TRAINING",
    "nghien-cuu": "RESEARCH",
    "tin-tuc": "NEWS",
  };

  const INTERACTED_ARTICLE_ENUM = {
    COMMENT: "COMMENT",
    RATE: "RATE",
  };

  const handleRateSubmit = async (type, value) => {
    if (!localStorage.getItem("user")) {
      setShowLoginDialog(true);
    }

    if (!value.trim()) return;

    if (!slug) return;
    const parts = slug.split("=");
    const articleID = parts.at(-1);

    const data = {
      userName: user?.email,
      fullName: user?.name,
      avatar: user?.photo,
      type: type,
      value: value.trim(),
      articleID: articleID,
      createdDate: new Date(),
      updatedDate: new Date(),
    };

    const response = await createInteractedArticle(data);

    if (response.status === 201) {
      toast.success(t("homepage.contentSection.services.recordComment"));
      if (type === INTERACTED_ARTICLE_ENUM["RATE"])
        setRating(parseInt(value, 10));
      fetchCommnent();
    }

    if (type === INTERACTED_ARTICLE_ENUM["COMMENT"]) setComment("");
  };

  // Nếu không tìm thấy, mặc định là "SERVICE"
  const categoryPath = pathToCategory[category] || "SERVICE";

  useEffect(() => {
    fetchCommnent();
  }, [slug, rating]);

  const fetchCommnent = () => {
    if (!slug) return;
    const parts = slug.split("=");
    const id = parts.at(-1);

    setLoading(true);
    getArticleById(id)
      .then((res) => {
        const articleData = res.data.data;
        setTargetId(articleData.id);
        setArticle(articleData);

        const rateItems = articleData.interactedArticles.filter(
          (item) => item.type === INTERACTED_ARTICLE_ENUM.RATE
        );
        const total = rateItems.reduce(
          (sum, item) => sum + parseInt(item.value, 10),
          0
        );
        const point =
          rateItems.length > 0 ? Math.ceil(total / rateItems.length) : 5;
        setTotalRating(point);

        const all_comments = articleData.interactedArticles
          .filter((item) => item.type !== INTERACTED_ARTICLE_ENUM.RATE)
          .map((item) => ({
            id: item.id,
            user: {
              userName: item.userName,
              name: item.fullName,
              avatar: item.avatar,
            },
            content: item.value,
            createdAt: item.createdDate,
          }));

        setComments(all_comments);
        if (user) {
          const ratedRecord_by_user = articleData.interactedArticles.find(
            (item) =>
              item.type === INTERACTED_ARTICLE_ENUM.RATE &&
              item.userName === user.email
          );

          if (ratedRecord_by_user) {
            setRating(parseInt(ratedRecord_by_user.value));
          } else setRating(0);
        } else {
          setRating(0);
        }
      })
      .catch((error) => {
        navigate("/not-found", { replace: true });

        console.error("Error fetching article:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

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
        const { articles: fetchedArticles, pagination } = res.data.data;

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
    ADD_TAGS: ["iframe", "blockquote"],
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
      if (domNode.name === "blockquote") {
        return (
          <blockquote className="custom-blockquote">
            {domToReact(domNode.children)}
          </blockquote>
        );
      }
    },
  });

  return (
    <div className="bg-white w-full">
      <Helmet>
        <title>{article.title + " | ILC"}</title>
      </Helmet>
      <BreadcrumbDynamic header={article.title} />

      <div className="md:max-w-screen-2xl w-full mx-auto grid md:grid-cols-[2fr_1fr] grid-cols-1 gap-2 relative">
        <div className="md:border-r md:border-gray-200 md:p-4 p-2 space-y-4">
          <h1 className="font-semibold text-xl py-2">{article.title || " "}</h1>

          <div className="flex flex-col items-start gap-2 lg:flex-row lg:items-center lg:justify-between">
            <h2 className="text-base opacity-75">
              {convertISOToDate(article.createDate)}
            </h2>

            <div className="flex gap-1">
              <h2 className="text-lg font-medium mb-2">
                {t("homepage.contentSection.services.ratingScore")}
              </h2>
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  onClick={(e) => e.stopPropagation()}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill={totalRating >= star ? "#facc15" : "#e5e7eb"}
                  className="w-6 h-6 cursor-pointer transition-colors"
                >
                  <path d="M12 .587l3.668 7.431L24 9.168l-6 5.849L19.335 24 12 19.897 4.665 24 6 15.017 0 9.168l8.332-1.15z" />
                </svg>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {article?.preview_img && (
              <img
                src={article.preview_img}
                alt={article.title}
                className="w-full aspect-[2/1] object-cover"
                loading="lazy"
              />
            )}
            <div className="article-content">{parsedContent}</div>
          </div>

          <div className="flex md:flex-row  flex-col md:items-center justify-between mt-4 font-medium text-lg">
            <div>
              <h2 className="">
                {t("homepage.contentSection.services.share")}
              </h2>
              <ShareButton />
            </div>

            <div>
              <h2 className="text-lg font-medium mb-2">
                {t("homepage.contentSection.services.evaluateArticle")}
              </h2>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    onClick={() =>
                      handleRateSubmit(
                        INTERACTED_ARTICLE_ENUM["RATE"],
                        star.toString()
                      )
                    }
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={
                      (hoverRating || rating) >= star ? "#facc15" : "#e5e7eb"
                    }
                    className="w-6 h-6 cursor-pointer transition-colors"
                  >
                    <path d="M12 .587l3.668 7.431L24 9.168l-6 5.849L19.335 24 12 19.897 4.665 24 6 15.017 0 9.168l8.332-1.15z" />
                  </svg>
                ))}
              </div>
              {/* {rating > 0 && (
                <p className="text-sm text-gray-600 mt-1">
                  {t("homepage.contentSection.services.thank4Rated.sentence1")}{" "}
                  {rating}{" "}
                  {t("homepage.contentSection.services.thank4Rated.sentence2")}
                </p>
              )} */}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4">
              {t("homepage.contentSection.services.currentComments")}
            </h3>
            {comments.length > 0 ? (
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex items-start gap-3">
                    <img
                      src={comment.user.avatar}
                      alt={comment.user.name}
                      className="w-10 h-10 rounded-full"
                      loading="lazy"
                    />
                    <div className="bg-gray-100 p-3 rounded-lg w-full">
                      <div className="flex justify-between items-center">
                        <span
                          className={`font-semibold text-md ${
                            comment.user.userName === user?.email
                              ? "font-bold text-blue-600"
                              : ""
                          }`}
                        >
                          {comment.user.name}
                        </span>

                        <span className="text-xs text-gray-500">
                          {new Date(comment.createdAt).toLocaleString("vi-VN")}
                        </span>
                      </div>
                      <p className="mt-1 text-sm">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <i className="text-sm text-gray-500">
                {t("homepage.contentSection.services.noComment")}
              </i>
            )}
          </div>

          <div className="mt-4">
            <h2 className="mb-4 text-brandPrimary font-bold text-xl">
              {t("homepage.contentSection.services.comment")}
            </h2>

            <div className="mt-2">
              <textarea
                placeholder={
                  t("homepage.contentSection.services.inputComment") + "..."
                }
                className={clsx(
                  "w-full p-3 border border-gray-300 rounded resize-none min-h-[100px] text-sm",
                  !user ? "bg-brandPrimary/10" : "bg-inherit"
                )}
                onFocus={() => {
                  if (!user) {
                    setShowLoginPrompt(true);
                    setShowLoginDialog(true);
                  }
                }}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                disabled={!user}
              />

              {user && (
                <button
                  className="mt-2 px-4 py-2 bg-brandPrimary text-white rounded hover:bg-opacity-90 text-sm"
                  onClick={() =>
                    handleRateSubmit(
                      INTERACTED_ARTICLE_ENUM["COMMENT"],
                      comment
                    )
                  }
                >
                  {t("homepage.contentSection.services.sentComment")}
                </button>
              )}

              {showLoginPrompt && !user && (
                <div className="mt-2 bg-yellow-100 border border-yellow-400 text-yellow-700 p-3 rounded text-md">
                  {t(
                    "homepage.contentSection.services.needLogin2Comment.sentence1"
                  )}{" "}
                  <span
                    className="font-bold cursor-pointer text-blue-600 underline"
                    onClick={() => setShowLoginDialog(true)}
                  >
                    {t(
                      "homepage.contentSection.services.needLogin2Comment.sentence2"
                    )}{" "}
                  </span>
                  {t(
                    "homepage.contentSection.services.needLogin2Comment.sentence3"
                  )}
                  .
                </div>
              )}

              {showLoginDialog && !user && (
                <LoginModal
                  onClose={() => setShowLoginDialog(false)}
                  onLoginSuccess={(userInfo) => setUser(userInfo)}
                />
              )}
            </div>
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
