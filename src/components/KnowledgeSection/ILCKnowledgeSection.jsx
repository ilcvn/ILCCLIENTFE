import React, { useContext, useEffect, useState } from "react";
import CardKnowledge from "./CardKnowledge";
import ItemKnowledge from "./ItemKnowledge";
import SearchKnowledge from "./SearchKnowledge";
import { getArticles } from "../../api/Article/article";
import { LanguageContext } from "../../context/LanguageContext";

const ILCKnowledgeSection = () => {
  const [articles, setArticles] = useState([]);
  const [topArticle, setTopArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const type = "KNOWLEDGE";
  const searchQuery = "";
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const response = await getArticles(searchQuery, currentPage, 5, type);
        const { articles, pagination } = response.data.data;

        const articlesLeague = articles.filter(
          (article) => article.language.toLowerCase() === language.toLowerCase()
        );

        // Sắp xếp các bài viết theo updateDate giảm dần
        const sortedArticles = articlesLeague.sort(
          (a, b) => new Date(b.updateDate) - new Date(a.updateDate)
        );

        // Đặt bài viết đầu tiên làm topArticle và các bài viết tiếp theo vào articles
        setTopArticle(sortedArticles[0] || null);
        setArticles(sortedArticles.slice(1, 5));
        setPagination(pagination);
      } catch (error) {
        console.error("Lỗi khi lấy bài viết:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [searchQuery, currentPage, language]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-screen-2xl md:mx-auto px-2 md:w-3/4 w-full py-10">
      <div className="grid lg:grid-cols-[35%_40%_25%] grid-rows-1 gap-3">
        <div>
          {topArticle ? (
            <CardKnowledge {...topArticle} />
          ) : (
            <div className="p-4 text-center text-gray-500">
              No content
            </div>
          )}
        </div>
        <div className="grid lg:grid-cols-1 grid-cols-2 gap-4">
          {articles && articles.length > 0 ? (
            articles.map((article) => (
              <div key={article.id}>
                <ItemKnowledge {...article} />
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              No content
            </div>
          )}
        </div>
        <div className="lg:block hidden">
          <SearchKnowledge />
        </div>
      </div>
    </div>
  );
};

export default ILCKnowledgeSection;
