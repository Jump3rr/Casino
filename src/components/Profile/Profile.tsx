import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, MainWrapper } from '../../entities/CommonComponents';
import { auth } from '../../tools/firebaseConfig';
import { updateProfile, updatePhoneNumber } from 'firebase/auth';
import { AiOutlineEdit } from 'react-icons/ai';

const OneLine = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 30vw;
`;
const ProfileInput = styled(Input)`
  width: 10vw;
`;
export const ProfileComponent = () => {
  const [displayName, setDisplayName] = useState(auth.currentUser?.displayName);
  const [isEditingDisplayName, setIsEditingDisplayName] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(auth.currentUser?.phoneNumber);
  const [isEditingPhoneNumber, setIsEditingPhoneNumber] = useState(false);

  const editDisplayName = () => {
    if (!auth.currentUser) {
      return;
    }
    updateProfile(auth.currentUser, { displayName: displayName })
      .then(() => {
        console.log('updated');
        setIsEditingDisplayName(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
          {isEditingDisplayName ? (
            <div>
              <ProfileInput
                type='text'
                placeholder='Name'
                onChange={(event) => setDisplayName(event.target.value)}
              />
              <button onClick={editDisplayName}>Save</button>
            </div>
          ) : (
            <div>{auth.currentUser?.displayName}</div>
          )}

          <AiOutlineEdit
            onClick={() => setIsEditingDisplayName(!isEditingDisplayName)}
          />
        </h3>
      </OneLine>
    </MainWrapper>
  );
};
