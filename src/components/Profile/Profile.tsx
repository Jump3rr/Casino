import React from 'react';
import styled from 'styled-components';
import { Input, MainWrapper } from '../../entities/CommonComponents';
import { auth } from '../../tools/firebaseConfig';

const OneLine = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 30vw;
`;

export const ProfileComponent = () => {
  return (
    <MainWrapper>
      <h1>Your account:</h1>
      <OneLine>
        <h3>Profile picture:</h3>
        <h3>{auth.currentUser?.photoURL}</h3>
      </OneLine>
      <OneLine>
        <h3>Email: </h3>
        <h3>{auth.currentUser?.email}</h3>
      </OneLine>
      <OneLine>
        <h3>Password:</h3>
        <h3>{auth.currentUser?.email}</h3>
      </OneLine>
      <OneLine>
        <h3>Name</h3>
        <h3>{auth.currentUser?.displayName}</h3>
      </OneLine>
      <OneLine>
        <h3>Phone number:</h3>
        <h3>{auth.currentUser?.phoneNumber}</h3>
      </OneLine>
      <div>
        <label>Set avatar</label>
      </div>
    </MainWrapper>
  );
};
