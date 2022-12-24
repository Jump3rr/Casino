import React from 'react';
import { Card } from './Blackjack';

interface PlayerBalanceProps {
  balance: number;
}

const PlayerBalance: React.FC<PlayerBalanceProps> = ({ balance }) => {
  return <div>Player balance: {balance}</div>;
};

export default PlayerBalance;
