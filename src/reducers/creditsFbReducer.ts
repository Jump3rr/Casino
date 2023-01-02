import * as actionTypes from '../actions/actionTypes/creditsFbTypes';

export interface ICreditsFbReducer {
  credits: number;
}
const localData = localStorage.getItem('credits');
// const defaultState = (): ICreditsFbReducer => ({
//   credits: 1000,
// });
const defaultState: any = [];
// eslint-disable-next-line import/no-anonymous-default-export
export default (state: any = defaultState, action: any) => {
  switch (action.type) {
    case actionTypes.GET_CREDITS: {
      return action.payload;
      //   const paylod: ['GET_CREDITS'] = action;
      //   //const paylod: actionTypes.IPostTypes['GET_POSTS'] = action;
      //   return {
      //     ...state,
      //     credits: paylod.credits,
      //   };
      //   return {
      //     credits: localData !== null ? JSON.parse(localData) : state.credits,
      //   };
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
