/* eslint-disable react/prop-types */
import React, {useState, useEffect, useContext} from "react";
import {useTranslation} from "react-i18next";
import {toast} from "react-toastify";
import {format} from "date-fns";
import {DatePickerDialog} from "../datepicker/DatePickerDialog";
import UploadComponent from "../UploadComponent";
import {createReservation} from "../../api/reservation/reservation";
import {uploadFile} from "../UploadFile";
import {getAllArticles, getArticles} from "../../api/Article/article";
import {LanguageContext} from "../../context/LanguageContext";

const ContactForm = ({data}) => {
  const {t} = useTranslation();
  const {language, changeLanguage} = useContext(LanguageContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    subject: "",
    message: "",
    file: null, // Lưu đối tượng file khi chọn
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const [resetKey, setResetKey] = useState(0);
  const [errors, setErrors] = useState({});
  const searchQuery = "";
  const type = "";
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesLn, setArticlesLn] = useState([]);
  const handleCheckboxChange = (event, articleId) => {
    const {checked} = event.target;

    setSelectedItems((prevSelectedItems) => {
      const updatedItems = checked
        ? [...prevSelectedItems, articleId]
        : prevSelectedItems.filter((id) => id !== articleId);

      return updatedItems;
    });
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const currentLanguage = language.toUpperCase() || "VI";
        let res = await getArticles(
          searchQuery,
          currentPage,
          100000000,
          type,
          currentLanguage
        );

        const {articles, pagination} = res.data.data;

        const services = articles.filter(
          (ser) => ser.language.toUpperCase() === currentLanguage
        );
        const data = services.sort((a, b) =>
          a.title.localeCompare(b.title, "vi", {sensitivity: "base"})
        );
        setArticles(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
    if (data) {
      setFormData({
        name: data.fullName || "",
        phone: data.phone || "",
        email: data.email || "",
        address: data.address || "",
        subject: data.subject || "",
        message: data.content || "",
        file: null,
      });
      if (data.consultDate) {
        setSelectedDate(new Date(data.consultDate));
      }
    }
  }, [searchQuery, currentPage, language, data]);

  // Nhận file từ UploadComponent (đối tượng file)
  const handleFileUpload = (file) => {
    setFormData((prev) => ({...prev, file}));
  };

  const handleChange = (e) => {
    const {name, value, type, files} = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name)
      newErrors.name = t("contactPage.error.name", "Vui lòng nhập họ và tên");
    if (!formData.phone) {
      newErrors.phone = t(
        "contactPage.error.phone",
        "Vui lòng nhập số điện thoại"
      );
    } else if (!/^\d+$/.test(formData.phone)) {
      newErrors.phone = t(
        "contactPage.error.phoneInvalid",
        "Số điện thoại chỉ chứa số!"
      );
    }
    if (!formData.email)
      newErrors.email = t(
        "contactPage.error.email",
        "Vui lòng nhập địa chỉ email"
      );
    if (!formData.address)
      newErrors.address = t(
        "contactPage.error.address",
        "Vui lòng nhập địa chỉ"
      );
    if (!formData.message)
      newErrors.message = t(
        "contactPage.error.message",
        "Vui lòng nhập nội dung"
      );
    if (!selectedDate) {
      newErrors.date = t("contactPage.error.date", "Vui lòng chọn ngày");
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selected = new Date(selectedDate);
      selected.setHours(0, 0, 0, 0);
      if (selected < today) {
        newErrors.date = t(
          "contactPage.error.dateFuture",
          "Vui lòng chọn ngày không nhỏ hơn ngày hiện tại"
        );
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    // Nếu có data, ưu tiên sử dụng các giá trị từ data
    const payload = data
      ? {
          fullName: data.fullName || formData.name,
          phone: data.phone || formData.phone,
          gmail: data.email || formData.email,
          address: data.address || formData.address,
          subject: data.subject || formData.subject,
          content: data.content || formData.message,
          file: null,
          status: data.status || "PENDING",
          consultDate:
            data.consultDate ||
            (selectedDate ? new Date(selectedDate).toISOString() : null),
        }
      : {
          fullName: formData.name,
          phone: formData.phone,
          gmail: formData.email,
          address: formData.address,
          subject: formData.subject,
          content: formData.message,
          file: null,
          status: "PENDING",
          consultDate: selectedDate
            ? new Date(selectedDate).toISOString()
            : null,
        };

    setLoading(true);
    try {
      if (formData.file) {
        const fileUrl = await uploadFile(formData.file);
        payload.file = fileUrl;
      }

      let subject = "";
      selectedItems.forEach((item, index) => {
        subject += item + (index !== selectedItems.length - 1 ? ", " : ""); // Add comma unless it's the last item
      });
      payload.subject = subject;

      const response = await createReservation(payload);
      toast.success("Gửi thành công!");

      // Reset form sau khi gửi thành công
      setFormData({
        name: "",
        phone: "",
        email: "",
        address: "",
        subject: "",
        message: "",
        file: null,
      });
      setSelectedDate(null);
      setSelectedItems([]);
      setResetKey((prev) => prev + 1);
    } catch (err) {
      setError(err);
      toast.error("Gửi thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {/* Các input thông tin */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        <div>
          <input
            type="text"
            name="name"
            placeholder={t("contactPage.namePlaceholder", "Họ tên")}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none text-sm"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input
            type="tel"
            name="phone"
            placeholder={t("contactPage.phonePlaceholder", "Số điện thoại")}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none text-sm"
            value={formData.phone}
            onChange={handleChange}
            maxLength={11}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
          )}
        </div>
        <div>
          <input
            type="text"
            name="address"
            placeholder={t("contactPage.addressPlaceholder", "Địa chỉ")}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none text-sm"
            value={formData.address}
            onChange={handleChange}
          />
          {errors.address && (
            <p className="text-red-500 text-xs mt-1">{errors.address}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <DatePickerDialog
            placeholderText={t("footer.datePlaceholder")}
            onDateSelect={(date) => setSelectedDate(date)}
            data={selectedDate}
            resetKey={resetKey}
            css="w-full p-3 border border-gray-300 rounded focus:outline-none text-sm"
          />
          {errors.date && (
            <p className="text-red-500 text-xs -mt-1">{errors.date}</p>
          )}
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder={t("contactPage.emailPlaceholder", "Email")}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none text-sm"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-[16px] font-medium my-2">
          {t("footer.serviceText") + ":"}
        </h2>
        {articles?.length > 0 && (
          <div className="max-h-[200px] overflow-y-auto">
            {articles
              .filter((article) => article.type !== "NEWS")
              .map((article) => (
                <div key={article.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={article.id}
                    className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    checked={selectedItems.includes(article.id)}
                    onChange={(e) => handleCheckboxChange(e, article.id)}
                  />
                  <label htmlFor={article.id} className="text-gray-700">
                    {article.title}
                  </label>
                </div>
              ))}
          </div>
        )}
      </div>

      <div>
        <textarea
          name="message"
          placeholder={t("contactPage.messagePlaceholder", "Nội dung")}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none text-sm h-32 resize-none"
          value={formData.message}
          onChange={handleChange}
        ></textarea>
        {errors.message && (
          <p className="text-red-500 text-xs mt-1">{errors.message}</p>
        )}
      </div>

      <div className="flex items-center space-x-3">
        <label className="rounded cursor-pointer">
          <UploadComponent
            onFileUpload={handleFileUpload}
            resetKey={resetKey}
          />
        </label>
        {formData.file && <p className="text-sm">{formData.file.name}</p>}
      </div>

      <div className="flex space-x-3">
        <button
          type="submit"
          className="flex-1 bg-brandSecondary text-white p-2 rounded hover:brightness-90"
          disabled={loading}
        >
          {t("contactPage.submitButton", "Gửi")}
        </button>
        <button
          type="reset"
          className="flex-1 bg-neutralGrey text-white p-2 rounded hover:brightness-90 transition"
          onClick={() => {
            setFormData({
              name: "",
              phone: "",
              email: "",
              address: "",
              subject: "",
              message: "",
              file: null,
            });
            setSelectedItems([]);
            setSelectedDate(null);
            setResetKey((prev) => prev + 1);
          }}
        >
          {t("contactPage.resetButton", "Nhập lại")}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
