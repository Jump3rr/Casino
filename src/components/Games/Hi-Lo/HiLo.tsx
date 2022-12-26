import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  BottomCard,
  Buttons,
  CardContainer,
  Deck,
  MainWrapper,
  MiddleCard,
  TopCard,
} from '../../../entities/CommonComponents';
import { Card, generateDeckOneSuit } from '../Cards/Cards';

export const HiLo = () => {
  const [card, setCard] = useState<Card | null>(null);
  const [newCard, setNewCard] = useState<Card | null>(null);
  const [playerPick, setPlayerPick] = useState(0);

  const getRandomCard = () => {
    const deck: Card[] = generateDeckOneSuit();
    const randomCard = deck[Math.floor(Math.random() * deck.length)];
    return randomCard;
  };

  const handleClick = () => {
    handleBet();
    setCard(newCard);
    setNewCard(getRandomCard());
    setPlayerPick(0);
  };

  const handleBet = () => {
    if (playerPick === 0) {
      return;
    }
    switch (playerPick) {
      case 1:
        if (newCard?.value && card?.value && newCard.value > card.value) {
          console.log('You win');
          return;
        }
        console.log('you lose');
        break;
      case 2:
        if (newCard?.value && card?.value && newCard.value === card.value) {
          console.log('You win');
          return;
        }
        console.log('you lose');
        break;
      case 3:
        if (newCard?.value && card?.value && newCard.value < card.value) {
          console.log('You win');
          return;
        }
        console.log('you lose');
        break;
    }
  };
  useEffect(() => {
    setCard(getRandomCard());
    setNewCard(getRandomCard());
  }, []);

  return (
    <MainWrapper>
      <Deck>
        {card && (
          <CardContainer key={card?.suit + card?.rank}>
            <TopCard>
              {card?.suit}
              {card?.rank}
            </TopCard>
            <MiddleCard>{card?.suit}</MiddleCard>
            <BottomCard>
              {card?.rank}
              {card?.suit}
            </BottomCard>
          </CardContainer>
        )}
        {newCard && (
          <CardContainer key={newCard?.suit + newCard?.rank + 15}>
            <TopCard>{newCard?.suit}?</TopCard>
            <MiddleCard>{newCard?.suit}</MiddleCard>
            <BottomCard>?{newCard?.suit}</BottomCard>
          </CardContainer>
        )}
      </Deck>
      <Buttons onClick={() => setPlayerPick(1)}>Higher</Buttons>
      <Buttons onClick={() => setPlayerPick(2)}>Equal</Buttons>
      <Buttons onClick={() => setPlayerPick(3)}>Lower</Buttons>
      <Buttons onClick={handleClick}>PLAY</Buttons>
    </MainWrapper>
  );
};
