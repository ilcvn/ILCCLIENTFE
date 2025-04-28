import React, { useContext, useEffect, useState } from "react";
import clsx from "clsx";
import { MoveRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import ConsultationForm from "./ConsultationForm";
import { LanguageContext } from "../../context/LanguageContext";
import { getArticles } from "../../api/Article/article";
import { Link } from "react-router-dom";

const Footer = () => {
  const [articles, setArticles] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { t } = useTranslation();
  const { language } = useContext(LanguageContext);

  // Dữ liệu liên hệ
  const address = [
    {
      text: t("footer.addressOffice2Text"),
      id: 5,
      name: t("footer.addressOffice2Label"),
    },
    {
      text: t("footer.addressOffice1Text"),
      id: 6, // Sửa id để tránh trùng với id: 5
      name: t("footer.addressOffice1Label"),
    },
  ];

  // Dữ liệu công ty
  const companyLinks = [
    {
      text: t("footer.addressText"),
      id: 1,
      name: t("footer.addressLabel"),
    },
    {
      text: "0934 121 183 - 0983 285 499",
      id: 2,
      name: t("footer.hotlineLabel"),
    },
    {
      text: "0983 285 499",
      id: 3,
      name: '+MR. Hưng:',
    },
    {
      text: "0934 121 183",
      id: 4,
      name: '+MR. Ngọc Anh:',
    },
    {
      text: "0971 992 232",
      id: 5,
      name: 'Ms. Hà',
    },
    {
      text: "info@ilcvn.vn",
      id: 6,
      name: t("footer.emailLabel"),
    },
    {
      text: t("footer.workingTimeText"),
      id: 7,
      name: t("footer.workingTimeLabel"),
    },
    {
      text: t("0318760066"),
      id: 8, // Sửa id để tránh trùng với id: 4
      name: t("footer.tax"),
    },
  ];

  // Fetch bài viết
  const searchQuery = "";
  const type = "SERVICE";
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const currentLanguage = language.toUpperCase() || "VI";
        const res = await getArticles(
          searchQuery,
          currentPage,
          6,
          type,
          currentLanguage
        );
        const { articles, pagination } = res.data.data;
        const firstFive = articles.slice(0, 3);

        setArticles(firstFive);
        setPagination(pagination);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [searchQuery, currentPage, language]);

  const createSlug = (title) => {
    return title ? title.trim().toLowerCase().replace(/\s+/g, "-") : "unknown";
  };

  return (
    <footer className="bg-brandPrimary text-white py-10 px-6 md:px-12 justify-end">
      <div className="container w-full mx-auto grid xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-8 md:gap-12">
        {/* Cột 1: Liên hệ */}
        <div className="w-full ">
          <h2 className="text-xl font-semibold">{t("footer.contactTitle")}</h2>
          <hr className="border-t-2 mt-2" />
          <nav className="mt-4 space-y-3 text-md">
            {companyLinks.map((link, index) => (
              <p key={link.id + "-" + index}>
                <span
                  className={clsx("font-bold", {
                    "whitespace-pre-line": link.id === 4,
                  })}
                >
                  {link.name}
                </span>{" "}
                {link.text}
              </p>
            ))}
          </nav>
        </div>

        {/* Cột 2: Hỗ trợ */}
        <div className="w-full ">
          <h2 className="text-xl font-semibold">{t("footer.supportTitle")}</h2>
          <hr className="border-t-2 mt-2" />
          <nav className="mt-4 space-y-3">
            {articles?.length > 0 &&
              articles.map((article, index) => {
                // Tạo slug động từ title
                const linkSlug = createSlug(article.title);
                const linkTo = `/dich-vu/${article.id}`;

                return (
                  <div
                    key={index}
                    className="flex items-center gap-2 hover:translate-x-2 duration-300 hover:text-brandSecondary"
                  >
                    <MoveRight className="shrink-0" />
                    <Link
                      to={linkTo}
                      className="focus:outline-none focus:ring-2 focus:ring-blue-300 rounded transition-all duration-300 ease-in-out hover:text-orange-400 hover:underline hover:font-bold"
                    >
                      {article.title}
                    </Link>
                  </div>
                );
              })}
          </nav>
          <br />
          <h2 className="text-xl font-semibold">{t("footer.office")}</h2>
          <hr className="border-t-2 mt-2" />
          <nav className="mt-4 space-y-3 text-md">
            {address.map((link, index) => (
              <p key={link.id + "-" + index}>
                <span
                  className={clsx("font-bold", {
                    "whitespace-pre-line": link.id === 5,
                  })}
                >
                  {link.name}
                </span>{" "}
                {link.text}
              </p>
            ))}
          </nav>
        </div>

        {/* Cột 3: Đăng ký tư vấn */}
        <div className="w-full ">
          <h2 className="text-xl font-semibold">{t("footer.consultTitle")}</h2>
          <hr className="border-t-2 mt-2" />
          <ConsultationForm />
        </div>

        {/* Cột 4: Bản đồ */}
        <div className="w-full">
          <h2 className="text-xl font-semibold">{t("footer.mapTitle")}</h2>
          <hr className="border-t-2 mt-2" />
          <div className="mt-4 w-full h-60">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.7994954790993!2d106.71636007583876!3d10.826650758263636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528815d9292d1%3A0xcc09c2ed0645bee8!2zMzIgxJDGsOG7nW5nIDE4LCBIaeG7h3AgQsOsbmggQ2jDoW5oLCBUaOG7pyDEkOG7qWMsIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1744222384981!5m2!1svi!2s"
              className={clsx(
                "border-0",
                "w-[100%] h-[100%]",
                "md:w-[350px] md:h-[300px]"
              )}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
