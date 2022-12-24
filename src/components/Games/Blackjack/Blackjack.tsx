// import React, { useEffect, useState } from 'react';

// type Card = {
//   suit: string;
//   value: number;
// };

// type Deck = {
//   cards: Card[];
// };

// type Hand = Card[];

// type BlackjackGame = {
//   deck: Deck;
//   playerHand: Hand;
//   dealerHand: Hand;
// };

// function createDeck(): Deck {
//   const cards: Card[] = [];
//   const suits = ['hearts', 'diamonds', 'spades', 'clubs'];
//   for (const suit of suits) {
//     for (let i = 1; i <= 13; i++) {
//       cards.push({ suit, value: i });
//     }
//   }
//   return { cards };
// }

// function shuffleDeck(deck: Deck): void {
//   // Losowa permutacja tablicy za pomocą algorytmu Fisher-Yates
//   for (let i = deck.cards.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [deck.cards[i], deck.cards[j]] = [deck.cards[j], deck.cards[i]];
//   }
// }

// function dealCard(deck: Deck): Card {
//   return deck.cards.pop()!;
// }

// function getHandTotal(hand: Hand): number {
//   let total = 0;
//   let aceCount = 0;
//   for (const card of hand) {
//     if (card.value === 1) {
//       aceCount++;
//     } else {
//       total += Math.min(card.value, 10);
//     }
//   }
//   while (aceCount > 0) {
//     if (total + 11 <= 21) {
//       total += 11;
//     } else {
//       total++;
//     }
//     aceCount--;
//   }
//   return total;
// }

// function Blackjack() {
//   //const [game, setGame] = useState<BlackjackGame | null>(null);
//   const [deck, setDeck] = useState<Deck | null>(null);
//   const [playerHand, setPlayerHand] = useState<Card[]>([]);
//   const [dealerHand, setDealerHand] = useState<Card[]>([]);
//   const [winner, setWinner] = useState<'player' | 'dealer' | 'push' | null>(
//     null
//   );

//   function startGame(): void {
//     const newDeck = createDeck();
//     shuffleDeck(newDeck);
//     setDeck(newDeck);
//     setPlayerHand([dealCard(newDeck), dealCard(newDeck)]);
//     setDealerHand([dealCard(newDeck), dealCard(newDeck)]);
//   }

//   async function hit() {
//     //game!.playerHand.push(dealCard(game!.deck));
//     //console.log('abc');
//     //setPlayerHand([...playerHand, dealCard(deck!)]);
//     setPlayerHand([...playerHand, dealCard(deck!)]);
//   }

//   //   useEffect(() => {
//   //     console.log('abc');
//   //     const dealerTotal = getHandTotal(dealerHand);
//   //     if (dealerTotal >= 17) {
//   //       setWinner(determineWinner());
//   //     } else if (dealerTotal < 17) {
//   //       stand();
//   //     }
//   //   }, [dealerHand]);

//   function stand(): void {
//     // if (getHandTotal(dealerHand) < 17) {
//     //   setDealerHand([...dealerHand, dealCard(deck!)]);
//     // }
//     while (getHandTotal(dealerHand) < 17) {
//       setTimeout(() => {
//         console.log(dealerHand);
//         setDealerHand([...dealerHand, dealCard(deck!)]);
//         console.log(dealerHand);
//       }, 5000);
//     }
//     setWinner(determineWinner());
//   }
//   function determineWinner(): 'player' | 'dealer' | 'push' {
//     const playerTotal = getHandTotal(playerHand);
//     const dealerTotal = getHandTotal(dealerHand);
//     if (playerTotal > 21) {
//       return 'dealer';
//     } else if (dealerTotal > 21) {
//       return 'player';
//     } else if (playerTotal > dealerTotal) {
//       return 'player';
//     } else if (dealerTotal > playerTotal) {
//       return 'dealer';
//     } else {
//       return 'push';
//     }
//   }

//   if (winner) {
//     return (
//       <div>
//         <p>Wygrywa: {winner}</p>
//         <button onClick={startGame}>Zagraj ponownie</button>
//       </div>
//     );
//   } else if (deck) {
//     return (
//       <div>
//         <p>Twoje karty:</p>
//         <ul>
//           {playerHand.map((card) => (
//             <li key={card.suit + card.value}>
//               {card.value} {card.suit}
//             </li>
//           ))}
//         </ul>
//         <p>Suma punktów: {getHandTotal(playerHand)}</p>
//         <p>Karty krupiera:</p>
//         <ul>
//           {dealerHand.map((card, index) => (
//             <li key={card.suit + card.value}>
//               {index === 0 ? 'X' : card.value + ' ' + card.suit}
//             </li>
//           ))}
//         </ul>
//         <button onClick={hit}>Dobierz kartę</button>
//         <button onClick={stand}>Zostań przy tych kartach</button>
//       </div>
//     );
//   } else {
//     return <button onClick={startGame}>Rozpocznij grę</button>;
//   }
// }

// export default Blackjack;

// import React, { useState } from 'react';

// type Card = {
//   suit: string;
//   value: number;
// };

// type Deck = {
//   cards: Card[];
// };

// function createDeck(): Deck {
//   const cards: Card[] = [];
//   const suits = ['hearts', 'diamonds', 'spades', 'clubs'];
//   for (const suit of suits) {
//     for (let i = 1; i <= 13; i++) {
//       cards.push({ suit, value: i });
//     }
//   }
//   return { cards };
// }

// function shuffleDeck(deck: Deck): void {
//   // Losowa permutacja tablicy za pomocą algorytmu Fisher-Yates
//   for (let i = deck.cards.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [deck.cards[i], deck.cards[j]] = [deck.cards[j], deck.cards[i]];
//   }
// }

// function dealCard(deck: Deck): Card {
//   return deck.cards.pop()!;
// }

// function getHandTotal(hand: Card[]): number {
//   let total = 0;
//   let aceCount = 0;
//   for (const card of hand) {
//     if (card.value === 1) {
//       aceCount++;
//     } else {
//       total += Math.min(card.value, 10);
//     }
//   }
//   while (aceCount > 0) {
//     if (total + 11 <= 21) {
//       total += 11;
//     } else {
//       total++;
//     }
//     aceCount--;
//   }
//   return total;
// }

// function Blackjack() {
//   const [deck, setDeck] = useState<Deck | null>(null);
//   const [playerHand, setPlayerHand] = useState<Card[]>([]);
//   const [dealerHand, setDealerHand] = useState<Card[]>([]);
//   const [winner, setWinner] = useState<'player' | 'dealer' | 'push' | null>(
//     null
//   );

//   function startGame(): void {
//     const newDeck = createDeck();
//     shuffleDeck(newDeck);
//     setDeck(newDeck);
//     setPlayerHand([dealCard(newDeck), dealCard(newDeck)]);
//     setDealerHand([dealCard(newDeck), dealCard(newDeck)]);
//   }

//   function hit(): void {
//     console.log(getHandTotal(playerHand));
//     console.log(playerHand);
//     setPlayerHand([...playerHand, dealCard(deck!)]);
//     console.log(winner);
//     console.log(playerHand);
//     console.log(getHandTotal(playerHand));
//   }

//   function stand(): void {
//     while (getHandTotal(dealerHand) < 17) {
//       console.log('a');
//       setDealerHand([...dealerHand, dealCard(deck!)]);
//       setWinner(determineWinner());
//     }
//   }

//   function determineWinner(): 'player' | 'dealer' | 'push' {
//     const playerTotal = getHandTotal(playerHand);
//     const dealerTotal = getHandTotal(dealerHand);
//     if (playerTotal > 21) {
//       return 'dealer';
//     } else if (dealerTotal > 21) {
//       return 'player';
//     } else if (playerTotal > dealerTotal) {
//       return 'player';
//     } else if (dealerTotal > playerTotal) {
//       return 'dealer';
//     } else {
//       return 'push';
//     }
//   }

//   if (winner) {
//     return (
//       <div>
//         <p>Wygrywa: {winner}</p>
//         <button onClick={startGame}>Zagraj ponownie</button>
//       </div>
//     );
//   } else if (playerHand.length > 0) {
//     return (
//       <div>
//         <p>Twoje karty:</p>
//         <ul>
//           {playerHand.map((card) => (
//             <li key={card.suit + card.value}>
//               {card.value} {card.suit}
//             </li>
//           ))}
//         </ul>
//         <p>Suma punktów: {getHandTotal(playerHand)}</p>
//         <p>Karty krupiera:</p>
//         <ul>
//           {dealerHand.map((card, index) => (
//             <li key={card.suit + card.value}>
//               {index === 0 ? 'X' : card.value + ' ' + card.suit}
//             </li>
//           ))}
//         </ul>
//         <button onClick={hit}>Dobierz kartę</button>
//         <button onClick={stand}>Zostań przy tych kartach</button>
//       </div>
//     );
//   } else {
//     return <button onClick={startGame}>Rozpocznij grę</button>;
//   }
// }

// export default Blackjack;

import React, { useState, useEffect } from 'react';
import CurrentBet from './CurrentBet';
import DealerHand from './DealerHand';
import GameState from './GameState';
import PlayerBalance from './PlayerBalance';
import PlayerHand from './PlayerHand';

enum Suit {
  Club = '♣',
  Diamond = '♦',
  Heart = '♥',
  Spade = '♠',
}

enum Rank {
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
}

const generateDeck = (): Card[] => {
  const deck: Card[] = [];

  for (const suit of Object.values(Suit)) {
    for (const rank of Object.values(Rank)) {
      deck.push({ suit, rank });
    }
  }

  return deck;
};

const deck = generateDeck();

const shuffleDeck = (deck: Card[]): Card[] => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

const getHandValue = (cards: Card[]): number => {
  let value = 0;
  let numAces = 0;
  for (const card of cards) {
    if (card.rank === Rank.Ace) {
      numAces++;
    } else if (card.rank === 'J' || card.rank === 'K' || card.rank === 'Q') {
      value += 10;
    } else {
      value += Number(card.rank);
    }
  }
  while (numAces > 0) {
    if (value + 11 > 21) {
      value += 1;
    } else {
      value += 11;
    }
    numAces--;
  }
  return value;
};

const Blackjack: React.FC = () => {
  const [playerCards, setPlayerCards] = useState<Card[]>([]);
  const shuffledDeck = shuffleDeck(deck);
  const [dealerCards, setDealerCards] = useState<Card[]>([]);
  const [gameState, setGameState] = useState<
    'playing' | 'won' | 'lost' | 'tied'
  >('playing');
  const [playerBalance, setPlayerBalance] = useState(1000);
  const [currentBet, setCurrentBet] = useState(0);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    setPlayerCards([shuffledDeck[0], shuffledDeck[2]]);
    setDealerCards([shuffledDeck[1], shuffledDeck[3]]);
  }, []);

  const handleHit = () => {
    if (gameState === 'playing') {
      const newPlayerCards = [
        ...playerCards,
        shuffledDeck[playerCards.length + dealerCards.length],
      ];
      setPlayerCards(newPlayerCards);
      if (getHandValue(newPlayerCards) > 21) {
        setGameState('lost');
        setPlayerBalance(playerBalance - currentBet);
      }
    }
  };
  const checkDealer = () => {
    if (getHandValue(dealerCards)) return true;
    else return false;
  };

  const handleStand = () => {
    let newDealerCards = [...dealerCards];
    if (gameState === 'playing') {
      while (getHandValue(newDealerCards) < 17) {
        console.log('abc');
        newDealerCards.push(
          shuffledDeck[playerCards.length + dealerCards.length]
        );
      }
      setDealerCards(newDealerCards);
    }
    const newDelaerHandValue = getHandValue(newDealerCards);
    console.log('abc');
    console.log(getHandValue(dealerCards));
    let dealerHandValue = getHandValue(dealerCards);
    const playerHandValue = getHandValue(playerCards);
    console.log('PLAYER:' + getHandValue(playerCards));
    console.log('bot:' + newDelaerHandValue);
    if (newDelaerHandValue > 21 || newDelaerHandValue < playerHandValue) {
      setGameState('won');
      setPlayerBalance(playerBalance + currentBet);
    } else if (newDelaerHandValue > playerHandValue) {
      setGameState('lost');
      setPlayerBalance(playerBalance - currentBet);
    } else {
      setGameState('tied');
    }
  };

  const handleBet = (amount: number) => {
    if (gameState === 'playing' && playerBalance >= amount) {
      setCurrentBet(amount);
      setPlayerBalance(playerBalance - amount);
    }
  };

  return (
    <div>
      <PlayerHand cards={playerCards} />
      <DealerHand cards={dealerCards} />
      <GameState state={gameState} />
      <PlayerBalance balance={playerBalance} />
      <CurrentBet bet={currentBet} />
      <button onClick={handleHit}>Hit</button>
      <button onClick={handleStand}>Stand</button>
      <button onClick={() => handleBet(100)}>Bet 100</button>
      <button onClick={() => handleBet(500)}>Bet 500</button>
    </div>
  );
};

export default Blackjack;
