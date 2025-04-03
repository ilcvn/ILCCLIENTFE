import { useEffect, useState } from "react";
import { Slider_1, Slider_2, Slider_3 } from "../../assets";
import { ArrowLeft, ArrowRight } from "lucide-react";

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="md:h-[calc(100vh-80px)] overflow-hidden relative shadow-lg">
      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${current * 100}vw)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="w-screen h-full flex-shrink-0">
            <img
              src={slide.img}
              alt="Slide"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Prev Button */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-brandSecondary text-white p-2 rounded-full shadow-lg"
        onClick={prevSlide}
      >
        <ArrowLeft />
      </button>

      {/* Next Button */}
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-brandSecondary text-white p-2 rounded-full shadow-lg"
        onClick={nextSlide}
      >
        <ArrowRight />
      </button>

      {/* DOTS */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-8 flex gap-3">
        {slides.map((slide, index) => (
          <div
            className={`w-3 h-3 rounded-full bg-gray-200 cursor-pointer transition-all ${
              current === index ? "bg-orange-500 scale-125" : ""
            }`}
            key={slide.id}
            onClick={() => setCurrent(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default CarouselBanner;
