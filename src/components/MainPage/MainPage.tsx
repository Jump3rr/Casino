import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import PrivateRoute from '../../PrivateRoute';
import LoginPage from '../Login/LoginPage';
import RegisterPage from '../Login/RegisterPage';
import { NavBar } from '../NavBar/NavBar';
import { ProfileComponent } from '../Profile/Profile';
import { child, push, ref, update } from 'firebase/database';
import { db, auth } from '../../tools/firebaseConfig';

export const MainPage = () => {
  const updateCredits = () => {
    console.log('abc');
    const creditsRef = ref(db, 'users/' + auth.currentUser?.uid);
    update(creditsRef, { credits: 4500 });
    //const creditsRef = ref(db, 'users/' + auth.currentUser?.uid + '/credits');
    // const newPostKey = push(child(ref(db), 'credits')).key;
    // const updates = {};
    // const newCredits = 4800
    // updates['/credits/'] = newCredits;
    // update(creditsRef, 4800);
  };
  return (
    <>
      <button onClick={() => updateCredits()}>UPDATE</button>
    </>
  );
};
