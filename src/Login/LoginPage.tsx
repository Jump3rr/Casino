import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../tools/firebaseConfig';
import styled from 'styled-components';
import { Colors } from '../entities/colors';

const LoginWrapper = styled.div`
  background-color: ${Colors.mainGreen};
  height: 80vh;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const Input = styled.input`
  height: 2em;
  width: 30em;
  padding: 0.5em;
  margin: 0.5em;
  background-color: ${Colors.lighterGreen};
  color: ${Colors.gold};
  border-color: ${Colors.mainGreen};
  border-width: 1px;
  border-radius: 10px;
  font-size: large;
  :focus {
    border: 1px solid ${Colors.gold};
    outline: none;
    //border-color: ${Colors.red};
  }

  ::placeholder {
    color: ${Colors.gold};
    opacity: 0.5;
  }
`;
const LoginButton = styled.button`
  margin: 1em;
  background-color: ${Colors.gold};
  height: 2.5em;
  width: 31em;
  font-size: large;
  font-weight: bold;
  color: ${Colors.lighterGreen};
  cursor: pointer;
  border-radius: 10px;

  :hover {
    background-color: ${Colors.red};
    color: ${Colors.gold};
  }
`;
const Buttons = styled.div`
  font-size: larger;
  font-weight: bold;
  cursor: pointer;
  margin: 0.5em;

  :hover {
    text-decoration: underline;
    color: ${Colors.red};
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
    <LoginWrapper>
      <h1>LOGO</h1>
      <h3>Welcome to the Grand Luck Casino</h3>
      <h4>Please, login to play</h4>
      <Input
        type='text'
        placeholder='Email'
        onChange={(event) => setEmail(event.target.value)}
      />
      <Input
        type='text'
        placeholder='Password'
        onChange={(event) => setPassword(event.target.value)}
      />
      <LoginButton onClick={login}>Login</LoginButton>
      <Buttons onClick={() => navigate('/register')}>
        Create new account
      </Buttons>
      <Buttons onClick={() => navigate('/')}>Forgot password?</Buttons>
    </LoginWrapper>
  );
};

export default LoginPage;
