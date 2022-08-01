import { useState, useEffect } from 'react';
import { onSnapshot, collection, addDoc, updateDoc, doc, getDoc, deleteDoc, query, where } from 'firebase/firestore';
import { db } from "../../firebase";

const REQUEST_STATUS = {
    LOADING: "loading",
    SUCCESS: "success",
    FAILURE: "failure",
};

function useRequestData(path, requestQuery = null) {
    const [data, setData] = useState([]);
    const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);

    useEffect((() => {
        // TODO: add error handling
        try {
            if (requestQuery) {
                const q = query(collection(db, path), where(requestQuery.prop, requestQuery.condition, requestQuery.value));
                const unSub = onSnapshot(q, snapshot => {
                    setData(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
                    setRequestStatus(REQUEST_STATUS.SUCCESS);
                });

                return () => unSub();
            } else {
                const colectionRef = collection(db, path);
                const unSub = onSnapshot(colectionRef, snapshot => {
                    setData(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
                    setRequestStatus(REQUEST_STATUS.SUCCESS);
                });

                return () => unSub();
            }
        } catch (e) {
            setRequestStatus(REQUEST_STATUS.FAILURE);
        }
    }), [path, requestQuery]);

    async function createRecord(rec, docPath = path) {
        try {
            const colectionRef = collection(db, docPath);
            return await addDoc(colectionRef, rec);
        } catch (e) {
            setRequestStatus(REQUEST_STATUS.FAILURE);
        }
    }

    function updateRecord(id, rec, docPath = path) {
        try {
            const docRef = doc(db, docPath, id);
            updateDoc(docRef, rec);
        } catch (e) {
            setRequestStatus(REQUEST_STATUS.FAILURE);
        }
    }

    async function returnRecord(id, docPath = path) {
        try {
            const docRef = doc(db, docPath, id);;
            const docSnap = await getDoc(docRef);
            return docSnap.data();
        } catch (e) {
            setRequestStatus(REQUEST_STATUS.FAILURE);
        }
    }

    function deleteRecord(id, docPath = path) {
        try {
            const docRef = doc(db, docPath, id);
            deleteDoc(docRef);
        } catch (e) {
            setRequestStatus(REQUEST_STATUS.FAILURE);
        }
    }


    return { data, createRecord, updateRecord, returnRecord, deleteRecord, requestStatus };
}

export { useRequestData, REQUEST_STATUS };