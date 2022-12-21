import * as actionTypes from '../actions/actionTypes/betTypes';

export interface IBetReducer {
  bet: number;
}

const defaultState = (): IBetReducer => ({
  bet: 10,
});

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState(), action: any) => {
  switch (action.type) {
    case actionTypes.GET_BET: {
      return {
        bet: state.bet,
      };
    }
    case actionTypes.INCREMENT_BET: {
      return {
        bet: state.bet * 2,
      };
    }
    case actionTypes.DECREMENT_BET: {
      return {
        ...state,
        bet: state.bet / 2,
      };
    }
    default: {
      return state;
    }
  }
};
