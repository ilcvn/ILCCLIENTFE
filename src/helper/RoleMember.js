import { useTranslation } from "react-i18next";

export const getRoles = () => {
  const { t } = useTranslation();

  return [
    { value: "MEMBER", title: t("roles.MEMBER") },
    { value: "VICE_PRESIDENT", title: t("roles.VICE_PRESIDENT") },
    { value: "PRESIDENT", title: t("roles.PRESIDENT") },
    { value: "CHAIRPERSON", title: t("roles.CHAIRPERSON") },
    { value: "VICE_CHAIRMAN", title: t("roles.VICE_CHAIRMAN") },
    { value: "GROUP_PRESIDENT", title: t("roles.GROUP_PRESIDENT") },
    { value: "GROUP_VICE_PRESIDENT", title: t("roles.GROUP_VICE_PRESIDENT") },
    { value: "ROOM_PRESIDENT", title: t("roles.ROOM_PRESIDENT") }, 
    { value: "ROOM_VICE_PRESIDENT", title: t("roles.ROOM_VICE_PRESIDENT") },
  ];
  
};
