import React from 'react';
import { Card } from './Blackjack';
import styled from 'styled-components';
import {
  Deck,
  CardContainer,
  TopCard,
  MiddleCard,
  BottomCard,
} from '../../../entities/CommonComponents';

interface PlayerHandProps {
  cards: Card[];
}

const PlayerHand: React.FC<PlayerHandProps> = ({ cards }) => {
  return (
    <Deck>
      PLAYER:
      {cards?.map((card) => (
        <CardContainer key={card.suit + card.rank}>
          <TopCard>
            {card.suit}
            {card.rank}
          </TopCard>
          <MiddleCard>{card.suit}</MiddleCard>
          <BottomCard>
            {card.rank}
            {card.suit}
          </BottomCard>
        </CardContainer>
      ))}
    </Deck>
  );
};

export default PlayerHand;
