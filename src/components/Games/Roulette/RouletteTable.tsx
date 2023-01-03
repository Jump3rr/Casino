import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  decrementFbCredits,
  incrementFbCredits,
} from '../../../actions/creditsFbActions';
import { Colors } from '../../../entities/colors';
import { IState } from '../../../reducers';
import { IBetReducer } from '../../../reducers/betReducer';
import { useAppDispatch } from '../../../tools/hooks';
import BetComponent from '../../BetComponent/BetComponent';
import { rouletteData } from './RouletteData';
import './RouletteTable.css';

interface RouletteTableProps {
  winningNumber: number;
  isSpinning: boolean;
}
type SelectedFields = {
  value: number;
  backgroundColor: string;
  bet: number;
};

export const RouletteTable: React.FC<RouletteTableProps> = ({
  winningNumber,
  isSpinning,
}) => {
  const [playerBet, setPlayerBet] = useState<SelectedFields[]>([]);
  const [won, setWon] = useState(0);
  const dispatch = useAppDispatch();
  const { bet } = useSelector<IState, IBetReducer>((globalState) => ({
    ...globalState.bet,
  }));

  useEffect(() => {
    handleResult();
  }, [winningNumber]);

  useEffect(() => {
    if (isSpinning) handleBet();
  }, [isSpinning]);

  const addPlayerBet = (value: number) => {
    let currentElement = document.getElementById(value.toString());
    if (currentElement != undefined) {
      const inArray = playerBet.find((e) => e.value === value);
      if (inArray != undefined) {
        currentElement.style.backgroundColor = inArray.backgroundColor;
        setPlayerBet(playerBet.filter((item) => item.value !== value));
      } else {
        const newArray = [
          ...playerBet,
          {
            value: value,
            backgroundColor: currentElement.style.backgroundColor,
            bet: bet,
          },
        ];
        setPlayerBet(newArray);
        currentElement.style.backgroundColor = Colors.gold;
      }
    }
  };
  const handleBet = () => {
    setWon(0);
    playerBet.forEach((el) => {
      dispatch(decrementFbCredits(el.bet));
    });
  };

  const handleResult = () => {
    let startNumber: number;
    let wonValue: number = 0;
    playerBet.forEach((el) => {
      switch (true) {
        case el.value < 38:
          if (el.value === winningNumber) {
            wonValue += el.bet * 36;
            return;
          }
          break;
        case el.value >= 38 && el.value <= 40:
          startNumber = el.value - 37;
          for (let i = startNumber; i < 37; i = i + 3) {
            if (winningNumber === i) {
              wonValue += el.bet * 3;
              return;
            }
          }
          break;
        case el.value >= 41 && el.value <= 43:
          startNumber = el.value - 40;
          const number12: number = startNumber * 12;
          const isFirst12: boolean = startNumber === 1 ? true : false;
          if (isFirst12 && winningNumber <= 12 && winningNumber > 0) {
            wonValue += el.bet * 3;
            return;
          }
          if (
            !isFirst12 &&
            winningNumber >= number12 - 12 &&
            winningNumber <= number12
          ) {
            wonValue += el.bet * 3;
            return;
          }
          break;
        case el.value === 44:
          if (winningNumber >= 1 && winningNumber <= 18) {
            wonValue += el.bet * 2;
            return;
          }
          break;
        case el.value === 45 || el.value === 47:
          if (!(winningNumber % 2)) wonValue += el.bet * 2;
          break;
        case el.value === 48 || el.value === 46:
          if (winningNumber % 2) wonValue += el.bet * 2;
          break;
        case el.value === 49:
          if (winningNumber >= 19 && winningNumber <= 36) {
            wonValue += el.bet * 2;
            return;
          }
          break;
      }
    });
    playerBet.forEach((el) => {
      const div = document.getElementById(el.value.toString());
      if (div != undefined) div.style.backgroundColor = el.backgroundColor;
    });
    setPlayerBet([]);
    dispatch(incrementFbCredits(wonValue));
    setWon(wonValue);
  };

  return (
    <div>
      <BetComponent />
      <div>NUMBER: {winningNumber}</div>
      <div>You won: {won}</div>
      <div className='parent'>
        {rouletteData().map((el) => {
          if (el.option === '0')
            return (
              <div
                id={`${el.option}`}
                className='div37 zero'
                onClick={() => addPlayerBet(Number(el.option))}
              >
                {el.option}
              </div>
            );
          return (
            <div
              id={`${el.option}`}
              className={`div${el.option}`}
              style={{
                backgroundColor: el.style.backgroundColor,
                color: el.style.textColor,
              }}
              onClick={() => addPlayerBet(Number(el.option))}
            >
              {el.option}
            </div>
          );
        })}
        <div
          id='37'
          className='div37 zero'
          onClick={(event) => addPlayerBet(Number(event.currentTarget.id))}
        >
          0
        </div>
        <div
          id='38'
          className='div38'
          onClick={(event) => addPlayerBet(Number(event.currentTarget.id))}
        >
          2 to 1
        </div>
        <div
          id='39'
          className='div39'
          onClick={(event) => addPlayerBet(Number(event.currentTarget.id))}
        >
          2 to 1
        </div>
        <div
          id='40'
          className='div40'
          onClick={(event) => addPlayerBet(Number(event.currentTarget.id))}
        >
          2 to 1
        </div>
        <div
          id='41'
          className='div41 twelve'
          onClick={(event) => addPlayerBet(Number(event.currentTarget.id))}
        >
          1st 12
        </div>
        <div
          id='42'
          className='div42 twelve'
          onClick={(event) => addPlayerBet(Number(event.currentTarget.id))}
        >
          2nd 12
        </div>
        <div
          id='43'
          className='div43 twelve'
          onClick={(event) => addPlayerBet(Number(event.currentTarget.id))}
        >
          3rd 12
        </div>
        <div
          id='44'
          className='div44 bottom'
          onClick={(event) => addPlayerBet(Number(event.currentTarget.id))}
        >
          1 to 18
        </div>
        <div
          id='45'
          className='div45 bottom'
          onClick={(event) => addPlayerBet(Number(event.currentTarget.id))}
        >
          EVEN
        </div>
        <div
          id='46'
          className='div46 bottom'
          onClick={(event) => addPlayerBet(Number(event.currentTarget.id))}
        ></div>
        <div
          id='47'
          className='div47 bottom'
          onClick={(event) => addPlayerBet(Number(event.currentTarget.id))}
        ></div>
        <div
          id='48'
          className='div48 bottom'
          onClick={(event) => addPlayerBet(Number(event.currentTarget.id))}
        >
          ODD
        </div>
        <div
          id='49'
          className='div49 bottom'
          onClick={(event) => addPlayerBet(Number(event.currentTarget.id))}
        >
          19 to 36
        </div>
      </div>
    </div>
  );
};
