# Sudoku App with Authentication

## Overview

This project is a React.js application that implements a dynamic Sudoku puzzle with user authentication. It's built with modern React patterns, Redux Toolkit for state management, and a focus on clean, modular component structure.

## Features

### Part 1: Authentication

*   **Login Page**: Users can log in with a mock username (`user`) and password (`password`).
*   **JWT Token Simulation**: On successful login, a mock JWT token is received and stored securely in `localStorage`.
*   **Protected Puzzle Page**: The Sudoku puzzle page is protected, requiring users to be logged in to access it.
*   **Logout Functionality**: A logout button is available to clear the token and return to the login page.
*   **Redux Toolkit**: Authentication state (isAuthenticated, user, token) is managed using Redux Toolkit for a centralized and predictable state.

### Part 2: Dynamic Sudoku Puzzle

*   **Dynamic Grid Size**: Users can select grid sizes of 4x4, 5x5, or 6x6.
*   **Numbers 1 to N**: Only numbers from 1 to N (where N is the grid size) are allowed in the cells.
*   **Pre-filled, Locked Cells**: Each puzzle starts with randomly pre-filled, locked cells that cannot be edited and are clearly styled with a grey background.
*   **Uniqueness Constraints**: 
    *   Each row and column must contain unique numbers.
    *   Both main diagonals (↘️ and ↙️) must also contain unique numbers.
*   **User Interaction**: Users can fill empty cells with numerical inputs.
*   **Input Validation**: Inputs are validated on entry to prevent out-of-range values.
*   **"Check" Button**: Validates the full grid (rows, columns, and diagonals), including locked cells.
*   **"Reset" Button**: Restores the puzzle to its original pre-filled state.
*   **Visual Feedback**: Clear success or error messages are displayed based on validation results.
*   **Redux Toolkit**: Puzzle state (grid, locked cells, size, messages) is managed using Redux Toolkit.

### Technical & Structural Expectations

*   **Code Structure**: The application is structured with modular components (e.g., `LoginForm`, `SudokuGrid`, `Header`, `Cell`).
*   **Utility Modules**: Custom hooks and utility modules are used for validation (`SudokuValidator.js`), puzzle generation (`SudokuGenerator.js`), and authentication logic (`AuthService.js`).
*   **Modern React Patterns**: Follows contemporary React best practices.
*   **State Management**: Utilizes Redux Toolkit for global state management.
*   **Persistence**: Authentication token and user information are stored in `localStorage`.
*   **Mobile-Friendly UI**: The application is designed to be responsive and usable on smaller screens using CSS media queries.

## Folder Structure

```
sudoku-app/
├── public/
├── src/
│   ├── assets/ (if any images or static assets)
│   │   ├── Cell.jsx
│   │   ├── Header.jsx
│   │   ├── LoginForm.jsx
│   │   └── SudokuGrid.jsx
│   ├── store/
│   │   ├── authSlice.js
│   │   ├── puzzleSlice.js
│   │   └── index.js
│   ├── utils/
│   │   ├── AuthService.js
│   │   ├── SudokuGenerator.js
│   │   └── SudokuValidator.js
│   ├── App.css
│   ├── App.jsx
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

## Installation and Running

1.  **Clone the repository**:
    ```bash
    git clone <your-repo-url>
    cd sudoku-app
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Start the development server**:
    ```bash
    npm run dev
    ```
    The application will typically open in your browser at `http://localhost:5173/`.

## Usage

*   **Login**: Use username `user` and password `password`.
*   **Sudoku Puzzle**: After logging in, you can select the grid size, fill in numbers, check your solution, or reset the puzzle.

## Assumptions and Challenges

*   **Mock Backend**: The authentication API is simulated on the frontend using `AuthService.js`. In a real-world scenario, this would interact with a backend API.
*   **Sudoku Generation Uniqueness**: The current `SudokuGenerator` creates a valid solved board and then randomly removes cells. While this generates valid puzzles, it doesn't guarantee a unique solution for each puzzle. Ensuring a unique solution is a more complex task that typically involves advanced algorithms to verify the solvability and uniqueness of the puzzle after cell removal.
*   **Error Handling Granularity**: Basic error messages are provided for validation. More specific feedback (e.g., highlighting conflicting cells) could enhance the user experience.

## Future Enhancements (Optional)

*   **Improved Sudoku Generation**: Implement an algorithm that guarantees unique solutions for generated puzzles.
*   **Timer and Attempts**: Track completion time and the number of attempts for each puzzle.
*   **Difficulty Levels**: Introduce different difficulty levels for puzzle generation.
*   **User Progress Persistence**: Save solved puzzles or user progress to `localStorage` or a backend.
*   **Theming**: Allow users to switch between different visual themes.
*   **Advanced UI/UX**: Implement more interactive feedback, such as highlighting errors dynamically as the user types.
