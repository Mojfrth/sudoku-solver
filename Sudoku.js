import { SudokuUtil } from "./SudokuUtil.js";
import { Util } from "./Util.js";

export class Sudoku {
    constructor(sudoku) {
        if (!sudoku) {
            this.sudoku = createPuzzle();
        } else {
            this.sudoku = sudoku;
        }
        this.solvedSudoku = [];
        this.isValidSudoku = false;
        this.isSolved = false;
    }

    //  getter method for random sudoku.
    get puzzle() {
        return this.sudoku;
    }


    // getter method for solution of the sudoku.

    get solvedPuzzle() {
        return this.solvedSudoku;
    }

    /**
     * *method to validate solution of the sudoku.
     * @params  none
     * @returns true if the solved puzzle is valid false otherwise
     */
    validate() {
        return isValidSolution(this.sudoku);
    }


    // getter method to find whether the current sudoku is solvable(valid).
    isSolvable() {
        this.isValidSudoku = isValidPuzzle(this.sudoku);
        if (this.isValidSudoku) {
            Util.copyGrid(this.sudoku, this.solvedSudoku);
            return solve(this.solvedSudoku);
        } else {
            return false;
        }
    }
}

function isValidPuzzle(grid) {
    if (SudokuUtil.isValidPuzzle(grid)) {
        return true;
    }
    return false;
}

function isValidSolution(grid) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (grid[i][j] === 0) {
                return false;
            }
        }
    }
    return SudokuUtil.isValidPuzzle(grid);
}

function solve(grid) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (grid[row][col] === 0) {
                for (let possibleNumber = 1; possibleNumber <= 9; possibleNumber++) {
                    if (SudokuUtil.isValidPlace(grid, row, col, possibleNumber)) {
                        grid[row][col] = possibleNumber;
                        if (solve(grid)) {
                            return true;
                        }
                        grid[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function createPuzzle() {
    let puzzle = getRandomSudoku();
    let solution = solve(puzzle);
    if (solution) {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (Math.random() > 0.3) puzzle[i][j] = 0;
            }
        }
    }
    return puzzle;
}

function getRandomSudoku() {
    const randomSudoku = [];
    for (let i = 0; i < 9; i++) {
        randomSudoku[i] = Array(9).fill(0);
    }
    for (let i = 0; i < 8; i++) {
        let number = Math.floor(Math.random() * 8) + 1;
        while (!SudokuUtil.isValidPlace(randomSudoku, 0, i, number)) {
            number = Math.floor(Math.random() * 8) + 1;
        }
        if (SudokuUtil.isValidPlace(randomSudoku, 0, i, number)) {
            randomSudoku[0][i] = number;
        }
    }
    return randomSudoku;
}
