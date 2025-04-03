import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../context/LanguageContext";

export function convertISOToDate(convertISOToDate) {
  const { t } = useTranslation();
  const { language } = useContext(LanguageContext);

  const date = new Date(convertISOToDate);

  // Tên các ngày trong tuần theo ngôn ngữ
  const daysOfWeek = {
    vi: ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"],
    en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    zh: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
  };

  // Ngôn ngữ mặc định là "vi" nếu không có trong danh sách
  const currentLang = daysOfWeek[language] ? language : "vi";

  const dayOfWeek = daysOfWeek[currentLang][date.getDay()];
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  // Cách hiển thị ngày tháng theo ngôn ngữ
  if (language === "en") {
    return `${dayOfWeek}, ${month}/${day}/${year}`;
  } else if (language === "zh") {
    return `${year}年${month}月${day}日 ${dayOfWeek}`;
  }

  // Mặc định là tiếng Việt
  return `${dayOfWeek}, ngày ${day} tháng ${month} năm ${year}`;
}
