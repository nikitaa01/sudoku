import Game from "@/components/Game"
import getSudokuData from "@/services/sudokuBoard"
import SetServerRestartGame from "./SetServerRestartGame"

export default async function ServerGame({ game }: { game?: string }) {
    const res = await getSudokuData({ game })
    if (!res) return null
    const { board, resolvedBoard, boardStr, difficulty } = res

    return (
        <>
            <SetServerRestartGame />
            <Game board={board} resolvedBoard={resolvedBoard} boardStr={boardStr} difficulty={difficulty} />
        </>
    )
}