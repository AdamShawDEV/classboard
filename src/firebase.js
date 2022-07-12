
import { initializeApp } from "firebase/app";
import {
  getAuth,
} from "firebase/auth";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBTyzToztzkWwEUmlucsJKTxYXgH2efmPY",
    authDomain: "classboard-c232c.firebaseapp.com",
    projectId: "classboard-c232c",
    storageBucket: "classboard-c232c.appspot.com",
    messagingSenderId: "666673683363",
    appId: "1:666673683363:web:5ff64f96c919a4e8a49816",
    measurementId: "G-FQHPR5544Z"  
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
  auth,
  db,
};
