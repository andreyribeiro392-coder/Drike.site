import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';

// ⚠️ IMPORTANTE: Substitua com suas credenciais do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDemoKey123456789", // Substitua
  authDomain: "seu-projeto.firebaseapp.com", // Substitua
  projectId: "seu-projeto", // Substitua
  storageBucket: "seu-projeto.appspot.com", // Substitua
  messagingSenderId: "123456789", // Substitua
  appId: "1:123456789:web:abcdef123456" // Substitua
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Autenticação
export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);

// Firestore
export const db = getFirestore(app);
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    console.log('Multiple tabs open, persistence can only be enabled in one tab at a time.');
  } else if (err.code === 'unimplemented') {
    console.log('The current browser does not support all of the features required to enable persistence');
  }
});

export default app;
