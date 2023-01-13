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
} from 'firebase/database';
import { MainWrapper } from '../../../entities/CommonComponents';
import { useNavigate } from 'react-router-dom';
import { generateDeck, shuffleDeck } from '../Cards/Cards';

// type Table = {
//   id: string[];
//   settings: TableSettings[];
// };
type Table = [string, TableSettings];
type TableSettings = {
  name: string;
  state: string;
  players: {
    id: string;
  };
};

export const PokerMenu = () => {
  const navigate = useNavigate();
  const [tableName, setTableName] = useState('');
  const [tables, setTables] = useState<Table[]>([]);
  const data = ref(rtdb, 'tables');
  const newTable = () => {
    //const playerId = auth.currentUser?.uid;
    push(data, {
      name: tableName,
      state: 'waiting',
      cards: shuffleDeck(generateDeck()),
      players: {},
    });
  };
  const joinTable = (el: Table) => {
    const playerId = auth.currentUser?.uid;
    const playerName = auth.currentUser?.displayName
      ? auth.currentUser.displayName
      : auth.currentUser?.email?.split('@')[0];
    //get game status - if waiting you can join, if not error
    //const gameStatus =
    push(ref(rtdb, `tables/${el[0]}/players`), {
      id: playerId,
      name: playerName,
      status: 'unready',
    });
  };
  //const getGameStatus = () => {};
  const getTables = () => {
    // const abc = get(data).then((snapshot) => {
    //   console.log(snapshot);
    // });
    // console.log(abc);
    onValue(data, (snapshot) => {
      const abc = snapshot.val();
      console.log(abc);
      const tab: Table[] = Object.values(abc);
      console.log(Object.entries(abc));
      console.log(Object.values(Object.entries(abc)[0])[1]);

      setTables(Object.entries(abc));
    });
  };
  useEffect(() => {
    getTables();
  }, []);

  //   console.log(data);
  const red = (el: Table) => {
    console.log('abc');
    joinTable(el);
    return navigate(`/poker/${el[0]}`);
  };
  return (
    <MainWrapper>
      <input
        type='text'
        onChange={(event) => setTableName(event.target.value)}
      ></input>
      <button onClick={newTable}>New Table</button>
      <button onClick={getTables}>get Table</button>
      <div>
        {tables.length > 0 && (
          <div>
            {tables.map((el) => {
              return (
                <>
                  <div>{el[1].name}</div>
                  <button onClick={() => red(el)}>Join</button>
                </>
              );
            })}
          </div>
        )}
      </div>
    </MainWrapper>
  );
};
