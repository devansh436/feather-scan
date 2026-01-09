import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  // storageBucket: "my-awesome-project-5aa9e.firebasestorage.app",
  // messagingSenderId: "600984453994",
  // measurementId: "G-HDGLKYB41K"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
