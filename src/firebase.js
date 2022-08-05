
import { initializeApp } from "firebase/app";
import {
  getAuth,
} from "firebase/auth";
import { getFirestore, collection, addDoc, updateDoc, doc, getDoc, deleteDoc } from 'firebase/firestore';

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

async function createRecord(rec, docPath) {
  try {
    const colectionRef = collection(db, docPath);
    return await addDoc(colectionRef, rec);
  } catch (e) {
    console.log(e);
  }
}

async function updateRecord(id, rec, docPath) {
  try {
    const docRef = doc(db, docPath, id);
    await updateDoc(docRef, rec);
  } catch (e) {
    console.log(e);
  }
}

async function returnRecord(id, docPath) {
  try {
    const docRef = doc(db, docPath, id);;
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  } catch (e) {
    console.log(e);
  }
}

function deleteRecord(id, docPath) {
  try {
    const docRef = doc(db, docPath, id);
    deleteDoc(docRef);
  } catch (e) {
    console.log(e);
  }
}

export {
  auth,
  db,
  createRecord,
  updateRecord,
  returnRecord,
  deleteRecord,
};
