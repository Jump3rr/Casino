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
  value: number;
}

const DealerHand: React.FC<DealerHandProps> = ({ cards, finished, value }) => {
  if (finished) {
    return (
      <div>
        DEALER: {value}
        <Deck>
          {cards.length > 0 && (
            <>
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
      </div>
    );
  }
  return (
    <div>
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
    </div>
  );
};

export default DealerHand;
