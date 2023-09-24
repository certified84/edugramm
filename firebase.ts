// Import the functions you need from the SDKs you need
import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { initializeAuth, getReactNativePersistence, getAuth, Auth, setPersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

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

let app: FirebaseApp
if (getApps.length === 0) {
    // Initialize Firebase
    app = initializeApp(firebaseConfig);
} else {
    app = getApp()
}

const auth = getAuth(app)
setPersistence(auth, getReactNativePersistence(ReactNativeAsyncStorage))

const firestore = getFirestore(app)

// if () {
//     auth = initializeAuth(app, {
//         persistence: getReactNativePersistence(ReactNativeAsyncStorage)
//     });
// } else {
//     auth = getAuth(app)
// }

export { auth, firestore }