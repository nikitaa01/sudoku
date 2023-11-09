import SudokuBoardDifficulty from '@/types/sudokuBoardDifficulty'
import SudokuData from '@/types/sudokuData'

async function getSudokuData({ game, difficulty }: { game?: string, difficulty?: SudokuBoardDifficulty }): Promise<SudokuData & { boardStr: string } | undefined> {
    try {
        const resolveSudokuDataRes = await fetch(`${process.env.API ?? '/api'}/resolve-sudoku-board?game=${game}&difficulty=${difficulty}`, { cache: 'no-store' })
        return await resolveSudokuDataRes.json()
    } catch (error) {
        console.error(error)
    }
}

export default getSudokuData