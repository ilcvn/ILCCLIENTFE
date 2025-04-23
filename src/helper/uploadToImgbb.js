import axios from "axios";

export async function uploadToImgbb(file, onProgress) {
  const apiKey = import.meta.env.VITE_IMGBB_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Thiếu API Key cho Imgbb. Vui lòng thêm VITE_IMGBB_API_KEY vào file .env"
    );
  }

  const formData = new FormData();
  formData.append("image", file);

  const response = await axios.post(
    `https://api.imgbb.com/1/upload?key=${apiKey}`,
    formData,
    {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        if (onProgress) onProgress(percentCompleted); // Gọi callback để cập nhật tiến trình
      },
    }
  );

  if (!response.data.success) {
    throw new Error("Upload lỗi: " + response.data.error.message);
  }

  return response.data.data.url; // Trả về URL của ảnh
}
