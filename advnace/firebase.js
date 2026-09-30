import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFunctions, httpsCallable } from "firebase/functions";

// إعدادات مشروع Firebase الخاصة بك
const firebaseConfig = {
  apiKey: "AIzaSyDupiSPGdRplvNRYwud-yIfe2stM2hKuIM",
  authDomain: "jordan-34085.firebaseapp.com",
  projectId: "jordan-34085",
  storageBucket: "jordan-34085.firebasestorage.app",
  messagingSenderId: "283989003820",
  appId: "1:283989003820:web:923d0f66b4b0eabf2a4b89",
  measurementId: "G-L98ZPL1Q7T"
};

// تهيئة تطبيق Firebase
const app = initializeApp(firebaseConfig);

// تهيئة خدمة التحليلات
export const analytics = getAnalytics(app);

// تهيئة خدمة Functions
const functions = getFunctions(app);

// تصدير دالة planTrip لاستدعائها من الفرونت إند
export const planTripFunction = httpsCallable(functions, "planTrip");