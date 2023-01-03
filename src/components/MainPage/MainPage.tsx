import React from 'react';
import { db, auth } from '../../tools/firebaseConfig';
import { setDoc, doc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import store from '../../tools/store';
import {
  decrementFbCredits,
  incrementFbCredits,
} from '../../actions/creditsFbActions';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const useAppDispatch: () => AppDispatch = useDispatch;

export const MainPage = () => {
  const dispatch = useAppDispatch();

  const updateCredits = async () => {
    dispatch(decrementFbCredits(50));
    // if (!auth.currentUser?.uid) {
    //   return;
    // }
    // try {
    //   const docRef = await setDoc(doc(db, 'users', auth.currentUser.uid), {
    //     credits: 1000,
    //   });
    //   console.log('Document written with ID: ');
    // } catch (e) {
    //   console.error('Error adding document: ', e);
    // }
  };
  return (
    <>
      <button onClick={updateCredits}>UPDATE</button>
    </>
  );
};
