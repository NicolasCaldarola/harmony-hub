import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD5jHZwVxD8dqkcyN1qIvArafSi9N0GDhE",
  authDomain: "tienda-instrumentos-pablo.firebaseapp.com",
  projectId: "tienda-instrumentos-pablo",
  storageBucket: "tienda-instrumentos-pablo.firebasestorage.app",
  messagingSenderId: "967928112444",
  appId: "1:967928112444:web:588111f9fa9379b10baa39",
  measurementId: "G-LX3GEL8LE3"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);