import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
  Auth,
  setPersistence,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from "@react-native-firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB3liAkEKT22EVkTiNDecdHGQOlmeSoacY",
  authDomain: "edugramm-998b6.firebaseapp.com",
  projectId: "edugramm-998b6",
  storageBucket: "edugramm-998b6.appspot.com",
  messagingSenderId: "535570809491",
  appId: "1:535570809491:web:25d0a70e0c00dbf15b8366",
  measurementId: "G-Q41VPM3C6Z",
};

let app: FirebaseApp;
if (getApps.length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const firebaseAuth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  // popupRedirectResolver: AsyncStorage
});

const firestore = getFirestore(app);

const storage = getStorage(app);

export { firebaseAuth as auth, firestore, storage };
