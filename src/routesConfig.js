import React, { lazy } from "react";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage/AboutPage"));
const DetailPage = lazy(() =>
  import("./pages/AboutPage/DetailPage/DetailPage")
);
const ServicePage = lazy(() => import("./pages/ServicePage/ServicePage"));
const NewsPage = lazy(() => import("./pages/NewsPage/NewsPage"));
const KnowledgePage = lazy(() => import("./pages/KnowledgePage/KnowledgePage"));
const ContactPage = lazy(() => import("./pages/ContactPage/ContactPage"));

const routesConfig = [
  { path: "/", element: <HomePage /> },
  { path: "/tong-quan", element: <AboutPage /> },
  { path: "/tong-quan/:slug", element: <DetailPage /> },
  { path: "/dich-vu", element: <ServicePage /> },
  { path: "/dich-vu/:slug", element: <DetailPage /> },
  { path: "/tin-tuc", element: <NewsPage /> },
  { path: "/kien-thuc-ve-luat", element: <KnowledgePage /> },
  { path: "/kien-thuc-ve-luat/:slug", element: <DetailPage /> },
  { path: "/lien-he", element: <ContactPage /> },
  { path: "*", element: <NotFoundPage /> },
];

export default routesConfig;
