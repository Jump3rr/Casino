import * as actionTypes from '../actions/actionTypes/statsTypes';
import update from 'immutability-helper';

export interface IStatsReducer {
  stats: number[];
}
const localData = localStorage.getItem('history');
const defaultState = (): IStatsReducer => ({
  stats: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
});

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState(), action: any) => {
  switch (action.type) {
    case actionTypes.GET_STATS: {
      return {
        ...state,
        stats: localData !== null ? JSON.parse(localData) : state.stats,
      };
    }
    case actionTypes.PUSH_STATS: {
      return update(state, {
        stats: { $splice: [[9, 1]], $unshift: [action.payload.score] },
      });
    }
    default: {
      return state;
    }
  }
};
