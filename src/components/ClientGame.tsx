'use client'
import Game from "@/components/Game"
import { useRestartGameContext } from "@/context/RestartGame"
import useFetchSudokuData from "@/hooks/useFetchSudokuData"
import SudokuBoardDifficulty from "@/types/sudokuBoardDifficulty"
import { useEffect } from "react"
import ClearCookies from "./ClearCookies"
import CloseModal from "./CloseModal"

export default function ClientGame({ difficulty }: { difficulty?: SudokuBoardDifficulty }) {
    const { setRestartGame } = useRestartGameContext()
    const { sudokuData, revalidate } = useFetchSudokuData(difficulty)

    useEffect(() => {
        setRestartGame(() => revalidate)
    }, [])

    if (!sudokuData) return <CloseModal />

    return (
        <>
            <ClearCookies />
            <Game {...sudokuData} />
        </>
    )
}