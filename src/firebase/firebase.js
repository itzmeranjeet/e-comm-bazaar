// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYnKdyJ6IC083lE9VuvZRIZqYtiN3Gmrk",
  authDomain: "internship-300fe.firebaseapp.com",
  projectId: "internship-300fe",
  storageBucket: "internship-300fe.firebasestorage.app",
  messagingSenderId: "1050350820471",
  appId: "1:1050350820471:web:920bc4f5180515333c7a72"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);