import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  decrementFbCredits,
  incrementFbCredits,
} from '../../../actions/creditsFbActions';
import { shuffleItems } from '../../../actions/slotsActions';
import { Buttons, MainWrapper } from '../../../entities/CommonComponents';
import { ShuffleItems } from '../../../entities/types';
import { IState } from '../../../reducers';
import { IBetReducer } from '../../../reducers/betReducer';
import { ICreditsReducer } from '../../../reducers/creditsReducer';
import { IItemsReducer } from '../../../reducers/itemsReducer';
import { useAppDispatch, useAppSelector } from '../../../tools/hooks';
import BetComponent from '../../BetComponent/BetComponent';

const SpinButton = styled(Buttons)`
  width: 10em;
  height: 5em;
`;

export const BottomMachine: FC = () => {
  const fbcredits = useAppSelector((state) => state.fbcredits);
  const dispatch = useAppDispatch();
  const { bet } = useSelector<IState, IBetReducer>((globalState) => ({
    ...globalState.bet,
  }));

  const { itemsList, items2List, items3List } = useSelector<
    IState,
    ICreditsReducer & IBetReducer & IItemsReducer
  >((globalState) => ({
    ...globalState.items,
    ...globalState.credits,
    ...globalState.bet,
  }));

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
    if (bet > fbcredits) return;
    if (!clicked) {
      await setClicked(true);
      await dispatch<ShuffleItems>(shuffleItems());
      dispatch(decrementFbCredits(bet));
      const score = await CheckScore();
      await timeout(3000);
      dispatch(incrementFbCredits(bet * score));
      await setClicked(false);
    }
  }

  return (
    <MainWrapper>
      <div>
        <SpinButton onClick={HandleClick}>SPIN</SpinButton>
      </div>
      <BetComponent />
    </MainWrapper>
  );
};
