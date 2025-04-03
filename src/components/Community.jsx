import React from "react";
import { motion } from "framer-motion";
import { PartnerShip, Reliable, Tolerance } from "../assets";
import { bounce, fadeInFramer } from "../helper/fadeInFramer.js";

const Community = () => {
  const membershipData = [
    {
      imageSrc: PartnerShip,
      title: "Máy Xúc Thủy Lực Chính Hãng",
      description:
        "Chuyên cung cấp máy xúc thủy lực từ các thương hiệu hàng đầu, đảm bảo hiệu suất và độ bền vượt trội.",
    },
    {
      imageSrc: Reliable,
      title: "Dịch Vụ Bảo Trì Định Kỳ",
      description:
        "Đội ngũ kỹ thuật viên chuyên nghiệp, đảm bảo máy xúc của bạn luôn hoạt động ổn định và hiệu quả.",
    },
    {
      imageSrc: Tolerance,
      title: "Phụ Tùng Chính Hãng",
      description:
        "Phân phối phụ tùng máy xúc chính hãng, cam kết chất lượng và giá cả cạnh tranh nhất trên thị trường.",
    },
  ];

  return (
    <div
      className="px-4 lg:px-14 max-w-screen-2xl mx-auto py-16"
      id="community"
    >
      <div className="text-center mb-10">
        <h2 className="text-4xl font-semibold text-neutralDGrey mb-2">
          Dẫn Đầu Công Nghệ{" "}
          <span className="text-brandPrimary font-semibold">Máy Xúc</span>
        </h2>
        <p className="text-gray-600 mt-2">
          Chúng tôi tự hào là đối tác đáng tin cậy của hơn{" "}
          <span className="text-brandPrimary font-semibold">
            500+ doanh nghiệp
          </span>{" "}
          trên toàn quốc, cung cấp{" "}
          <span className="text-brandPrimary font-semibold">
            máy xúc chất lượng cao
          </span>{" "}
          và dịch vụ hậu mãi chuyên nghiệp.
        </p>
      </div>

      {/* Danh sách đối tác */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={bounce(0.4)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
      >
        {membershipData.map((item, index) => (
          <article
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transform transition hover:-translate-y-1"
            key={index}
          >
            <div className="flex flex-col items-center text-center">
              <img
                src={item.imageSrc}
                alt={item.title}
                className="w-24 h-24 object-contain mb-4"
              />
              <h3 className="text-lg font-bold text-gray-700 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500">{item.description}</p>
            </div>
          </article>
        ))}
      </motion.div>
    </div>
  );
};

export default Community;
