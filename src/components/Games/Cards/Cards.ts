export enum Suit {
  Club = '♣',
  Diamond = '♦',
  Heart = '♥',
  Spade = '♠',
}

export enum Rank {
  Two = '2',
  Three = '3',
  Four = '4',
  Five = '5',
  Six = '6',
  Seven = '7',
  Eight = '8',
  Nine = '9',
  Ten = '10',
  Jack = 'J',
  Queen = 'Q',
  King = 'K',
  Ace = 'A',
}

export interface Card {
  suit: Suit;
  rank: Rank;
  value: number;
}

export const generateDeckOneSuit = (): Card[] => {
  const deck: Card[] = [];
  const suit = Suit.Spade;

  // for (const rank of Object.values(Rank)) {
  //   deck.push({ suit, rank, rank });
  // }
  for (let value = 0; value < Object.values(Rank).length; value++) {
    const rank = Object.values(Rank)[value];
    deck.push({ suit, rank, value });
  }
  return deck;
};

export const generateDeck = (): Card[] => {
  const deck: Card[] = [];
  const suits = [Suit.Spade, Suit.Club, Suit.Diamond, Suit.Heart];

  suits.forEach((suit) => {
    for (let value = 0; value < Object.values(Rank).length; value++) {
      const rank = Object.values(Rank)[value];
      deck.push({ suit, rank, value });
    }
  });
  return deck;
};

// export const generateDeck = (): Card[] => {
//   const deck: Card[] = [];

//   for (const suit of Object.values(Suit)) {
//     for (const rank of Object.values(Rank)) {
//       deck.push({ suit, rank });
//     }
//   }

//   return deck;
// };
export const shuffleDeck = (deck: Card[]): Card[] => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};
