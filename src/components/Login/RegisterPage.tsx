import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../tools/firebaseConfig';
import {
  MainWrapper,
  Input,
  Buttons,
  TextButtons,
  ErrorText,
  Logo,
  LoginButton,
} from '../../entities/CommonComponents';
import styled from 'styled-components';
import { onValue, ref, push, set } from 'firebase/database';
import { addDoc, collection, setDoc, doc } from 'firebase/firestore';

export const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const register = async () => {
    if (password !== confirmPassword) {
      setErrorMessage(`Those passwords didn't match.`);
      return;
    }
    try {
      setErrorMessage('');
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user);
      createDefaultDbUser().then(() => {
        navigate('/');
      });
    } catch (error: any) {
      setErrorMessage(error.message);
      console.log(error.message);
    }
  };
  const createDefaultDbUser = async () => {
    if (!auth.currentUser?.uid) {
      return;
    }
    try {
      const docRef = await setDoc(doc(db, 'users', auth.currentUser.uid), {
        credits: 5000,
        email: email,
      });
      console.log('Document written with ID: ');
    } catch (e) {
      console.error('Error adding document: ', e);
    }
    // const query = ref(db, `users/${auth.currentUser?.uid}`);
    // // const defaultCredits = {
    // //   credits: 5000,
    // // };
    // const defaultCredits = 5000;
    // push(query, defaultCredits);
    //---------------
    // set(ref(db, `users/${auth.currentUser?.uid}`), {
    //   credits: 5000,
    // });
  };
  return (
    <MainWrapper>
      <Logo src='/img/logo/logo1.png' alt='' />
      <h3>Welcome to the Grand Luck Casino</h3>
      <h4>Create new account</h4>
      <Input
        type='text'
        placeholder='Email'
        onChange={(event) => setEmail(event.target.value)}
      />
      <Input
        type='password'
        placeholder='Password'
        onChange={(event) => setPassword(event.target.value)}
      />
      <Input
        type='password'
        placeholder='Confirm password'
        onChange={(event) => setConfirmPassword(event.target.value)}
      />
      <ErrorText>{errorMessage}</ErrorText>
      <LoginButton onClick={register}>Sign Up</LoginButton>
      <TextButtons to='/login'>Already have an account?</TextButtons>
    </MainWrapper>
  );
};

export default RegisterPage;
