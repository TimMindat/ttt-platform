import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyEMgt4qj-WAt5rpj0DBcDsW6vHnXCVe0",
  authDomain: "trace-of-the-tides.firebaseapp.com",
  projectId: "trace-of-the-tides",
  storageBucket: "trace-of-the-tides.firebasestorage.app",
  messagingSenderId: "226576846473",
  appId: "1:226576846473:web:5020c20861e66922fb0058",
  measurementId: "G-MHRHBYB3TF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);