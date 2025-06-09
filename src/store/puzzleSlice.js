import { createSlice } from '@reduxjs/toolkit';
import SudokuGenerator from '../utils/SudokuGenerator';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('sudokuPuzzleState');
    if (serializedState === null) {
      console.log("No puzzle state found in localStorage.");
      return undefined;
    }
    console.log("Loading puzzle state from localStorage:", JSON.parse(serializedState));
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Error loading state from localStorage:", err);
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('sudokuPuzzleState', serializedState);
    console.log("Saving puzzle state to localStorage:", state);
  } catch (err) {
    console.error("Error saving state to localStorage:", err);
  }
};

const puzzleSlice = createSlice({
  name: 'puzzle',
  initialState: loadState() || {
    grid: [],
    initialGrid: [],
    lockedCells: [],
    size: 4,
    difficulty: 'medium',
    message: '',
    isSolved: false,
    tries: 0,
    wins: 0,
  },
  reducers: {
    generateNewPuzzle: (state, action) => {
      const { size, difficulty } = action.payload;
      const { puzzle, lockedCells } = SudokuGenerator.generate(size, difficulty);
      state.grid = puzzle;
      state.initialGrid = JSON.parse(JSON.stringify(puzzle));
      state.lockedCells = lockedCells;
      state.size = size;
      state.difficulty = difficulty;
      state.message = '';
      state.isSolved = false;
      state.tries = 0;
      saveState(state);
    },
    setCellValue: (state, action) => {
      const { row, col, value } = action.payload;
      state.grid[row][col] = value;
      state.message = '';
      state.isSolved = false;
      saveState(state);
    },
    resetPuzzle: (state) => {
      const { size, difficulty } = state;
      const { puzzle, lockedCells } = SudokuGenerator.generate(size, difficulty);
      state.grid = puzzle;
      state.initialGrid = JSON.parse(JSON.stringify(puzzle));
      state.lockedCells = lockedCells;
      state.message = '';
      state.isSolved = false;
      state.tries = 0;
      saveState(state);
    },
    setValidationMessage: (state, action) => {
      state.message = action.payload;
      state.isSolved = action.payload.includes('Congratulations');
      saveState(state);
    },
    incrementTries: (state) => {
      state.tries += 1;
      saveState(state);
    },
    incrementWins: (state) => {
      state.wins += 1;
      saveState(state);
    },
  },
});

export const { generateNewPuzzle, setCellValue, resetPuzzle, setValidationMessage, incrementTries, incrementWins } = puzzleSlice.actions;

export default puzzleSlice.reducer; 