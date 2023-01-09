import { combineReducers } from 'redux';
import items, { IItemsReducer } from './itemsReducer';
import credits, { ICreditsReducer } from './creditsReducer';
import bet, { IBetReducer } from './betReducer';
import fbcredits, { ICreditsFbReducer } from './creditsFbReducer';
import ranking, { IRankingReducer } from './rankingReducer';

export default combineReducers({
  items,
  credits,
  bet,
  fbcredits,
  ranking,
});

export interface IState {
  items: IItemsReducer;
  credits: ICreditsReducer;
  bet: IBetReducer;
  fbcredits: ICreditsFbReducer;
  ranking: IRankingReducer;
}
