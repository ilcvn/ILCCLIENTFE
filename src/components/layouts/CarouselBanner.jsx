import { useCallback, useEffect, useRef, useState } from "react";
import { Slider_1, Slider_2, Slider_3 } from "../../assets";
import { ArrowLeft, ArrowRight } from "lucide-react";

const AUTO_PLAY_DURATION = 4000;

const slides = [
  {
    id: 1,
    title: "Giải pháp pháp lý cho doanh nghiệp",
    description:
      "Hỗ trợ pháp lý toàn diện giúp doanh nghiệp phát triển bền vững",
    img: Slider_1,
    url: "/dich-vu",
  },
  {
    id: 2,
    title: "Tư vấn chuyên sâu",
    description:
      "Đội ngũ chuyên gia giàu kinh nghiệm, đồng hành cùng doanh nghiệp",
    img: Slider_2,
    url: "/dich-vu",
  },
  {
    id: 3,
    title: "Giải pháp pháp lý cho doanh nghiệp",
    description:
      "Hỗ trợ pháp lý toàn diện giúp doanh nghiệp phát triển bền vững",
    img: Slider_3,
    url: "/dich-vu",
  },
];

const CarouselBanner = () => {
  const [current, setCurrent] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const timerRef = useRef(null);

  const go = useCallback((index) => {
    const next = (index + slides.length) % slides.length;
    setCurrent(next);
    setProgressKey((k) => k + 1);
  }, []);

  const prevSlide = () => go(current - 1);
  const nextSlide = () => go(current + 1);

  useEffect(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => go(current + 1), AUTO_PLAY_DURATION);
    return () => clearTimeout(timerRef.current);
  }, [current, go]);

  return (
    <div className="md:h-[calc(100vh-80px)] h-[60vw] min-h-[320px] overflow-hidden relative">
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] z-20 bg-white/20">
        <div
          key={progressKey}
          className="h-full bg-white/80"
          style={{
            animation: `progress ${AUTO_PLAY_DURATION}ms linear forwards`,
          }}
        />
      </div>

      {/* Slides track */}
      <div
        className="flex h-full transition-transform duration-700"
        style={{
          transform: `translateX(-${current * 100}%)`,
          transitionTimingFunction: "cubic-bezier(0.77, 0, 0.175, 1)",
        }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="w-full flex-shrink-0 relative">
            <img
              src={slide.img}
              alt={slide.title}
              className="w-full h-full object-cover"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />
          </div>
        ))}
      </div>

      {/* Prev Button */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg backdrop-blur-sm bg-brandSecondary border border-secobg-brandSecondary/30 transition-all duration-200 hover:scale-105 z-10"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <ArrowLeft size={20} />
      </button>

      {/* Next Button */}
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg backdrop-blur-sm bg-brandSecondary border border-secobg-brandSecondary/30 transition-all duration-200 hover:scale-105 z-10"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <ArrowRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-4 flex gap-2 z-10">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => go(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              current === index
                ? "w-6 bg-brandSecondary"
                : "w-2 bg-white hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Progress bar keyframe style */}
      <style>{`
        @keyframes progress {
          from { width: 0% }
          to { width: 100% }
        }
      `}</style>
    </div>
  );
};

export default CarouselBanner;
