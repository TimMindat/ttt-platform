import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, analytics, db, auth };