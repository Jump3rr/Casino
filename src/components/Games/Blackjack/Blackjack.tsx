import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Buttons } from '../../../entities/CommonComponents';
import { generateDeck, Card } from '../Cards/Cards';
import CurrentBet from './CurrentBet';
import DealerHand from './DealerHand';
import GameState from './GameState';
import PlayerBalance from './PlayerBalance';
import PlayerHand from './PlayerHand';

const BlackjackGameContainer = styled.div`
  /* display: flex;
  justify-content: center;
  flex-direction: column; */
  text-align: center;
  align-items: center;
  align-content: center;
  align-self: center;
  box-align: center;
`;
const BlackjackButtons = styled(Buttons)`
  padding: 5px;
`;

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
    if (card.rank === 'A') {
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
  const [shuffledDeck, setShuffledDeck] = useState<Card[]>(shuffleDeck(deck));
  const [dealerCards, setDealerCards] = useState<Card[]>([]);
  const [gameState, setGameState] = useState<
    'playing' | 'won' | 'lost' | 'tied'
  >('playing');
  const [playerBalance, setPlayerBalance] = useState(1000);
  const [currentBet, setCurrentBet] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    let newDeck = [...shuffledDeck];
    const newPlayerCards = [shuffledDeck[0], shuffledDeck[2]];
    setPlayerCards(newPlayerCards);
    newDeck = shuffledDeck.filter((card) => !newPlayerCards.includes(card));

    const newDealerCards = [shuffledDeck[1], shuffledDeck[3]];
    setDealerCards(newDealerCards);
    setShuffledDeck(newDeck.filter((card) => !newDealerCards.includes(card)));
  }, []);

  const handleHit = () => {
    if (gameState === 'playing') {
      const newPlayerCards = [...playerCards, shuffledDeck[0]];
      setPlayerCards(newPlayerCards);
      setShuffledDeck(
        shuffledDeck.filter(
          (card) => card !== newPlayerCards[newPlayerCards.length - 1]
        )
      );
      if (getHandValue(newPlayerCards) > 21) {
        setGameState('lost');
        setPlayerBalance(playerBalance - currentBet);
        setFinished(true);
      }
    }
  };

  const handleStand = () => {
    let newDealerCards = [...dealerCards];
    if (gameState === 'playing') {
      while (getHandValue(newDealerCards) < 17) {
        newDealerCards.push(shuffledDeck[0]);
      }
      setDealerCards(newDealerCards);
      const newDelaerHandValue = getHandValue(newDealerCards);
      const playerHandValue = getHandValue(playerCards);
      if (newDelaerHandValue > 21 || newDelaerHandValue < playerHandValue) {
        setGameState('won');
        setPlayerBalance(playerBalance + currentBet);
      } else if (newDelaerHandValue > playerHandValue) {
        setGameState('lost');
        setPlayerBalance(playerBalance - currentBet);
      } else {
        setGameState('tied');
      }
      setFinished(true);
    }
  };

  const handleBet = (amount: number) => {
    if (gameState === 'playing' && playerBalance >= amount) {
      setCurrentBet(amount);
      setPlayerBalance(playerBalance - amount);
    }
  };

  return (
    <BlackjackGameContainer>
      <DealerHand cards={dealerCards} finished={finished} />
      <PlayerHand cards={playerCards} />
      <GameState state={gameState} />
      <PlayerBalance balance={playerBalance} />
      <CurrentBet bet={currentBet} />
      <BlackjackButtons onClick={handleHit}>Hit</BlackjackButtons>
      <BlackjackButtons onClick={handleStand}>Stand</BlackjackButtons>
      <BlackjackButtons onClick={() => handleBet(100)}>
        Bet 100
      </BlackjackButtons>
      <BlackjackButtons onClick={() => handleBet(500)}>
        Bet 500
      </BlackjackButtons>
    </BlackjackGameContainer>
  );
};

export default Blackjack;
