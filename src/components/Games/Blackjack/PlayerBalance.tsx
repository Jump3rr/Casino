import React from 'react';

interface PlayerBalanceProps {
  balance: number;
}

const PlayerBalance: React.FC<PlayerBalanceProps> = ({ balance }) => {
  return <div>Player balance: {balance}</div>;
};

export default PlayerBalance;
