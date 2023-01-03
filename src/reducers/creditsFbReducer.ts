import * as actionTypes from '../actions/actionTypes/creditsFbTypes';

export interface ICreditsFbReducer {
  fbcredits: number;
}
// const defaultState = (): ICreditsFbReducer => ({
//   fbcredits: 5000,
// });
const defaultState: any = [];
// eslint-disable-next-line import/no-anonymous-default-export
export default (state: any = defaultState, action: any) => {
  switch (action.type) {
    case actionTypes.GET_FBCREDITS: {
      return action.payload;
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
    default: {
      return state;
    }
  }
};
