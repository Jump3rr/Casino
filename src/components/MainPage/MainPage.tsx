import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  flex-direction: row;
  text-align: center;
  cursor: pointer;
`;
const GameDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 15em;

  p {
    text-align: start;
    font-size: small;
    padding: 1em;
    height: 10em;
  }
`;
const GamesLogo = styled.img`
  width: 15em;
`;

export const MainPage = () => {
  const navigate = useNavigate();

  return (
    <MainWrapper>
      <h1>GAMES</h1>
      <h2>Card games</h2>
      <GamesCategoryContainer>
        <GameContainer onClick={() => navigate('/blackjack')}>
          <GamesLogo src='/img/logo/blackjack-logo.png' alt='' />
          <GameDescription>
            <h3>Blackjack</h3>
            <p>
              Blackjack is a card game where the goal is to get a hand value as
              close to 21 as possible without going over. Players compete
              against the dealer and try to beat their hand.
            </p>
          </GameDescription>
        </GameContainer>
        <GameContainer onClick={() => navigate('/hilo')}>
          <GamesLogo src='/img/logo/hilo-logo.png' alt='' />
          <GameDescription>
            <h3>Hi-Lo</h3>
            <p>
              Hi-Lo, also known as High and Low, is a simple card game in which
              players try to guess whether the next card drawn from a deck will
              be higher or lower than the current one.
            </p>
          </GameDescription>
        </GameContainer>
      </GamesCategoryContainer>
      <h2>Slots</h2>
      <GamesCategoryContainer>
        <GameContainer onClick={() => navigate('/slots')}>
          <GamesLogo src='/img/logo/slots-machine-logo.png' alt='' />
          <GameDescription>
            <h3>Slots Machine</h3>
            <p>
              A slot machine, also known a one-armed bandit, is a casino game
              with spinning reels. Players select bet and press a button to spin
              the reels. The goal is to line up winning symbols on paylines,
              which are lines on the reels that determine the prize.
            </p>
          </GameDescription>
        </GameContainer>
      </GamesCategoryContainer>
      <h2>Others</h2>
      <GamesCategoryContainer>
        <GameContainer onClick={() => navigate('/roulette')}>
          <GamesLogo src='/img/logo/roulette-logo.png' alt='' />
          <GameDescription>
            <h3>Roulette</h3>
            <p>
              Classic casino game in which a small ball is spun around a wheel
              with numbered slots. Players can place bets on a single number, a
              range of numbers, the color red or black, or whether the number
              will be odd or even.
            </p>
          </GameDescription>
        </GameContainer>
      </GamesCategoryContainer>
    </MainWrapper>
  );
};
