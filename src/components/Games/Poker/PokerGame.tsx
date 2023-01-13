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

type Table = [string, TableSettings];
type TableSettings = {
  name: string;
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
  const [tableCards, setTableCards] = useState([]);
  const [playerCards, setPlayerCards] = useState([]);
  let table;
  let player: string;

  useEffect(() => {
    const dataRef = ref(rtdb, 'tables');
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      const tables: Table[] = Object.entries(data);
      table = tables.find((element) => element[0] === tableName);
      if (table) {
        let players_temp;
        players_temp = Object.values(table[1].players);
        setPlayers(players_temp);
        //player
        const player_temp = Object.entries(table[1].players).find(
          (element) => Object(element[1]).id === auth.currentUser?.uid
        );
        console.log(player_temp);
        if (player_temp && player_temp[0]) player = player_temp[0];
        // players_temp?.length;
        //while (gameState !== 'over') {}
        setPlayerTurn(table, Object.keys(table[1].players)[0]);
      }
    });
  }, []);

  const setPlayerTurn = (table: Table, player: string) => {
    const dataRef = ref(rtdb, `tables/${table[0]}/players/${player}/`);
    update(dataRef, {
      status: 'playing',
    });
    checkTurn(table);
  };
  const checkTurn = (table: Table) => {
    console.log(player);
    const dataRef = ref(rtdb, `tables/${table[0]}/players/${player}`);
    onValue(dataRef, (snapshot) => {
      const value = snapshot.val();
      if (value.status === 'playing') setIsPlayerTurn(true);
      else setIsPlayerTurn(false);
    });
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
    </MainWrapper>
  );
};
