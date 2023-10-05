import getSudokuData from "@/services/sudokuBoard"
import Game from "@/components/Game"

export default async function ServerGame({ game }: { game?: string }) {
    const query = new URLSearchParams()
    query.set('game', game ?? 'none')
    const res = await getSudokuData(query)
    if (!res) return null
    const { board, resolvedBoard, boardStr } = res

    return <Game board={board} resolvedBoard={resolvedBoard} boardStr={boardStr} />
}