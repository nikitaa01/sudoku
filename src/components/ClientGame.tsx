'use client'
import Game from "@/components/Game"
import useFetchSudokuData from "@/hooks/useFetchSudokuData"
import ClearCookies from "./ClearCookies"
import CloseModal from "./CloseModal"

export default function ClientGame() {
    const { sudokuData, revalidate } = useFetchSudokuData()

    if (!sudokuData) return <CloseModal />

    return (
        <>
            <ClearCookies />
            <Game {...sudokuData} onCancelModal={revalidate} />
        </>
    )
}