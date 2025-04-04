/* eslint-disable react/prop-types */
import React, { createContext, useEffect, useState } from "react";
import i18n from "../../i18n";

export const LanguageContext = createContext({
  language: "vi",
  changeLanguage: () => {},
});

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem("language") || "vi");

  useEffect(() => {
    i18n.changeLanguage(language); // Cập nhật ngôn ngữ cho i18next
  }, [language]);

  const changeLanguage = (lng) => {
    setLanguage(lng);
    localStorage.setItem("language", lng); // Lưu vào localStorage để giữ trạng thái sau khi reload
    i18n.changeLanguage(lng); // Đổi ngôn ngữ của i18next
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
