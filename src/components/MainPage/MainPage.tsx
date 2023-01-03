import React from 'react';
import { db, auth } from '../../tools/firebaseConfig';
import { setDoc, doc } from 'firebase/firestore';

export const MainPage = () => {
  const updateCredits = async () => {
    console.log('abc');

    if (!auth.currentUser?.uid) {
      return;
    }
    try {
      const docRef = await setDoc(doc(db, 'users', auth.currentUser.uid), {
        credits: 1000,
      });
      console.log('Document written with ID: ');
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };
  return (
    <>
      <button onClick={updateCredits}>UPDATE</button>
    </>
  );
};
