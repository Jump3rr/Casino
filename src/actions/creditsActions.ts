import * as actionTypes from "./actionTypes/creditsTypes";

export const getCredits = () => ({
  type: actionTypes.GET_CREDITS
});

export const incrementCredits = (bet: number) => ({
  type: actionTypes.INCREMENT_CREDITS,
  payload: { bet }
});
export const decrementCredits = (bet: number) => ({
  type: actionTypes.DECREMENT_CREDITS,
  payload: { bet }
});
export const resetCredits = () => ({
  type: actionTypes.RESET_CREDITS
});
