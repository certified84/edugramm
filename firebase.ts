// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3liAkEKT22EVkTiNDecdHGQOlmeSoacY",
  authDomain: "edugramm-998b6.firebaseapp.com",
  projectId: "edugramm-998b6",
  storageBucket: "edugramm-998b6.appspot.com",
  messagingSenderId: "535570809491",
  appId: "1:535570809491:web:25d0a70e0c00dbf15b8366",
  measurementId: "G-Q41VPM3C6Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth, analytics }