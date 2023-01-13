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
import { MainWrapper } from '../../../entities/CommonComponents';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card } from '../Cards/Cards';

type Table = [string, TableSettings];
type TableSettings = {
  name: string;
  cards: Card[];
  state: string;
  players: Player;
};
type Player = {
  id: string;
  name: string;
  status: string;
};

export const PokerGame = () => {
  const location = useLocation();
  const tableName = location.pathname.slice(7);
  const [gameState, setGameState] = useState<'playing' | 'over' | 'waiting'>(
    'waiting'
  );
  const [playerState, setPlayerState] = useState<
    | 'playing'
    | 'called'
    | 'checked'
    | 'folded'
    | 'waiting'
    | 'unready'
    | 'ready'
  >('unready');
  const [isPlayerReady, setIsPlayerReady] = useState(false);
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
        //getCards();
      }
    });
  }, []);
  useEffect(() => {
    getCards();
    //playersCardsHandle();
  }, [table]);
  useEffect(() => {
    playersCardsHandle();
  }, [allCards]);

  const getCards = () => {
    if (table) {
      setAllCards(Object.values(table[1].cards) as Card[]);
    }
  };
  const playersCardsHandle = () => {
    if (!table) {
      return;
    }
    if (playerCards.length > 1) {
      return;
    }
    let newAllCards = allCards;
    for (let i = 0; i < players.length; i++) {
      const player_temp = getDbIdOfPlayer(table, i);
      const newPlayerCards = [allCards[i * 2], allCards[i * 2 + 1]];
      console.log(player);
      if (player_temp === player) {
        setPlayerCards(newPlayerCards);
      }

      newAllCards = newAllCards.filter(
        (card) =>
          card !== newPlayerCards[newPlayerCards.length - 1] &&
          card !== newPlayerCards[newPlayerCards.length - 2]
      );

      update(ref(rtdb, `tables/${table[0]}/players/${player_temp}/`), {
        cards: newPlayerCards,
      });
    }
    setAllCards(newAllCards);
    update(ref(rtdb, `tables/${table[0]}/`), {
      cards: newAllCards,
    });
  };

  const getDbIdOfPlayer = (table: Table, index: number): string => {
    return Object.entries(table[1].players)[index][0];
  };

  const setPlayersTurn = () => {
    if (table) {
      const actualPlayerIndex = Object.entries(table[1].players).findIndex(
        (element) => Object(element[1]).status === 'playing'
      );

      if (typeof actualPlayerIndex === 'number') {
        const actualPlayer = getDbIdOfPlayer(table, actualPlayerIndex);
        let newTurn;
        if (actualPlayerIndex + 1 < players.length)
          newTurn = getDbIdOfPlayer(table, actualPlayerIndex + 1);
        ///new card to table
        else newTurn = getDbIdOfPlayer(table, 0);

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

  return (
    <MainWrapper>
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
          <button>Check</button>
          <button>Bet</button>
          <button>Call</button>
          <button>Raise</button>
          <button>Fold</button>
        </>
      )}
      <button onClick={setPlayersTurn}>update</button>
    </MainWrapper>
  );
};
