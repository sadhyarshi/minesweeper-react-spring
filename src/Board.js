import React from 'react';
import Cell from './Cell'; // Import the Cell component
import './Board.css';

const Board = ({ size, minePositions, handleGameOver, gameOver }) => {
  const createBoard = () => {
    let board = [];
    for (let i = 0; i < size * size; i++) {
      board.push(
        <Cell
          key={i}
          index={i}
          hasMine={minePositions.includes(i)}
          handleGameOver={handleGameOver}
          gameOver={gameOver}
        />
      );
    }
    return board;
  };

  return <div className="board">{createBoard()}</div>;
};

export default Board;
