// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAb_N5JiMy_iCutEgVGdm5eMCXA_EBxe_o",
  authDomain: "e-health-368f5.firebaseapp.com",
  projectId: "e-health-368f5",
  storageBucket: "e-health-368f5.appspot.com",
  messagingSenderId: "1033142895659",
  appId: "1:1033142895659:web:76b66fc7c423f0616c566e",
  measurementId: "G-DNLCWZJV7V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 getAnalytics(app);
 const auth = getAuth(app);
 const firestore = getFirestore(app);
 export { auth, firestore }