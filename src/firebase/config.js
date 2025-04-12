import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCz5ItEurdLG8DS5Rwi5514PZ8eZZK7W_A",
  authDomain: "ilcplatform-8a777.firebaseapp.com",
  projectId: "ilcplatform-8a777",
  storageBucket: "ilcplatform-8a777.firebasestorage.app",
  messagingSenderId: "130124230854",
  appId: "1:130124230854:web:475e288585fbded4d7a7c7",
  measurementId: "G-SQP6P87HEP",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider, signInWithPopup };
