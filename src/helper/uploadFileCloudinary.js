import { useState } from "react";
import axios from "axios";

const useCloudinaryUpload = () => {
  const [progress, setProgress] = useState(0);
  const [uploadUrl, setUploadUrl] = useState(null);
  const [error, setError] = useState(null);

  const uploadFile = async (file, onProgress) => {
    setError(null);
    setProgress(0);

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      setError("Missing Cloudinary config");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
        formData,
        {
          onUploadProgress: (e) => {
            const percent = Math.round((e.loaded * 100) / e.total);
            setProgress(percent);
            if (onProgress) onProgress(percent);
          },
        }
      );

      setUploadUrl(res.data.secure_url);
      return res.data.secure_url;
    } catch (err) {
      setError("Upload failed");
      console.error(err);
    }
  };

  return {
    uploadFile,
    progress,
    uploadUrl,
    error,
  };
};

export default useCloudinaryUpload;
