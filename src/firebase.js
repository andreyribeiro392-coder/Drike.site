import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCXM-nEcv5HAwXeBVKQ4eSZK8DIzGpRXHE",
  authDomain: "drik-streaming.firebaseapp.com",
  projectId: "drik-streaming",
  storageBucket: "drik-streaming.firebasestorage.app",
  messagingSenderId: "366702155857",
  appId: "1:366702155857:web:7a0a922ce0f63c78f50070",
  measurementId: "G-NVTTBB1PLF",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
