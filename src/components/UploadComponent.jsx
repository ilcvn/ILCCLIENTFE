import { File } from "lucide-react";
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
    onFileUpload(selectedFile);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <input
        id="fileInput"
        type="file"
        className="hidden"
        accept=".jpg,.jpeg,.png,.pdf,.docx,.txt"
        onChange={handleFileChange}
      />
      <label
        htmlFor="fileInput"
        className="px-4 py-2 ring-1 ring-brandPrimary text-brandPrimary rounded cursor-pointer hover:bg-blue-100 transition max-w-max truncate"
      >
        <div className="flex items-center gap-2">
          {file ? "Change File" : "File upload"}
          <File className="w-4 h-4" />
        </div>
      </label>
    </div>
  );
}
