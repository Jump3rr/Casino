import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { incrementBet, decrementBet } from '../../../actions/betActions';
import {
  incrementCredits,
  decrementCredits,
} from '../../../actions/creditsActions';
import { shuffleItems } from '../../../actions/slotsActions';
import { pushStat } from '../../../actions/statsActions';
import { Colors } from '../../../entities/colors';
import { Buttons } from '../../../entities/CommonComponents';
import { SmallDisplay } from '../../../entities/components';
import { IState } from '../../../reducers';
import { IBetReducer } from '../../../reducers/betReducer';
import { ICreditsReducer } from '../../../reducers/creditsReducer';
import { IItemsReducer } from '../../../reducers/itemsReducer';
import { IStatsReducer } from '../../../reducers/statsReducer';

const MainWrapper = styled.div`
  height: 40vh;
  width: 95vw;
  background-color: ${Colors.black};
  color: ${Colors.matrixGreen};
`;
const Settings = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  height: 70%;
  font-size: 5vh;
`;
const CreditsText = styled.div`
  font-size: 3vh;
`;
const SmallDisplayBet = styled(SmallDisplay)`
  padding: 0 5vw 0 5vw;
  font-size: 5vh;
`;

export const BottomMachine: FC = () => {
  const dispatch = useDispatch();
  type ShuffleItems = ReturnType<typeof shuffleItems>;
  type IncrementCredits = ReturnType<typeof incrementCredits>;
  type DecrementCredits = ReturnType<typeof decrementCredits>;
  type IncrementBet = ReturnType<typeof incrementBet>;
  type DecrementBet = ReturnType<typeof decrementBet>;
  type PushStat = ReturnType<typeof pushStat>;

  const { itemsList, items2List, items3List, credits, bet, stats } =
    useSelector<
      IState,
      ICreditsReducer & IBetReducer & IItemsReducer & IStatsReducer
    >((globalState) => ({
      ...globalState.items,
      ...globalState.credits,
      ...globalState.bet,
      ...globalState.stats,
    }));
  useEffect(() => {
    localStorage.setItem('credits', JSON.stringify(credits));
    localStorage.setItem('history', JSON.stringify(stats));
  }, [credits, stats]);

  const CheckCredits = (): boolean => {
    return credits >= bet ? true : false;
  };

  const CheckScore = (): number => {
    let score: number = 0;
    let multiplyBy: number = 0;
    switch (true) {
      case itemsList[0].id === items2List[1].id &&
        items2List[1].id === items3List[2].id:
        score += 1;
        multiplyBy += itemsList[0].multiply;
        break;
      case itemsList[1].id === items2List[1].id &&
        items2List[1].id === items3List[1].id:
        score += 1;
        multiplyBy += itemsList[1].multiply;
        break;
      case itemsList[0].id === items2List[0].id &&
        items2List[0].id === items3List[0].id:
        score += 1;
        multiplyBy += itemsList[0].multiply;
        break;
      case itemsList[2].id === items2List[2].id &&
        items2List[2].id === items3List[2].id:
        score += 1;
        multiplyBy += itemsList[2].multiply;
        break;
      case itemsList[2].id === items2List[1].id &&
        items2List[1].id === items3List[0].id:
        score += 1;
        multiplyBy += itemsList[2].multiply;
        break;
      default:
        break;
    }
    return score * multiplyBy;
  };

  const [clicked, setClicked] = useState(false);

  function timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function HandleClick() {
    const hasCredits = await CheckCredits();
    if (hasCredits && !clicked) {
      await setClicked(true);
      await dispatch<ShuffleItems>(shuffleItems());
      await dispatch<DecrementCredits>(decrementCredits(bet));
      const score = await CheckScore();
      await dispatch<IncrementCredits>(incrementCredits(bet * score));
      await dispatch<PushStat>(pushStat(bet * score));
      await timeout(1000);
      await setClicked(false);
    }
  }

  const HandleIncrementBet = () => {
    if (bet * 2 <= credits) {
      dispatch<IncrementBet>(incrementBet());
    }
  };
  const HandleDecrementBet = () => {
    if (bet / 2 >= 1) {
      dispatch<DecrementBet>(decrementBet());
    }
  };

  return (
    <MainWrapper>
      <CreditsText>CREDITS:</CreditsText>
      <SmallDisplay>{credits}</SmallDisplay>
      <Settings>
        <Buttons onClick={HandleIncrementBet}>+</Buttons>
        <SmallDisplayBet>{bet}</SmallDisplayBet>
        <Buttons onClick={HandleDecrementBet}>-</Buttons>
        <Buttons onClick={HandleClick}>SPIN</Buttons>
      </Settings>
    </MainWrapper>
  );
};
