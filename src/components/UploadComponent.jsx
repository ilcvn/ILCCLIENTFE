import React, { useState, useEffect } from "react";

export default function UploadComponent({ onFileUpload, resetKey }) {
  const [file, setFile] = useState(null);

  useEffect(() => {
    // Reset lại file khi resetKey thay đổi
    setFile(null);
  }, [resetKey]);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      console.log("Please select a file first!");
      return;
    }
    setFile(selectedFile);
    onFileUpload(selectedFile); // Truyền file cho component cha
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <input
        id="fileInput"
        type="file"
        className="hidden"
        onChange={handleFileChange}
      />
      <label
        htmlFor="fileInput"
        className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 transition"
      >
        {file ? file.name : "File"}
      </label>
    </div>
  );
}
