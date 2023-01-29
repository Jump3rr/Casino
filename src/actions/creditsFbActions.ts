import * as actionTypes from './actionTypes/creditsFbTypes';
import { Dispatch } from 'redux';
import { db, auth } from '../tools/firebaseConfig';
import {
  onSnapshot,
  doc,
  setDoc,
  increment,
  DocumentReference,
  FieldValue,
  collection,
  updateDoc,
} from 'firebase/firestore';

export const incrementFbCredits = (value: number) => async () => {
  if (!auth.currentUser?.uid) {
    return;
  }
  try {
    const docRef = doc(db, 'users', auth.currentUser.uid);
    await updateDoc(docRef, {
      credits: increment(value),
    });
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const decrementFbCredits = (value: number) => async () => {
  if (!auth.currentUser?.uid) {
    return;
  }
  try {
    const docRef = doc(db, 'users', auth.currentUser.uid);
    await updateDoc(docRef, {
      credits: increment(-value),
    });
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};
export const getFbCredits = () => async (dispatch: Dispatch) => {
  if (!auth.currentUser?.uid) return;
  await onSnapshot(doc(db, 'users', auth.currentUser?.uid), (doc) => {
    if (Number(doc.data()?.credits)) {
      dispatch({
        type: actionTypes.GET_FBCREDITS,
        payload: doc.data()?.credits,
      });
    } else {
      dispatch({
        type: actionTypes.GET_FBCREDITS,
        payload: 0,
      });
    }
  });
};
