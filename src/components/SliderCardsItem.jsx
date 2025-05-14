/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef, useContext } from "react";
import Card from "./Card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CardVideo from "./CardVideo";
import { getArticles } from "../api/Article/article";
import { LanguageContext } from "../context/LanguageContext";
import { useTranslation } from "react-i18next";

const videos = [
  {
    id: 1,
    title:
      "Chào mừng đến với Viện Khoa học Pháp lý và Phát triển Doanh nghiệp ILC.",
    img: "https://drive.google.com/thumbnail?id=1jE06rMnAZNjRo2P0tGQ-_yUQvEvyS9j9",
    url: "https://drive.google.com/file/d/1jE06rMnAZNjRo2P0tGQ-_yUQvEvyS9j9/view",
  },
];

const SliderCardsItem = ({ isCard, isCardVideo, isPrevNextBtn }) => {
  const [cardsPerView, setCardsPerView] = useState(4);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { t } = useTranslation();
  const { language } = useContext(LanguageContext);

  const [sliderState, setSliderState] = useState({ index: 0, direction: 1 });
  const [dragStartX, setDragStartX] = useState(null);
  const [dragDelta, setDragDelta] = useState(0);
  const containerRef = useRef(null);

  const dataSource = isCardVideo ? videos : articles;
  const sliderArrayLength = dataSource.length;

  // Responsive cardsPerView
  useEffect(() => {
    const updateCardsPerView = () => {
      const width = window.innerWidth;
      if (width <= 768) {
        setCardsPerView(1); // Màn hình nhỏ hiển thị 1 thẻ
      } else if (width <= 1024) {
        setCardsPerView(2); // Màn hình từ 769px đến 1024px hiển thị 2 thẻ
      } else {
        setCardsPerView(4); // Màn hình lớn hơn 1024px hiển thị 4 thẻ
      }
    };
    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  // Fetch articles
  useEffect(() => {
    if (!isCard) return;

    const fetchArticles = async () => {
      try {
        setLoading(true);
        const res = await getArticles(
          "",
          currentPage,
          6,
          "SERVICE",
          (language || "VI").toUpperCase()
        );
        const data = res.data?.data;
        if (data?.articles) {
          setArticles(data.articles);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, [language, currentPage, isCard]);

  // Reset slider index when language changes or dataSource updates
  useEffect(() => {
    if (sliderArrayLength <= cardsPerView) {
      setSliderState({ index: 0, direction: 1 });
    }
  }, [language, sliderArrayLength, cardsPerView]);

  // Auto-scroll slider
  useEffect(() => {
    if (isPrevNextBtn && sliderArrayLength > cardsPerView) {
      const interval = setInterval(() => {
        setSliderState((prev) => {
          let next = prev.index + prev.direction;
          if (next >= sliderArrayLength - cardsPerView)
            return { index: sliderArrayLength - cardsPerView, direction: -1 };
          if (next <= 0) return { index: 0, direction: 1 };
          return { index: next, direction: prev.direction };
        });
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [sliderArrayLength, cardsPerView, isPrevNextBtn]);

  const handlePrev = () => {
    setSliderState((prev) => ({
      index: Math.max(prev.index - 1, 0),
      direction: -1,
    }));
  };

  const handleNext = () => {
    setSliderState((prev) => ({
      index: Math.min(prev.index + 1, sliderArrayLength - cardsPerView),
      direction: 1,
    }));
  };

  const handleDragStart = (e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    setDragStartX(clientX);
  };

  const handleDragMove = (e) => {
    if (dragStartX !== null) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      setDragDelta(clientX - dragStartX);
    }
  };

  const handleDragEnd = () => {
    if (dragDelta > 50) handlePrev();
    else if (dragDelta < -50) handleNext();
    setDragStartX(null);
    setDragDelta(0);
  };

  return (
    <div className="relative overflow-hidden py-10 max-w-screen-2xl mx-auto w-full md:w-[95%] px-2 sm:px-4">
      <div
        ref={containerRef}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
        className="overflow-hidden"
      >
        <div
          className={`flex transition-transform duration-500 ease-in-out select-none ${
            sliderArrayLength < cardsPerView ? "justify-center" : ""
          }`}
          style={{
            transform: `translateX(-${
              (sliderState.index * 100) / cardsPerView
            }%)`,
          }}
        >
          {dataSource.map((card, index) => (
            <div
              key={card.id || index}
              className="flex-shrink-0 px-2 md:px-4"
              style={{ width: `${100 / cardsPerView}%` }}
            >
              {isCard && (
                <Card
                  {...card}
                  views={card.views}
                  comments={
                    card.interactedArticles?.filter(
                      (item) => item.type === "COMMENT"
                    ).length || 0
                  }
                  star={(() => {
                    const rateItems =
                      card.interactedArticles?.filter(
                        (item) => item.type === "RATE"
                      ) || [];
                    const total = rateItems.reduce(
                      (sum, item) => sum + parseInt(item.value, 10),
                      0
                    );
                    return rateItems.length > 0
                      ? Math.ceil(total / rateItems.length)
                      : 5;
                  })()}
                />
              )}
              {isCardVideo && <CardVideo {...card} />}
            </div>
          ))}
        </div>
      </div>

      {isPrevNextBtn && sliderArrayLength > cardsPerView && (
        <>
          <button
            className="absolute md:left-0 left-2 z-10 top-1/2 transform -translate-y-1/2 bg-brandSecondary rounded-full h-12 w-12 text-white"
            onClick={handlePrev}
            disabled={sliderState.index === 0}
          >
            <ChevronLeft className="w-6 h-6 mx-auto" />
          </button>
          <button
            className="absolute md:right-0 right-2 top-1/2 transform -translate-y-1/2 bg-brandSecondary rounded-full h-12 w-12 text-white"
            onClick={handleNext}
            disabled={sliderState.index >= sliderArrayLength - cardsPerView}
          >
            <ChevronRight className="w-6 h-6 mx-auto" />
          </button>
        </>
      )}
    </div>
  );
};

export default SliderCardsItem;
