import { collection, getDocs } from 'firebase/firestore';
import { Dispatch } from 'redux';
import { db } from '../tools/firebaseConfig';
import * as actionTypes from './actionTypes/rankingTypes';

export const getRanking = () => async (dispatch: Dispatch) => {
  await getDocs(collection(db, 'users')).then((QuerySnapshot) => {
    const newData = QuerySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    dispatch({
      type: actionTypes.GET_RANKING,
      payload: newData,
    });
  });
};
