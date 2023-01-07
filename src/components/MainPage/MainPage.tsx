import React from 'react';
import styled from 'styled-components';
import { MainWrapper } from '../../entities/CommonComponents';

const GamesCategoryContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 80vw;
`;
const GameContainer = styled.div`
  margin-inline: 5em;
  background-color: black;
  display: flex;
  flex-direction: column;
  //justify-content: center;
  //align-items: center;
  text-align: center;
  cursor: pointer;
`;
const GamesLogo = styled.img`
  width: 15em;
`;

export const MainPage = () => {
  return (
    <MainWrapper>
      <h1>GAMES</h1>
      <h2>Card games</h2>
      <GamesCategoryContainer>
        <GameContainer>
          <GamesLogo src='/img/logo/blackjack-logo.png' alt='' />
          <h3>Blackjack</h3>
        </GameContainer>
        <GameContainer>
          <GamesLogo src='/img/logo/hilo-logo.png' alt='' />
          <h3>Hi-Lo</h3>
        </GameContainer>
      </GamesCategoryContainer>
      <h2>Slots</h2>
      <GamesCategoryContainer>
        <GameContainer>
          <GamesLogo src='/img/logo/slots-machine-logo.png' alt='' />
          <h3>Slots Machine</h3>
        </GameContainer>
      </GamesCategoryContainer>
      <h2>Others</h2>
      <GamesCategoryContainer>
        <GameContainer>
          <GamesLogo src='/img/logo/roulette-logo.png' alt='' />
          <h3>Roulette</h3>
        </GameContainer>
      </GamesCategoryContainer>
    </MainWrapper>
  );
};
