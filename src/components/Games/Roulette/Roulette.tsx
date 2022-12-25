import React, { useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import { Buttons, MainWrapper } from '../../../entities/CommonComponents';
import { rouletteData } from './RouletteData';

export default () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * rouletteData.length);
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
    </MainWrapper>
  );
};
