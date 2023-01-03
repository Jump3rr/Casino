import React from 'react';
import {
  Deck,
  CardContainer,
  TopCard,
  MiddleCard,
  BottomCard,
} from '../../../entities/CommonComponents';
import { Card } from '../Cards/Cards';

interface DealerHandProps {
  cards: Card[];
  finished: boolean;
}

const DealerHand: React.FC<DealerHandProps> = ({ cards, finished }) => {
  if (finished) {
    return (
      <Deck>
        {cards.length > 0 && (
          <>
            DEALER:
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
          </>
        )}
      </Deck>
    );
  }
  return (
    <>
      DEALER:
      <Deck>
        {cards.length > 0 && (
          <>
            <CardContainer key={cards[0]?.suit + cards[0]?.rank}>
              <TopCard>
                {cards[0]?.suit}
                {cards[0]?.rank}
              </TopCard>
              <MiddleCard>{cards[0]?.suit}</MiddleCard>
              <BottomCard>
                {cards[0]?.rank}
                {cards[0]?.suit}
              </BottomCard>
            </CardContainer>
            <CardContainer>
              <TopCard>?</TopCard>
              <MiddleCard>?</MiddleCard>
              <BottomCard>?</BottomCard>
            </CardContainer>
          </>
        )}
      </Deck>
    </>
  );
};

export default DealerHand;
