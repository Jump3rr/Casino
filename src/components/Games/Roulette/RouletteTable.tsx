import React, { useEffect, useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import styled from 'styled-components';
import { Buttons, MainWrapper } from '../../../entities/CommonComponents';
import { rouletteData } from './RouletteData';
import './RouletteTable.css';

interface RouletteTableProps {
  winningNumber: number;
}

export const RouletteTable: React.FC<RouletteTableProps> = ({
  winningNumber,
}) => {
  const [playerBetValue, setPlayerBetValue] = useState(0);
  const [balance, setBalance] = useState(1000);
  const [playerNumber, setPlayerNumber] = useState(0);
  const [playerColumn, setPlayerColumn] = useState(0);
  const [player12, setPlayer12] = useState(0);
  const [playerBet, setPlayerBet] = useState(50);

  const [info, setInfo] = useState('');

  useEffect(() => {
    console.log(playerBet);
    handleBet();
  }, [winningNumber]);

  const handleBet = () => {
    //var startNumber: number;
    switch (true) {
      case playerBet < 38:
        if (playerBet === winningNumber) {
          setInfo('You won');
          return;
        }
        setInfo('You lose');
        break;
      case playerBet >= 38 && playerBet <= 40:
        console.log('obstawiles');
        var startNumber = playerBet - 37;
        for (let i = startNumber; i < 37; i = i + 3) {
          if (winningNumber === i) {
            console.log('abc');
            setInfo('You won');
            return;
          }
        }
        setInfo('You lose');
        break;
      case playerBet >= 41 && playerBet <= 43:
        startNumber = playerBet - 40;
        const number12: number = startNumber * 12;
        const isFirst12: boolean = startNumber === 1 ? true : false;
        if (isFirst12 && winningNumber <= 12 && winningNumber > 0) {
          setInfo('You won');
          return;
        }
        if (
          !isFirst12 &&
          winningNumber >= number12 - 12 &&
          winningNumber <= number12
        ) {
          setInfo('You won');
          return;
        }
        setInfo('You lose');
        break;
      case playerBet === 44: //|| playerBet === 49:
        if (winningNumber >= 1 && winningNumber <= 18) {
          setInfo('You won');
          return;
        }
        setInfo('You lose');
        break;
      case playerBet === 45:
        winningNumber % 2 ? setInfo('You won') : setInfo('You lose');
        break;
      case playerBet === 49:
        if (winningNumber >= 19 && winningNumber <= 36) {
          setInfo('You won');
          return;
        }
        setInfo('You lose');
        break;
    }
  };

  return (
    <div>
      <div>Balance: {balance}</div>
      <div>Bet: {playerBetValue}</div>
      <input
        type='number'
        onChange={(event) => setPlayerBetValue(Number(event.target.value))}
      ></input>
      {/* <div>NUMBER: {!mustSpin ? prizeNumber : ''}</div> */}
      <div>NUMBER: {winningNumber}</div>
      <div>{info}</div>
      <div className='parent'>
        {rouletteData().map((el) => {
          if (el.option === '0')
            return (
              <div
                id={`${el.option}`}
                className='div37 zero'
                onClick={() => setPlayerBet(Number(el.option))}
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
              onClick={() => setPlayerBet(Number(el.option))}
            >
              {el.option}
            </div>
          );
        })}
        <div
          id='37'
          className='div37 zero'
          onClick={(event) => setPlayerBet(Number(event.currentTarget.id))}
        >
          0
        </div>
        <div
          id='38'
          className='div38'
          onClick={(event) => setPlayerBet(Number(event.currentTarget.id))}
        >
          2 to 1
        </div>
        <div
          id='39'
          className='div39'
          onClick={(event) => setPlayerBet(Number(event.currentTarget.id))}
        >
          2 to 1
        </div>
        <div
          id='40'
          className='div40'
          onClick={(event) => setPlayerBet(Number(event.currentTarget.id))}
        >
          2 to 1
        </div>
        <div
          id='41'
          className='div41 twelve'
          onClick={(event) => setPlayerBet(Number(event.currentTarget.id))}
        >
          1st 12
        </div>
        <div
          id='42'
          className='div42 twelve'
          onClick={(event) => setPlayerBet(Number(event.currentTarget.id))}
        >
          2nd 12
        </div>
        <div
          id='43'
          className='div43 twelve'
          onClick={(event) => setPlayerBet(Number(event.currentTarget.id))}
        >
          3rd 12
        </div>
        <div
          id='44'
          className='div44 bottom'
          onClick={(event) => setPlayerBet(Number(event.currentTarget.id))}
        >
          1 to 18
        </div>
        <div
          id='45'
          className='div45 bottom'
          onClick={(event) => setPlayerBet(Number(event.currentTarget.id))}
        >
          EVEN
        </div>
        <div
          id='46'
          className='div46 bottom'
          onClick={(event) => setPlayerBet(Number(event.currentTarget.id))}
        ></div>
        <div
          id='47'
          className='div47 bottom'
          onClick={(event) => setPlayerBet(Number(event.currentTarget.id))}
        ></div>
        <div
          id='48'
          className='div48 bottom'
          onClick={(event) => setPlayerBet(Number(event.currentTarget.id))}
        >
          ODD
        </div>
        <div
          id='49'
          className='div49 bottom'
          onClick={(event) => setPlayerBet(Number(event.currentTarget.id))}
        >
          19 to 36
        </div>
      </div>
    </div>
  );
};
