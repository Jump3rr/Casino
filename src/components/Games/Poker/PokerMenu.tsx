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
import {
  Buttons,
  ErrorText,
  Input,
  MainWrapper,
} from '../../../entities/CommonComponents';
import { useNavigate } from 'react-router-dom';
import { generateDeck, shuffleDeck } from '../Cards/Cards';
import styled from 'styled-components';
import { Colors } from '../../../entities/colors';
import { AiFillPlusSquare, AiOutlineClose } from 'react-icons/ai';
import Modal from 'react-modal';
import './PokerStyles.css';
import { Table } from '../../../entities/types';
import { useAppSelector } from '../../../tools/hooks';

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

  span {
    width: 25%;
    word-wrap: break-word;
  }
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
const TableInput = styled(Input)`
  align-self: center;
  width: 70%;
  height: 1em;
`;
const SelectBlind = styled.select`
  align-self: center;
  width: 70%;
  background-color: ${Colors.mainGreen};
  border: 1px ${Colors.gold} solid;
  color: ${Colors.gold};
  border-radius: 1em;
  text-align: center;
`;

export const PokerMenu = () => {
  const fbcredits = useAppSelector((state) => state.fbcredits);
  const navigate = useNavigate();
  const [tableName, setTableName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [blind, setBlind] = useState('10');
  const [tables, setTables] = useState<Table[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const data = ref(rtdb, 'tables');
  const [errorTable, setErrorTable] = useState({ id: '', message: '' });

  const newTable = () => {
    if (tableName.length < 2 || tableName.length > 10) {
      setErrorMessage('Table name should be 2 to 10 characters long');
      return;
    }
    setErrorMessage('');
    setIsModalOpen(false);
    push(data, {
      name: tableName,
      state: 'waiting',
      cards: shuffleDeck(generateDeck()),
      players: {},
      blind: Number(blind),
      actualBet: 0,
      tableValue: 0,
      actualPlayer: 0,
      sbPlayer: 0,
      bbPlayer: 0,
      winner: '',
      winnerId: '',
    });
    setTableName('');
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
      //const tab: Table[] = Object.values(value);
      setTables(Object.entries(value));
    });
  };
  useEffect(() => {
    getTables();
  }, []);

  const redirect = (el: Table) => {
    if (el[1].players && Object.values(el[1].players)?.length > 7) {
      setErrorTable({ id: el[0], message: 'Max players reached' });
      return;
    }
    if (el[1].state !== 'waiting') {
      setErrorTable({ id: el[0], message: 'Game already started' });
      return;
    }
    if (el[1].blind > fbcredits) {
      setErrorTable({ id: el[0], message: 'Not enough credits' });
      return;
    }
    setErrorTable({ id: '', message: '' });
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
        ariaHideApp={false}
      >
        <h3>Create new table</h3>
        <label>Table name</label>
        <TableInput
          type='text'
          min={2}
          max={10}
          onChange={(event) => setTableName(event.target.value)}
        ></TableInput>
        <ErrorText>{errorMessage}</ErrorText>
        <label>Small blind / Big blind</label>
        <SelectBlind
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
        </SelectBlind>
        <Buttons onClick={newTable}>Create</Buttons>
      </Modal>
      <div>
        <TableRow>
          <span style={{ fontWeight: 'bolder', paddingBlock: '1em' }}>
            Name
          </span>
          <span style={{ fontWeight: 'bolder', paddingBlock: '1em' }}>
            Blind
          </span>
          <span style={{ fontWeight: 'bolder', paddingBlock: '1em' }}>
            Players
          </span>
          <span></span>
        </TableRow>
        {tables.length > 0 && (
          <div>
            {tables.map((el) => {
              return (
                <>
                  <TableRow>
                    <span>{el[1].name}</span>
                    <span>
                      {el[1].blind / 2} / {el[1].blind}
                    </span>
                    <span>
                      {el[1]?.players
                        ? Object.values(el[1].players)?.length
                        : '0'}{' '}
                      / 8
                    </span>
                    <span>
                      <JoinButton onClick={() => redirect(el)}>Join</JoinButton>
                    </span>
                  </TableRow>
                  {errorTable.id === el[0] && (
                    <ErrorText>{errorTable.message}</ErrorText>
                  )}
                </>
              );
            })}
          </div>
        )}
      </div>
    </MainWrapper>
  );
};
