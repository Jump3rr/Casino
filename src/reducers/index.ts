import { combineReducers } from 'redux';
import items, { IItemsReducer } from './itemsReducer';
import credits, { ICreditsReducer } from './creditsReducer';
import bet, { IBetReducer } from './betReducer';
import stats, { IStatsReducer } from './statsReducer';
import fbcredits, { ICreditsFbReducer } from './creditsFbReducer';

export default combineReducers({
  items,
  credits,
  bet,
  stats,
  fbcredits,
});

export interface IState {
  items: IItemsReducer;
  credits: ICreditsReducer;
  bet: IBetReducer;
  stats: IStatsReducer;
  fbcredits: ICreditsFbReducer;
}
