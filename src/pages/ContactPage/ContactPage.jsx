import { useEffect } from "react";
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import ContentSection from "../../components/ContentSection.jsx";
import BreadcrumbDynamic from "../../components/layouts/Breadcrumb.jsx";
import { Link } from "lucide-react";
import { IoLocationSharp } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import ContactForm from "../../components/layouts/ContactForm.jsx";
import { useLocation } from "react-router-dom";

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

      <div className="px-2 py-10 lg:px-14 lg:py-10 mb-12">
        <ContentSection header={t("contactPage.header", "LIÊN HỆ")} />
        <div className="flex items-center justify-center">
          <div className="container md:mx-auto md:p-5 grid lg:grid-cols-1 xl:grid-cols-2 gap-10">
            <div className="relative">
              <div className="col-span-2 mb-10 space-y-1">
                <h1 className="text-3xl font-bold text-center text-brandSecondary mb-4">
                  {t("contactPage.platformName", "ILC PLATFORM").toUpperCase()}
                </h1>
                <div className="flex items-center">
                  <EnvelopeIcon className="w-5 h-5 text-brandPrimary mr-2" />
                  <span className="mr-1">{t("contactPage.emailLabel", "Email:")}</span>
                  <span>info@ilcvn.vn</span>
                </div>
                <div className="flex items-center">
                  <PhoneIcon className="w-5 h-5 text-brandPrimary mr-2" />
                  <span className="mr-1">{t("contactPage.hotlineLabel", "Hotline:")}</span>
                  <span>0934 121 183</span>
                </div>
                <div className="flex items-center">
                  <Link className="w-5 h-5 text-brandPrimary mr-2" />
                  <span className="mr-1">
                    {t("contactPage.hotlineLabel2", "Hotline:")}
                  </span>
                  <span>0934 121 183</span>
                </div>
                <div className="flex items-center">
                  <IoLocationSharp className="w-12 md:w-6 h-5 text-brandPrimary mr-2" />
                  <p className="text-black text-md mb-2 flex items-center">
                    {t(
                      "contactPage.addressText",
                      "Địa chỉ: Nhà số 32, Khu nhà ở Park Riverside, số 130 Bưng Ông Thoàn, Phường Phú Hữu, TP. Thủ Đức, TP. HCM."
                    )}
                  </p>
                </div>
              </div>
              <div className="relative w-full aspect-[21/9] overflow-hidden shadow-md">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15679.395286557141!2d106.62769921122445!3d10.746132411895305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752e7cff633fdd%3A0x85ee85db9cb263ba!2sDistrict%206%2C%20Ho%20Chi%20Minh%20City%2C%20Vietnam!5e0!3m2!1sen!2s!4v1739783050295!5m2!1sen!2s"
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
