import React, {useState, useEffect, useRef, useContext} from "react";
import Card from "./Card";
import {ChevronLeft, ChevronRight} from "lucide-react";
import CardAvatar from "./CardAvatar";
import CardVideo from "./CardVideo";
import {getArticles} from "../api/Article/article";
import {LanguageContext} from "../context/LanguageContext";
import {getTitles} from "../helper/TitleMember";
import {useTranslation} from "react-i18next";
import { getMembers } from "../api/Nember/nember";

const videosArray = [
  {
    id: 1,
    title: "3 Thay Đổi Quan Trọng Trên VneID",
    img: "https://image3.luatvietnam.vn/uploaded/665twebp/images/original/2025/01/06/thay-doi-quan-trong-tren-vneid-_0601174306.jpg",
    url: "https://www.youtube.com/watch?v=LG2EqTfb-A4",
  },
  {
    id: 2,
    title: "3 Thay Đổi Quan Trọng Trên VneID",
    img: "https://image3.luatvietnam.vn/uploaded/665twebp/images/original/2025/01/06/thay-doi-quan-trong-tren-vneid-_0601174306.jpg",
    url: "https://www.youtube.com/watch?v=LG2EqTfb-A4",
  },
  {
    id: 3,
    title: "3 Thay Đổi Quan Trọng Trên VneID",
    img: "https://image3.luatvietnam.vn/uploaded/665twebp/images/original/2025/01/06/thay-doi-quan-trong-tren-vneid-_0601174306.jpg",
    url: "https://www.youtube.com/watch?v=LG2EqTfb-A4",
  },
  {
    id: 4,
    title: "3 Thay Đổi Quan Trọng Trên VneID",
    img: "https://image3.luatvietnam.vn/uploaded/665twebp/images/original/2025/01/06/thay-doi-quan-trong-tren-vneid-_0601174306.jpg",
    url: "https://www.youtube.com/watch?v=LG2EqTfb-A4",
  },
  {
    id: 5,
    title: "3 Thay Đổi Quan Trọng Trên VneID",
    img: "https://image3.luatvietnam.vn/uploaded/665twebp/images/original/2025/01/06/thay-doi-quan-trong-tren-vneid-_0601174306.jpg",
    url: "https://www.youtube.com/watch?v=LG2EqTfb-A4",
  },
  {
    id: 6,
    title: "3 Thay Đổi Quan Trọng Trên VneID",
    img: "https://image3.luatvietnam.vn/uploaded/665twebp/images/original/2025/01/06/thay-doi-quan-trong-tren-vneid-_0601174306.jpg",
    url: "https://www.youtube.com/watch?v=LG2EqTfb-A4",
  },
];

const SliderCardsItem = ({
  isCard,
  isCardAvatar,
  isCardVideo,
  isPrevNextBtn,
}) => {
  const [cardsPerView, setCardsPerView] = useState(4);
  const [members, setMembers] = useState([]);
  const [articles, setArticles] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const {t} = useTranslation();

  const {language} = useContext(LanguageContext);
  const [articlesLn, setarticlesLn] = useState([]);
  const [sliderArrayLength, setSliderArrayLength] = useState(0);

  const searchQuery = "";
  const type = "SERVICE";
  const [titles, setTitles] = useState([]);
  const valuetitles = getTitles().map((item) => item.value);

  // Update số card hiển thị dựa trên kích thước màn hình
  useEffect(() => {
    const updateCardsPerView = () => {
      const width = window.innerWidth;
      if (width < 640) setCardsPerView(1);
      else if (width < 768) setCardsPerView(2);
      else if (width < 1024) setCardsPerView(3);
      else setCardsPerView(4);
    };
    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  // Lấy danh sách member và thêm fallback nếu không đủ số lượng (yêu cầu 7)
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await getMembers();
        console.log(response);
        const memberTeam = response.data.data.members.filter(
          (member) => (member.isShow === true /*&& member.department.includes('BOARD_OF_DIRECTORS')*/)
        );
        

        const order = [
          "LAWYER",
          "MASTER",
          "DOCTORATE",
          "ASSOCIATE",
          "PROFESSOR",
        ];

        const roleSort = [
          "MEMBER",
          "VICE_PRESIDENT",
          "PRESIDENT",
          "VICE_CHAIRMAN",
          "CHAIRPERSON",
        ];

        const sortedMembers = memberTeam.sort((a, b) => {
          // Sắp xếp theo role
          const roleDiff = roleSort.indexOf(b.role) - roleSort.indexOf(a.role);
          if (roleDiff !== 0) {
            return roleDiff;
          }
          return order.indexOf(b.penName) - order.indexOf(a.penName);
        });
        setMembers(sortedMembers);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách members:", error);
      }
    };

    fetchMembers();
  }, [t]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const res = await getArticles(searchQuery, currentPage, 6, type);
        const {articles, pagination} = res.data.data;
        const articlesLeague = articles.filter(
          (article) => article.language.toLowerCase() === language.toLowerCase()
        );
        // Sắp xếp các bài viết theo thứ tự giảm dần của updateDate
        const sortedArticles = articlesLeague.sort(
          (a, b) => new Date(b.updateDate) - new Date(a.updateDate)
        );
        setSliderArrayLength(articlesLeague.length);
        
        setArticles(sortedArticles);
        setPagination(pagination);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [searchQuery, currentPage, language]);

  // useEffect(() => {
  //   if (isCard) {
  //     setSliderArrayLength(articles.length);
  //   } else if (isCardAvatar) {
  //     setSliderArrayLength(members.length);
  //   } else if (isCardVideo) {
  //     setSliderArrayLength(videosArray.length);
  //   }
  // }, [articles, members, isCard, isCardAvatar, isCardVideo]);

  const [sliderState, setSliderState] = useState({index: 0, direction: 1});
  const [dragStartX, setDragStartX] = useState(null);
  const [dragDelta, setDragDelta] = useState(0);
  const containerRef = useRef(null);
  useEffect(() => {
    if (sliderArrayLength > cardsPerView) {
      const interval = setInterval(() => {
        setSliderState((prev) => {
          let nextIndex = prev.index + prev.direction;
          if (nextIndex >= sliderArrayLength - cardsPerView) {
            return {index: sliderArrayLength - cardsPerView, direction: -1};
          } else if (nextIndex <= 0) {
            return {index: 0, direction: 1};
          }
          return {index: nextIndex, direction: prev.direction};
        });
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [cardsPerView, sliderArrayLength]);

  const handlePrev = () => {
    setSliderState((prev) => {
      const newIndex = Math.max(prev.index - 1, 0);
      return {index: newIndex, direction: -1};
    });
  };

  const handleNext = () => {
    setSliderState((prev) => {
      const newIndex = Math.min(
        prev.index + 1,
        Math.max(0, sliderArrayLength - cardsPerView)
      );
      return {index: newIndex, direction: 1};
    });
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
    if (dragDelta > 50) {
      // Kéo sang phải: chuyển về trang trước
      setSliderState((prev) => {
        const newIndex = Math.max(prev.index - 1, 0);
        return {index: newIndex, direction: -1};
      });
    } else if (dragDelta < -50) {
      // Kéo sang trái: chuyển về trang sau
      setSliderState((prev) => {
        const newIndex = Math.min(
          prev.index + 1,
          sliderArrayLength - cardsPerView
        );
        return {index: newIndex, direction: 1};
      });
    }
    setDragStartX(null);
    setDragDelta(0);
  };

  return (
    <div className="max-w-screen-2xl mx-auto w-full md:w-3/4 relative overflow-hidden py-10">
      {isCard && (
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
              sliderArrayLength < 4 ? "justify-center" : ""
            }`}
            style={{
              transform: `translateX(-${
                (sliderState.index * 100) / cardsPerView
              }%)`,
            }}
          >
            {articles.map((card, index) => (
              <div
                key={index}
                className="flex-shrink-0 px-2 md:px-4"
                style={{width: `${100 / cardsPerView}%`}}
              >
                <Card {...card} />
              </div>
            ))}
          </div>
        </div>
      )}

      {isCardAvatar && (
        <div
          ref={containerRef}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          <div
            className={`flex transition-transform duration-500 ease-in-out select-none ${
              members.length < 6 ? "justify-center" : ""
            }`}
            style={{
              transform: `translateX(-${
                (sliderState.index * 100) / cardsPerView
              }%)`,
            }}
          >
            {members.map((card, index) => (
              <div
                key={index}
                className="flex-shrink-0 px-2"
                style={{width: `${100 / cardsPerView}%`}}
              >
                <CardAvatar props={card} />
              </div>
            ))}
          </div>
        </div>
      )}

      {isCardVideo && (
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${
              (sliderState.index * 100) / cardsPerView
            }%)`,
          }}
        >
          {videosArray.map((card, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-2"
              style={{width: `${100 / cardsPerView}%`}}
            >
              <CardVideo {...card} />
            </div>
          ))}
        </div>
      )}

      {isPrevNextBtn && (
        <div>
          <button
            className="absolute md:left-0 left-2 z-10 top-1/2 transform -translate-y-1/2 bg-brandSecondary rounded-full h-12 w-12 text-white focus:bg-neutralDGrey"
            onClick={handlePrev}
            disabled={sliderState.index === 0}
          >
            <div className="p-2">
              <ChevronLeft className="w-6 h-6" />
            </div>
          </button>
          <button
            className="absolute md:right-0 right-2 top-1/2 transform -translate-y-1/2 bg-brandSecondary rounded-full h-12 w-12 text-white focus:bg-neutralDGrey"
            onClick={handleNext}
            disabled={sliderState.index >= sliderArrayLength - cardsPerView}
          >
            <div className="p-3">
              <ChevronRight className="w-6 h-6" />
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default SliderCardsItem;
