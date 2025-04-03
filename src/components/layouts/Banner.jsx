// src/components/layouts/Banner.jsx
import {Mail, Phone} from "lucide-react";
import {VietnamFlag, UKFlag, ChinaFlag} from "../../assets/index.js";
import React, {useContext, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {LanguageContext} from "../../context/LanguageContext.jsx";
import clsx from "clsx";
import {useNavigate} from "react-router-dom";

function Banner() {
  const {t, i18n} = useTranslation();
  const {changeLanguage} = useContext(LanguageContext);

  const [zoomLevel, setZoomLevel] = useState(1);
  const [levelZoom, setLevelZoom] = useState(false);
  const navigate = useNavigate();

  const handleLanguageChange = (lng) => {
    changeLanguage(lng);
    i18n.changeLanguage(lng);
    navigate("/");
  };

  return (
    <div className=" p-4 w-full   overflow-hidden bg-brandPrimary  text-white ">
      <div className=" relative mx-auto max-w-screen-2xl ">
       {/* Chữ chạy (marquee) */}
        <div className="flex flex-wrap justify-center xl:justify-end items-center gap-4">
          <div className="w-[530px] overflow-hidden">
            <div className="flex whitespace-nowrap animate-[marquee_10s_linear_infinite]">
              <p className="text-xl font-semibold text-white">
                {t("banner.marquee")}
              </p>
            </div>
          </div>

          {/* Phần thông tin chính */}
          <div className="flex justify-end gap-6 mr-[4%]">
            {/* Email */}
            <div className="hidden md:flex  items-center flex-wrap  justify-center gap-2 text-lg">
              <Mail className="w-6 h-6" />
              <span className="hidden sm:inline">
                {t("banner.emailLabel")}:
              </span>
              <span className="truncate">info@ilcvn.vn</span>
            </div>

            {/* Số điện thoại */}
            <div className=" hidden md:flex justify-center flex-wrap items-center gap-2 text-lg">
              <Phone className="w-6 h-6" />
              <span className="hidden sm:inline">
                {t("banner.phoneLabel")}:
              </span>
              <span>0983 285 499</span>
            </div>

            {/* Chọn ngôn ngữ */}
            <div className="flex md:gap-2 gap-4 justify-center flex-wrap items-center">
              <button onClick={() => handleLanguageChange("vi")}>
                <img
                  src={VietnamFlag}
                  alt="Vietnam"
                
                  className="md:w-10 w-12"
                />
              </button>
              <button onClick={() => handleLanguageChange("en")}>
                <img src={UKFlag} alt="UK" className="md:w-10 w-12" />
              </button>
              <button onClick={() => handleLanguageChange("zh")}>
                <img
                  src={ChinaFlag}
                  alt="China"
                
                  className="md:w-10 w-12"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Banner;
