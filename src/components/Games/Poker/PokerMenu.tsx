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
import { Buttons, MainWrapper } from '../../../entities/CommonComponents';
import { useNavigate } from 'react-router-dom';
import { generateDeck, shuffleDeck } from '../Cards/Cards';
import styled from 'styled-components';
import { Colors } from '../../../entities/colors';
import { AiFillPlusSquare, AiOutlineClose } from 'react-icons/ai';
import Modal from 'react-modal';
import './PokerStyles.css';

type Table = [string, TableSettings];
type TableSettings = {
  name: string;
  state: string;
  players: {
    id: string;
  };
  blind: number;
};
const TableRow = styled.div`
  margin-top: 1em;
  border: 1px ${Colors.red} solid;
  width: 25em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-inline: 1em;
  align-items: center;
  border-radius: 5px;
`;
const TopPage = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 30em;
  justify-content: space-between;
`;
const JoinButton = styled(Buttons)`
  padding: 1em;
  font-weight: bolder;
`;
const CloseButton = styled(AiOutlineClose)`
  font-size: 2.5em;
`;
const AddButton = styled(AiFillPlusSquare)`
  color: ${Colors.red};
  font-size: 3em;
  cursor: pointer;

  :hover {
    color: ${Colors.lighterGreen};
  }
`;

export const PokerMenu = () => {
  const navigate = useNavigate();
  const [tableName, setTableName] = useState('');
  const [blind, setBlind] = useState('10');
  const [tables, setTables] = useState<Table[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const data = ref(rtdb, 'tables');

  const newTable = () => {
    setIsModalOpen(false);
    push(data, {
      name: tableName,
      state: 'waiting',
      cards: shuffleDeck(generateDeck()),
      players: {},
      blind: Number(blind),
    });
  };
  const joinTable = (el: Table) => {
    const playerId = auth.currentUser?.uid;
    const playerName = auth.currentUser?.displayName
      ? auth.currentUser.displayName
      : auth.currentUser?.email?.split('@')[0];

    push(ref(rtdb, `tables/${el[0]}/players`), {
      id: playerId,
      name: playerName,
      status: 'unready',
    });
  };

  const getTables = () => {
    onValue(data, (snapshot) => {
      const value = snapshot.val();
      console.log(value);
      //const tab: Table[] = Object.values(value);
      setTables(Object.entries(value));
    });
  };
  useEffect(() => {
    getTables();
  }, []);

  const red = (el: Table) => {
    joinTable(el);
    return navigate(`/poker/${el[0]}`);
  };
  return (
    <MainWrapper>
      <TopPage>
        <h3>Active Tables:</h3>
        <AddButton onClick={() => setIsModalOpen(!isModalOpen)} />
      </TopPage>
      <Modal
        isOpen={isModalOpen}
        className='modal'
        overlayClassName='overlay'
        contentLabel='Example Modal'
        onRequestClose={() => setIsModalOpen(false)}
        shouldCloseOnOverlayClick={true}
      >
        <span>
          <CloseButton onClick={() => setIsModalOpen(!isModalOpen)} />
        </span>
        <h3>Create new table</h3>
        <label>Table name</label>
        <input
          type='text'
          onChange={(event) => setTableName(event.target.value)}
        ></input>
        <label>Small blind / Big blind</label>
        <select
          value={blind}
          onChange={(e) => {
            const selectedBlind = e.target.value;
            setBlind(selectedBlind);
          }}
        >
          <option id='1' value='10'>
            5 / 10
          </option>
          <option id='2' value='20'>
            10 / 20
          </option>
          <option id='3' value='40'>
            20 / 40
          </option>
          <option id='4' value='80'>
            40 / 80
          </option>
          <option id='5' value='200'>
            100 / 200
          </option>
          <option id='6' value='400'>
            200 / 400
          </option>
        </select>
        <button onClick={newTable}>Create</button>
      </Modal>
      <div>
        <TableRow>
          <span style={{ fontWeight: 'bolder', paddingBlock: '1em' }}>
            Name
          </span>
          <span style={{ fontWeight: 'bolder', paddingBlock: '1em' }}>
            Small blind / Big blind
          </span>
          <span></span>
        </TableRow>
        {tables.length > 0 && (
          <div>
            {tables.map((el) => {
              return (
                <TableRow>
                  <span>{el[1].name}</span>
                  <span>
                    {el[1].blind / 2} / {el[1].blind}
                  </span>
                  <JoinButton onClick={() => red(el)}>Join</JoinButton>
                </TableRow>
              );
            })}
          </div>
        )}
      </div>
    </MainWrapper>
  );
};
