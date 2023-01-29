import { onSnapshot, doc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { incrementFbCredits } from '../../actions/creditsFbActions';
import {
  Buttons,
  ErrorText,
  MainWrapper,
} from '../../entities/CommonComponents';
import { auth, db } from '../../tools/firebaseConfig';
import { useAppDispatch } from '../../tools/hooks';

export const AddBalanceComponent = () => {
  const [credits, setCredits] = useState(0);
  const [canGetCredits, setCanGetCredits] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!auth.currentUser?.uid) return;
    onSnapshot(doc(db, 'users', auth.currentUser?.uid), (doc) => {
      if (doc.data()?.daily) {
        const date = doc.data()?.daily.toDate();
        date < new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
          ? setCanGetCredits(true)
          : setCanGetCredits(false);
      } else {
        setCanGetCredits(true);
      }
    });
  }, []);
  const getCredits = async () => {
    if (!canGetCredits) return;
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    switch (true) {
      case randomNumber <= 50:
        setCredits(100);
        dispatch(incrementFbCredits(100));
        break;
      case randomNumber <= 80:
        setCredits(200);
        dispatch(incrementFbCredits(200));
        break;
      case randomNumber <= 95:
        setCredits(500);
        dispatch(incrementFbCredits(500));
        break;
      default:
        setCredits(1000);
        dispatch(incrementFbCredits(1000));
        break;
    }
    if (!auth.currentUser?.uid) {
      return;
    }
    try {
      const docRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(docRef, {
        daily: new Date(),
      });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <MainWrapper>
      <h3>Daily free</h3>
      {credits ? <span>You won: {credits} credits</span> : ''}
      <Buttons onClick={getCredits} disabled={!canGetCredits}>
        Get credits
      </Buttons>
      {!canGetCredits && (
        <ErrorText>
          You can only receive the daily bonus once in 24 hours.
        </ErrorText>
      )}
      <h4>Chance to win:</h4>
      <ul style={{ paddingInlineStart: '10px' }}>
        <li>100 credits - 50%</li>
        <li>200 credits - 30%</li>
        <li>500 credits - 15%</li>
        <li>1000 credits - 5%</li>
      </ul>
    </MainWrapper>
  );
};
