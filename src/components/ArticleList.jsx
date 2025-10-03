// src/components/ArticleList.jsx
import { useEffect, useState } from "react";
import { getAllArticles, getArticles } from "../api/Article/article";

function ArticleList({ searchQuery = "" }) {
  const [articles, setArticles] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getArticles(searchQuery)
      .then((res) => {
        // Lấy dữ liệu từ res.data.data
        const { articles, pagination } = res.data.data;
        setArticles(articles);
        setPagination(pagination);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchQuery]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Danh sách Articles</h1>
      {articles.map((article) => (
        <div key={article.id} style={{ marginBottom: "1rem" }}>
          <h3>{article.title}</h3>
          <img
            src={article.preview_img}
            alt={article.title}
            style={{ width: "200px", height: "auto" }}
          />
          <p>
            <strong>Type:</strong> {article.type}
          </p>
          <p>
            <strong>Summary:</strong> {article.content}
          </p>
          <p>
            <strong>Views:</strong> {article.views}
          </p>
          <p>
            <strong>Create Date:</strong>{" "}
            {new Date(article.createDate).toLocaleString()}
          </p>
          <p>
            <strong>Update Date:</strong>{" "}
            {new Date(article.updateDate).toLocaleString()}
          </p>
        </div>
      ))}

      {/* Hiển thị thông tin phân trang */}
      <div>
        <p>
          <strong>Page:</strong> {pagination.page}
        </p>
        <p>
          <strong>Limit:</strong> {pagination.limit}
        </p>
        <p>
          <strong>Total:</strong> {pagination.total}
        </p>
      </div>
    </div>
  );
}

export default ArticleList;
