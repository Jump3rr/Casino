import React, { useEffect, useRef, useState } from 'react';
import Dice from 'react-dice-roll';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  decrementFbCredits,
  incrementFbCredits,
} from '../../../actions/creditsFbActions';
import { Colors } from '../../../entities/colors';
import { Buttons, MainWrapper } from '../../../entities/CommonComponents';
import { SelectedFields } from '../../../entities/types';
import { IState } from '../../../reducers';
import { IBetReducer } from '../../../reducers/betReducer';
import { useAppDispatch } from '../../../tools/hooks';
import BetComponent from '../../BetComponent/BetComponent';

const Dices = styled.div`
  display: flex;
  justify-content: space-between;
  width: 40vw;
  margin-bottom: 8em;
`;
const CrapsBets = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-align: center;
  border: 1px solid black;

  div {
    border: 1px solid ${Colors.black};
    box-sizing: border-box;
    padding: 1em;
    color: ${Colors.darkRed};
    font-weight: bold;
    background-color: ${Colors.lighterGreen};
  }
`;
const FieldBet = styled.div`
  grid-column-start: 1;
  grid-column-end: 3;
`;
const BetButton = styled(Buttons)`
  padding: 1em;
  width: 10em;
`;

const Craps: React.FC = () => {
  const diceRef = useRef<any>(null);
  const diceRef2 = useRef<any>(null);
  const [dice1Value, setDice1Value] = useState(0);
  const [dice2Value, setDice2Value] = useState(0);
  const [shotCounter, setShotCounter] = useState(0);
  const [winningNumber, setWinningNumber] = useState(0);
  const dispatch = useAppDispatch();
  const [playerBet, setPlayerBet] = useState<SelectedFields[]>([]);
  const [playerTempBet, setPlayerTempBet] = useState<SelectedFields[]>([]);
  const { bet } = useSelector<IState, IBetReducer>((globalState) => ({
    ...globalState.bet,
  }));

  const addPlayerBet = (value: number) => {
    let currentElement = document.getElementById(value.toString());
    if (currentElement != undefined) {
      const inArray = playerTempBet.find((e) => e.value === value);
      if (inArray != undefined) {
        currentElement.style.backgroundColor = inArray.backgroundColor;
        setPlayerTempBet(playerTempBet.filter((item) => item.value !== value));
      } else {
        const newArray = [
          ...playerTempBet,
          {
            value: value,
            backgroundColor: currentElement.style.backgroundColor,
            bet: bet,
          },
        ];
        setPlayerTempBet(newArray);
        currentElement.style.backgroundColor = Colors.gold;
      }
    }
  };

  useEffect(() => {
    if (shotCounter > 0) rollDice();
  }, [shotCounter]);

  const handleBet = () => {
    playerTempBet.forEach((el) => {
      dispatch(decrementFbCredits(el.bet));
    });
    setPlayerBet([...playerBet, ...playerTempBet]);
    setPlayerTempBet([]);
  };

  const rollDice = () => {
    const result = dice1Value + dice2Value;
    playerBet.forEach((el) => {
      if (el.value === 1) {
        if (shotCounter === 1) {
          if (result === 7 || result === 11) {
            dispatch(incrementFbCredits(el.bet * 2));
            deletePlayerBet(el);
            return;
          } else if (result === 2 || result === 3 || result === 12) {
            deletePlayerBet(el);
            return;
          } else {
            setWinningNumber(result);
          }
        }
        if (result === winningNumber) {
          dispatch(incrementFbCredits(el.bet * 2));
          deletePlayerBet(el);
          return;
        }
        if (result === 7) {
          deletePlayerBet(el);
          return;
        }
      }
      if (el.value === 2) {
        if (shotCounter === 1) {
          if (result === 2 || result === 3 || result === 12) {
            dispatch(incrementFbCredits(el.bet * 2));
            deletePlayerBet(el);
            return;
          } else if (result === 7 || result === 11) {
            deletePlayerBet(el);
            return;
          } else {
            setWinningNumber(result);
          }
        }
        if (result === winningNumber) {
          deletePlayerBet(el);
          return;
        }
        if (result === 7) {
          dispatch(incrementFbCredits(el.bet * 2));
          deletePlayerBet(el);
          return;
        }
      }
      if (el.value === 3) {
        if (result === winningNumber) {
          dispatch(incrementFbCredits(el.bet * 2));
          deletePlayerBet(el);
          return;
        }
        if (result === 7) {
          deletePlayerBet(el);
          return;
        }
      }
      if (el.value === 4) {
        if (result === 7) {
          dispatch(incrementFbCredits(el.bet * 2));
          deletePlayerBet(el);
          return;
        }
        if (result === winningNumber) {
          deletePlayerBet(el);
          return;
        }
      }
      if (el.value === 5) {
        if (result === 2) {
          dispatch(incrementFbCredits(el.bet * 3));
        } else if (result === 12) {
          dispatch(incrementFbCredits(el.bet * 4));
        } else if (
          result === 3 ||
          result === 4 ||
          result === 9 ||
          result === 10 ||
          result === 11
        ) {
          dispatch(incrementFbCredits(el.bet * 2));
        }
        deletePlayerBet(el);
      }
    });
  };
  const deletePlayerBet = (el: SelectedFields) => {
    const div = document.getElementById(el.value.toString());
    if (div != undefined) div.style.backgroundColor = el.backgroundColor;
    setPlayerBet(playerBet.filter((item) => item.value !== el.value));
    setPlayerTempBet(playerBet.filter((item) => item.value !== el.value));

    if (el.value !== 5) {
      setPlayerBet([]);
      setPlayerTempBet([]);
      setWinningNumber(0);
      setTimeout(() => {
        setShotCounter(0);
      }, 100);
    }
  };

  const onRoll = () => {
    diceRef.current.children[0].click();
    diceRef2.current.children[0].click();
    setTimeout(() => {
      setShotCounter(shotCounter + 1);
    }, 1001);
  };

  return (
    <MainWrapper>
      <Dices onClick={onRoll}>
        <div ref={diceRef} className='dice'>
          <Dice onRoll={(value) => setDice1Value(value)} size={150} />
        </div>
        <div ref={diceRef2} className='dice'>
          <Dice onRoll={(value) => setDice2Value(value)} size={150} />
        </div>
      </Dices>
      <CrapsBets>
        <div
          id='1'
          onClick={(event) => {
            if (shotCounter === 0) addPlayerBet(Number(event.currentTarget.id));
          }}
        >
          Pass line
        </div>
        <div
          id='2'
          onClick={(event) => {
            if (shotCounter === 0) addPlayerBet(Number(event.currentTarget.id));
          }}
        >
          Don't pass
        </div>
        <div
          id='3'
          onClick={(event) => {
            if (shotCounter > 0) addPlayerBet(Number(event.currentTarget.id));
          }}
        >
          Come
        </div>
        <div
          id='4'
          onClick={(event) => {
            if (shotCounter > 0) addPlayerBet(Number(event.currentTarget.id));
          }}
        >
          Don't come
        </div>
        <FieldBet
          id='5'
          onClick={(event) => {
            addPlayerBet(Number(event.currentTarget.id));
          }}
        >
          Field
        </FieldBet>
      </CrapsBets>
      <BetButton onClick={handleBet}>BET</BetButton>
      <BetComponent />
    </MainWrapper>
  );
};
export default Craps;
