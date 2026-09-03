import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyC4RPByArIYvrZihvkYe5_T3gk0KNMlgUs",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "dark-origin-hc9s2.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "dark-origin-hc9s2",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "dark-origin-hc9s2.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "978171049463",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:978171049463:web:7c737420419e3fd621aaf2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, "ai-studio-shamasaimlcourse-a7acf2bf-5d0b-47fb-a6b5-353ebdb203e9");
export const storage = getStorage(app);
