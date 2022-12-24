import React from 'react';
import { Card } from './Blackjack';

interface PlayerHandProps {
  cards: Card[];
}

const PlayerHand: React.FC<PlayerHandProps> = ({ cards }) => {
  return (
    <div>
      PLAYER:
      {cards.map((card) => (
        <div key={card.suit + card.rank}>
          {card.suit}
          {card.rank}
        </div>
      ))}
    </div>
  );
};

export default PlayerHand;
