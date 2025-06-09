import React from 'react';
import Cell from './Cell';
import useSudokuGrid from '../hooks/useSudokuGrid';

const SudokuGrid = () => {
  const {
    grid,
    lockedCells,
    size,
    message,
    isSolved,
    difficulty,
    tries,
    wins,
    user,
    handleCellChange,
    handleCheck,
    handleReset,
    handleSizeChange,
    handleDifficultyChange,
  } = useSudokuGrid();

  return (
    <div className="sudoku-container">
      <div className="controls">
        <div className="controls-select">
            <label htmlFor="grid-size">Select Grid Size:</label>
            <select id="grid-size" value={size} onChange={handleSizeChange}>
                <option value="4">4x4</option>
                <option value="5">5x5</option>
                <option value="6">6x6</option>
                <option value="9">9x9</option>
            </select>
        </div>
        
        <div className="controls-select">
            <label htmlFor="difficulty">Difficulty:</label>
            <select id="difficulty" value={difficulty} onChange={handleDifficultyChange}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
        </div>
        <div className="controls-buttons">
            <button onClick={handleCheck} className="check-button">Check</button>
            <button onClick={handleReset} className="reset-button">Reset</button>
        </div>
    </div>
        
      {message && (
        <p className={`validation-message ${isSolved ? 'success' : 'error'}`}>
          {message}
        </p>
      )}
      <div
        className="sudoku-grid"
        style={{
          gridTemplateColumns: `repeat(${size}, 1fr)`,
          gridTemplateRows: `repeat(${size}, 1fr)`,
        }}
      >
        {grid.flat().map((value, index) => {
          const row = Math.floor(index / size);
          const col = index % size;
          const isLocked = lockedCells.some(cell => cell.row === row && cell.col === col);
          return (
            <Cell
              key={`${row}-${col}`}
              value={value}
              isLocked={isLocked}
              onChange={(val) => handleCellChange(row, col, val)}
              max={size}
            />
          );
        })}
      </div>
      <div className="game-stats">
        <p>{user.username} has tried {tries || 0} tries and won {wins || 0} wins.</p>
      </div>
    </div>
  );
};

export default SudokuGrid; 