// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "mern-estate-8feda.firebaseapp.com",
  projectId: "mern-estate-8feda",
  storageBucket: "mern-estate-8feda.appspot.com",
  messagingSenderId: "714692379384",
  appId: "1:714692379384:web:1ce20306d6bcc5868e310d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);