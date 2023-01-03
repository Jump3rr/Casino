import * as actionTypes from './actionTypes/creditsFbTypes';
import { Dispatch } from 'redux';
import { db, auth } from '../tools/firebaseConfig';
import { onSnapshot, doc } from 'firebase/firestore';

export const incrementCredits = (value: number) => ({
  type: actionTypes.INCREMENT_CREDITS,
  payload: { value },
});
export const decrementCredits = (value: number) => ({
  type: actionTypes.DECREMENT_CREDITS,
  payload: { value },
});

export const getFbCredits = () => async (dispatch: Dispatch) => {
  console.log(auth.currentUser);
  if (!auth.currentUser?.uid) return;
  console.log('ee');
  await onSnapshot(doc(db, 'users', auth.currentUser?.uid), (doc) => {
    if (Number(doc.data()?.credits)) {
      dispatch({
        type: actionTypes.GET_FBCREDITS,
        payload: doc.data()?.credits,
      });
      console.log('win');
    }
  });
};
