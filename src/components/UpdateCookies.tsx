"use client"

import { useRestartGameContext } from "@/context/RestartGame"
import SudokuBoardDifficulty from "@/types/sudokuBoardDifficulty"
import { useEffect } from "react"

export function UpdateCookies({
    difficulty,
}: {
    difficulty: SudokuBoardDifficulty
}) {
    const { restarting } = useRestartGameContext()

    useEffect(() => {
        if (restarting) return
        const difficultyCookie = `difficulty=${difficulty}`
        document.cookie = `${difficultyCookie}; path=/`
    }, [difficulty, restarting])

    return null
}
