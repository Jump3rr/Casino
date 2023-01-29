import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Colors } from '../../entities/colors';
import { MainWrapper } from '../../entities/CommonComponents';

const GamesCategoryContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 80vw;
  align-items: center;

  @media screen and (max-width: 1000px) {
    flex-direction: column;
  }
`;
const GameContainer = styled.div`
  margin-inline: 5em;
  background-color: ${Colors.darkRed};
  display: flex;
  flex-direction: row;
  text-align: center;
  cursor: pointer;

  @media screen and (max-width: 1000px) {
    width: 60%;
    margin: 2em 0 2em 0;
  }
  @media screen and (max-width: 650px) {
    align-items: flex-start;
    width: 70vw;
    margin: 2em 0 2em 0;
  }
  @media screen and (max-width: 470px) {
    font-size: 0.8em;
  }
`;
const GameDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 15em;

  p {
    text-align: start;
    padding: 0 1em 0.5em 1em;
  }

  @media screen and (max-width: 1000px) {
    width: 50%;
  }
`;
const GamesLogo = styled.img`
  width: 15em;

  @media screen and (max-width: 1000px) {
    width: 50%;
    align-self: center;
  }
`;

const GameCategory = styled.h2`
  font-size: 2.5em;

  @media screen and (max-width: 650px) {
    font-size: 2em;
  }
`;

export const MainPage = () => {
  const navigate = useNavigate();

  return (
    <MainWrapper>
      <GameCategory>GAMES</GameCategory>
      <GameCategory>Card games</GameCategory>
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
      <GameCategory>Slots</GameCategory>
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
      <GameCategory>Others</GameCategory>
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
        <GameContainer onClick={() => navigate('/craps')}>
          <GamesLogo src='/img/logo/craps-logo.png' alt='' />
          <GameDescription>
            <h3>Craps</h3>
            <p>
              Craps is a dice game in which players place bets on the outcome of
              the roll, or a series of rolls, of a pair of dice. Players can bet
              on the outcome of a single roll, a series of rolls, or a
              combination of rolls.
            </p>
          </GameDescription>
        </GameContainer>
      </GamesCategoryContainer>
    </MainWrapper>
  );
};
