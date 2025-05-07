import React, {useContext, useEffect, useState} from "react";
import {FaSearch} from "react-icons/fa";
import img from "../../assets/knowledge/bob1.jpg";
import {getAllArticles} from "../../api/Article/article";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {LanguageContext} from "../../context/LanguageContext";

const SearchKnowledge = () => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [articles, setArticles] = useState([]);

  const navigate = useNavigate();
  const {t} = useTranslation();
  const {language, changeLanguage} = useContext(LanguageContext);
  const [articlesLn, setarticlesLn] = useState([]);
  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const response = await getAllArticles();
        const allArticles = response.data.data.articles;
        const articlesLeague = allArticles.filter(
          (article) => article.language.toLowerCase() === language.toLowerCase()
        );

        setArticles(allArticles);
        setarticlesLn(articlesLeague);
      } catch (err) {
        setError(err);
        console.error("Lỗi khi lấy bài viết:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [language]);

  // Khi nhập vào, lọc các bài viết có tiêu đề chứa giá trị nhập vào
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
  // Khi click vào gợi ý, chuyển hướng tới trang chi tiết với slug của bài viết
  const handleSuggestionClick = (article) => {
    setInputValue(article.title);
    setSuggestions([]);
    navigate(
      `/tim-kiem/${article.id}`
    );
  };

  const handleSearchButtonClick = () => {
    navigate("/tim-kiem", {state: {query: inputValue}});
  };
  return (
    <div className="border-2 box-border border-brandSecondary w-full h-full md:block hidden">
      <h1 className="bg-brandSecondary w-full p-4 text-white font-semibold text-lg text-center">
        {t("search.title")}
      </h1>
      <div className="p-3 flex justify-center relative">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder={t("search.placeholder")}
          className="w-3/4 border-2 border-brandSecondary"
        />
        <button
          className="bg-brandSecondary text-white p-3.5"
          onClick={handleSearchButtonClick}
        >
          <FaSearch />
        </button>
        {suggestions.length > 0 && (
          <ul className="absolute top-full left-0 right-0 bg-white border border-brandSecondary z-10 scrollbar max-h-60 overflow-y-auto">
            {suggestions.map((article, index) => (
              <li
                key={index}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleSuggestionClick(article)}
              >
                {article.title}
              </li>
            ))}
          </ul>
        )}
      </div>
      <img src={img} alt="search" className="lg:w-3/4 w-full mx-auto" loading="lazy" />
      <div className="text-center font-bold text-red-800">
        <h2 className="text-lg px-0.5 text-brandSecondary">
          {t("search.subTitle")}
        </h2>
        <h2 className="p-0.5 text-2xl">(+84) 983 285 499</h2>
        <h22 className="mb-2">24/7</h22>
        <a
          href="tel:+0983285499"
          className="bg-red-800 text-white p-2 my-2 inline-block rounded-md hover:opacity-80"
        >
          {t("search.button")}
        </a>
      </div>
    </div>
  );
};

export default SearchKnowledge;
