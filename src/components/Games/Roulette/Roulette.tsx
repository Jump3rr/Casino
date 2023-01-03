import React, { useEffect, useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import styled from 'styled-components';
import { Buttons, MainWrapper } from '../../../entities/CommonComponents';
import { rouletteData } from './RouletteData';
import { RouletteTable } from './RouletteTable';

const SpinButton = styled(Buttons)`
  padding: 1em 2em 1em 2em;
  font-size: larger;
  font-weight: bold;
`;

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
      <SpinButton onClick={handleSpinClick}>SPIN</SpinButton>

      <RouletteTable winningNumber={winningNumber} isSpinning={mustSpin} />
    </MainWrapper>
  );
};
