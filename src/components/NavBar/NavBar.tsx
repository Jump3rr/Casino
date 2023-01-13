import React, { useState } from 'react';
import styled from 'styled-components';
import { auth } from '../../tools/firebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';
import { Colors } from '../../entities/colors';
import { Buttons, TextButtons } from '../../entities/CommonComponents';
import store from '../../tools/store';
import { useAppSelector } from '../../tools/hooks';

const TopBarWrapper = styled.div`
  height: 10vh;
  background-color: ${Colors.darkRed};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-inline: 5vw;
  align-items: center;
`;
const Menu = styled.div`
  width: 60vw;
  // background-color: yellow;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const LogOutButton = styled(Buttons)`
  width: 5em;
  height: 4em;
  background-color: ${Colors.red};
  color: ${Colors.gold};

  :hover {
    background-color: ${Colors.darkRed};
    border-color: ${Colors.red};
  }
`;

const ButtonsSection = styled.div`
  width: 30vw;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const ProfileSection = styled.div`
  width: 22vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Texts = styled.div`
  font-size: large;
  font-weight: bold;
  margin: 0.2em 0.5em 0.5em 0.5em;
`;

const ProfileSingleSection = styled.div`
  justify-content: center;
  text-align: center;
`;

export const NavBar = () => {
  const [user, setUser] = useState<User | any>({});
  const fbcredits = useAppSelector((state) => state.fbcredits);
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  const logout = async () => {
    await auth.signOut();
  };
  return (
    <>
      <TopBarWrapper>
        <h2>LOGO</h2>
        <Menu>
          <ButtonsSection>
            <TextButtons to='/'>HOME</TextButtons>
            <TextButtons to='/ranking'>RANKING</TextButtons>
            <TextButtons to='/roulette'>BIGGEST WINS</TextButtons>
            <TextButtons to='/poker'>LIVE POKER</TextButtons>
          </ButtonsSection>
          <ProfileSection>
            <ProfileSingleSection>
              {fbcredits && <Texts>Balance: {fbcredits}</Texts>}

              {/* <Texts>Balance: {currentBalance}</Texts> */}
              <TextButtons to='/'>Add funds</TextButtons>
            </ProfileSingleSection>
            <ProfileSingleSection>
              <Texts>
                {auth.currentUser?.displayName
                  ? auth.currentUser.displayName
                  : auth.currentUser?.email}
              </Texts>
              <TextButtons to='/profile'>Profile</TextButtons>
            </ProfileSingleSection>
            <LogOutButton onClick={logout}>LOG OUT</LogOutButton>
          </ProfileSection>
        </Menu>
      </TopBarWrapper>
    </>
  );
};
