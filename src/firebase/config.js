//firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCh4fKzLMMbvtV4rD9VVUQ9kcf19EtBucw",
  authDomain: "proformamanager.firebaseapp.com",
  projectId: "proformamanager",
  storageBucket: "proformamanager.firebasestorage.app",
  messagingSenderId: "393133157614",
  appId: "1:393133157614:web:e26a6bf5157f06a76897ff"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;