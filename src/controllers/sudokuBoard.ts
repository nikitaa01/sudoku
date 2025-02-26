import numsPerAxle from "@/constants/numsPerAxle"
import ApiResponse from "@/types/apiResponse"
import Board from "@/types/board"
import SudokuBoardDifficulty from "@/types/sudokuBoardDifficulty"
import SudokuData from "@/types/sudokuData"

const resolveSudokuData = (
    boardStr: string
): ApiResponse<SudokuData & { boardStr: string }> => {
    try {
        const { board, resolvedBoard, difficulty } = JSON.parse(atob(boardStr))
        return {
            ok: true,
            data: { board, resolvedBoard, boardStr, difficulty },
        }
    } catch (e) {
        return { ok: false }
    }
}

const generateSudokuData = (
    difficulty: SudokuBoardDifficulty
): SudokuData & { boardStr: string } => {
    const sudokuData = generateSudoku(difficulty)
    const boardStr = btoa(JSON.stringify(sudokuData))
    return { ...sudokuData, boardStr }
}

const generateSudoku = (
    difficulty: SudokuBoardDifficulty = "easy"
): SudokuData => {
    const resolvedBoard = generateResolvedSudoku()
    const board = JSON.parse(JSON.stringify(resolvedBoard))
    const numToRemove = {
        easy: 40,
        medium: 49,
        hard: 49,
        expert: 49,
    }[difficulty]
    const cache: { row: number; col: number }[] = []
    for (let i = 0; i < numToRemove; i++) {
        const cacheLength = cache.length
        let randomRowIndex: number
        let randomColIndex: number
        while (cacheLength === cache.length) {
            randomRowIndex = Math.floor(Math.random() * 9)
            randomColIndex = Math.floor(Math.random() * 9)
            if (
                randomRowIndex >= 0 &&
                randomRowIndex < 9 &&
                randomColIndex >= 0 &&
                randomColIndex < 9 &&
                !cache.some(
                    (item) =>
                        item.row === randomRowIndex &&
                        item.col === randomColIndex
                )
            ) {
                cache.push({ row: randomRowIndex, col: randomColIndex })
                board[randomRowIndex][randomColIndex] = 0
            }
        }
    }
    const solutions = solveSudoku(board)
    if (solutions.length !== 1) {
        return generateSudoku(difficulty)
    }
    return { resolvedBoard, board, difficulty }
}

const generateResolvedSudoku = (): Board => {
    const numsPerCol = [...numsPerAxle]
    const numsPerRow = [...numsPerAxle]
    const numsPerSquare = [...numsPerAxle]
    const board: Board = []
    for (let actualColIndex = 0; actualColIndex < 9; actualColIndex++) {
        const actualRow: number[] = []
        for (let actualRowIndex = 0; actualRowIndex < 9; actualRowIndex++) {
            const actualSquareIndex =
                Math.floor(actualRowIndex / 3) * 3 +
                Math.floor(actualColIndex / 3)
            const possibleNums = numsPerCol[actualColIndex]
                .filter((num) => numsPerRow[actualRowIndex].includes(num))
                .filter((num) => numsPerSquare[actualSquareIndex].includes(num))
            if (possibleNums.length === 0) {
                return generateResolvedSudoku()
            }
            const randomIndex = Math.floor(Math.random() * possibleNums.length)
            const randomNum = possibleNums[randomIndex]
            actualRow.push(randomNum)
            numsPerCol[actualColIndex] = numsPerCol[actualColIndex].filter(
                (num) => num !== randomNum
            )
            numsPerRow[actualRowIndex] = numsPerRow[actualRowIndex].filter(
                (num) => num !== randomNum
            )
            numsPerSquare[actualSquareIndex] = numsPerSquare[
                actualSquareIndex
            ].filter((num) => num !== randomNum)
        }
        board.push(actualRow)
    }
    return board
}

const solveSudoku = (board: Board): Board => {
    const solutions: Board = []
    const solve = (row: number, col: number) => {
        if (row === 9) {
            solutions.push(JSON.parse(JSON.stringify(board)))
            return
        }
        if (board[row][col] !== 0) {
            if (col === 8) {
                solve(row + 1, 0)
            } else {
                solve(row, col + 1)
            }
            return
        }
        for (let num = 1; num <= 9; num++) {
            if (isValidMove(board, row, col, num)) {
                board[row][col] = num
                if (col === 8) {
                    solve(row + 1, 0)
                } else {
                    solve(row, col + 1)
                }
                board[row][col] = 0
            }
        }
    }
    solve(0, 0)
    return solutions
}

const isValidMove = (
    board: Board,
    row: number,
    col: number,
    num: number
): boolean => {
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num || board[i][col] === num) {
            return false
        }
    }
    const squareRow = Math.floor(row / 3) * 3
    const squareCol = Math.floor(col / 3) * 3
    for (let i = squareRow; i < squareRow + 3; i++) {
        for (let j = squareCol; j < squareCol + 3; j++) {
            if (board[i][j] === num) {
                return false
            }
        }
    }
    return true
}

export const getSudokuData = ({
    difficulty,
    game,
}: {
    difficulty: SudokuBoardDifficulty
    game?: string
}) => {
    let sudokuData: SudokuData
    if (game) {
        const resolveSudokuDataRes = resolveSudokuData(game)
        if (!resolveSudokuDataRes.ok) {
            const generatedSudokuData = generateSudokuData(difficulty)
            sudokuData = generatedSudokuData
        } else {
            sudokuData = resolveSudokuDataRes.data
        }
    } else {
        const generatedSudokuData = generateSudokuData(difficulty)
        sudokuData = generatedSudokuData
    }
    return sudokuData
}

export { generateSudokuData, resolveSudokuData }
