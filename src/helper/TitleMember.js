import { useTranslation } from "react-i18next";

export const getTitles = () => {
  const { t } = useTranslation();

  return [
    { value: "LAWER", title: t("titles.LAWYER") },
    { value: "MASTER", title: t("titles.MASTER") },
    { value: "DOCTORATE", title: t("titles.DOCTORATE") },
    { value: "ASSOCIATE", title: t("titles.ASSOCIATE") },
    { value: "PROFESSOR", title: t("titles.PROFESSOR") },
  ];
};
