import { NextRequest, NextResponse } from "next/server"
import SudokuBoardDifficulty from "../../../types/sudokuBoardDifficulty"
import SudokuData from "../../../types/sudokuData"
import { resolveSudokuData, generateSudokuData } from "@/controllers/sudokuBoard"

export function GET(req: NextRequest) {
    const game = req.nextUrl.searchParams.get('game')
    const difficultyProp = req.nextUrl.searchParams.get('difficulty')
    const difficulty: SudokuBoardDifficulty = ['easy', 'medium', 'hard'].includes(difficultyProp ?? '') ? difficultyProp as SudokuBoardDifficulty : 'easy'
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
    return NextResponse.json({...sudokuData})
}