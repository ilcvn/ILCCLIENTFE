import React, { useContext, useEffect, useState } from "react";
import ItemKnowledge from "../../../components/KnowledgeSection/ItemKnowledge";
import { getArticleById, getArticles } from "../../../api/Article/article";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./Article.css";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import BreadcrumbDynamic from "../../../components/layouts/Breadcrumb";
import { convertISOToDate } from "../../../helper/date";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../../../context/LanguageContext";
import ShareButton from "../../../components/layouts/ShareButton";
import { Helmet } from "react-helmet";
import LoginModal from "../../../components/LoginModal";
import clsx from "clsx";

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

  // DATA GIẢ
  const [comments, setComments] = useState([
    {
      id: 1,
      user: {
        name: "Nguyễn Văn A",
        avatar: "https://i.pravatar.cc/40?img=1",
      },
      content: "Bài viết rất hay, cảm ơn tác giả!",
      createdAt: "2025-04-11T09:30:00Z",
    },
    {
      id: 2,
      user: {
        name: "Trần Thị B",
        avatar: "https://i.pravatar.cc/40?img=2",
      },
      content: "Mình có thể xin thêm tài liệu không?",
      createdAt: "2025-04-11T10:45:00Z",
    },
  ]);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const [showLoginPrompt, setShowLoginPrompt] = useState(true);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [showLoginDialog, setShowLoginDialog] = useState(false);

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
        <title>{article.title + " (ILC)"}</title>
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

          <div className="flex items-center justify-between mt-4 font-medium text-lg">
            <div>
              <h2 className="">Chia sẻ</h2>
              <ShareButton />
            </div>

            <div>
              <h2 className="text-lg font-medium mb-2">Đánh giá bài viết</h2>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    onClick={() => setRating(star)}
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
              {rating > 0 && (
                <p className="text-sm text-gray-600 mt-1">
                  Bạn đã đánh giá {rating} sao. Cảm ơn bạn!
                </p>
              )}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4">Bình luận gần đây</h3>
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex items-start gap-3">
                  <img
                    src={comment.user.avatar}
                    alt={comment.user.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="bg-gray-100 p-3 rounded-lg w-full">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">{comment.user.name}</span>
                      <span className="text-xs text-gray-500">
                        {new Date(comment.createdAt).toLocaleString("vi-VN")}
                      </span>
                    </div>
                    <p className="mt-1">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <h2 className="mb-4 text-brandPrimary font-bold text-xl">
              BÌNH LUẬN
            </h2>

            <div className="mt-2">
              <textarea
                placeholder="Nhập bình luận..."
                className={clsx(
                  "w-full p-3 border border-gray-300 rounded resize-none min-h-[100px]",
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
                  className="mt-2 px-4 py-2 bg-brandPrimary text-white rounded hover:bg-opacity-90 text-md"
                  onClick={() => {
                    if (!comment.trim()) return;
                    console.log("Gửi bình luận:", comment);
                    setComment("");
                  }}
                >
                  Gửi bình luận
                </button>
              )}

              {showLoginPrompt && !user && (
                <div className="mt-2 bg-yellow-100 border border-yellow-400 text-yellow-700 p-3 rounded text-md">
                  Bạn cần{" "}
                  <span
                    className="font-bold cursor-pointer text-blue-600 underline"
                    onClick={() => setShowLoginDialog(true)}
                  >
                    đăng nhập{" "}
                  </span>
                  để bình luận.
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
