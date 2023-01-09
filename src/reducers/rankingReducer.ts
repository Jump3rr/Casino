import * as actionTypes from '../actions/actionTypes/rankingTypes';

export interface IRankingReducer {
  fbcredits: number;
}
// const defaultState = (): ICreditsFbReducer => ({
//   fbcredits: 5000,
// });
const defaultState: any = [];
// eslint-disable-next-line import/no-anonymous-default-export
export default (state: any = defaultState, action: any) => {
  switch (action.type) {
    case actionTypes.GET_RANKING: {
      return action.payload; //Math.round(action.payload * 100) / 100;
    }
    default: {
      return state;
    }
  }
};
