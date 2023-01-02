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
} from '../../entities/CommonComponents';
import styled from 'styled-components';
import { onValue, ref, push, set } from 'firebase/database';

const RegisterButton = styled(Buttons)`
  height: 2.5em;
  width: 31em;
  font-size: large;
  font-weight: bold;
`;

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
      createDefaultDbUser();
    } catch (error: any) {
      setErrorMessage(error.message);
      console.log(error.message);
    }
  };
  const createDefaultDbUser = () => {
    // const query = ref(db, `users/${auth.currentUser?.uid}`);
    // // const defaultCredits = {
    // //   credits: 5000,
    // // };
    // const defaultCredits = 5000;
    // push(query, defaultCredits);
    set(ref(db, `users/${auth.currentUser?.uid}`), {
      credits: 5000,
    });
  };
  return (
    <MainWrapper>
      <h1>LOGO</h1>
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
      <RegisterButton onClick={register}>Sign Up</RegisterButton>
      <TextButtons to='/login'>Already have an account?</TextButtons>
    </MainWrapper>
  );
};

export default RegisterPage;
