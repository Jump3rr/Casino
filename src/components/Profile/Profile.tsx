import React from 'react';
import styled from 'styled-components';
import { Input, MainWrapper } from '../../entities/CommonComponents';
import { auth } from '../../tools/firebaseConfig';
import { AiOutlineEdit } from 'react-icons/ai';

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
        <h3>
          {auth.currentUser?.photoURL}
          <AiOutlineEdit />
        </h3>
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
        <h3>
          {auth.currentUser?.displayName}
          <AiOutlineEdit />
        </h3>
      </OneLine>
      <OneLine>
        <h3>Phone number:</h3>
        <h3>
          {auth.currentUser?.phoneNumber}
          <AiOutlineEdit />
        </h3>
      </OneLine>
    </MainWrapper>
  );
};
