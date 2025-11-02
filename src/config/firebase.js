import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyARqEIl4pYPTEoYeKdyohbXqoyYRtfVr7I",
  authDomain: "restaurant-review-25414.firebaseapp.com",
  projectId: "restaurant-review-25414",
  storageBucket: "restaurant-review-25414.firebasestorage.app",
  messagingSenderId: "269171630779",
  appId: "1:269171630779:web:42c4abc8913cd7edbdff9e"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;