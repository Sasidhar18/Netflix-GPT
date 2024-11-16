// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvuFsCnffnhkU87r-Wx9pIIgG9bOGSqos",
  authDomain: "netflixgpt-1c938.firebaseapp.com",
  projectId: "netflixgpt-1c938",
  storageBucket: "netflixgpt-1c938.firebasestorage.app",
  messagingSenderId: "630673332886",
  appId: "1:630673332886:web:c2dbc550e7c7b4b741c0b7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
