import React from 'react';

interface GameStateProps {
  state: 'playing' | 'won' | 'lost' | 'tied';
}

const GameState: React.FC<GameStateProps> = ({ state }) => {
  let message: string;
  if (state === 'playing') {
    message = 'Playing';
  } else if (state === 'won') {
    message = 'You won!';
  } else if (state === 'lost') {
    message = 'You lost';
  } else {
    message = 'Tied';
  }

  return <div>{message}</div>;
};

export default GameState;
