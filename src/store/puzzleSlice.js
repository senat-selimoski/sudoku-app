import { createSlice } from '@reduxjs/toolkit';
import SudokuGenerator from '../utils/SudokuGenerator';

const puzzleSlice = createSlice({
  name: 'puzzle',
  initialState: {
    grid: [],
    initialGrid: [],
    lockedCells: [],
    size: 4,
    difficulty: 'medium',
    message: '',
    isSolved: false,
  },
  reducers: {
    generateNewPuzzle: (state, action) => {
      const { size, difficulty } = action.payload;
      const { puzzle, lockedCells } = SudokuGenerator.generate(size, difficulty);
      state.grid = puzzle;
      state.initialGrid = JSON.parse(JSON.stringify(puzzle)); // Deep copy
      state.lockedCells = lockedCells;
      state.size = size;
      state.difficulty = difficulty;
      state.message = '';
      state.isSolved = false;
    },
    setCellValue: (state, action) => {
      const { row, col, value } = action.payload;
      state.grid[row][col] = value;
      state.message = '';
      state.isSolved = false;
    },
    resetPuzzle: (state) => {
      const { puzzle, lockedCells } = SudokuGenerator.generate(state.size, state.difficulty);
      state.grid = puzzle;
      state.initialGrid = JSON.parse(JSON.stringify(puzzle));
      state.lockedCells = lockedCells;
      state.message = '';
      state.isSolved = false;
    },
    setValidationMessage: (state, action) => {
      state.message = action.payload;
      state.isSolved = action.payload.includes('Congratulations');
    },
  },
});

export const { generateNewPuzzle, setCellValue, resetPuzzle, setValidationMessage } = puzzleSlice.actions;

export default puzzleSlice.reducer; 