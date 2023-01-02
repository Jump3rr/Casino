import * as actionTypes from './actionTypes/creditsFbTypes';
import { AnyAction, Dispatch } from 'redux';
import { ref, onValue, get, getDatabase, child } from 'firebase/database';
import { db, auth } from '../tools/firebaseConfig';

export const incrementCredits = (bet: number) => ({
  type: actionTypes.INCREMENT_CREDITS,
  payload: { bet },
});
export const decrementCredits = (bet: number) => ({
  type: actionTypes.DECREMENT_CREDITS,
  payload: { bet },
});

export const getFbCredits = () => async (dispatch: Dispatch) => {
  //   const creditsRef = await ref(
  //     db,
  //     'users/' + auth.currentUser?.uid + '/credits'
  //   );
  //   get(child(ref(getDatabase()), 'users/' + auth.currentUser?.uid + '/credits'))
  //     .then((snapshot) => {
  //       if (snapshot.exists()) {
  //         dispatch(fetchDataSuccess(snapshot.val()));
  //       } else {
  //         console.log('NO DATA');
  //       }
  //     })
  //     .catch((error) => console.log(error));
  //   // ----------------------------
  //   //   await onValue(creditsRef, async (snapshot) => {
  //   //     console.log('abc');
  //   //     dispatch(fetchDataSuccess(snapshot.val()));
  //   //   });
};

export const fetchDataSuccess = (data: any) => {
  return {
    type: actionTypes.GET_FBCREDITS,
    payload: data,
  };
};
