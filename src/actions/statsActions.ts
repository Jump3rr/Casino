import * as actionTypes from './actionTypes/statsTypes';

export const getStats = () => ({
  type: actionTypes.GET_STATS,
});
export const pushStat = (score: number) => ({
  type: actionTypes.PUSH_STATS,
  payload: { score },
});
