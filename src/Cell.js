import React, { useState } from 'react';
import './Cell.css';

const Cell = ({ index, hasMine, handleGameOver, gameOver }) => {
  const [revealed, setRevealed] = useState(false);

  const handleClick = () => {
    if (gameOver || revealed) return;

    setRevealed(true);

    if (hasMine) {
      handleGameOver();
    }
  };

  return (
    <div
      className={`cell ${revealed ? (hasMine ? 'mine' : 'safe') : ''}`}
      onClick={handleClick}
    >
      {revealed && hasMine ? '💣' : revealed ? '✔' : ''}
    </div>
  );
};

export default Cell;
