import React, { useEffect, useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import styled from 'styled-components';
import { Buttons, MainWrapper } from '../../../entities/CommonComponents';
import { rouletteData } from './RouletteData';
import { RouletteTable } from './RouletteTable';

const RouletteTableNumbers = styled.div``;

export default () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [winningNumber, setWinningNumber] = useState(0);

  useEffect(() => {
    if (!mustSpin) {
      setWinningNumber(prizeNumber);
    }
  }, [mustSpin]);

  const handleSpinClick = () => {
    console.log(rouletteData().length);
    const newPrizeNumber = Math.floor(Math.random() * rouletteData().length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  return (
    <MainWrapper>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={rouletteData()}
        onStopSpinning={() => {
          setMustSpin(false);
        }}
      />
      <Buttons onClick={handleSpinClick}>SPIN</Buttons>

      <RouletteTable winningNumber={winningNumber} />
    </MainWrapper>
  );
};
