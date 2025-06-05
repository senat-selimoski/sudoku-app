const SudokuGenerator = {
  generate: (size, difficulty = 'medium') => {
    const N = size;
    const board = Array(N).fill(0).map(() => Array(N).fill(0));

    const fillGrid = (grid) => {
      // Simple backtracking algorithm to fill the grid
      for (let row = 0; row < N; row++) {
        for (let col = 0; col < N; col++) {
          if (grid[row][col] === 0) {
            const numbers = Array.from({ length: N }, (_, i) => i + 1).sort(() => Math.random() - 0.5);
            for (let num of numbers) {
              if (isValidPlacement(grid, row, col, num)) {
                grid[row][col] = num;
                if (fillGrid(grid)) {
                  return true;
                } else {
                  grid[row][col] = 0; // Backtrack
                }
              }
            }
            return false;
          }
        }
      }
      return true;
    };

    const isValidPlacement = (grid, row, col, num) => {
      // Check row
      for (let x = 0; x < N; x++) {
        if (grid[row][x] === num && x !== col) {
          return false;
        }
      }

      // Check column
      for (let x = 0; x < N; x++) {
        if (grid[x][col] === num && x !== row) {
          return false;
        }
      }

      // Check main diagonals
      if (row === col) {
        for (let i = 0; i < N; i++) {
          if (grid[i][i] === num && i !== row) {
            return false;
          }
        }
      }
      if (row + col === N - 1) {
        for (let i = 0; i < N; i++) {
          if (grid[i][N - 1 - i] === num && i !== row) {
            return false;
          }
        }
      }

      return true;
    };

    // Generate a solved board
    fillGrid(board);

    // Determine cells to reveal based on difficulty
    let cellsToRevealCount;
    switch (difficulty) {
      case 'easy':
        cellsToRevealCount = Math.floor(N * N * 0.5); // More cells pre-filled for easy
        break;
      case 'hard':
        cellsToRevealCount = Math.floor(N * N * 0.2); // Fewer cells pre-filled for hard
        break;
      case 'medium':
      default:
        cellsToRevealCount = Math.floor(N * N * 0.35); // Default to medium
        break;
    }

    const initialBoard = board.map(row => [...row]); // Start with a solved board
    const finalPuzzle = Array(N).fill(0).map(() => Array(N).fill(0));
    const finalLockedCells = [];

    let cellsPlaced = 0;
    while(cellsPlaced < cellsToRevealCount) {
      const row = Math.floor(Math.random() * N);
      const col = Math.floor(Math.random() * N);

      if (finalPuzzle[row][col] === 0) { // If cell is not yet filled
        finalPuzzle[row][col] = initialBoard[row][col];
        finalLockedCells.push({ row, col, value: initialBoard[row][col] });
        cellsPlaced++;
      }
    }

    return { puzzle: finalPuzzle, lockedCells: finalLockedCells };
  },
};

export default SudokuGenerator; 