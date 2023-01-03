import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { incrementBet, decrementBet } from '../../actions/betActions';
import { Colors } from '../../entities/colors';
import { Buttons } from '../../entities/CommonComponents';
import { IncrementBet, DecrementBet } from '../../entities/types';
import { IState } from '../../reducers';
import { IBetReducer } from '../../reducers/betReducer';
import { useAppDispatch, useAppSelector } from '../../tools/hooks';

const BetWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const BetButtons = styled(Buttons)`
  padding: 1.2rem;
  font-size: xx-large;
  font-weight: bolder;
  margin-top: 3.5rem;
`;
const BetScreen = styled.div`
  background-color: ${Colors.black};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  width: 8rem;
  font-size: larger;
  font-weight: bolder;
  border: 1px solid ${Colors.gold};
`;

const BetComponent = () => {
  const dispatch = useAppDispatch();
  const fbcredits = useAppSelector((state) => state.fbcredits);
  const { bet } = useSelector<IState, IBetReducer>((globalState) => ({
    ...globalState.bet,
  }));

  const HandleIncrementBet = () => {
    if (bet * 2 <= fbcredits) {
      dispatch<IncrementBet>(incrementBet());
    }
  };
  const HandleDecrementBet = () => {
    if (bet / 2 >= 1) {
      dispatch<DecrementBet>(decrementBet());
    }
  };

  return (
    <BetWrapper>
      <BetButtons onClick={() => HandleDecrementBet()}>-</BetButtons>
      <div>
        <div>BET:</div>
        <BetScreen>{bet}</BetScreen>
      </div>

      <BetButtons onClick={() => HandleIncrementBet()}>+</BetButtons>
      <div>
        <div>BALANCE:</div>
        <BetScreen>{fbcredits}</BetScreen>
      </div>
    </BetWrapper>
  );
};

export default BetComponent;
