import { useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaCopy,
  FaShareAlt,
  FaCheck,
} from "react-icons/fa";
import { SiZalo } from "react-icons/si";

export default function ShareButton() {
  const [copied, setCopied] = useState(false);
  const shareUrl = window.location.href;
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // 1️⃣ Chia sẻ bằng Web Share API
  const handleWebShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Chia sẻ nội dung",
          text: "Xem nội dung này!",
          url: shareUrl,
        });
      } catch (error) {
        console.error("Lỗi khi chia sẻ:", error);
      }
    } else {
      alert("Trình duyệt không hỗ trợ Web Share API");
    }
  };

  // 2️⃣ Chia sẻ lên mạng xã hội
  const shareToSocial = (platform) => {
    const encodedUrl = encodeURIComponent(shareUrl);
    let url = "";

    switch (platform) {
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case "twitter":
        url = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=Check this out!`;
        break;
      default:
        return;
    }

    window.open(url, "_blank", "noopener,noreferrer");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex space-x-3 p-4">
      {/* Web Share API */}
      <button
        onClick={handleWebShare}
        className="bg-gray-700 text-white p-3 rounded-full hover:bg-gray-600"
      >
        <FaShareAlt size={20} />
      </button>

      {/* Facebook */}
      <button
        onClick={() => shareToSocial("facebook")}
        className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-500"
      >
        <FaFacebookF size={20} />
      </button>

      {/* Twitter */}
      <button
        onClick={() => shareToSocial("twitter")}
        className="bg-sky-500 text-white p-3 rounded-full hover:bg-sky-400"
      >
        <FaTwitter size={20} />
      </button>

      {/* Copy */}
      <button
        onClick={copyToClipboard}
        className="bg-gray-500 text-white p-3 rounded-full hover:bg-gray-400"
      >
        {copied ? <FaCheck /> : <FaCopy size={20} />}
      </button>
    </div>
  );
}
