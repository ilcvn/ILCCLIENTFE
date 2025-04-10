import { useEffect, useState } from "react";
import { ViewReload } from "../../api/ViewWebsite/View";
import { ChartBar, MessageCircle, MessageSquare } from "lucide-react";
function SharingContact() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 1500) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const fetchView = async () => {
      try {
        // Kiểm tra xem cookie đã được đặt hay chưa
        if (!document.cookie.includes("hasReloaded=true")) {
          await ViewReload();
          // Đặt session cookie (mất khi tắt trình duyệt)
          document.cookie = "hasReloaded=true; path=/";
        }
      } catch (error) {
        console.error("Lỗi khi tăng view:", error);
      }
    };

    fetchView();
  }, []);

  return (
    <div>
      <div className="fixed bottom-40 right-5 z-50 flex flex-col items-center space-y-4">
        <ul className="space-y-6">
          {/* Phone */}
          <li>
            <a
              href="tel:0703338458"
              rel="nofollow"
              className="group flex flex-col items-center"
            >
              <div className="relative">
                <span className="absolute inset-0 w-full h-full rounded-full border-4 border-brandPrimary animate-pulse-border"></span>
                <img
                  src="//bizweb.dktcdn.net/100/472/913/themes/888429/assets/addthis-phone.svg?1725935235961"
                  alt="Gọi ngay cho chúng tôi"
                  className="w-11 h-11 rounded-full shadow-md transition-transform group-hover:scale-110"
                />
              </div>
            </a>
          </li>

          {/* Zalo */}
          <li>
            <a
              href="https://zalo.me/0983285499"
              target="_blank"
              rel="nofollow"
              className="group flex flex-col items-center"
            >
              <div className="relative">
                <span className="absolute inset-0 w-full h-full rounded-full border-4 border-brandPrimary animate-pulse-border"></span>
                <img
                  src="//bizweb.dktcdn.net/100/472/913/themes/888429/assets/addthis-zalo.svg?1725935235961"
                  alt="Chat với chúng tôi qua Zalo"
                  className="w-11 h-11 rounded-full shadow-md transition-transform group-hover:scale-110"
                />
              </div>
            </a>
          </li>

          {/* Facebook */}
          <li>
            <a
              href="https://www.facebook.com/profile.php?id=61573840948225"
              target="_blank"
              rel="nofollow"
              className="group flex flex-col items-center"
            >
              <div className="relative">
                <span className="absolute inset-0 w-full h-full rounded-full border-4 border-brandPrimary animate-pulse-border"></span>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png"
                  alt="Chat với chúng tôi qua Facebook"
                  className="w-11 h-11 rounded-full shadow-md transition-transform group-hover:scale-110"
                />
              </div>
            </a>
          </li>

          {/* Comment */}
          <li>
            <button
              onClick={() => {}}
              className="group flex flex-col items-center"
            >
              <div className="relative">
                <span className="absolute inset-0 w-full h-full rounded-full border-4 border-brandPrimary animate-pulse-border"></span>
                <img
                  src="https://images.vexels.com/media/users/3/139959/isolated/preview/d9bc539ecb4092e391863126207c3b6a-cloud-chat-round-icon.png"
                  alt="Chat với chúng tôi qua Facebook"
                  className="w-11 h-11 rounded-full shadow-md transition-transform group-hover:scale-110"
                />
              </div>
            </button>
          </li>
        </ul>
      </div>

      <div className="fixed bottom-10 right-5 z-50 flex flex-col items-center space-y-4">
        <button
          onClick={scrollToTop}
          href="#"
          className={`flex items-center justify-center w-11 h-11 bg-brandSecondary text-white rounded-full shadow-md hover:bg-neutralGrey focus:ring-2 transition ${
            isVisible ? "flex" : "hidden"
          } `}
          title="Lên đầu trang"
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 15l7-7 7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default SharingContact;
