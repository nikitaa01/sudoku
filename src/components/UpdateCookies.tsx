"use client"

import { useRestartGameContext } from "@/context/RestartGame"
import SudokuBoardDifficulty from "@/types/sudokuBoardDifficulty"
import { useEffect } from "react"

export function UpdateCookies({
    game,
    difficulty,
}: {
    game: string
    difficulty: SudokuBoardDifficulty
}) {
    const { restarting } = useRestartGameContext()

    useEffect(() => {
        if (restarting) return
        const gameCookie = `game=${game}`
        const difficultyCookie = `difficulty=${difficulty}`
        document.cookie = `${gameCookie}; ${difficultyCookie}; path=/`
    }, [difficulty, game, restarting])

    return null
}
