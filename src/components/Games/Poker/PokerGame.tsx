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
import { Card, Rank, Suit } from '../Cards/Cards';
import { checkWinner } from './PokerHandCheck';
import styled from 'styled-components';
import { Buttons } from '../../../entities/CommonComponents';

type Table = [string, TableSettings];
type TableSettings = {
  name: string;
  cards: Card[];
  state: string;
  players: Player;
};
export type Player = {
  id: string;
  name: string;
  status: string;
  cards: Card[];
  result: number;
};

const Corner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: right;
  text-align: right;
  margin-top: 5em;
  margin-left: -5em;
  //padding: 5em 0 0 5em;
`;
const ReadyButtons = styled(Buttons)`
  margin-top: -15em;
  padding: 2em;
`;

export const PokerGame = () => {
  const location = useLocation();
  const tableName = location.pathname.slice(7);
  const [gameState, setGameState] = useState(false);
  // const [gameState, setGameState] = useState<'playing' | 'over' | 'waiting'>(
  //   'waiting'
  // );
  const [playerState, setPlayerState] = useState<
    | 'playing'
    | 'called'
    | 'checked'
    | 'folded'
    | 'waiting'
    | 'unready'
    | 'ready'
  >('unready');
  //const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [players, setPlayers] = useState<any>([]);
  const [isPlayerTurn, setIsPlayerTurn] = useState(false);
  const [allCards, setAllCards] = useState<Card[]>([]);
  const [tableCards, setTableCards] = useState<Card[]>([]);
  const [playerCards, setPlayerCards] = useState<Card[]>([]);
  const [table, setTable] = useState<Table>();
  const [player, setPlayer] = useState('');

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
        const player_temp = Object.entries(table_temp[1].players).find(
          (element) => Object(element[1]).id === auth.currentUser?.uid
        );
        if (player_temp && player_temp[0]) setPlayer(player_temp[0]);
      }
    });
  }, []);

  useEffect(() => {
    getCards();
  }, [table]);

  useEffect(() => {
    playersCardsHandle();
  }, [allCards]);

  useEffect(() => {
    console.log('test');

    if (gameState) {
      return;
    }
    console.log('test2');
    setTimeout(() => {
      if (players.length > 1) {
        if (players.every((el: Player) => el.status === 'ready')) {
          setGameState(true);
          if (table) {
            const firstPlayer = getDbIdOfPlayer(table, 0);
            update(ref(rtdb, `tables/${table[0]}/players/${firstPlayer}/`), {
              status: 'playing',
            }).then(() => checkTurn());
            // setTimeout(() => {
            //   console.log('ust');
            //   checkTurn();
            //   //setPlayersTurn();
            // }, 10000);
          }
        }
      }
    }, 100);
  }, [players]);

  const getCards = () => {
    if (table) {
      setAllCards(Object.values(table[1].cards) as Card[]);
    }
  };

  const setPlayerReady = () => {
    if (table)
      update(ref(rtdb, `tables/${table[0]}/players/${player}/`), {
        status: 'ready',
      });
  };

  const playersCardsHandle = () => {
    if (!table) {
      return;
    }
    if (playerCards.length > 1) {
      return;
    }
    let newAllCards = allCards;
    const newPlayerCards = [allCards[0], allCards[1]];
    setPlayerCards(newPlayerCards);

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
  };

  const tableCardsHandle = () => {
    if (!table) {
      return;
    }
    if (tableCards.length > 4) {
      console.log(checkWinner(players, tableCards));
      console.log('koniec');
      return;
    }
    let newAllCards = allCards;
    console.log(tableCards.length);
    if (tableCards.length < 3) {
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

  const setPlayersTurn = () => {
    if (table) {
      console.log(table[1].players);
      console.log(Object.entries(table[1].players));
      const actualPlayerIndex = Object.entries(table[1].players).findIndex(
        (element) => Object(element[1]).status === 'playing'
      );

      if (typeof actualPlayerIndex === 'number') {
        console.log(actualPlayerIndex);
        const actualPlayer = getDbIdOfPlayer(table, actualPlayerIndex);
        let newTurn;
        if (actualPlayerIndex + 1 < players.length)
          newTurn = getDbIdOfPlayer(table, actualPlayerIndex + 1);
        else {
          tableCardsHandle();
          newTurn = getDbIdOfPlayer(table, 0);
        }
        setCardsTable();
        update(ref(rtdb, `tables/${table[0]}/players/${actualPlayer}/`), {
          status: 'waiting',
        });
        update(ref(rtdb, `tables/${table[0]}/players/${newTurn}/`), {
          status: 'playing',
        });
        checkTurn();
      }
    }
  };

  const setCardsTable = () => {
    console.log('aaaaAAAAaaaa');
    if (table) {
      const dataRef = ref(rtdb, `tables/${table[0]}`);
      onValue(dataRef, (snapshot) => {
        console.log('aaaaaaa');
        const value = snapshot.val();
        if (tableCards !== value.tableCards) setTableCards(value.tableCards);
        //else setIsPlayerTurn(false);
      });
    }
  };

  const checkTurn = () => {
    if (table) {
      const dataRef = ref(rtdb, `tables/${table[0]}/players/${player}`);
      onValue(dataRef, (snapshot) => {
        const value = snapshot.val();
        if (value.status === 'playing') setIsPlayerTurn(true);
        else setIsPlayerTurn(false);
      });
    }
  };

  if (!gameState) {
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
    <MainWrapper>
      <>
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
      List of Players:
      {players.length > 0 &&
        players.map((el: any, key: number) => {
          return (
            <div>
              {key + 1}. {el.name ? el.name : el.id}
            </div>
          );
        })}
      {isPlayerTurn && (
        <>
          <button onClick={setPlayersTurn}>Check</button>
          <button onClick={setPlayersTurn}>Bet</button>
          <button onClick={setPlayersTurn}>Call</button>
          <button onClick={setPlayersTurn}>Raise</button>
          <button onClick={setPlayersTurn}>Fold</button>
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
      <button onClick={setPlayersTurn}>update</button>
    </MainWrapper>
  );
};
