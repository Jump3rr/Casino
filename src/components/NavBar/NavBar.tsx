import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { auth } from '../../tools/firebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';
import { Colors } from '../../entities/colors';
import { Buttons, TextButtons } from '../../entities/CommonComponents';
import store from '../../tools/store';
import { useAppSelector } from '../../tools/hooks';
import { useLocation } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import './style.css';
import { MdAddBox } from 'react-icons/md';

const TopBarWrapper = styled.div`
  height: 10vh;
  width: 90vw;
  background-color: ${Colors.darkRed};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-inline: 5vw;
  align-items: center;
  position: fixed;
  margin-top: -10vh;
`;
const Menu = styled.div`
  width: 70vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
    display: none;
  }
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

  @media screen and (max-width: 768px) {
    width: 90%;
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
  width: 32vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Texts = styled.div`
  font-size: larger;
  font-weight: bold;
  margin: 0.2em 0.5em 0.5em 0.5em;
  align-items: center;
  display: flex;

  @media screen and (max-width: 768px) {
    font-size: 1.5em;
  }
`;

const MobileButtons = styled(TextButtons)`
  font-size: 2.4em;
`;

const Bars = styled(FaBars)`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    font-size: 4em;
  }
`;

const AddButton = styled(MdAddBox)`
  font-size: 2em;
`;

export const NavBar = () => {
  const [mobileNavbarActive, setMobileNavbarActive] = useState(false);
  const fbcredits = useAppSelector((state) => state.fbcredits);
  const logout = async () => {
    await auth.signOut();
  };

  return (
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
          {fbcredits && (
            <Texts>
              Balance: {fbcredits} <AddButton />
            </Texts>
          )}
          <TextButtons to='/profile'>
            {auth.currentUser?.displayName
              ? auth.currentUser.displayName
              : auth.currentUser?.email}
          </TextButtons>
          <LogOutButton onClick={logout}>LOG OUT</LogOutButton>
        </ProfileSection>
      </Menu>
      <Bars onClick={() => setMobileNavbarActive(!mobileNavbarActive)} />
      <div
        className={
          !mobileNavbarActive
            ? 'nav-bar-mobile-menu'
            : 'nav-bar-mobile-menu active'
        }
      >
        <div className='nav-bar-mobile-items'>
          <MobileButtons to='/'>HOME</MobileButtons>
          <MobileButtons to='/ranking'>RANKING</MobileButtons>
          <MobileButtons to='/roulette'>BIGGEST WINS</MobileButtons>
          <MobileButtons to='/poker'>LIVE POKER</MobileButtons>
        </div>
        <div className='nav-bar-mobile-items'>
          {fbcredits && (
            <Texts>
              Balance: {fbcredits} <AddButton />
            </Texts>
          )}
          <TextButtons to='/profile'>
            {auth.currentUser?.displayName
              ? auth.currentUser.displayName
              : auth.currentUser?.email}
          </TextButtons>
          <LogOutButton onClick={logout}>LOG OUT</LogOutButton>
        </div>
      </div>
    </TopBarWrapper>
  );
};
