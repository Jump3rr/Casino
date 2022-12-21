import * as actionTypes from './actionTypes/betTypes';

export const getBet = () => ({
  type: actionTypes.GET_BET,
});

export const incrementBet = () => ({
  type: actionTypes.INCREMENT_BET,
});
export const decrementBet = () => ({
  type: actionTypes.DECREMENT_BET,
});
