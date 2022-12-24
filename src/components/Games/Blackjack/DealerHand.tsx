import React from 'react';
import { Card } from './Blackjack';

interface DealerHandProps {
  cards: Card[];
}

const DealerHand: React.FC<DealerHandProps> = ({ cards }) => {
  return (
    <div>
      DEALER:
      {cards.map((card) => (
        <div key={card.suit + card.rank}>
          {card.suit}
          {card.rank}
        </div>
      ))}
    </div>
  );
};

export default DealerHand;
