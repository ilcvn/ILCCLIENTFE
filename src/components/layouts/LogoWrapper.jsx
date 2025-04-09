import { useNavigate } from "react-router-dom";
import { Logo } from "../../assets/index";

const LogoWrapper = () => {
  const navigate = useNavigate();

  return (
    <div className="static xl:absolute xl:shadow-sm w-full xl:max-w-[200px] top-0 left-[calc((100vw_-_1280px)_/_3)] z-50">
      <div className="bg-white text-center">
        <button onClick={() => navigate("/")}>
          <img
            src={Logo}
            alt="Viện Khoa học pháp lý và Phát triển doanh nghiệp (Institute of Legal Science and Corporate Development - ILC)"
            className="w-full h-[121px] object-contain cursor-pointer"
          />
        </button>
      </div>
    </div>
  );
};

export default LogoWrapper;
