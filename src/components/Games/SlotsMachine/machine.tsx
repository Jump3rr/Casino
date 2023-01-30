import { FC, useEffect } from 'react';
import styled from 'styled-components';
import { BottomMachine } from './bottomMachine';
import { useDispatch } from 'react-redux';
import { getBet } from '../../../actions/betActions';
import { getItems } from '../../../actions/slotsActions';
import { Colors } from '../../../entities/colors';
import { MainGame } from './MainGame';
import './styles.css';
import { GetItems, GetBet } from '../../../entities/types';

const MainWrapper = styled.div`
  padding-top: 5vh;
  flex-direction: column;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const Display = styled.div`
  height: 40vh;
  width: 90vw;
  background-color: ${Colors.button};
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const Machine: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch<GetItems>(getItems());
    dispatch<GetBet>(getBet());
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainWrapper>
      <Display>
        <MainGame />
      </Display>
      <BottomMachine />
    </MainWrapper>
  );
};
