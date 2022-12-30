import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Colors } from '../../../entities/colors';
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

const HiLoButtons = styled(Buttons)`
  padding: 1em 2em 1em 2em;
`;
const PlayButton = styled(HiLoButtons)`
  background-color: ${Colors.red};
  color: ${Colors.gold};

  :hover {
    border-color: ${Colors.red};
    background-color: ${Colors.gold};
    color: ${Colors.red};
  }
`;

const payouts = [
  0, 12.55, 6.27, 4.18, 3.14, 2.51, 2.09, 1.79, 1.57, 1.39, 1.25, 1.14, 1.05,
];
const reversedPayouts = [...payouts].reverse();

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
      <HiLoButtons onClick={() => setPlayerPick(1)}>Higher</HiLoButtons>
      {card && (card.value || card.value === 0)
        ? reversedPayouts[card?.value]
        : ''}
      <HiLoButtons onClick={() => setPlayerPick(2)}>Equal</HiLoButtons>
      {payouts[1]}
      <HiLoButtons onClick={() => setPlayerPick(3)}>Lower</HiLoButtons>
      {card && (card.value || card.value === 0) ? payouts[card?.value] : ''}
      <PlayButton onClick={handleClick}>PLAY</PlayButton>
    </MainWrapper>
  );
};
