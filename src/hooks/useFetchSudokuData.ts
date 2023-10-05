import { useEffect, useState } from "react"
import SudokuData from "@/types/sudokuData"
import getSudokuData from "@/services/sudokuBoard"

export default function useFetchSudokuData() {
    const [sudokuData, setSudokuData] = useState<null | SudokuData & { boardStr: string }>(null)

    const revalidate = () => {
        setSudokuData(null)
        getSudokuData(new URLSearchParams()).then(res => {
            if (!res) return null
            setSudokuData(res)
        })
    }

    useEffect(() => {
        revalidate()
    }, [])

    return { sudokuData, revalidate, loading: !sudokuData }
}