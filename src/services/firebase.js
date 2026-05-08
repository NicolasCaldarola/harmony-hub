import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "tu-app.firebaseapp.com",
  projectId: "tu-app-id",
  storageBucket: "tu-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "tu-app-id-personal"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);