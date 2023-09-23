import { Auth, createUserWithEmailAndPassword, GoogleAuthProvider } from "firebase/auth";
import firebase, { initializeApp } from "firebase/app";

import { useAuthState } from 'react-firebase-hooks/auth'

export const signup = (auth, email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  }

//   export const signInWithGoogle = (auth: Auth, provider) => {
//     firebase.auth
//     const googleProvider = new GoogleAuthProvider();
//     auth.signInWithPopup(googleProvider)
//   }