import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  decrementFbCredits,
  incrementFbCredits,
} from '../../../actions/creditsFbActions';
import { Buttons } from '../../../entities/CommonComponents';
import { IState } from '../../../reducers';
import { IBetReducer } from '../../../reducers/betReducer';
import { useAppDispatch, useAppSelector } from '../../../tools/hooks';
import BetComponent from '../../BetComponent/BetComponent';
import { generateDeck, Card, shuffleDeck } from '../Cards/Cards';
import DealerHand from './DealerHand';
import GameState from './GameState';
import PlayerHand from './PlayerHand';

const BlackjackGameContainer = styled.div`
  padding-top: 10vh;
  text-align: center;
  align-items: center;
  align-content: center;
  align-self: center;
  box-align: center;
`;
const BlackjackButtons = styled(Buttons)`
  padding: 5px;
  font-size: larger;
  width: 10rem;
`;

const deck = generateDeck();

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
  const [playerValue, setPlayerValue] = useState(0);
  const [dealerValue, setDealerValue] = useState(0);
  const dispatch = useAppDispatch();
  const fbcredits = useAppSelector((state) => state.fbcredits);

  const [gameState, setGameState] = useState<
    'playing' | 'won' | 'lost' | 'tied' | 'waiting'
  >('waiting');

  const { bet } = useSelector<IState, IBetReducer>((globalState) => ({
    ...globalState.bet,
  }));

  useEffect(() => {
    setPlayerValue(getHandValue(playerCards));
    setDealerValue(getHandValue(dealerCards));
    if (shuffledDeck.length < 26) {
      setShuffledDeck(shuffleDeck(deck));
    }
  }, [playerCards, dealerCards]);

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
      }
    }
  };

  const handleStand = () => {
    let newDealerCards = [...dealerCards];
    if (gameState === 'playing') {
      let i = 0;
      while (getHandValue(newDealerCards) < 17) {
        newDealerCards.push(shuffledDeck[i]);
        setShuffledDeck(
          shuffledDeck.filter(
            (card) => card !== newDealerCards[newDealerCards.length - 1]
          )
        );
        i++;
      }
      setDealerCards(newDealerCards);
      const newDelaerHandValue = getHandValue(newDealerCards);
      const playerHandValue = getHandValue(playerCards);
      if (newDelaerHandValue > 21 || newDelaerHandValue < playerHandValue) {
        setGameState('won');
        dispatch(incrementFbCredits(bet * 2));
      } else if (newDelaerHandValue > playerHandValue) {
        setGameState('lost');
      } else {
        setGameState('tied');
        dispatch(incrementFbCredits(bet));
      }
    }
  };

  const startGame = () => {
    if (bet > fbcredits) return;
    dispatch(decrementFbCredits(bet));
    setGameState('playing');
    let newDeck = [...shuffledDeck];
    const newPlayerCards = [shuffledDeck[0], shuffledDeck[2]];
    setPlayerCards(newPlayerCards);
    newDeck = shuffledDeck.filter((card) => !newPlayerCards.includes(card));
    const newDealerCards = [shuffledDeck[1], shuffledDeck[3]];
    setDealerCards(newDealerCards);
    setShuffledDeck(newDeck.filter((card) => !newDealerCards.includes(card)));
  };

  const newGame = () => {
    setGameState('waiting');
  };

  return (
    <BlackjackGameContainer>
      {gameState === 'waiting' ? (
        <>
          <BetComponent />
          <BlackjackButtons onClick={startGame}>PLAY</BlackjackButtons>
        </>
      ) : (
        <>
          <DealerHand
            cards={dealerCards}
            finished={gameState !== 'playing'}
            value={dealerValue}
          />
          <PlayerHand cards={playerCards} value={playerValue} />
          {gameState === 'playing' ? (
            <>
              <BlackjackButtons onClick={handleHit}>Hit</BlackjackButtons>
              <BlackjackButtons onClick={handleStand}>Stand</BlackjackButtons>
            </>
          ) : (
            <>
              <GameState state={gameState} />
              <BlackjackButtons onClick={newGame}>Play again</BlackjackButtons>
            </>
          )}
        </>
      )}
    </BlackjackGameContainer>
  );
};

export default Blackjack;
