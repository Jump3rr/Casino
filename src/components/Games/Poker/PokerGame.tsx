import React, { useEffect, useState } from 'react';
import { auth, rtdb } from '../../../tools/firebaseConfig';
import {
  refFromURL,
  ref,
  onValue,
  update,
  set,
  push,
  get,
  DatabaseReference,
  runTransaction,
} from 'firebase/database';
import {
  BottomCard,
  CardContainer,
  Deck,
  MainWrapper,
  MiddleCard,
  TopCard,
} from '../../../entities/CommonComponents';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, generateDeck, Rank, shuffleDeck, Suit } from '../Cards/Cards';
import { checkWinner } from './PokerHandCheck';
import styled from 'styled-components';
import { Buttons } from '../../../entities/CommonComponents';
import { useSelector } from 'react-redux';
import { IState } from '../../../reducers';
import { IBetReducer } from '../../../reducers/betReducer';
import { useAppDispatch, useAppSelector } from '../../../tools/hooks';
import { DecrementBet, IncrementBet } from '../../../entities/types';
import { incrementBet, decrementBet } from '../../../actions/betActions';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

type Table = [string, TableSettings];
type TableSettings = {
  name: string;
  cards: Card[];
  state: string;
  players: Player[];
  winner: string;
  blind: number;
  actualBet: number;
  tableValue: number;
  actualPlayer: number;
};
export type Player = {
  id: string;
  name: string;
  status: string;
  cards: Card[];
  result: number;
  bet: number;
};

const Corner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: right;
  text-align: right;
  margin-top: 5em;
  margin-left: -5em;
`;
const ReadyButtons = styled(Buttons)`
  margin-top: -15em;
  padding: 2em;
`;
const BetButtons = styled.div`
  display: flex;
  flex-direction: row;

  button {
    width: 6em;
    padding: 1em 0 1em 0;
    font-weight: bolder;
    font-size: large;
  }
`;
const BetValueButtons = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  align-items: center;

  button {
    padding: 0.5em;
    font-size: 1.2em;
    font-weight: bolder;
  }
  div {
    font-size: 1.2em;
  }
`;

export const PokerGame = () => {
  const location = useLocation();
  const tableName = location.pathname.slice(7);
  const [gameState, setGameState] = useState<'playing' | 'over' | 'waiting'>(
    'waiting'
  );
  const [dbSettingsCompleted, setDbSettingsCompleted] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [canCheck, setCanCheck] = useState(true);
  const [winner, setWinner] = useState('');
  const [players, setPlayers] = useState<any>([]);
  const [isPlayerTurn, setIsPlayerTurn] = useState(false);
  const [allCards, setAllCards] = useState<Card[]>([]);
  const [tableCards, setTableCards] = useState<Card[]>([]);
  const [playerCards, setPlayerCards] = useState<Card[]>([]);
  const [table, setTable] = useState<Table>();
  const [player, setPlayer] = useState('');
  const [userCount, setUserCount] = useState(0);
  const [betOrRaise, setBetOrRaise] = useState('');
  const [tempBet, setTempBet] = useState(0);
  const [tableBet, setTableBet] = useState(0);
  const [tableValue, setTableValue] = useState(0);
  const [isBetOptionsVisible, setIsBetOptionsVisible] = useState(false);
  const [actualPlayer, setActualPlayer] = useState(0);

  const dispatch = useAppDispatch();
  const fbcredits = useAppSelector((state) => state.fbcredits);

  const HandleIncrementBet = (value: number) => {
    if (tempBet + value <= fbcredits) {
      setTempBet(tempBet + value);
    }
  };
  const HandleDecrementBet = (value: number) => {
    if (!table) return;
    if (tempBet - value > table[1].blind) {
      setTempBet(tempBet - value);
    }
  };

  useEffect(() => {
    const dataRef = ref(rtdb, 'tables');
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      const tables: Table[] = Object.entries(data);
      const table_temp = tables.find(
        (element) => element[0] === tableName
      ) as Table;
      setTable(table_temp);
      if (table_temp) {
        let players_temp;
        players_temp = Object.values(table_temp[1].players);
        setPlayers(players_temp);
        setWinner(table_temp[1].winner);
        setTempBet(table_temp[1].blind * 2);
        setTableBet(table_temp[1].actualBet);
        setTableValue(table_temp[1].tableValue);
        setActualPlayer(table_temp[1].actualPlayer);
        setGameState(table_temp[1].state as 'playing' | 'over' | 'waiting');
        const player_temp = Object.entries(table_temp[1].players).find(
          (element) => Object(element[1]).id === auth.currentUser?.uid
        );
        if (player_temp && player_temp[0]) {
          setPlayer(player_temp[0]);
          setUserCount(
            Object.keys(table_temp[1].players).indexOf(player_temp[0])
          );
        }
      }
    });
  }, []);

  useEffect(() => {
    if (gameState === 'playing') getCards();
  }, [table]);

  useEffect(() => {
    if (gameState === 'playing') {
      setTimeout(() => {
        playersCardsHandle();
      }, userCount * 500);
    }
  }, [allCards]);

  useEffect(() => {
    if (gameState === 'playing') {
      return;
    }
    setTimeout(() => {
      if (players.length > 1) {
        if (players.every((el: Player) => el.status === 'ready')) {
          setDbGameState('playing');
          if (table) {
            const firstPlayer = getDbIdOfPlayer(table, actualPlayer);
            update(ref(rtdb, `tables/${table[0]}/players/${firstPlayer}/`), {
              status: 'playing',
            }).then(() => checkTurn());
          }
        }
      }
    }, 100);
  }, [players]);

  useEffect(() => {
    if (gameState === 'over' && table) {
      setTimeout(() => {
        update(ref(rtdb, `tables/${table[0]}/players/${player}/`), {
          cards: [],
        });
        setPlayerCards([]);
        const nextPlayer =
          actualPlayer + 1 < players.length ? actualPlayer + 1 : 0;
        update(ref(rtdb, `tables/${table[0]}/`), {
          cards: shuffleDeck(generateDeck()),
          tableCards: [],
          winner: '',
          tableValue: 0,
          actualBet: 0,
          actualPlayer: nextPlayer,
        });
        setWinner('');
        setTableCards([]);
      }, 18000);
    }
  }, [gameState]);

  useEffect(() => {
    if (!table) return;
    const dataRef = ref(rtdb, `tables/${table[0]}`);
    get(dataRef).then((response) => {
      const value = response.val();
      const lowerIndexArr = Object.entries(value.players).filter(
        (elem: any, id: number) =>
          id < userCount &&
          (elem[1].move === 'call' ||
            elem[1].move === 'bet' ||
            elem[1].move === 'raise')
      );
      const higerIndexArr = Object.entries(value.players).filter(
        (elem: any, id: number) =>
          id > userCount &&
          (elem[1].move === 'call' ||
            elem[1].move === 'bet' ||
            elem[1].move === 'raise')
      );
      if (userCount > 0 && lowerIndexArr.length > 0) {
        setCanCheck(false);
      } else if (higerIndexArr.length > 0) {
        setCanCheck(false);
      } else setCanCheck(true);
    });
  }, [isPlayerTurn]);

  const startNewGame = () => {
    setTimeout(() => {
      if (!table) return;

      getCards();
    }, (userCount + 1) * 3000);
  };

  const setFirstPlayerForNewGame = () => {
    if (!table) return;
    setTimeout(() => {
      const nextPlayer =
        actualPlayer + 1 < players.length ? actualPlayer + 1 : 0;
      for (let i = 0; i < players.length; i++) {
        update(
          ref(rtdb, `tables/${table[0]}/players/${getDbIdOfPlayer(table, i)}/`),
          {
            status: 'waiting',
          }
        );
      }
      update(
        ref(
          rtdb,
          `tables/${table[0]}/players/${getDbIdOfPlayer(table, nextPlayer)}/`
        ),
        {
          status: 'playing',
        }
      );
    }, 5000);
  };

  const getCards = () => {
    if (dbSettingsCompleted[0]) return;
    if (table) {
      const settings = [...dbSettingsCompleted];
      const dataRef = ref(rtdb, `tables/${table[0]}`);
      onValue(dataRef, (snapshot) => {
        const value = snapshot.val();
        if (value.cards) setAllCards(value.cards);
        settings[0] = true;
        setDbSettingsCompleted(settings);
      });
    }
  };

  const setPlayerReady = () => {
    if (table)
      update(ref(rtdb, `tables/${table[0]}/players/${player}/`), {
        status: 'ready',
      });
  };
  const setDbGameState = (state: 'playing' | 'over' | 'waiting') => {
    if (!table) return;
    setGameState(state);
    update(ref(rtdb, `tables/${table[0]}/`), {
      state: state,
    });
  };

  const playersCardsHandle = () => {
    if (!table) {
      return;
    }
    if (playerCards.length > 1) {
      return;
    }
    if (gameState === 'over') {
      return;
    }
    let newAllCards = allCards;
    const newPlayerCards = [allCards[userCount], allCards[userCount + 10]];

    newAllCards = newAllCards.filter(
      (card) =>
        card !== newPlayerCards[newPlayerCards.length - 1] &&
        card !== newPlayerCards[newPlayerCards.length - 2]
    );
    update(ref(rtdb, `tables/${table[0]}/players/${player}/`), {
      cards: newPlayerCards,
    });
    setAllCards(newAllCards);
    update(ref(rtdb, `tables/${table[0]}/`), {
      cards: newAllCards,
    });

    setCardsPlayer();
  };

  const handleWinner = (player?: string) => {
    if (!table) return;
    let winner;
    if (player) {
      winner = player;
    } else {
      winner = checkWinner(players, tableCards)[0].name;
    }
    const settings = [...dbSettingsCompleted];
    update(ref(rtdb, `tables/${table[0]}/`), {
      winner: winner,
    }).then(() => {
      const dataRef = ref(rtdb, `tables/${table[0]}`);
      onValue(dataRef, (snapshot) => {
        const value = snapshot.val();
        if (value.winner) setWinner(value.winner);
        settings[1] = true;
        setDbSettingsCompleted(settings);
      });
    });
    setFirstPlayerForNewGame();
    setDbGameState('over');
    setTimeout(() => {
      setDbGameState('playing');
      startNewGame();
    }, 20000);
  };

  const tableCardsHandle = () => {
    if (!table) {
      return;
    }
    if (tableCards && tableCards.length > 4) {
      handleWinner();
      return;
    }
    let newAllCards = allCards;
    if (!tableCards || tableCards.length < 3) {
      const newTableCards = [allCards[0], allCards[1], allCards[2]];
      newAllCards = newAllCards.filter(
        (card) =>
          card !== newTableCards[newTableCards.length - 1] &&
          card !== newTableCards[newTableCards.length - 2] &&
          card !== newTableCards[newTableCards.length - 3]
      );
      update(ref(rtdb, `tables/${table[0]}/`), {
        tableCards: newTableCards,
      });
      setAllCards(newAllCards);
    } else if (tableCards.length >= 3) {
      const newTableCards = [...tableCards, allCards[0]];
      newAllCards = newAllCards.filter(
        (card) => card !== newTableCards[newTableCards.length - 1]
      );
      update(ref(rtdb, `tables/${table[0]}/`), {
        tableCards: newTableCards,
      });
      setAllCards(newAllCards);
    }

    update(ref(rtdb, `tables/${table[0]}/`), {
      cards: newAllCards,
    });
  };

  const getDbIdOfPlayer = (table: Table, index: number): string => {
    return Object.entries(table[1].players)[index][0];
  };

  const getNextPlayer = async (index: number): Promise<number> => {
    if (!table) return Promise.resolve(index);
    const dataRef = ref(rtdb, `tables/${table[0]}`);
    return get(dataRef).then((response) => {
      const value = response.val();
      const higherIndexArrByBet = Object.entries(value.players).filter(
        (elem: any, id: number) =>
          id > index &&
          (elem[1].status === 'waiting' || elem[1].status === 'ready') &&
          elem[1].bet < tableBet
      );
      const lowerIndexArrByBet = Object.entries(value.players).filter(
        (elem: any, id: number) =>
          id < index &&
          (elem[1].status === 'waiting' || elem[1].status === 'ready') &&
          elem[1].bet !== tableBet
      );
      const higherIndexArr = Object.entries(value.players).filter(
        (elem: any, id: number) =>
          id > index &&
          (elem[1].status === 'waiting' || elem[1].status === 'ready')
      );
      const lowerIndexArr = Object.entries(value.players).filter(
        (elem: any, id: number) =>
          id < index &&
          (elem[1].status === 'waiting' || elem[1].status === 'ready')
      );

      const nextIndex =
        higherIndexArrByBet.length > 0
          ? Object.entries(value.players).findIndex(
              (el) => el[0] === higherIndexArrByBet[0][0]
            )
          : lowerIndexArrByBet.length > 0
          ? Object.entries(value.players).findIndex(
              (el) => el[0] === lowerIndexArrByBet[0][0]
            )
          : higherIndexArr.length > 0
          ? Object.entries(value.players).findIndex(
              (el) => el[0] === higherIndexArr[0][0]
            )
          : lowerIndexArr.length > 0
          ? Object.entries(value.players).findIndex(
              (el) => el[0] === lowerIndexArr[0][0]
            )
          : index;

      if (index === lowerIndexArr.concat(higherIndexArr).length) {
        if (actualPlayer === 0) checkAllPlayersBet();
      } else {
        if (index + 1 === actualPlayer) checkAllPlayersBet();
      }
      return Promise.resolve(nextIndex);
    });
  };

  const setPlayersTurn = async (choice: string, bet: number = 0) => {
    if (table) {
      const actualPlayerIndex = Object.entries(table[1].players).findIndex(
        (element) => Object(element[1]).status === 'playing'
      );

      if (typeof actualPlayerIndex === 'number') {
        const actualPlayer = getDbIdOfPlayer(table, actualPlayerIndex);
        update(ref(rtdb, `tables/${table[0]}/players/${actualPlayer}/`), {
          status: choice === 'fold' ? choice : 'waiting',
          move: choice,
          bet: bet > 0 ? bet : tableBet,
        });
        checkTurn();
        if (choice === 'raise' || choice === 'bet' || choice === 'call') {
          updateTableBet(bet > 0 ? bet : tableBet);
        }
        if (choice === 'raise' || choice === 'bet') {
          update(ref(rtdb, `tables/${table[0]}/`), {
            actualPlayer: actualPlayerIndex,
          });
        }
        let newTurn;
        const nextPlayer = await getNextPlayer(actualPlayerIndex);
        if (typeof nextPlayer === 'number') {
          if (nextPlayer !== actualPlayerIndex) {
            newTurn = getDbIdOfPlayer(table, nextPlayer);
          } else {
            handleWinner(players[actualPlayerIndex].name);
            return;
          }
        }

        setCardsTable();
        update(ref(rtdb, `tables/${table[0]}/players/${newTurn}/`), {
          status: 'playing',
        });
      }
    }
  };

  const checkAllPlayersBet = () => {
    if (!table) return;
    const dataRef = ref(rtdb, `tables/${table[0]}`);
    return get(dataRef).then((response) => {
      const value = response.val();
      const playersInGame = Object.entries(value.players).filter(
        (elem: any) => elem[1].status !== 'fold'
      );
      const playersBet = Object.entries(value.players).filter(
        (elem: any) => elem[1].status !== 'fold' && elem[1].bet === tableBet
      );
      if (playersInGame.length === playersBet.length) {
        playersInGame.forEach((player) => {
          update(ref(rtdb, `tables/${table[0]}/players/${player[0]}/`), {
            bet: 0,
            move: '',
          });
          setCanCheck(true);
          tableCardsHandle();
        });
      }
    });
  };

  const updateTableBet = (bet: number) => {
    if (!table) return;

    const dataRef = ref(rtdb, `tables/${table[0]}`);
    get(dataRef)
      .then((response) => {
        return response.val();
      })
      .then((res) => {
        const actualValue = res.tableValue;
        update(ref(rtdb, `tables/${table[0]}/`), {
          actualBet: bet,
          tableValue: actualValue ? actualValue + bet : bet,
        });
      });
  };

  const setCardsTable = () => {
    if (dbSettingsCompleted[2]) return;
    if (table) {
      const settings = [...dbSettingsCompleted];
      const dataRef = ref(rtdb, `tables/${table[0]}`);
      onValue(dataRef, (snapshot) => {
        const value = snapshot.val();
        if (tableCards !== value.tableCards) setTableCards(value.tableCards);
        settings[2] = true;
        setDbSettingsCompleted(settings);
      });
    }
  };
  const setCardsPlayer = () => {
    if (dbSettingsCompleted[3]) return;
    if (table) {
      const settings = [...dbSettingsCompleted];
      const dataRef = ref(rtdb, `tables/${table[0]}/players/${player}`);
      onValue(dataRef, (snapshot) => {
        const value = snapshot.val();
        if (playerCards !== value.cards) setPlayerCards(value.cards);
        settings[3] = true;
        setDbSettingsCompleted(settings);
      });
    }
  };

  const checkTurn = () => {
    if (dbSettingsCompleted[4]) return;
    if (table) {
      const settings = [...dbSettingsCompleted];
      const dataRef = ref(rtdb, `tables/${table[0]}/players/${player}`);
      onValue(dataRef, (snapshot) => {
        const value = snapshot.val();
        if (value.status === 'playing') setIsPlayerTurn(true);
        else setIsPlayerTurn(false);
        settings[4] = true;
        setDbSettingsCompleted(settings);
      });
    }
  };

  if (gameState === 'waiting') {
    return (
      <>
        <Corner>
          Players:
          {players.length > 0 &&
            players.map((el: any, key: number) => {
              return (
                <div>
                  {key + 1}. {el.name ? el.name : el.id}
                  <span
                    style={{ color: el.status === 'ready' ? 'green' : 'red' }}
                  >
                    {el.status === 'ready' ? ' Ready' : ' Unready'}
                  </span>
                </div>
              );
            })}
        </Corner>
        <MainWrapper>
          <ReadyButtons onClick={() => setPlayerReady()}>Ready</ReadyButtons>
        </MainWrapper>
      </>
    );
  }

  return (
    <>
      <Corner>
        Players:
        {players.length > 0 &&
          players.map((el: any, key: number) => {
            return (
              <div>
                {key + 1}. {el.name ? el.name : el.id}
              </div>
            );
          })}
      </Corner>
      <MainWrapper>
        <>
          {gameState === 'over' && winner && <>{winner + ' wins'}</>}
          <span>VALUE: {tableValue}</span>
          {tableCards?.length > 0 && (
            <Deck>
              {tableCards?.map((card) => (
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
          )}
        </>

        {isPlayerTurn && gameState !== 'over' && (
          <>
            <BetButtons>
              {canCheck ? (
                <>
                  <Buttons onClick={() => setPlayersTurn('check')}>
                    Check
                  </Buttons>
                  <Buttons
                    onClick={() => {
                      setIsBetOptionsVisible(!isBetOptionsVisible);
                      setBetOrRaise('bet');
                    }}
                  >
                    Bet
                  </Buttons>
                </>
              ) : (
                <>
                  <Buttons onClick={() => setPlayersTurn('call')}>Call</Buttons>
                  <Buttons
                    onClick={() => {
                      setIsBetOptionsVisible(!isBetOptionsVisible);
                      setBetOrRaise('raise');
                    }}
                  >
                    Raise
                  </Buttons>
                </>
              )}
              <Buttons onClick={() => setPlayersTurn('fold')}>Fold</Buttons>
            </BetButtons>
            {isBetOptionsVisible && (
              <>
                <BetValueButtons>
                  <Buttons onClick={() => HandleDecrementBet(100)}>
                    -100
                  </Buttons>
                  <Buttons onClick={() => HandleDecrementBet(10)}>-10</Buttons>
                  <Buttons onClick={() => HandleDecrementBet(1)}>-1</Buttons>
                  <div>
                    <div>BET:</div>
                    <div>{tempBet}</div>
                  </div>
                  <Buttons onClick={() => HandleIncrementBet(1)}>+1</Buttons>
                  <Buttons onClick={() => HandleIncrementBet(10)}>+10</Buttons>
                  <Buttons onClick={() => HandleIncrementBet(100)}>
                    +100
                  </Buttons>
                </BetValueButtons>
                <Buttons
                  style={{
                    padding: '1em',
                    fontSize: 'large',
                    fontWeight: 'bolder',
                  }}
                  onClick={() => {
                    setPlayersTurn(betOrRaise, tempBet);
                    setIsBetOptionsVisible(false);
                  }}
                >
                  {betOrRaise.charAt(0).toUpperCase() + betOrRaise.slice(1)}
                </Buttons>
              </>
            )}
          </>
        )}
        {playerCards.length > 0 && (
          <Deck>
            {playerCards?.map((card) => (
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
        )}
      </MainWrapper>
    </>
  );
};
