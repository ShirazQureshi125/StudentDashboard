// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcsnRcU_aTuQB1DkJtAu8t6qgKW6PK8nE",
  authDomain: "nextcrud-f6539.firebaseapp.com",
  projectId: "nextcrud-f6539",
  storageBucket: "nextcrud-f6539.appspot.com",
  messagingSenderId: "761525858534",
  appId: "1:761525858534:web:f6581fb13bdda0f9db4b27"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
export {db}