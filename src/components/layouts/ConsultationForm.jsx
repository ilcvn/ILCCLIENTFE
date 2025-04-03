import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { DatePickerDialog } from "../datepicker/DatePickerDialog";
import { createReservation } from "../../api/reservation/reservation";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ConsultationForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate(); // 🔥 Định nghĩa useNavigate bên ngoài handleSubmit

  // State cho form tư vấn
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    content: "",
    selectedDate: null,
  });

  const [resetKey, setResetKey] = useState(0);
  const [errors, setErrors] = useState({});

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Hàm validate form
  // const validateForm = () => {
  //   let newErrors = {};

  //   if (!formData.name)
  //     newErrors.name = t("contactPage.error.name", "Vui lòng nhập họ tên");
  //   if (!formData.phone) {
  //     newErrors.phone = t("contactPage.error.phone", "Vui lòng nhập số điện thoại");
  //   } else if (!/^\d+$/.test(formData.phone)) {
  //     newErrors.phone = t("contactPage.error.phoneInvalid", "Số điện thoại chỉ chứa số!");
  //   }

  //   const today = new Date();
  //   today.setHours(0, 0, 0, 0);
  //   if (!formData.selectedDate) {
  //     newErrors.selectedDate = t("contactPage.error.date", "Vui lòng chọn ngày");
  //   } else if (new Date(formData.selectedDate) < today) {
  //     newErrors.selectedDate = t("contactPage.error.dateFuture", "Vui lòng chọn ngày lớn hơn hôm nay!");
  //   }

  //   if (!formData.content)
  //     newErrors.content = t("contactPage.error.message", "Vui lòng nhập nội dung");

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!validateForm()) return;

    const payload = {
      fullName: formData.name,
      phone: formData.phone,
      content: formData.content,
      consultDate: format(new Date(formData.selectedDate), "yyyy-MM-dd"),
      subject: t("footer.consultTitle"),
      status: "PENDING",
    };

    try {
      navigate("/lien-he", { state: { formData: payload } });

      // Reset form sau khi gửi thành công
      setFormData({ name: "", phone: "", content: "", selectedDate: null });
      setResetKey((prev) => prev + 1);
      setErrors({});
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Đã có lỗi xảy ra!");
    }
  };

  return (
    <form className="mt-4 space-y-3 relative" onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          name="name"
          placeholder={t("footer.namePlaceholder")}
          className="w-full px-3 py-2 text-sm bg-white text-black focus:ring-2 focus:ring-blue-500"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p className="text-red-600  text-sm mt-1">{errors.name}</p>}
      </div>

      <div>
        <input
          type="text"
          name="phone"
          placeholder={t("footer.phonePlaceholder")}
          className="w-full px-3 py-2 text-sm bg-white text-black focus:ring-2 focus:ring-blue-500"
          value={formData.phone}
          onChange={handleChange}
          maxLength={11}
        />
        {errors.phone && <p className="text-red-600  text-sm mt-1">{errors.phone}</p>}
      </div>

      <div>
        <DatePickerDialog
          placeholderText={t("footer.datePlaceholder")}
          onDateSelect={(date) => setFormData({ ...formData, selectedDate: date })}
          resetKey={resetKey}
          css="w-full px-3 py-2 text-sm bg-white text-black focus:ring-2 focus:ring-blue-500"
        />
        {errors.selectedDate && <p className="text-red-600  text-sm mt-1">{errors.selectedDate}</p>}
      </div>

      <div>
        <textarea
          name="content"
          placeholder={t("footer.contentPlaceholder")}
          className="w-full h-24 px-3 py-2 text-sm bg-white text-black focus:ring-2 focus:ring-blue-500"
          value={formData.content}
          onChange={handleChange}
        />
        {errors.content && <p className="text-red-600  text-sm mt-1">{errors.content}</p>}
      </div>

      <button type="submit" className="bg-white text-black font-semibold py-2 px-4 w-full">
        {t("footer.submitButton")}
      </button>
    </form>
  );
};

export default ConsultationForm;
