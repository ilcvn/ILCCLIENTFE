import React, {useState, useEffect} from "react";
import {getEcoSystem} from "../api/ecoSystem/Ecosystem";

// Đường dẫn ảnh fallback (trường hợp không có ảnh)
const fallbackImage =
  "https://th.bing.com/th/id/OIP.e56dGC9pD_mOD9EvzRg_4QHaEK?rs=1&pid=ImgDetMain";

const EcoSystem = ({type, header, subheader}) => {
  const [imagesPerPage, setImagesPerPage] = useState(6);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ecosystem, setEcosystem] = useState([]);

  useEffect(() => {
    const fetchEcosystem = async () => {
      try {
        const response = await getEcoSystem();
        let ecosystems = response.data.data.Ecosystems || [];
        // Lọc danh sách theo typeEcosystem
        const filteredEcosystems = ecosystems.filter(
          (item) => item.typeEcosystem === type
        );

        setEcosystem(filteredEcosystems);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách ecosystem:", error);
      }
    };

    fetchEcosystem();
  }, [type]); // useEffect chạy lại khi `type` thay đổi

  return (
    <div className="max-w-7xl mx-auto my-10 text-black w-full md:w-1/2 lg:w-5/12 text-center px-1">
      {/* Phần tiêu đề và mô tả */}
      <h2 className="text-2xl md:text-4xl font-extrabold text-center mb-2 text-brandSecondary">
        {header}
      </h2>
      
        {/* Nếu muốn icon nằm giữa 2 đường kẻ */}

      <p className="text-center mb-8 md:text-md">{subheader}</p>

      <div className="flex items-center">
          <hr className="flex-1 mx-2 border-t-2 border-neutralGrey" />
          <div className=" text-5xl text-gray-500">⚖</div>
          <hr className="flex-1 mx-2 border-t-2 border-neutralGrey" />
        </div>

      {/* Khung hiển thị slider */}
      <div className="overflow-hidden">
        <div
          className={`grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3   transition-transform duration-500 ease-in-out select-none ${
            ecosystem.length < imagesPerPage ? "justify-center" : ""
          }`}
        >
          {ecosystem.map((service, index) => (
            <div
              key={service.id || index}
              className="hover:border-brandPrimary hover:border w-auto h-auto"
            >
              <a
                href={service.linkWebsite || "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={service.imgUrl ? service.imgUrl : fallbackImage}
                  alt={service.fullName || `Slide ${index + 1}`}
                  className="w-full h-auto object-cover p-2"
                  loading="lazy"
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EcoSystem;
