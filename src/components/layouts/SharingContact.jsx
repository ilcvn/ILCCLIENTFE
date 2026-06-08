import { useEffect, useState } from "react";
import { ViewReload } from "../../api/ViewWebsite/View";
import LoginModal from "../LoginModal";
import { CopyMinus, ListPlus } from "lucide-react";

function SharingContact() {
  const [isVisible, setIsVisible] = useState(false);

  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [isOpenAvatar, setIsOpenAvatar] = useState(false);

  const toggleDropdown = () => setIsOpenAvatar((prev) => !prev);

  const [showContactMenu, setShowContactMenu] = useState(true);

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

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
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
        {showContactMenu && (
          <ul className="space-y-6">
            {/* Phone */}
            <li>
              <a
                href="tel:0971992232"
                rel="nofollow"
                className="group flex flex-col items-center"
              >
                <div className="relative">
                  <span className="absolute inset-0 w-full h-full rounded-full border-4 border-blue-800 animate-pulse-border"></span>
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
                  <span className="absolute inset-0 w-full h-full rounded-full border-4 border-blue-800 animate-pulse-border"></span>
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
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/500px-Facebook_Logo_%282019%29.png"
                    alt="Chat với chúng tôi qua Facebook"
                    className="w-11 h-11 rounded-full shadow-md transition-transform group-hover:scale-110"
                  />
                </div>
              </a>
            </li>

            {/* User */}
            <li>
              <ul>
                {user ? (
                  <li>
                    <div className="relative inline-block text-left">
                      <div
                        className="flex items-center space-x-2 cursor-pointer"
                        onClick={toggleDropdown}
                      >
                        <img
                          src={user?.photo}
                          alt="avatar"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      </div>

                      {isOpenAvatar && (
                        <div className="absolute right-0 mt-2 w-max bg-white rounded-md shadow-lg z-10">
                          <div className="flex flex-col gap-2">
                            <span className="text-sm px-4 py-2 text-brandPrimary font-bold">
                              {user?.name}
                            </span>
                            <button
                              onClick={handleLogout}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Đăng xuất
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </li>
                ) : (
                  <button
                    onClick={() => {
                      setShowLoginDialog(true);
                    }}
                    className="group flex flex-col items-center"
                  >
                    <div className="relative">
                      <span className="absolute inset-0 w-full h-full rounded-full border-4 border-blue-800 animate-pulse-border"></span>
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/6681/6681221.png"
                        alt="Login"
                        className="w-11 h-11 rounded-full shadow-md transition-transform group-hover:scale-110"
                      />
                    </div>
                  </button>
                )}
              </ul>
            </li>
          </ul>
        )}

        <button
          onClick={() => setShowContactMenu((prev) => !prev)}
          className="w-11 h-11 text-white flex items-center justify-center bg-brandSecondary rounded-full shadow-xl"
          title="Mở Menu"
        >
          {showContactMenu ? (
            <CopyMinus className="w-5 h-5" />
          ) : (
            <ListPlus className="w-5 h-5" />
          )}
        </button>
      </div>

      <div className="fixed bottom-10 right-5 z-50 flex flex-col items-center space-y-4">
        <button
          onClick={scrollToTop}
          href="#"
          className={`flex items-center justify-center w-11 h-11 bg-neutralGrey text-white rounded-full shadow-md hover:bg-neutralDGrey focus:ring-2 transition ${
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

      {showLoginDialog && !user && (
        <LoginModal
          onClose={() => setShowLoginDialog(false)}
          onLoginSuccess={(userInfo) => setUser(userInfo)}
        />
      )}
    </div>
  );
}

export default SharingContact;
