import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { generateNewPuzzle, setCellValue, resetPuzzle, setValidationMessage, incrementTries, incrementWins } from '../store/puzzleSlice';
import SudokuValidator from '../utils/SudokuValidator';

const useSudokuGrid = () => {
  const dispatch = useDispatch();
  const { grid, lockedCells, size, message, isSolved, difficulty, tries, wins } = useSelector((state) => state.puzzle);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (grid.length === 0) {
      dispatch(generateNewPuzzle({ size: size, difficulty: difficulty }));
    }
  }, [dispatch, grid.length, size, difficulty]);

  const handleCellChange = (row, col, value) => {
    const isCellLocked = lockedCells.some(cell => cell.row === row && cell.col === col);
    if (!isCellLocked) {
      dispatch(setCellValue({ row, col, value }));
    }
  };

  const handleCheck = () => {
    dispatch(incrementTries());
    if (SudokuValidator.validate(grid, size)) {
      if (SudokuValidator.isSolved(grid, size)) {
        dispatch(setValidationMessage('Congratulations! You solved the puzzle!'));
        dispatch(incrementWins());
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
    dispatch(generateNewPuzzle({ size: newSize, difficulty: difficulty }));
  };

  const handleDifficultyChange = (e) => {
    const newDifficulty = e.target.value;
    dispatch(generateNewPuzzle({ size: size, difficulty: newDifficulty }));
  };

  return {
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
  };
};

export default useSudokuGrid; 