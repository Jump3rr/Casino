import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import PrivateRoute from '../../PrivateRoute';
import LoginPage from '../Login/LoginPage';
import RegisterPage from '../Login/RegisterPage';
import { NavBar } from '../NavBar/NavBar';
import { ProfileComponent } from '../Profile/Profile';
import { FirebaseDatabaseProvider } from '@react-firebase/database';
import {
  child,
  push,
  ref,
  update,
  set,
  off,
  onValue,
  onChildChanged,
} from 'firebase/database';
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
        credits: 2000,
      });
      console.log('Document written with ID: ');
    } catch (e) {
      console.error('Error adding document: ', e);
    }
    // const creditsRef = ref(db, 'users/' + auth.currentUser?.uid);
    // set(creditsRef, { credits: 3100 })
    //   .then(() => {
    //     console.log('updated');
    //   })
    //   .catch((error) => console.log(error));

    //--------
    //off(onChildChanged, 'child_changed');

    //const creditsRef = ref(db, 'users/' + auth.currentUser?.uid + '/credits');
    // const newPostKey = push(child(ref(db), 'credits')).key;
    // const updates = {};
    // const newCredits = 4800
    // updates['/credits/'] = newCredits;
    // update(creditsRef, 4800);
  };
  return (
    <>
      <button onClick={updateCredits}>UPDATE</button>
    </>
  );
};
