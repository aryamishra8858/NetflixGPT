// utils/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// ✅ Correct Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCA5d8bo8sh-s_8Vu8Kux6Jny88wIELeIk",
  authDomain: "etflixgpt-14496.firebaseapp.com",
  projectId: "etflixgpt-14496",
  // ❗ FIXED this line
  storageBucket: "etflixgpt-14496.appspot.com",
  messagingSenderId: "800787468933",
  appId: "1:800787468933:web:b1a9d677d5cc7b77a30fec",
};

// ✅ Initialize Firebase app and auth
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
