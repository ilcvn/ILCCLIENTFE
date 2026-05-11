import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/layouts/Footer.jsx";
import Header from "./components/layouts/Header.jsx";
import SharingContact from "./components/layouts/SharingContact.jsx";
import Banner from "./components/layouts/Banner.jsx";
import SubFooter from "./components/layouts/SubFooter.jsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import LoadingScreenSlash from "./components/layouts/LoadingScreenSlash.jsx";
import { Suspense } from "react";
import AboutPage from "./pages/AboutPage/AboutPage";
import DetailPage from "./pages/AboutPage/DetailPage/DetailPage";
import ContactPage from "./pages/ContactPage/ContactPage";
import HomePage from "./pages/HomePage/HomePage";
import ServicePage from "./pages/ServicePage/ServicePage";
import MemberPage from "./pages/MemberPage/MemberPage.jsx";
import SearchPage from "./pages/SearchPage/SearchPage.jsx";
import ScrollToTop from "./components/layouts/ScrollToTop.jsx";
import { ToastContainer } from "react-toastify";
import AdmissionPage from "./pages/AdmissionPage/AdmissionPage.jsx";

const routesConfig = [
  { path: "/", element: <HomePage /> },
  { path: "/tong-quan", element: <AboutPage /> },

  { path: "/dich-vu", element: <ServicePage typePage="SERVICE" /> },
  { path: "/dich-vu/:slug", element: <DetailPage /> },

  { path: "/tin-tuc", element: <ServicePage typePage="NEWS" /> },
  { path: "/tin-tuc/:slug", element: <DetailPage /> },

  { path: "/nghien-cuu", element: <ServicePage typePage="RESEARCH" /> },
  { path: "/nghien-cuu/:slug", element: <DetailPage /> },

  { path: "/dao-tao", element: <ServicePage typePage="TRAINING" /> },
  { path: "/dao-tao/:slug", element: <DetailPage /> },

  { path: "/tuyen-sinh", element: <AdmissionPage typePage="ADMISSIONS" /> },
  { path: "/tuyen-sinh/:slug", element: <DetailPage /> },

  { path: "/lien-he", element: <ContactPage /> },
  { path: "/tong-quan/:slug", element: <MemberPage /> },
  { path: "/tim-kiem", element: <SearchPage /> },
  { path: "/tim-kiem/:slug", element: <DetailPage /> },
];
const allRootPath = [
  "/tong-quan/ban-lanh-dao",
  "/tong-quan/hoi-dong-quan-ly-vien",
  "/tong-quan/Hoi-dong-khoa-hoc",
  "/tong-quan/Hoi-dong-co-van",
  "/tong-quan/phong-ban",
  "/tong-quan/partner",
  "/tong-quan/office",
  "/tong-quan/ecosystem",
];

function App() {
  return (
    <Router>
      <ScrollToTop>
        <Banner />
        <LoadingScreenSlash />
        <Suspense fallback={<div>Loading...</div>}>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <Routes>
                {routesConfig.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    element={route.element}
                  />
                ))}
                {allRootPath.map((path, index) => (
                  <Route
                    key={`about-${index}`}
                    path={path}
                    element={<AboutPage />}
                  />
                ))}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <SharingContact />
            <Footer />
          </div>
          <SubFooter />
        </Suspense>
        <ToastContainer position="top-right" autoClose={3000} />
      </ScrollToTop>
    </Router>
  );
}

export default App;
