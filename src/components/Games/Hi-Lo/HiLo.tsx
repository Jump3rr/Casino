import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  decrementFbCredits,
  incrementFbCredits,
} from '../../../actions/creditsFbActions';
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
import { IState } from '../../../reducers';
import { IBetReducer } from '../../../reducers/betReducer';
import { useAppDispatch, useAppSelector } from '../../../tools/hooks';
import BetComponent from '../../BetComponent/BetComponent';
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
  const fbcredits = useAppSelector((state) => state.fbcredits);
  const [card, setCard] = useState<Card | null>(null);
  const [newCard, setNewCard] = useState<Card | null>(null);
  const [playerPick, setPlayerPick] = useState(0);
  const dispatch = useAppDispatch();
  const { bet } = useSelector<IState, IBetReducer>((globalState) => ({
    ...globalState.bet,
  }));

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
    if (
      (playerPick === 1 && card?.value === 12) ||
      (playerPick === 3 && card?.value === 0)
    ) {
      return;
    }
    if (bet > fbcredits) return;
    dispatch(decrementFbCredits(bet));
    switch (playerPick) {
      case 1:
        if (
          newCard?.value != undefined &&
          card?.value != undefined &&
          newCard.value > card.value
        ) {
          dispatch(incrementFbCredits(bet * reversedPayouts[card.value]));
          return;
        }
        break;
      case 2:
        if (
          newCard?.value != undefined &&
          card?.value != undefined &&
          newCard.value === card.value
        ) {
          dispatch(incrementFbCredits(bet * payouts[1]));
          return;
        }
        break;
      case 3:
        if (
          newCard?.value != undefined &&
          card?.value != undefined &&
          newCard.value < card.value
        ) {
          dispatch(incrementFbCredits(bet * payouts[card.value]));
          return;
        }
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

      <HiLoButtons id={'hilo-button-1'} onClick={() => setPlayerPick(1)}>
        Higher
      </HiLoButtons>
      {card && (card.value || card.value === 0)
        ? reversedPayouts[card?.value]
        : ''}
      <HiLoButtons id={'hilo-button-2'} onClick={() => setPlayerPick(2)}>
        Equal
      </HiLoButtons>
      {payouts[1]}
      <HiLoButtons id={'hilo-button-3'} onClick={() => setPlayerPick(3)}>
        Lower
      </HiLoButtons>
      {card && (card.value || card.value === 0) ? payouts[card?.value] : ''}
      <PlayButton onClick={handleClick}>PLAY</PlayButton>
      {playerPick !== 0 && (
        <div>
          Your bet:{' '}
          {playerPick === 1 ? 'Higher' : playerPick === 2 ? 'Equal' : 'Lower'}
        </div>
      )}
      <BetComponent />
    </MainWrapper>
  );
};
