import Game from "@/components/Game"
import { getSudokuData } from "@/controllers/sudokuBoard"
import SudokuBoardDifficulty from "@/types/sudokuBoardDifficulty"
import { cookies } from "next/headers"
import GameSkeleton from "./GameSkeleton"

export default async function ServerGame() {
    const cookiesStore = await cookies()
    const difficultyCookie = cookiesStore.get("difficulty")?.value as
        | SudokuBoardDifficulty
        | undefined
    const gameCookie = cookiesStore.get("game")?.value
    const res = getSudokuData({
        game: gameCookie,
        difficulty: difficultyCookie ?? "easy",
    })
    if (!res) return <GameSkeleton />
    const { board, resolvedBoard, boardStr, difficulty } = res

    return (
        <Game
            board={board}
            resolvedBoard={resolvedBoard}
            boardStr={boardStr}
            difficulty={difficulty}
        />
    )
}
