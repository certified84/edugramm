import { Auth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import firebase, { initializeApp } from "firebase/app";

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from "../../firebase";

export const signup = (email, password) => {
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

// export const signIn = (email, password) => {
//   await signInWithEmailAndPassword(auth, email, password)
// }

//   export const signInWithGoogle = (auth: Auth, provider) => {
//     firebase.auth
//     const googleProvider = new GoogleAuthProvider();
//     auth.signInWithPopup(googleProvider)
//   }