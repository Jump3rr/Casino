import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { app, auth, db } from '../../tools/firebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { Colors } from '../../entities/colors';
import { Buttons, TextButtons } from '../../entities/CommonComponents';
import { onValue, ref, set } from 'firebase/database';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../reducers';
import { ICreditsFbReducer } from '../../reducers/creditsFbReducer';
import { getFbCredits } from '../../actions/creditsFbActions';
import store from '../../tools/store';
import { useAppSelector } from '../../tools/hooks';
import { useFirebase } from 'react-redux-firebase';
import { doc, onSnapshot } from 'firebase/firestore';

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
export type AppDispatch = typeof store.dispatch;

const useAppDispatch: () => AppDispatch = useDispatch;
type GetFbCredits = ReturnType<typeof getFbCredits>;
export const NavBar = () => {
  const [user, setUser] = useState<User | any>({});
  const [currentBalance, setCurrentBalance] = useState(0);
  const dispatch = useAppDispatch();
  const dispatch2 = useDispatch();
  useEffect(() => {
    if (!auth.currentUser?.uid) {
      return;
    }
    onSnapshot(doc(db, 'users', auth.currentUser?.uid), (doc) => {
      if (Number(doc.data()?.credits)) setCurrentBalance(doc.data()?.credits);
    });
  }, [auth.currentUser]);
  // useEffect(() => {
  //   const creditsRef = ref(db, 'users/' + auth.currentUser?.uid + '/credits');
  //   onValue(creditsRef, (snapshot) => {
  //     console.log('abc');
  //     console.log('aaaa');
  //     console.log(snapshot.val());
  //     setCurrentBalance(snapshot.val());
  //     //dispatch(fetchDataSuccess(snapshot.val()));
  //   });
  //   //setCurrentBalance(500);
  // }, [auth, db]);
  //   console.log('abc');
  //   dispatch<GetFbCredits>(getFbCredits());
  //   //dispatch(getFbCredits());
  // }, [auth.currentUser, dispatch]);
  //  --------------
  // const { fbcredits } = useSelector<IState, ICreditsFbReducer>(
  //   (globalState) => ({
  //     ...globalState.fbcredits,
  //   })
  // );

  // const getData = () => {
  //   const creditsRef = ref(db, 'users/' + auth.currentUser?.uid + '/credits');
  //   onValue(creditsRef, (snapshot) => {
  //     const data = snapshot.val();
  //     console.log(data);
  //     //setCurrentBalance(data);
  //     //updateStarCount(postElement, data);

  //     // onValue(data, (snapshot) => {
  //     //   console.log([snapshot.val()]);
  //     //   console.log([snapshot.val()][0]);
  //     // });
  //   });
  // };

  // useEffect(() => {
  //   firebase.watchEvent('value', todosPath);
  // });

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
            <TextButtons to='/blackjack'>RANKING</TextButtons>
            <TextButtons to='/roulette'>BIGGEST WINS</TextButtons>
            <TextButtons to='/hilo'>LIVE GAMES</TextButtons>
            <TextButtons to='/slots'>SLOTS-temp</TextButtons>
          </ButtonsSection>
          <ProfileSection>
            <ProfileSingleSection>
              {/* {fbcredits !== null && <Texts>Balance: {fbcredits}</Texts>} */}

              <Texts>Balance: {currentBalance}</Texts>
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
