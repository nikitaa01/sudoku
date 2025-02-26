import Game from "@/components/Game"
import { getSudokuData } from "@/controllers/sudokuBoard"
import { cookies } from "next/headers"
import SetServerRestartGame from "./SetServerRestartGame"

export default async function ServerGame({ game }: { game?: string }) {
    await cookies()
    const res = getSudokuData({ game, difficulty: "easy" })
    if (!res) return null
    const { board, resolvedBoard, boardStr, difficulty } = res

    return (
        <>
            <SetServerRestartGame />
            <Game
                board={board}
                resolvedBoard={resolvedBoard}
                boardStr={boardStr}
                difficulty={difficulty}
            />
        </>
    )
}
