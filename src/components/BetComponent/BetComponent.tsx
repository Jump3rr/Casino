import React from 'react';
import { useSelector } from 'react-redux';
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
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const BetSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const BetButtons = styled(Buttons)`
  padding: 1.2rem;
  font-size: xx-large;
  font-weight: bolder;
  margin-top: 6rem;

  @media screen and (max-width: 1300px) {
    margin-top: 4rem;
  }
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
      <BetSection>
        <BetButtons onClick={() => HandleDecrementBet()}>-</BetButtons>
        <div>
          <h2>BET:</h2>
          <BetScreen>{bet}</BetScreen>
        </div>
        <BetButtons onClick={() => HandleIncrementBet()}>+</BetButtons>
      </BetSection>
      <BetSection>
        <div>
          <h2>BALANCE:</h2>
          <BetScreen>{fbcredits}</BetScreen>
        </div>
      </BetSection>
    </BetWrapper>
  );
};

export default BetComponent;
