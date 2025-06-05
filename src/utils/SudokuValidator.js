const SudokuValidator = {
  validate: (board, size) => {
    const N = size;

    // Validate rows
    for (let r = 0; r < N; r++) {
      const rowSet = new Set();
      for (let c = 0; c < N; c++) {
        const num = board[r][c];
        if (num !== 0) {
          if (rowSet.has(num)) return false;
          rowSet.add(num);
        }
      }
    }

    // Validate columns
    for (let c = 0; c < N; c++) {
      const colSet = new Set();
      for (let r = 0; r < N; r++) {
        const num = board[r][c];
        if (num !== 0) {
          if (colSet.has(num)) return false;
          colSet.add(num);
        }
      }
    }

    // Validate main diagonal (top-left to bottom-right)
    const mainDiagSet = new Set();
    for (let i = 0; i < N; i++) {
      const num = board[i][i];
      if (num !== 0) {
        if (mainDiagSet.has(num)) return false;
        mainDiagSet.add(num);
      }
    }

    // Validate anti-diagonal (top-right to bottom-left)
    const antiDiagSet = new Set();
    for (let i = 0; i < N; i++) {
      const num = board[i][N - 1 - i];
      if (num !== 0) {
        if (antiDiagSet.has(num)) return false;
        antiDiagSet.add(num);
      }
    }

    return true;
  },

  // This function can be used to check if the board is completely filled and valid
  isSolved: (board, size) => {
    const N = size;
    for (let r = 0; r < N; r++) {
      for (let c = 0; c < N; c++) {
        if (board[r][c] === 0) {
          return false; // Puzzle is not completely filled
        }
      }
    }
    return SudokuValidator.validate(board, size); // Check validity of the filled board
  }
};

export default SudokuValidator; 