// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXM-nEcv5HAwXeBVKQ4eSZK8DIzGpRXHE",
  authDomain: "drik-streaming.firebaseapp.com",
  projectId: "drik-streaming",
  storageBucket: "drik-streaming.firebasestorage.app",
  messagingSenderId: "366702155857",
  appId: "1:366702155857:web:7a0a922ce0f63c78f50070",
  measurementId: "G-NVTTBB1PLF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
