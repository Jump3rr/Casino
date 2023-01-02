import * as actionTypes from './actionTypes/creditsFbTypes';

export const getCredits = () => ({
  type: actionTypes.GET_CREDITS,
});

export const incrementCredits = (bet: number) => ({
  type: actionTypes.INCREMENT_CREDITS,
  payload: { bet },
});
export const decrementCredits = (bet: number) => ({
  type: actionTypes.DECREMENT_CREDITS,
  payload: { bet },
});

import { Dispatch } from 'redux';
import { ref, onValue } from 'firebase/database';
import { db, auth } from '../tools/firebaseConfig';

const APP_ID = '60c32fd3eb0a2f0af65b8d01';

export const getFbCredits = async (dispatch: Dispatch) => {
  const creditsRef = ref(db, 'users/' + auth.currentUser?.uid + '/credits');
  onValue(creditsRef, async (snapshot) => {
    const data = snapshot.val();
    await console.log(data);
    dispatch({
      type: actionTypes.GET_CREDITS,
      payload: data,
    });
    //setCurrentBalance(data);
  });
};
