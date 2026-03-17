import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCXM-nEcv5HAwXeBVKQ4eSZK8DIzGpRXHE",
  authDomain: "drik-streaming.firebaseapp.com",
  projectId: "drik-streaming",
  storageBucket: "drik-streaming.firebasestorage.app",
  messagingSenderId: "366702155857",
  appId: "1:366702155857:web:7a0a922ce0f63c78f50070",
  measurementId: "G-NVTTBB1PLF"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, provider, db, storage };
