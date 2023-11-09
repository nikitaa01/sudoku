import Board from "./board"
import SudokuBoardDifficulty from "./sudokuBoardDifficulty"

type SudokuData = {
    board: Board
    resolvedBoard: Board,
    difficulty: SudokuBoardDifficulty,
}

export default SudokuData