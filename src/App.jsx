import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/layouts/Footer.jsx";
import Header from "./components/layouts/Header.jsx";
import SharingContact from "./components/layouts/SharingContact.jsx";
import Banner from "./components/layouts/Banner.jsx";
import SubFooter from "./components/layouts/SubFooter.jsx";
import LogoWrapper from "./components/layouts/LogoWrapper";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import LoadingScreenSlash from "./components/layouts/LoadingScreenSlash.jsx";
import { Suspense } from "react";
import AboutPage from "./pages/AboutPage/AboutPage";
import DetailPage from "./pages/AboutPage/DetailPage/DetailPage";
import ContactPage from "./pages/ContactPage/ContactPage";
import HomePage from "./pages/HomePage/HomePage";
import ServicePage from "./pages/ServicePage/ServicePage";
import NewsPage from "./pages/NewsPage/NewsPage";
import KnowledgePage from "./pages/KnowledgePage/KnowledgePage";
import MemberPage from "./pages/MemberPage/MemberPage.jsx";
import SearchPage from "./pages/SearchPage/SearchPage.jsx";
import { ToastContainer } from "react-toastify";

const routesConfig = [
  { path: "/", element: <HomePage /> },
  { path: "/tong-quan", element: <AboutPage /> },
  { path: "/dich-vu", element: <ServicePage /> },
  { path: "/dich-vu/:slug", element: <DetailPage /> },
  { path: "/tin-tuc", element: <NewsPage /> },
  { path: "/tin-tuc/:slug", element: <DetailPage /> },
  { path: "/doi-tac", element: <KnowledgePage /> },
  { path: "/lien-he", element: <ContactPage /> },
  { path: "/tong-quan/:slug", element: <MemberPage /> },
  { path: "/tim-kiem", element: <SearchPage /> },
  { path: "/tim-kiem/:slug", element: <DetailPage /> },
];
const allRootPath = [
  "/tong-quan/BOARD_OF_DIRECTORS",  
  "/tong-quan/SCIENTIFIC_COUNCIL",   
  "/tong-quan/BOARD_OF_MANAGEMERS",  
  "/tong-quan/ADVISORY_BOARD",   
  "/tong-quan/department",     
  "/tong-quan/partner",  
  "/tong-quan/office",
  "/tong-quan/ecosystem",   
];

function App() {
  return (
    <>
      <Router>
        <Banner />
        <LoadingScreenSlash />
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
          <Routes>
            {routesConfig.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
             {allRootPath.map((path, index) => (
              <Route key={`about-${index}`} path={path} element={<AboutPage />} />
            ))}
            {/* Route cho trang lỗi */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <SharingContact />
          <Footer />
          <SubFooter />
        </Suspense>
      </Router>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
