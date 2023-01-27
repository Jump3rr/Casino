import React from 'react';
import styled from 'styled-components';
import {
  Deck,
  CardContainer,
  TopCard,
  MiddleCard,
  BottomCard,
  CardsContainer,
} from '../../../entities/CommonComponents';
import { Card, Suit } from '../Cards/Cards';

interface PlayerHandProps {
  cards: Card[];
  value: number;
}

const PlayerHand: React.FC<PlayerHandProps> = ({ cards, value }) => {
  return (
    <CardsContainer>
      <Deck>
        {cards?.map((card) => (
          <CardContainer
            key={card.suit + card.rank}
            style={{
              color:
                card.suit == Suit.Diamond || card.suit === Suit.Heart
                  ? 'red'
                  : 'black',
            }}
          >
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
      PLAYER: {value}
    </CardsContainer>
  );
};

export default PlayerHand;
