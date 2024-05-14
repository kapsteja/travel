// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, signInWithPopup, GoogleAuthProvider,} from 'firebase/auth'
import {getStorage} from 'firebase/storage'
// import firebase from '';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBf0o964deAE3pfE1B0N-X6ljB-fOsiIHI",
  authDomain: "viharicabs-689.firebaseapp.com",
  projectId: "viharicabs-689",
  storageBucket: "viharicabs-689.appspot.com",
  messagingSenderId: "295037604984",
  appId: "1:295037604984:web:fe88361c9ba06eeda1498d",
  measurementId: "G-WY4KCWBZ3K"
};
// Initialize Firebase Auth provider
const provider = new GoogleAuthProvider();
  
// whenever a user interacts with the provider, we force them to select an account
provider.setCustomParameters({   
    prompt : "select_account "
});
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
export {auth}
export const storage = getStorage(app)
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

auth.languageCode = auth.useDeviceLanguage()
// export const appVerifier = window.recaptchaVerifier;

// export const singInWithNumber = signInWithPhoneNumber()

