
// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFrsyRwZc5AfrvKoRFeEHnFYPS4Tz5T6g",
  authDomain: "photofolio-f6162.firebaseapp.com",
  projectId: "photofolio-f6162",
  storageBucket: "photofolio-f6162.appspot.com",
  messagingSenderId: "438490424846",
  appId: "1:438490424846:web:1e74792a0cdb787986be5f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export default db;