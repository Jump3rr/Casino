import React, { useState } from 'react';
import styled from 'styled-components';
import { app, auth } from '../tools/firebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';
import { Link } from 'react-router-dom';

const TopBarWrapper = styled.div`
  height: 10vh;
  background-color: red;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-inline: 5vw;
  align-items: center;
`;
const Menu = styled.div`
  width: 50vw;
  background-color: yellow;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const NavBar = () => {
  const [user, setUser] = useState<User | any>({});

  console.log(auth.currentUser);
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
          <Buttons>
            <Link to='/login'>HOME</Link>
            <div>ranking</div>
            <div>TOP</div>
            <div>Live games</div>
          </Buttons>
          <ProfileSection>
            <div>SALDO: </div>
            <div>DODAJ ŚRODKI</div>
            <div>
              <div>{auth.currentUser?.email}</div>
              Profil
            </div>
            <button onClick={logout}>LOG OUT</button>
          </ProfileSection>
        </Menu>
      </TopBarWrapper>
    </>
  );
};
