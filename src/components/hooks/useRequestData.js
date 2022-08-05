import { useState, useEffect } from 'react';
import { onSnapshot, collection, query, where } from 'firebase/firestore';
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
    }), []);

    return { data, requestStatus };
}

export { useRequestData, REQUEST_STATUS };