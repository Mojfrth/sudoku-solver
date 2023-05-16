import express from "express";
import cors from "cors";
import { Sudoku } from "./Sudoku.js"
import { Util } from "./Util.js";
import path from 'path';
import {fileURLToPath} from'url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, './sudoku-solver/build')))

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, './sudoku-solver/build/index.html'))
})

app.listen(5000, () => {
    console.log("Server Running at port 5000");
});

app.get("/puzzle", (req, res) => {
    let sudoku = new Sudoku();
    let puzzle = sudoku.puzzle;
    res.status(200).send({ game: puzzle });
});

app.post("/solve", (req, res) => {
    let puzzle = [];
    // Util.print2DArray(puzzle);
    Util.copyGrid(req.body.board, puzzle);
    let sudoku = new Sudoku(puzzle);
    let solution = sudoku.isSolvable();
    let solvedSudoku;
    let status;
    if (solution) {
        solvedSudoku = sudoku.solvedPuzzle;
        // Util.print2DArray(solvedSudoku);
        status = true;
    }
    else {
        solvedSudoku = req.body.board;
        status = false;
    }
    res.status(200).send({ solution: solvedSudoku, status: status });
});


app.post("/validate", (req, res) => {
    let puzzle = [];
    Util.copyGrid(req.body.board, puzzle);
    let sudoku = new Sudoku(puzzle);
    let status = sudoku.validate();
    res.status(200).send({ status: status });
})
