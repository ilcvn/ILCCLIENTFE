import { useEffect } from "react";
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import ContentSection from "../../components/ContentSection.jsx";
import BreadcrumbDynamic from "../../components/layouts/Breadcrumb.jsx";
import { Link } from "lucide-react";
import { IoLocationSharp } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import ContactForm from "../../components/layouts/ContactForm.jsx";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

function ContactPage() {
  const { t } = useTranslation();
  const location = useLocation();
  const data = location.state?.formData;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <BreadcrumbDynamic />
      <Helmet>
        <title>
          {t("nav.contact")} | ILC
        </title>
      </Helmet>
      <div className="px-2 py-10 lg:px-14 lg:py-10 mb-12">
        <ContentSection header={t("contactPage.header", "LIÊN HỆ")} />
        <div className="flex items-center justify-center">
          <div className="container md:mx-auto md:p-5 grid lg:grid-cols-1 xl:grid-cols-2 gap-10">
            <div className="relative">
              <div className="col-span-2 mb-10 space-y-2">
                <h1 className="text-3xl font-bold text-center text-brandSecondary mb-4">
                  {t("contactPage.platformName", "ILC PLATFORM").toUpperCase()}
                </h1>
                <div className="flex items-center">
                  <EnvelopeIcon className="w-5 h-5 text-brandSecondary mr-2 font-semibold" />
                  <span className="mr-1 font-semibold">
                    {t("contactPage.emailLabel", "Email:")}
                  </span>
                  <span>info@ilcvn.vn</span>
                </div>
                <div className="flex items-center">
                  <Link className="w-5 h-5 text-brandSecondary mr-2 font-semibold" />
                  <span className="mr-1 font-semibold">
                    {t("contactPage.hotlineLabel", "Hotline:")}
                  </span>
                  <span>0934 121 183 - 0983 285 499</span>
                </div>
                <div className="flex items-center">
                  <PhoneIcon className="w-5 h-5 text-brandSecondary mr-2 font-semibold" />
                  <span className="mr-1 font-semibold">
                    {'Mr. Hưng:'}
                  </span>
                  <span>0983 285 499</span>
                </div>
                <div className="flex items-center">
                  <PhoneIcon className="w-5 h-5 text-brandSecondary mr-2 font-semibold" />
                  <span className="mr-1 font-semibold">
                    {'Mr. Ngọc Anh:'}
                  </span>
                  <span>0934 121 183</span>
                </div>
                <div className="flex items-center">
                  <PhoneIcon className="w-5 h-5 text-brandSecondary mr-2 font-semibold" />
                  <span className="mr-1 font-semibold">
                    {'Ms. Hà:'}
                  </span>
                  <span>0971 992 232</span>
                </div>
                <div className="flex items-start">
                  <IoLocationSharp className="w-6 h-6 text-brandSecondary mr-1 font-semibold" />
                  <div className="flex flex-col">
                    <span className=" font-semibold">
                      {t("contactPage.adddresslabel")}{" "}
                    </span>
                    <span>{t("contactPage.addressText")}</span>
                  </div>
                </div>
              </div>
              <div className="relative w-full aspect-[21/9] overflow-hidden shadow-md">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.7994954790993!2d106.71636007583876!3d10.826650758263636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528815d9292d1%3A0xcc09c2ed0645bee8!2zMzIgxJDGsOG7nW5nIDE4LCBIaeG7h3AgQsOsbmggQ2jDoW5oLCBUaOG7pyDEkOG7qWMsIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1744222384981!5m2!1svi!2s"
                  className="absolute top-0 left-0 w-full h-full"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            {/* Form Section */}
            <div>
              <ContactForm data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
