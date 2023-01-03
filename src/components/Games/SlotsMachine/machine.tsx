import { FC, useEffect } from 'react';
import styled from 'styled-components';
import { BottomMachine } from './bottomMachine';
import { useDispatch } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import { getBet } from '../../../actions/betActions';
import { getCredits } from '../../../actions/creditsActions';
import { getItems } from '../../../actions/slotsActions';
import { getStats } from '../../../actions/statsActions';
import { Colors } from '../../../entities/colors';
import { MainGame } from './MainGame';
import './styles.css';
import {
  GetItems,
  GetCredits,
  GetBet,
  GetStats,
} from '../../../entities/types';

const MainWrapper = styled.div`
  padding-top: 5vh;
  flex-direction: column;
  background-color: ${Colors.black};
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
    dispatch<GetCredits>(getCredits());
    dispatch<GetBet>(getBet());
    dispatch<GetStats>(getStats());
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
