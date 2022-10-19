// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2XUS3fmvCa-hlFXFKG1EabIErTrJjyIw",
  authDomain: "react-realtor-clone-c9229.firebaseapp.com",
  projectId: "react-realtor-clone-c9229",
  storageBucket: "react-realtor-clone-c9229.appspot.com",
  messagingSenderId: "638489480318",
  appId: "1:638489480318:web:bf640b8424f99e0ba99c2f",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
