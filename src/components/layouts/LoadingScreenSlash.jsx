import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Spinner } from "../../assets";

const LoadingScreenSlash = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout();
  }, [location]);

  return loading ? (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      {/* <div className="w-16 h-16 border-4 border-brandSecondary border-t-transparent border-b-transparent rounded-full animate-spin"></div> */}

      <img src={Spinner} alt="" className="w-24 h-auto object-cover" />
    </div>
  ) : null;
};

export default LoadingScreenSlash;
