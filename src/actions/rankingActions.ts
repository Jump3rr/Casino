import {
  onSnapshot,
  doc,
  collection,
  getDocs,
  QuerySnapshot,
} from 'firebase/firestore';
import { Dispatch } from 'redux';
import { auth, db } from '../tools/firebaseConfig';
import * as actionTypes from './actionTypes/rankingTypes';

export const getRanking = () => async (dispatch: Dispatch) => {
  //const query = collection(db, 'users');
  await getDocs(collection(db, 'users')).then((QuerySnapshot) => {
    const newData = QuerySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    console.log(newData);
    console.log(newData.length);
    dispatch({
      type: actionTypes.GET_RANKING,
      payload: newData,
    });
  });

  // await onSnapshot(doc(db, 'users'), (doc) => {
  //   if (Number(doc.data()?.credits)) {
  //     dispatch({
  //       type: actionTypes.GET_RANKING,
  //       payload: doc.data()?.credits,
  //     });
  //   }
  // });
};
