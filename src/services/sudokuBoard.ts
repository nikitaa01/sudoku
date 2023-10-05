import SudokuData from '@/types/sudokuData'

async function getSudokuData(query: URLSearchParams): Promise<SudokuData & { boardStr: string } | undefined> {
    try {
        const resolveSudokuDataRes = await fetch(`${process.env.API ?? '/api'}/resolve-sudoku-board?${query.toString()}`, { cache: 'no-store' })
        return await resolveSudokuDataRes.json()
    } catch (error) {
        console.error(error)
    }
}

export default getSudokuData