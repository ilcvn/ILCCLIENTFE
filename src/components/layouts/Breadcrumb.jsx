import React, { useMemo } from "react";
import { ChevronRightIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import navLinks from "../../constants/navLinks.js";
import { useTranslation } from "react-i18next";

const BreadcrumbDynamic = () => {
  const { pathname } = useLocation();
  const pathnames = pathname.split("/").filter(Boolean);
  const { t } = useTranslation();

  // Mapping path -> label (đã dịch)
  const navLabelMap = useMemo(() => {
    const map = {};

    // Thêm các đường dẫn từ navLinks
    navLinks.forEach((link) => {
      map[link.path] = t(link.label);
      if (link.children?.length) {
        link.children.forEach((child) => {
          map[child.path] = t(child.label);
        });
      }
    });

    // Thêm "Tìm kiếm" và "Thành viên"
    map["/tim-kiem"] = t("nav.search");

    return map;
  }, [t]); 

  const defaultSlugToLabel = (slug) => {
    slug = decodeURIComponent(slug);
    const equalIndex = slug.indexOf("=");
    if (equalIndex !== -1) slug = slug.slice(0, equalIndex);
    if (slug.startsWith("article.")) slug = slug.substring("article.".length);
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Hàm tìm label theo đường dẫn
  const findLabelByPath = (path) => {
    return navLabelMap[path] || defaultSlugToLabel(path.split("/").pop());
  };

  return (
    <div className="bg-gray-200 w-full">
      <div className="md:w-3/4 mx-auto md:p-4 p-2 z-50 text-black">
        <nav className="text-black text-sm" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            {/* Breadcrumb đầu tiên: Trang Chủ */}
            <li>
              <Link to="/" className="text-black hover:underline">
                {t("nav.home") || "Trang Chủ"}
              </Link>
            </li>
            {pathnames.map((_, index) => {
              const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
              const label = findLabelByPath(routeTo);
              const isLast = index === pathnames.length - 1;

              return (
                <li key={routeTo} className="flex items-center">
                  <ChevronRightIcon className="w-4 h-4 text-black mx-2" />
                  {isLast ? (
                    <span className="text-black font-bold">{label}</span>
                  ) : (
                    <Link to={routeTo} className="text-black hover:underline">
                      {label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default BreadcrumbDynamic;
