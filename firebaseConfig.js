/* eslint-disable prettier/prettier */
// lib/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-jZKtn--i3KSoBama5SiqKE6tAfX8sqI",
  authDomain: "quanlyvanchuyen-40bf9.firebaseapp.com",
  projectId: "quanlyvanchuyen-40bf9",
  storageBucket: "quanlyvanchuyen-40bf9.appspot.com",
  messagingSenderId: "890006726610",
  appId: "1:890006726610:web:324c2904e4c62a7145ca0b",
  measurementId: "G-7Y1FVTF5CZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("Firebase has been initialized");
const db = getFirestore(app);

export { db };
