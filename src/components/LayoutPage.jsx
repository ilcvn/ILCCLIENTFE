/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import ContentSection from "./ContentSection";
import CardKnowledge from "./KnowledgeSection/CardKnowledge";
import { MoveLeft, MoveRight } from "lucide-react";

export default function LayoutPage({
  data,
  header,
  pagination,
  onPageChange,
  path,
}) {
  // Tính tổng số trang dựa trên tổng số bài viết và số bài viết trên mỗi trang
  const totalPages = pagination.total
    ? Math.ceil(pagination.total / pagination.limit)
    : 0;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [onPageChange]);

  return (
    <div className="md:max-w-screen-2xl w-full mx-auto md:px-4 px-2 py-10 z-50 text-black">
      <ContentSection header={header} />
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 my-8 gap-5 bg-white">
        {Array.isArray(data) &&
          data.map((item, index) => (
            <CardKnowledge
              key={index}
              {...item}
              basePath={path}
              typeArticle={item.type}
              views={item.views}
              comments={
                item.interactedArticles.filter(
                  (item) => item.type === "COMMENT",
                ).length
              }
              star={(() => {
                const rateItems = item.interactedArticles.filter(
                  (item) => item.type === "RATE",
                );
                const total = rateItems.reduce(
                  (sum, item) => sum + parseInt(item.value, 10),
                  0,
                );
                return rateItems.length > 0
                  ? Math.ceil(total / rateItems.length)
                  : 5;
              })()}
            />
          ))}
      </div>

      {/* Phần phân trang */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => onPageChange(pagination.page - 1)}
            disabled={pagination.page === 1}
            className="px-3 py-1 border rounded-full disabled:cursor-not-allowed disabled:opacity-50"
          >
            <MoveLeft className="text-neutralGrey" />
          </button>
          {[...Array(totalPages)].map((_, index) => {
            const pageNum = index + 1;
            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`px-3 py-1 text-neutralGrey  border rounded-full ${
                  pagination.page === pageNum
                    ? "font-bold bg-brandSecondary text-white"
                    : ""
                }`}
              >
                {pageNum}
              </button>
            );
          })}
          <button
            onClick={() => onPageChange(pagination.page + 1)}
            disabled={pagination.page === totalPages}
            className="px-3 py-1 border rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <MoveRight className="text-neutralGrey" />
          </button>
        </div>
      )}
    </div>
  );
}
