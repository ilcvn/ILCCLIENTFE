import { useState, useEffect, useContext } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { ChevronDown, ChevronRight, Menu, Search, X } from "lucide-react";
import navLinks from "../../constants/navLinks.js";
import { Logo } from "../../assets/index.js";
import { getAllArticles } from "../../api/Article/article.js";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../../context/LanguageContext";
import LoginModal from "../LoginModal.jsx";

const Header = () => {
  // Các state chung

  const [searchOpen, setSearchOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // State cho bài viết
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ServiceArticles, setServiceArticles] = useState([]);
  const [AboutArticles, setAboutArticles] = useState([]);
  const [NewsArticles, setNewsArticles] = useState([]);
  const [KnowledgeArticles, setKnowledgeArticles] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { language, changeLanguage } = useContext(LanguageContext);
  const [articlesLn, setarticlesLn] = useState([]);

  const [isOpenAvatar, setIsOpenAvatar] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const toggleDropdown = () => setIsOpenAvatar((prev) => !prev);

  // 1. Fetch danh sách bài viết từ API
  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const response = await getAllArticles();
        const allArticles = response.data.data.articles;
        const articlesLeague = allArticles.filter(
          (article) => article.language.toLowerCase() === language.toLowerCase()
        );
        const ServiceArticles = articlesLeague.filter((article) =>
          article.type.includes("SERVICE")
        );
        const NewsArticles = articlesLeague.filter((article) =>
          article.type.includes("NEWS")
        );
        const AboutArticles = articlesLeague.filter((article) =>
          article.type.includes("TRAINING")
        );
        const KnowledgeArticles = articlesLeague.filter((article) =>
          article.type.includes("RESEARCH")
        );

        setArticles(allArticles);
        setarticlesLn(articlesLeague);
        setAboutArticles(AboutArticles);
        setServiceArticles(ServiceArticles);
        setNewsArticles(NewsArticles);
        setKnowledgeArticles(KnowledgeArticles);
      } catch (err) {
        setError(err);
        console.error("Lỗi khi lấy bài viết:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [language]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 180);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Xử lý thay đổi input và gợi ý
  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (value.length > 0) {
      const filtered = articlesLn.filter((article) =>
        article.title.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  // 3. Khi chọn gợi ý từ danh sách
  const handleSuggestionClick = (article) => {
    setInputValue(article.title);
    setSuggestions([]);
    navigate(`/tim-kiem/${article.id}`);
  };

  // 4. Xử lý khi nhấn nút tìm kiếm (ví dụ cho mobile)
  const handleSearchButtonClick = () => {
    navigate("/tim-kiem", { state: { query: inputValue } });
  };

  const createSlug = (title) => {
    return title ? title.trim().toLowerCase().replace(/\s+/g, "-") : "unknown";
  };

  // 6. Tạo navigation động: thay đổi mục có dynamicSource "articles" để children được lấy từ articles
  const generateChildren = (nav) => {
    const articleMap = {
      3: ServiceArticles,
      2: AboutArticles,
      5: KnowledgeArticles,
      6: NewsArticles,
      default: AboutArticles,
    };

    const selectedArticles = articleMap[nav.id] || articleMap.default;

    return selectedArticles.sort((a, b) => b.view - a.view).slice(0, 5).map((article) => ({
      id: article.id,
      label: article.title,
      path: `${nav.dynamicPrefix}/${article.id}`,
    }));
  };

  const dynamicNavLinks = navLinks.map((nav) =>
    nav.dynamicSource === "articles"
      ? { ...nav, children: generateChildren(nav) }
      : nav
  );

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <>
      <div className="w-full relative shadow-lg">
        <div className=" relative mx-auto max-w-screen-2xl ">
          {/* Logo */}
          <div className="xl:absolute relative w-full  xl:left-[0%] h-full shadow-sm px-2  xl:max-w-[240px] bottom-[112%] z-30">
            <div className="bg-white text-center sticky">
              <button onClick={() => navigate("/")}>
                <img
                  src={Logo}
                  alt="Viện Khoa học pháp lý và Phát triển doanh nghiệp (Institute of Legal Science and Corporate Development - ILC)"
                  className="w-full h-[121px] object-contain cursor-pointer"
                />
              </button>
            </div>
          </div>

          <div
            className={clsx(
              "h-16 w-full",
              isScrolled ? "fixed top-0 z-30" : "relative top-0 z-40"
            )}
          >
            {/* MOBILE MENU */}
            <div className="h-full flex items-center xl:hidden bg-brandPrimary w-full px-2 shadow-lg">
              <button className="mr-2" onClick={() => setIsOpen(true)}>
                <Menu className="object-contain w-11 h-11 text-white" />
              </button>

              <div className="relative w-full">
                <input
                  type="text"
                  placeholder={t("nav.placeholderSearch")}
                  value={inputValue}
                  onChange={handleChange}
                  className="border border-gray-300 px-4 py-2 text-sm w-full rounded-md"
                />
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-2"
                  onClick={handleSearchButtonClick}
                >
                  <Search className="w-5 h-5 text-neutralDGrey" />
                </button>
                {suggestions.length > 0 && (
                  <ul className="absolute left-0 right-0 bg-white border border-gray-300 mt-1 max-h-60 overflow-y-auto z-50">
                    {suggestions.map((article, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleSuggestionClick(article)}
                      >
                        {article.title}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* DESKTOP MENU */}
            <div
              className={`hidden xl:flex items-center  ${
                isScrolled
                  ? "fixed top-0 left-0 justify-center w-full bg-white p-4 shadow-lg"
                  : "relative justify-end mr-[5%]  h-full"
              } `}
            >
              {" "}
              {/* <ul className={"flex items-center gap-12"}> */}
              <ul
                className={`flex items-center mr-2 ${
                  language.toUpperCase() === "VI"
                    ? "gap-9"
                    : language.toUpperCase() === "EN"
                    ? "gap-12"
                    : "gap-20"
                }`}
              >
                {dynamicNavLinks.map((link) => {
                  const isActive =
                    location.pathname === link.path ||
                    link.children?.some(
                      (child) => location.pathname === child.path
                    );

                  return (
                    <li
                      key={link.id}
                      className={clsx(
                        link.children
                          ? "relative group max-w-35 inline-block"
                          : ""
                      )}
                    >
                      <Link
                        to={link.path}
                        className={clsx(
                          "text-lg font-medium transition mx-2",
                          isActive
                            ? "text-brandPrimary"
                            : "hover:text-brandPrimary"
                        )}
                      >
                        {t(link.label).toUpperCase()}
                      </Link>

                      {/* Nếu có submenu */}
                      {link.children && (
                    <ul className="absolute left-0 top-11 w-auto min-w-48 bg-white shadow-lg opacity-0 invisible translate-y-3 
                        group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 
                        transition-all duration-300 ease-in-out delay-150" >
                          {link.children.map((child) => (
                            <li key={child.id}>
                              <Link
                                to={child.path}
                                className="block px-4 py-2 hover:bg-brandPrimary hover:text-white text-sm text-neutralGrey font-semibold whitespace-nowrap"
                              >
                                {t(child.label).toUpperCase()}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}

                <li className="relative group">
                  <a onClick={() => setSearchOpen(!searchOpen)}>
                    <Search
                      className="text-lg font-medium transition text-neutralGrey cursor-pointer"
                      size={24}
                    />
                  </a>

                  {/* Search dropdown cho desktop */}
                  {searchOpen && (
                    <ul
                      className="absolute right-0 top-10 w-max bg-white shadow-lg p-2"
                      onMouseLeave={() => setSearchOpen(false)}
                    >
                      <li className="p-2 flex flex-col">
                        <div className="relative">
                          <input
                            type="text"
                            placeholder={t("nav.placeholderSearch")}
                            value={inputValue}
                            onChange={handleChange}
                            className="border border-gray-300 pr-7 py-1 rounded-md"
                          />
                          <button
                            className="absolute right-1 top-1/2 -translate-y-1/2"
                            onClick={handleSearchButtonClick}
                          >
                            <Search size={16} className="relative" />
                          </button>
                        </div>
                        {suggestions.length > 0 && (
                          <ul className="bg-white border border-gray-300 mt-1 max-h-60 overflow-y-auto z-50">
                            {suggestions.map((article, index) => (
                              <li
                                key={index}
                                className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleSuggestionClick(article)}
                              >
                                {article.title}
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* MOBILE SIDEBAR */}
        <div
          className={clsx(
            "fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity",
            isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          )}
          onClick={() => setIsOpen(false)}
        ></div>

        <div
          className={clsx(
            "fixed left-0 top-0 h-full w-3/4 bg-white shadow-lg transform transition-transform z-[100] duration-500 ease-in-out",
            isOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="p-4">
            <a href="/" className="mx-auto">
              <img
                src={Logo}
                alt="Viện Khoa học pháp lý và Phát triển doanh nghiệp (Institute of Legal Science and Corporate Development - ILC)"
                className="w-full h-[126px] object-contain"
              />
            </a>
          </div>

          {user && (
            <div className="flex justify-end p-4">
              <div className="relative inline-block text-left">
                <div
                  className="flex items-center space-x-2 cursor-pointer"
                  onClick={toggleDropdown}
                >
                  <img
                    src={user?.photo}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>

                {isOpenAvatar && (
                  <div className="absolute right-0 mt-2 w-max bg-white rounded-md shadow-lg z-10">
                    <div className="flex flex-col gap-2">
                      <span className="text-sm px-4 py-2 text-brandPrimary font-bold">
                        {user?.name}
                      </span>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Đăng xuất
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="relative w-full px-2">
            <input
              type="text"
              placeholder={t("nav.placeholderSearch")}
              value={inputValue}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-3 text-sm w-full rounded-md"
            />
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 px-2"
              onClick={handleSearchButtonClick}
            >
              <Search className="w-5 h-5 text-neutralDGrey" />
            </button>
            {suggestions.length > 0 && (
              <ul className="absolute left-0 right-0 bg-white border border-gray-300 mt-1 max-h-60 overflow-y-auto z-50">
                {suggestions.map((article, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSuggestionClick(article)}
                  >
                    {article.title}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <ul className="p-3 space-y-2">
            {dynamicNavLinks.map((link, index) => (
              <li key={link.id}>
                <div className="relative">
                  <Link
                    to={link.path}
                    className="block text-md font-medium text-black hover:bg-gray-200 w-full p-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {t(link.label).toUpperCase()}
                  </Link>

                  {link.children && link.children.length > 0 && (
                    <button
                      onClick={() =>
                        setOpenSubmenu(openSubmenu === index ? null : index)
                      }
                      className="absolute text-neutralGrey top-2 right-0"
                    >
                      {openSubmenu === index ? (
                        <ChevronDown />
                      ) : (
                        <ChevronRight />
                      )}
                    </button>
                  )}
                </div>

                {link.children && openSubmenu === index && (
                  <ul className="mt-2 space-y-2">
                    {link.children.map((child) => (
                      <li key={child.id}>
                        <Link
                          to={child.path}
                          className="block text-sm text-gray-600 hover:bg-gray-200 w-full p-2 transition-all duration-150"
                          onClick={() => setIsOpen(false)}
                        >
                          {t(child.label).toUpperCase()}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          {/* {!user && (
            <div className="flex justify-end p-4">
              <span
                className="font-bold cursor-pointer text-brandPrimary underline"
                onClick={() => {
                  setIsOpen(false);
                  setShowLoginDialog(true);
                }}
              >
                Đăng nhập
              </span>{" "}
            </div>
          )} */}
        </div>
      </div>

      {showLoginDialog && !user && (
        <LoginModal
          onClose={() => setShowLoginDialog(false)}
          onLoginSuccess={(userInfo) => setUser(userInfo)}
        />
      )}
    </>
  );
};

export default Header;
