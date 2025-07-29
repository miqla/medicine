// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgJccn56r17cBj7gbhcYBwcWi7EtcGd1k",
  authDomain: "fern-p2.firebaseapp.com",
  projectId: "fern-p2",
  storageBucket: "fern-p2.firebasestorage.app",
  messagingSenderId: "1071414479828",
  appId: "1:1071414479828:web:2cd333487f21d5ff966441",
  measurementId: "G-PBBEN358CY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider };
