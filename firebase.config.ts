// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKZ9oFCeGGxbhzzgwCmtwPgdeifmYSF3g",
  authDomain: "navitrust-4fe66.firebaseapp.com",
  projectId: "navitrust-4fe66",
  storageBucket: "navitrust-4fe66.firebasestorage.app",
  messagingSenderId: "130589654837",
  appId: "1:130589654837:web:e7536baf129b3b3cead67c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app);
export const db = getFirestore(app);

