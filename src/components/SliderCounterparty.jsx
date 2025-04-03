import React, { useState, useEffect } from "react";
import { getEcoSystem } from "../api/ecoSystem/Ecosystem";

// Bạn có thể thay đổi đường dẫn fallback theo ý muốn
const fallbackImage =
  "https://th.bing.com/th/id/OIP.e56dGC9pD_mOD9EvzRg_4QHaEK?rs=1&pid=ImgDetMain";

const SliderCounterparty = () => {
  const [imagesPerPage, setImagesPerPage] = useState(6);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ecosystem, setEcosystem] = useState([]);

  // Cập nhật số lượng ảnh hiển thị theo kích thước màn hình
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setImagesPerPage(2); // Mobile
      } else if (width < 1024) {
        setImagesPerPage(4); // Tablet
      } else {
        setImagesPerPage(6); // Desktop
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lấy dữ liệu ecosystem từ API
  useEffect(() => {
    const fetchEcosystem = async () => {
      try {
        const response = await getEcoSystem();
        let ecosystems = response.data.data.Ecosystems || [];

        setEcosystem(ecosystems);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách ecosystem:", error);
      }
    };
    fetchEcosystem();
  }, [imagesPerPage]);

  // Tính tổng số slide
  const totalSlides =
    ecosystem.length > imagesPerPage ? ecosystem.length - imagesPerPage + 1 : 1;

  // Tự động chuyển slide mỗi 3 giây nếu có đủ slide
  useEffect(() => {
    if (totalSlides > 1) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [totalSlides]);

  return (
    <div className="md:w-3/4 max-w-7xl w-full mx-auto py-16 relative">
      {/* Khung hiển thị slider */}
      <div className="overflow-hidden">
        <div
          className={`flex transition-transform duration-500 ease-in-out select-none ${
            ecosystem.length < 6 ? "justify-center" : ""
          }`}
          style={{
            transform: `translateX(-${currentIndex * (100 / imagesPerPage)}%)`,
          }}
        >
          {ecosystem.map((service, index) => (
            <div
              key={service.id || index}
              className="cursor-pointer flex-shrink-0"
              style={{ width: `calc(100% / ${imagesPerPage})` }}
            >
              <a href={service.linkWebsite || "#"} target="_blank">
                <img
                  src={service.imgUrl ? service.imgUrl : fallbackImage}
                  alt={service.fullName || `Slide ${index + 1}`}
                  className="w-max h-auto object-cover"
                />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Điều hướng bằng dot cho từng slide */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalSlides }).map((_, slideIndex) => (
          <div
            key={slideIndex}
            className={`h-3 w-3 rounded-full mx-1 cursor-pointer ${
              currentIndex === slideIndex
                ? "bg-brandSecondary w-6 transition-transform duration-300"
                : "bg-gray-400"
            }`}
            onClick={() => setCurrentIndex(slideIndex)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SliderCounterparty;
