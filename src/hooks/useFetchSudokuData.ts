import getSudokuData from "@/services/sudokuBoard"
import SudokuBoardDifficulty from "@/types/sudokuBoardDifficulty"
import SudokuData from "@/types/sudokuData"
import { useEffect, useState } from "react"

export default function useFetchSudokuData(defaultDifficulty: SudokuBoardDifficulty = 'easy') {
    const [sudokuData, setSudokuData] = useState<null | SudokuData & { boardStr: string }>(null)

    const revalidate = (difficulty: SudokuBoardDifficulty) => {
        setSudokuData(null)
        getSudokuData({ difficulty }).then(res => {
            if (!res) return null
            setSudokuData(res)
        })
    }

    useEffect(() => {
        revalidate(defaultDifficulty)
    }, [defaultDifficulty])

    return { sudokuData, revalidate, loading: !sudokuData }
}