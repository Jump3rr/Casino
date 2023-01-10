import React from 'react';
import './styles.css';

const renderWall = (number: number) => {
  const rows = [];
  for (let i = 0; i < number; i++) {
    rows.push(<span className='dot'></span>);
  }
  return rows;
};

const renderContentOfDice = () => {
  const rows = [];
  for (let i = 1; i < 7; i++) {
    rows.push(
      <li className='die-item' data-side={i}>
        {renderWall(i)}
      </li>
    );
  }
  return rows;
};

const renderDice = () => {
  return (
    <>
      <ol className='die-list even-roll' data-roll='1' id='die-1'>
        {renderContentOfDice()}
      </ol>
      <ol className='die-list even-roll' data-roll='1' id='die-2'>
        {renderContentOfDice()}
      </ol>
    </>
  );
};

export const Dice = () => {
  return <div className='dice'>{renderDice()}</div>;
};
