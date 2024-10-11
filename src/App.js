import React, { useState, useEffect } from 'react';
import './App.css';
import Board from './Board'; // Import the Board component

const App = () => {
  const size = 5; // 5x5 grid
  const [difficulty, setDifficulty] = useState('medium'); // Default level is 'medium'
  const [numMines, setNumMines] = useState(5); // Default mines for 'medium'
  const [gameOver, setGameOver] = useState(false);
  const [minePositions, setMinePositions] = useState([]);
  const [key, setKey] = useState(0); // Key to reset the Board component

  // Randomly generate mine positions
  const generateMines = () => {
    const positions = new Set();
    while (positions.size < numMines) {
      const randomPosition = Math.floor(Math.random() * size * size);
      positions.add(randomPosition);
    }
    return [...positions];
  };

  // Update mine positions whenever difficulty or key changes
  useEffect(() => {
    setMinePositions(generateMines());
  }, [key, numMines]);

  // Handle game over
  const handleGameOver = () => {
    setGameOver(true);
  };

  // Restart game and reset the board
  const restartGame = () => {
    setGameOver(false);
    setKey(prevKey => prevKey + 1); // Trigger re-render of the Board component
  };

  // Update number of mines based on selected difficulty
  const handleDifficultyChange = (e) => {
    const selectedDifficulty = e.target.value;
    setDifficulty(selectedDifficulty);

    switch (selectedDifficulty) {
      case 'easy':
        setNumMines(3);
        break;
      case 'medium':
        setNumMines(5);
        break;
      case 'hard':
        setNumMines(10);
        break;
      default:
        setNumMines(5);
        break;
    }

    restartGame(); // Reset the game when difficulty is changed
  };

  return (
    <div className="App">
      <h1>Modern Minesweeper</h1>
      {gameOver ? <h2>Game Over!</h2> : null}

      <div className="controls">
        <label>Difficulty:</label>
        <select value={difficulty} onChange={handleDifficultyChange} className="difficulty-dropdown">
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div className="game-container">
        <Board
          key={key} // Adding key prop to force re-render
          size={size}
          minePositions={minePositions}
          handleGameOver={handleGameOver}
          gameOver={gameOver}
        />
        <button onClick={restartGame} className="restart-button">
          Restart Game
        </button>
      </div>
    </div>
  );
};

export default App;
