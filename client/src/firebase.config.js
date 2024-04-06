// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUxX5lW43jJFVCkyoBF60g5sS50Q7HA2c",
  authDomain: "otp-project-bc56e.firebaseapp.com",
  projectId: "otp-project-bc56e",
  storageBucket: "otp-project-bc56e.appspot.com",
  messagingSenderId: "174614856304",
  appId: "1:174614856304:web:2db6d8f75f892a0eda6ab5",
  measurementId: "G-BEGVQ7457J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
