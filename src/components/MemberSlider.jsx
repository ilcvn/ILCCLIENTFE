import {useState, useEffect, useRef, useContext} from "react";
import {useTranslation} from "react-i18next";
import CardAvatar from "./CardAvatar";
import {LanguageContext} from "../context/LanguageContext";
import {getMembers} from "../api/Nember/nember";
import {ChevronLeft, ChevronRight} from "lucide-react";
const SliderMember = () => {
  const [members, setMembers] = useState([]);
  const [sliderArrayLength, setSliderArrayLength] = useState(0);
  const [sliderState, setSliderState] = useState({index: 0, direction: 1});
  const [dragStartX, setDragStartX] = useState(null);
  const [dragDelta, setDragDelta] = useState(0);
  const containerRef = useRef(null);

  const {t} = useTranslation();
  const {language} = useContext(LanguageContext);
  const [cardsPerView, setCardsPerView] = useState(4);

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
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await getMembers();
        const memberLanguage = response.data.data.members.filter(
          (member) => member.language.toLowerCase() === language.toLowerCase()
        );

        const memberTeam = memberLanguage.filter(
          (member) =>
            member.isShow === true &&
            (member.department.includes("BOARD_OF_DIRECTORS") ||
              member.role.includes("GROUP_PRESIDENT") ||
              member.role.includes("ROOM_PRESIDENT"))
        );

        setMembers(memberTeam);
        setSliderArrayLength(memberTeam.length);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách members:", error);
      }
    };

    fetchMembers();
  }, [language, t]);

  useEffect(() => {
    if (sliderArrayLength <= cardsPerView) {
      setSliderState({index: 0, direction: 1});
    }
  }, [language, sliderArrayLength, cardsPerView]);

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
  }, [sliderArrayLength, cardsPerView]);

  const handlePrev = () => {
    setSliderState((prev) => ({
      index: Math.max(prev.index - 1, 0),
      direction: -1,
    }));
  };

  const handleNext = () => {
    setSliderState((prev) => ({
      index: Math.min(
        prev.index + 1,
        Math.max(0, sliderArrayLength - cardsPerView)
      ),
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
    if (dragDelta > 50) {
      handlePrev();
    } else if (dragDelta < -50) {
      handleNext();
    }
    setDragStartX(null);
    setDragDelta(0);
  };

  return (
    <div className="max-w-screen-2xl mx-auto w-full md:w-3/4 relative overflow-hidden py-10">
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
            sliderArrayLength < cardsPerView ? "justify-center" : ""
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
    </div>
  );
};

export default SliderMember;
