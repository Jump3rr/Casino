import React from 'react';
import { db, auth } from '../../tools/firebaseConfig';
import { setDoc, doc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import store from '../../tools/store';
import {
  decrementFbCredits,
  incrementFbCredits,
} from '../../actions/creditsFbActions';
import { useAppDispatch } from '../../tools/hooks';

export const MainPage = () => {
  const dispatch = useAppDispatch();

  const updateCredits = async () => {
    dispatch(decrementFbCredits(50));
  };
  return (
    <>
      <button onClick={updateCredits}>UPDATE</button>
    </>
  );
};
