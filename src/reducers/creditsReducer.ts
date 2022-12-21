import * as actionTypes from '../actions/actionTypes/creditsTypes';

export interface ICreditsReducer {
  credits: number;
}
const localData = localStorage.getItem('credits');
const defaultState = (): ICreditsReducer => ({
  credits: 1000,
});

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState(), action: any) => {
  switch (action.type) {
    case actionTypes.GET_CREDITS: {
      return {
        credits: localData !== null ? JSON.parse(localData) : state.credits,
      };
    }
    case actionTypes.INCREMENT_CREDITS: {
      return {
        credits: state.credits + action.payload.bet,
      };
    }
    case actionTypes.DECREMENT_CREDITS: {
      return {
        ...state,
        credits: state.credits - action.payload.bet,
      };
    }
    case actionTypes.RESET_CREDITS: {
      return defaultState();
    }
    default: {
      return state;
    }
  }
};
