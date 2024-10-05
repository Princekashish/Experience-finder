import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAFoGT8jZFADcFpkYBfpWL8cPMO1_oJxfk",
  authDomain: "finder-fa3a2.firebaseapp.com",
  projectId: "finder-fa3a2",
  storageBucket: "finder-fa3a2.appspot.com",
  messagingSenderId: "434529827133",
  appId: "1:434529827133:web:a95eedefc34e4ade8a6d54",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
