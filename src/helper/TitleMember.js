import {useTranslation} from "react-i18next";

export const getTitles = () => {
  const {t} = useTranslation();

  return [
    {value: "NA", title: t("titles.NA")},
    {
      value: "BACHELOR_OF_ECONOMICS_AND_LAW",
      title: t("titles.BACHELOR_OF_ECONOMICS_AND_LAW"),
    },
    {
      value: "BACHELOR_OF_ACCOUNTING",
      title: t("titles.BACHELOR_OF_ACCOUNTING"),
    },
    {
      value: "BACHELOR_OF_BUSINESS_ADMINISTRATION",
      title: t("titles.BACHELOR_OF_BUSINESS_ADMINISTRATION"),
    },
    {value: "LAWYER", title: t("titles.LAWYER")},
    {value: "LAWER", title: t("titles.LAWYER")}, // alias sai chính tả
    {value: "MASTER", title: t("titles.MASTER")},
    {value: "DOCTORATE", title: t("titles.DOCTORATE")},
    {value: "ASSOCIATE", title: t("titles.ASSOCIATE")},
    {value: "PROFESSOR", title: t("titles.PROFESSOR")},
    {value: "ARBITRATOR", title: t("titles.ARBITRATOR")},
    {value: "JUDGE", title: t("titles.JUDGE")},
  ];
};
