import React from "react";
import {
  auth,
  googleProvider,
  facebookProvider,
  signInWithPopup,
} from "../firebase/config";
import { Facebook, Google } from "../assets/index";
import { X } from "lucide-react";

export default function LoginModal({ onClose, onLoginSuccess }) {
  const handleLogin = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const userInfo = {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
        uid: result.user.uid,
      };
      localStorage.setItem("user", JSON.stringify(userInfo));
      onLoginSuccess(userInfo);
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md text-center w-96">
        <button className="ml-auto block">
          <X className="w-4 h-4" onClick={() => onClose()} />
        </button>
        <h2 className="text-xl font-semibold mb-4">Đăng nhập để bình luận</h2>
        <button
          className="flex items-center justify-center gap-2 w-full mb-3 py-2 rounded ring-1 ring-gray-300 hover:ring-blue-600"
          onClick={() => handleLogin(googleProvider)}
        >
          <img src={Google} alt="Google" className="w-5 h-5" />
          Đăng nhập với Google
        </button>

        <button
          className="flex items-center justify-center gap-2 w-full py-2 rounded ring-1 ring-gray-300 hover:ring-blue-600"
          onClick={() => handleLogin(facebookProvider)}
        >
          <img src={Facebook} alt="Facebook" className="w-5 h-5" />
          Đăng nhập với Facebook
        </button>
      </div>
    </div>
  );
}
