import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Buttons,
  ErrorText,
  Input,
  MainWrapper,
} from '../../entities/CommonComponents';
import { auth } from '../../tools/firebaseConfig';
import {
  updateProfile,
  updatePhoneNumber,
  updatePassword,
} from 'firebase/auth';
import { AiOutlineEdit } from 'react-icons/ai';
import { passwordValidation } from '../../entities/commonFunctions';

const OneLine = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 40vw;

  @media screen and (max-width: 768px) {
    width: 70vw;
  }
`;
const PasswordEditLine = styled.div`
  display: flex;
  flex-direction: row;
  width: 30vw;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
    width: 60vw;
  }
`;
const ProfileInput = styled(Input)`
  width: 10vw;

  @media screen and (max-width: 768px) {
    width: 15vw;
    height: 0.8em;
  }
`;
export const ProfileComponent = () => {
  const [displayName, setDisplayName] = useState(auth.currentUser?.displayName);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEditingDisplayName, setIsEditingDisplayName] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(auth.currentUser?.phoneNumber);
  const [isEditingPhoneNumber, setIsEditingPhoneNumber] = useState(false);

  const editDisplayName = () => {
    if (!auth.currentUser) {
      return;
    }
    updateProfile(auth.currentUser, { displayName: displayName })
      .then(() => {
        setIsEditingDisplayName(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const editPassword = () => {
    if (!auth.currentUser) {
      return;
    }
    const error_temp = passwordValidation(password, confirmPassword);
    if (error_temp) {
      setErrorMessage(error_temp);
      return;
    }
    setErrorMessage('');
    updatePassword(auth.currentUser, password)
      .then(() => {
        setIsEditingPassword(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <MainWrapper>
      <h1>Your account:</h1>
      <OneLine>
        <h3>Email: </h3>
        <h3>{auth.currentUser?.email}</h3>
      </OneLine>
      <OneLine>
        <h3>Password:</h3>
        <h3>
          <AiOutlineEdit
            style={{ fontSize: '1.5em', marginLeft: '10px' }}
            onClick={() => setIsEditingPassword(!isEditingPassword)}
          />
        </h3>
      </OneLine>
      {isEditingPassword && (
        <>
          <PasswordEditLine>
            <label>New password: </label>
            <ProfileInput
              type='password'
              onChange={(event) => setPassword(event.target.value)}
            />
          </PasswordEditLine>
          <PasswordEditLine>
            <label>Confirm new password: </label>
            <ProfileInput
              type='password'
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </PasswordEditLine>
          <ErrorText>{errorMessage}</ErrorText>
          <Buttons onClick={editPassword}>Save</Buttons>
        </>
      )}
      <OneLine>
        <h3>Name</h3>
        <h3>
          {isEditingDisplayName ? (
            <span>
              <ProfileInput
                type='text'
                placeholder='Name'
                onChange={(event) => setDisplayName(event.target.value)}
              />
              <Buttons onClick={editDisplayName}>Save</Buttons>
            </span>
          ) : (
            <span>{auth.currentUser?.displayName}</span>
          )}

          <AiOutlineEdit
            style={{ fontSize: '1.5em', marginLeft: '10px' }}
            onClick={() => setIsEditingDisplayName(!isEditingDisplayName)}
          />
        </h3>
      </OneLine>
    </MainWrapper>
  );
};
