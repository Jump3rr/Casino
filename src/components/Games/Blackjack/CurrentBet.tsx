import React from 'react';
import { Card } from './Blackjack';

interface CurrentBetProps {
  bet: number;
}

const CurrentBet: React.FC<CurrentBetProps> = ({ bet }) => {
  return <div>Current bet: {bet}</div>;
};
export default CurrentBet;
