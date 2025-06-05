import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cell from './Cell';
import { generateNewPuzzle, setCellValue, resetPuzzle, setValidationMessage } from '../store/puzzleSlice';
import SudokuValidator from '../utils/SudokuValidator';

const SudokuGrid = () => {
  const dispatch = useDispatch();
  const { grid, lockedCells, size, message, isSolved, difficulty } = useSelector((state) => state.puzzle);
  const [selectedSize, setSelectedSize] = useState(size);
  const [selectedDifficulty, setSelectedDifficulty] = useState(difficulty);

  useEffect(() => {
    if (grid.length === 0) {
      dispatch(generateNewPuzzle({ size: selectedSize, difficulty: selectedDifficulty }));
    }
  }, [dispatch, grid.length, selectedSize, selectedDifficulty]);

  const handleCellChange = (row, col, value) => {
    const isCellLocked = lockedCells.some(cell => cell.row === row && cell.col === col);
    if (!isCellLocked) {
      dispatch(setCellValue({ row, col, value }));
    }
  };

  const handleCheck = () => {
    if (SudokuValidator.validate(grid, size)) {
      if (SudokuValidator.isSolved(grid, size)) {
        dispatch(setValidationMessage('Congratulations! You solved the puzzle!'));
      } else {
        dispatch(setValidationMessage('Grid is valid so far, but not yet solved. Keep going!'));
      }
    } else {
      dispatch(setValidationMessage('Oops! There are errors in your puzzle.'));
    }
  };

  const handleReset = () => {
    dispatch(resetPuzzle());
  };

  const handleSizeChange = (e) => {
    const newSize = parseInt(e.target.value, 10);
    setSelectedSize(newSize);
    dispatch(generateNewPuzzle({ size: newSize, difficulty: selectedDifficulty }));
  };

  const handleDifficultyChange = (e) => {
    const newDifficulty = e.target.value;
    setSelectedDifficulty(newDifficulty);
    dispatch(generateNewPuzzle({ size: selectedSize, difficulty: newDifficulty }));
  };

  return (
    <div className="sudoku-container">
      <div className="controls">
        <div className="controls-select">
            <label htmlFor="grid-size">Select Grid Size:</label>
            <select id="grid-size" value={selectedSize} onChange={handleSizeChange}>
                <option value="4">4x4</option>
                <option value="5">5x5</option>
                <option value="6">6x6</option>
            </select>
        </div>
        
        <div className="controls-select">
            <label htmlFor="difficulty">Difficulty:</label>
            <select id="difficulty" value={selectedDifficulty} onChange={handleDifficultyChange}>
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
    </div>
  );
};

export default SudokuGrid; 