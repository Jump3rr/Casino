import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../tools/firebaseConfig';
import styled from 'styled-components';
import { Colors } from '../../entities/colors';
import {
  MainWrapper,
  Input,
  Buttons,
  TextButtons,
} from '../../entities/CommonComponents';
import './styles.css';

const LoginButton = styled(Buttons)`
  height: 2.5em;
  width: 31em;
  font-size: large;
  font-weight: bold;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: 'red';
  font-size: larger;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      navigate('/');
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <MainWrapper>
      <h1>LOGO</h1>
      <h3>Welcome to the Grand Luck Casino</h3>
      <h4>Please, login to play</h4>
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
      <LoginButton onClick={login}>Login</LoginButton>
      {/* <TextButtons onClick={() => navigate('/register')}> */}
      {/* <TextButtons> */}
      <TextButtons to='/register'>Create new account</TextButtons>
      {/* </TextButtons> */}
      {/* <TextButtons onClick={() => navigate('/')}>Forgot password?</TextButtons> */}
    </MainWrapper>
  );
};

export default LoginPage;
